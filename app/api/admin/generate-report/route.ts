// app/api/admin/generate-report/route.ts
import { createClient } from '@/lib/supabase/client';
import { NextResponse } from 'next/server';
import { parseFile } from '@/lib/parser';
import { analyzeWithAI } from '@/lib/gemini';

export async function POST(request: Request) {
  const supabase = await createClient();

  // Founder protection
  const { data: { user } } = await supabase.auth.getUser();
  if (user?.email !== 'naveedahmedgopang76@gmail.com') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { userId } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    // Get user's resume from storage
    const { data: profile } = await supabase
      .from('profiles')
      .select('current_location')
      .eq('id', userId)
      .single();

    // TODO: Get actual file_path from reports or a separate resumes bucket
    // For now we assume the latest report has raw_text or you fetch from storage
    const { data: latestReport } = await supabase
      .from('reports')
      .select('file_path, raw_text')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (!latestReport?.raw_text) {
      return NextResponse.json({ error: 'No resume text found for this user' }, { status: 400 });
    }

    const metadata = {
      currentLocation: profile?.current_location || 'Not specified',
      targetLocation: undefined,
    };

    // Use updated analyzeWithAI
    const aiResult = await analyzeWithAI(latestReport.raw_text, metadata);

    // Save new report version
    const { error } = await supabase
      .from('reports')
      .insert({
        user_id: userId,
        file_path: latestReport.file_path,
        raw_text: latestReport.raw_text,
        analysis: aiResult.analysis,
        ats_score: aiResult.ats_score,
        version: 1, // increment logic can be added later
      });

    if (error) throw error;

    return NextResponse.json({ 
      success: true, 
      ats_score: aiResult.ats_score 
    });
  } catch (error: any) {
    console.error('Admin generate report error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to generate report' 
    }, { status: 500 });
  }
}