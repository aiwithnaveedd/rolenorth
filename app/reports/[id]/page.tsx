// app/reports/[id]/page.tsx
import remarkGfm from "remark-gfm";
import { createClientServer } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Sparkles, CalendarDays, TrendingUp, FileText } from "lucide-react";
import { DownloadPDFButton } from "@/components/reports/ReportPDF";
import ReactMarkdown from "react-markdown";

export default async function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClientServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) notFound();

  const { data: report } = await supabase
    .from("reports")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!report) notFound();

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-zinc-50 via-white to-blue-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1 text-sm font-medium text-blue-700 dark:text-blue-400">
              <Sparkles className="mr-2 h-4 w-4" />
              AI Career Analysis
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Career Report
            </h1>

            <div className="mt-4 flex items-center text-zinc-600 dark:text-zinc-400">
              <CalendarDays className="mr-2 h-5 w-5" />
              Generated on{" "}
              {new Date(report.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          <DownloadPDFButton report={report} />
        </div>

        {/* ATS Score Card */}
        <div className="mb-8 overflow-hidden rounded-3xl border border-white/20 bg-white/70 shadow-2xl backdrop-blur-xl dark:bg-zinc-900/70">
          <div className="grid gap-6 p-8 lg:grid-cols-3">
            {/* Score */}
            <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 p-8 text-white shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-2xl bg-white/20 p-3">
                  <TrendingUp className="h-6 w-6" />
                </div>

                <span className="text-sm uppercase tracking-widest text-white/80">
                  ATS Score
                </span>
              </div>

              <div className="mt-6">
                <span className="text-7xl font-extrabold">
                  {report.ats_score}
                </span>

                <span className="ml-1 text-2xl text-white/80">/100</span>
              </div>

              <p className="mt-4 text-sm text-white/80">
                AI-evaluated resume compatibility score.
              </p>
            </div>

            {/* Stats */}
            <div className="lg:col-span-2 grid gap-5 md:grid-cols-2">
              <div className="rounded-3xl border border-zinc-200 bg-zinc-50/70 p-6 dark:border-zinc-800 dark:bg-zinc-800/40">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/30">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  AI Analysis
                </h3>

                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Detailed insights about your resume structure, strengths,
                  weaknesses, and optimization opportunities.
                </p>
              </div>

              <div className="rounded-3xl border border-zinc-200 bg-zinc-50/70 p-6 dark:border-zinc-800 dark:bg-zinc-800/40">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 dark:bg-purple-900/30">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Career Insights
                </h3>

                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Discover career pivot opportunities, skill gaps, and future
                  growth recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Content */}
        <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/70 shadow-2xl backdrop-blur-xl dark:bg-zinc-900/70">
          <div className="border-b border-zinc-200/60 px-8 py-6 dark:border-zinc-800">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Full Career Analysis
            </h2>

            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              AI-generated report based on your uploaded resume and career
              profile.
            </p>
          </div>

          <div className="p-8 lg:p-10">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold mt-10 mb-5 text-white border-b border-zinc-700 pb-3">
                    {children}
                  </h1>
                ),

                h2: ({ children }) => (
                  <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-400">
                    {children}
                  </h2>
                ),

                p: ({ children }) => (
                  <p className="text-zinc-300 leading-8 mb-5">{children}</p>
                ),

                ul: ({ children }) => (
                  <ul className="space-y-3 mb-6">{children}</ul>
                ),

                li: ({ children }) => (
                  <li className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
                    {children}
                  </li>
                ),

                strong: ({ children }) => (
                  <strong className="text-white font-semibold">
                    {children}
                  </strong>
                ),
              }}
            >
              {report.analysis}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </main>
  );
}
