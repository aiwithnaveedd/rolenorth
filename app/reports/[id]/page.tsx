import { createClientServer } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { DownloadPDFButton } from "@/components/reports/ReportPDF";

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
    <div className="max-w-4xl mx-auto py-8 px-6">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Career Analysis Report
          </h1>
          <p className="text-zinc-500 mt-1">
            {new Date(report.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <DownloadPDFButton report={report} />
      </div>

      {/* ATS Score */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 mb-8 shadow">
        <div className="text-center">
          <p className="text-sm uppercase tracking-widest text-zinc-500 mb-2">
            ATS SCORE
          </p>
          <p className="text-7xl font-bold text-emerald-600">
            {analysis.ats?.score || report.ats_score}
            <span className="text-3xl text-emerald-600/60">/100</span>
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 mb-8 shadow">
        <h2 className="text-2xl font-semibold mb-4">Professional Summary</h2>
        <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          {analysis.summary}
        </p>
      </div>

      {/* Market Position */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow">
          <h2 className="text-2xl font-semibold mb-6">Market Position</h2>
          <div className="space-y-6">
            <div>
              <p className="text-emerald-600 font-semibold text-xl mb-3">
                Score: {analysis.market_position?.score}/100
              </p>
            </div>
            <div>
              <p className="font-medium mb-2">Strengths</p>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
                {analysis.market_position?.strengths?.map(
                  (s: string, i: number) => (
                    <li key={i}>{s}</li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2">Weaknesses</p>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
                {analysis.market_position?.weaknesses?.map(
                  (w: string, i: number) => (
                    <li key={i}>{w}</li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow">
          <h2 className="text-2xl font-semibold mb-6">Skills Analysis</h2>
          <div className="space-y-6">
            <div>
              <p className="font-semibold text-green-600 mb-2">Strong</p>
              <p className="text-zinc-600">
                {analysis.skills?.strong?.join(", ") || "None"}
              </p>
            </div>
            <div>
              <p className="font-semibold text-amber-600 mb-2">Moderate</p>
              <p className="text-zinc-600">
                {analysis.skills?.moderate?.join(", ") || "None"}
              </p>
            </div>
            <div>
              <p className="font-semibold text-red-600 mb-2">
                Missing / Critical
              </p>
              <p className="text-zinc-600">
                {analysis.skills?.missing?.join(", ") || "None"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Risk & Pivots */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow">
          <h2 className="text-2xl font-semibold mb-4">Automation Risk</h2>
          <p className="text-2xl font-bold mb-3 capitalize">
            {analysis.risk_analysis?.automation_risk}
          </p>
          <p className="text-zinc-600 leading-relaxed">
            {analysis.risk_analysis?.details}
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow">
          <h2 className="text-2xl font-semibold mb-4">
            Career Pivot Opportunities
          </h2>
          <div className="space-y-4">
            {analysis.career_pivots?.map((pivot: any, i: number) => (
              <div key={i} className="border-l-4 border-black pl-4">
                <p className="font-semibold">{pivot.role}</p>
                <p className="text-sm text-zinc-600">{pivot.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Plan */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow">
        <h2 className="text-2xl font-semibold mb-6">Action Plan</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {["30_days", "60_days", "90_days"].map((period) => (
            <div key={period}>
              <h3 className="font-semibold mb-3 capitalize">
                {period.replace("_", " ")}
              </h3>
              <ul className="space-y-2 text-sm">
                {analysis.action_plan?.[period]?.map(
                  (item: string, i: number) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-emerald-600">•</span> {item}
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
