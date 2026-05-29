// app/reports/page.tsx

import { createClientServer } from "@/lib/supabase/server";
import Link from "next/link";
import { FileText, ArrowRight, Sparkles, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function ReportsPage() {
  const supabase = await createClientServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-zinc-500">Please log in</p>
      </div>
    );
  }

  const { data: reports } = await supabase
    .from("reports")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-zinc-50 via-white to-blue-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-14">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1 text-sm font-medium text-blue-700 dark:text-blue-400">
              <Sparkles className="mr-2 h-4 w-4" />
              AI Career Intelligence
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              My Reports
            </h1>

            <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
              View all your resume analysis reports and career insights.
            </p>
          </div>

          {/* { /* Compare Button   */}
          <Link className="flex justify-end" href="/reports/compare">
            <Button className=" bg-zinc-300 mt-2 hover:bg-zinc-400 text-white">
              Compare Reports
            </Button>
          </Link>
        </div>

        {/* Reports Grid */}
        {reports && reports.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {reports.map((report: any) => (
              <Link
                key={report.id}
                href={`/reports/${report.id}`}
                className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/70 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-zinc-300/70"
              >
                {/* Glow */}
                <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition-all duration-300 group-hover:bg-blue-500/20" />

                <div className="relative z-10">
                  {/* Top */}
                  <div className="mb-6 flex items-start justify-between">
                    <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-4 text-white shadow-lg">
                      <FileText className="h-6 w-6" />
                    </div>

                    <div className="text-right">
                      <p className="text-xs uppercase tracking-widest text-zinc-500">
                        ATS Score
                      </p>

                      <div className="mt-1">
                        <span className="text-4xl font-bold text-emerald-600">
                          {report.ats_score}
                        </span>

                        <span className="text-sm text-zinc-500">/100</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                      Resume Analysis
                    </h2>

                    <div className="mt-3 flex items-center text-sm text-zinc-500">
                      <CalendarDays className="mr-2 h-4 w-4" />

                      {new Date(report.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-8 flex items-center justify-between border-t border-zinc-200/60 pt-5 dark:border-zinc-800">
                    <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                      View Full Analysis
                    </span>

                    <div className="rounded-full bg-zinc-100 p-2 transition-all group-hover:bg-blue-600 group-hover:text-white dark:bg-zinc-800">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-16 text-center shadow-lg backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-300/70">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg">
              <FileText className="h-10 w-10" />
            </div>

            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
              No Reports Yet
            </h2>

            <p className="mx-auto mt-4 max-w-md text-zinc-600 dark:text-zinc-400">
              Upload your first resume and receive AI-powered career insights,
              ATS analysis, and future-proof recommendations.
            </p>

            <Link
              href="/upload"
              className="mt-8 inline-flex items-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
            >
              Upload Resume
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}


{/* Actions - Block 2 */}
//   <Link
//     href={`/reports/${report.id}`}
//     className="flex-1 bg-zinc-900 hover:bg-black text-white text-center py-3.5 rounded-2xl text-sm font-medium transition"
//   >
//     View Full Report
//   </Link>

//   <Link
//     href="/reports/compare"
//     className="flex-1 border border-zinc-300 hover:bg-zinc-100 text-zinc-700 text-center py-3.5 rounded-2xl text-sm font-medium transition"
//   >
//     Compare
//   </Link>
// </div>
// <div className="flex gap-3 mt-8">