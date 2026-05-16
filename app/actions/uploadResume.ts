/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { createClientServer } from '@/lib/supabase/server';
import { parseFile } from '@/lib/parser';           // we'll move parser
import { analyzeWithClaude } from '@/lib/claude';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';

export async function uploadResume(formData: FormData) {
  const supabase = await createClientServer();
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { success: false, error: "You must be logged in" };
    }

    const file = formData.get('resume') as File;
    const currentLocation = formData.get('currentLocation') as string;
    const targetLocation = formData.get('targetLocation') as string;

    if (!file) {
      return { success: false, error: "No file uploaded" };
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      return { success: false, error: "Only PDF and DOCX files are allowed" };
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name;

    // 1. Parse resume text
    let resumeText: string;
    try {
      resumeText = await parseFile(buffer, fileName);
    } catch (err) {
      console.error("Parse error:", err);
      return { success: false, error: "Failed to read resume file" };
    }

    if (!resumeText || resumeText.trim().length < 100) {
      return { success: false, error: "Could not extract meaningful text from resume" };
    }

    // 2. Send to Claude for analysis
    const analysisResult = await analyzeWithClaude(resumeText, {
      currentLocation,
      targetLocation
    });

    // 3. Upload original file to Supabase Storage
    const fileExt = fileName.split('.').pop();
    const storagePath = `${user.id}/${uuidv4()}.${fileExt}`;

    const { error: storageError } = await supabase.storage
      .from('resumes')
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: true
      });

    if (storageError) {
      console.error("Storage error:", storageError);
    }

    // 4. Save report to database
    const { data: report, error: dbError } = await supabase
      .from('reports')
      .insert({
        user_id: user.id,
        file_path: storagePath,
        raw_text: resumeText,
        analysis: analysisResult.analysis,
        ats_score: analysisResult.ats_score,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return { success: false, error: "Failed to save report" };
    }

    revalidatePath('/dashboard');

    return {
      success: true,
      reportId: report.id,
      message: "Resume analyzed successfully!"
    };

  } catch (error: any) {
    console.error("UploadResume Error:", error);
    return { 
      success: false, 
      error: error.message || "Internal server error" 
    };
  }
}