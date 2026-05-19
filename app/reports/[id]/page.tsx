// app/reports/[id]/page.tsx
import { createClientServer } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { DownloadPDFButton } from "@/components/reports/ReportPDF";
import {
  Award,
  TrendingUp,
  AlertTriangle,
  Target,
  Lightbulb,
  Clock,
} from "lucide-react";

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

  if (!report || !report.analysis) notFound();

  const analysis =
    typeof report.analysis === "string"
      ? JSON.parse(report.analysis)
      : report.analysis;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black pb-20 text-white">
      <div className="max-w-6xl mx-auto px-6 pt-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl">
              <Award className="w-9 h-9" />
            </div>
            <div>
              <h1 className="text-5xl font-bold tracking-tighter">
                Career Intelligence Report
              </h1>
              <p className="text-zinc-400 mt-1 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Generated on{" "}
                {new Date(report.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <DownloadPDFButton report={report} />
        </div>

        {/* Hero Score */}
        <div className="mb-16 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(at_center,#4f46e510_0%,transparent_70%)]" />

          <p className="uppercase tracking-[4px] text-sm text-zinc-500 mb-3">
            OVERALL CAREER HEALTH
          </p>
          <div className="text-[128px] font-bold leading-none text-white mb-2 tracking-tighter">
            {analysis.overall_score || analysis.ats?.score || "87"}
          </div>
          <p className="text-3xl font-medium text-emerald-400">
            Strong Market Position
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-10">
            {/* Professional Summary */}
            <div className="bg-zinc-900/70 border border-white/10 rounded-3xl p-10">
              <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3">
                <Lightbulb className="text-amber-400" /> Professional Summary
              </h2>
              <p className="text-lg leading-relaxed text-zinc-300">
                {analysis.summary ||
                  analysis.professional_summary ||
                  "No summary available."}
              </p>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-3xl p-9">
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-emerald-400">
                  <TrendingUp className="w-6 h-6" /> Key Strengths
                </h3>
                <ul className="space-y-4">
                  {(
                    analysis.strengths ||
                    analysis.market_position?.strengths ||
                    []
                  ).map((item: string, i: number) => (
                    <li key={i} className="flex gap-3 text-zinc-300">
                      <span className="text-emerald-500 mt-1.5">●</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-950/40 border border-rose-500/30 rounded-3xl p-9">
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-rose-400">
                  <AlertTriangle className="w-6 h-6" /> Areas to Improve
                </h3>
                <ul className="space-y-4">
                  {(
                    analysis.weaknesses ||
                    analysis.market_position?.weaknesses ||
                    []
                  ).map((item: string, i: number) => (
                    <li key={i} className="flex gap-3 text-zinc-300">
                      <span className="text-rose-500 mt-1.5">●</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* ATS Score Card */}
            <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8">
              <h3 className="uppercase tracking-widest text-xs text-zinc-500 mb-6">
                ATS COMPATIBILITY
              </h3>
              <div className="flex items-baseline gap-3">
                <span className="text-7xl font-bold text-emerald-400">
                  {analysis.ats?.score || "92"}
                </span>
                <span className="text-4xl text-zinc-500">/100</span>
              </div>
            </div>

            {/* Automation Risk */}
            <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8">
              <h3 className="text-xl font-semibold mb-4">Automation Risk</h3>
              <p className="text-4xl font-bold text-orange-400 mb-4 capitalize">
                {analysis.risk_analysis?.automation_risk || "Medium"}
              </p>
              <p className="text-zinc-400 leading-relaxed">
                {analysis.risk_analysis?.details}
              </p>
            </div>
          </div>
        </div>

        {/* Action Plan */}
        <div className="mt-16 bg-zinc-900/70 border border-white/10 rounded-3xl p-10">
          <h2 className="text-3xl font-semibold mb-10 flex items-center gap-3">
            <Target className="text-violet-400" /> Your 90-Day Action Plan
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {["30_days", "60_days", "90_days"].map((period) => (
              <div key={period} className="bg-black/40 rounded-2xl p-8">
                <h4 className="font-semibold text-xl mb-6 capitalize border-b border-white/10 pb-4">
                  {period.replace("_", " ")}
                </h4>
                <ul className="space-y-5 text-zinc-300">
                  {analysis.action_plan?.[period]?.map(
                    (item: string, i: number) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-violet-500 font-mono">→</span>
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
