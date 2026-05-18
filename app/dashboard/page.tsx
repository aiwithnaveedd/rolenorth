import { createClientServer } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Award } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClientServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: reports } = await supabase
    .from("reports")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })
    .limit(6);

  const latestReport = reports?.[0];

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-zinc-50 via-white to-blue-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-white">
            Welcome back,{" "}
            {user?.user_metadata?.full_name?.split(" ")[0] || "User"}!
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mt-4">
            Your AI Career Intelligence Hub
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/60 dark:border-zinc-700 rounded-3xl p-8">
            <div className="flex justify-between">
              <div>
                <p className="text-zinc-500">Total Reports</p>
                <p className="text-5xl font-bold mt-4">
                  {reports?.length || 0}
                </p>
              </div>
              <FileText className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/60 dark:border-zinc-700 rounded-3xl p-8">
            <div className="flex justify-between">
              <div>
                <p className="text-zinc-500">Latest ATS Score</p>
                <p className="text-5xl font-bold mt-4 text-emerald-600">
                  {latestReport?.ats_score || "—"}
                </p>
              </div>
              <Award className="w-12 h-12 text-emerald-600" />
            </div>
          </div>

          <Link href="/upload">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all text-white rounded-3xl p-8 h-full flex flex-col justify-center items-center text-center shadow-lg">
              <Upload className="w-12 h-12 mb-4" />
              <p className="text-2xl font-semibold">New Analysis</p>
              <p className="text-blue-100 mt-2">Upload resume → Get insights</p>
            </div>
          </Link>
        </div>

        {/* Recent Reports */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold">Recent Reports</h2>
            <Link
              href="/reports"
              className="text-blue-600 hover:underline font-medium"
            >
              View All Reports →
            </Link>
          </div>

          {reports && reports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map((report: any) => (
                <Link
                  key={report.id}
                  href={`/reports/${report.id}`}
                  className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/60 dark:border-zinc-700 rounded-3xl p-6 hover:border-blue-500 transition-all hover:shadow-xl"
                >
                  <div className="flex justify-between mb-6">
                    <div>
                      <p className="font-semibold">Resume Analysis</p>
                      <p className="text-sm text-zinc-500 mt-1">
                        {new Date(report.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-4xl font-bold text-emerald-600">
                        {report.ats_score}
                      </span>
                      <span className="text-sm text-zinc-400">/100</span>
                    </div>
                  </div>
                  <p className="text-sm text-blue-600">View Full Report →</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-3xl border">
              <p className="text-2xl">
                Ready to understand your career future?
              </p>
              <Link href="/upload">
                <Button
                  size="lg"
                  className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Start Your First Analysis
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}