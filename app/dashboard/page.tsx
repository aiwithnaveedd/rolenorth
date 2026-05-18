import { createClientServer } from '@/lib/supabase/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Upload, FileText, TrendingUp } from 'lucide-react';

export default async function DashboardPage() {
  const supabase = await createClientServer();
  
  const { data: { user } } = await supabase.auth.getUser();
  const { data: reports } = await supabase
    .from('reports')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })
    .limit(5);

  const latestReport = reports && reports.length > 0 ? reports[0] : null;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome back, {user?.user_metadata?.full_name?.split(" ")[0] || 'there'}!
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-lg">
          Here's your career intelligence overview
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">Total Reports</p>
              <p className="text-4xl font-bold mt-2">{reports?.length || 0}</p>
            </div>
            <FileText className="w-10 h-10 text-zinc-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">Latest ATS Score</p>
              <p className="text-4xl font-bold mt-2 text-emerald-600">
                {latestReport?.ats_score || '—'}
              </p>
            </div>
            <TrendingUp className="w-10 h-10 text-emerald-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow flex items-center justify-center">
          <Link href="/upload">
            <Button size="lg" className="text-lg px-10 py-7">
              <Upload className="mr-3" />
              New Resume Analysis
            </Button>
          </Link>
        </div>
      </div>

      {/* Recent Reports */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Recent Reports</h2>
          <Link href="/reports" className="text-sm text-blue-600 hover:underline">
            View All Reports →
          </Link>
        </div>

        {reports && reports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report: any) => (
              <Link 
                key={report.id} 
                href={`/reports/${report.id}`}
                className="block bg-white dark:bg-zinc-900 rounded-3xl p-6 hover:shadow-xl transition-all border hover:border-black"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-lg">Resume Analysis</p>
                    <p className="text-sm text-zinc-500 mt-1">
                      {new Date(report.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-emerald-600">
                      {report.ats_score}
                    </span>
                    <span className="text-xs text-zinc-400">/100</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-12 text-center">
            <p className="text-xl text-zinc-500">No reports yet</p>
            <p className="text-zinc-400 mt-2">Upload your first resume to get started</p>
            <Link href="/upload">
              <Button className="mt-6">Upload Resume Now</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}