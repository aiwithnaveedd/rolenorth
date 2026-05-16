import { createClientServer } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export default async function ReportPage({ params }: { params: { id: string } }) {
  const supabase = await createClientServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) notFound();

  const { data: report } = await supabase
    .from('reports')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single();

  if (!report) notFound();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Career Analysis Report</h1>
      
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-sm text-zinc-500">ATS Score</p>
            <p className="text-5xl font-bold text-green-600">{report.ats_score}/100</p>
          </div>
          <p className="text-sm text-zinc-500">
            {new Date(report.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          {typeof report.analysis === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: report.analysis.replace(/\n/g, '<br>') }} />
          ) : (
            <pre className="whitespace-pre-wrap">{JSON.stringify(report.analysis, null, 2)}</pre>
          )}
        </div>
      </div>
    </div>
  );
}