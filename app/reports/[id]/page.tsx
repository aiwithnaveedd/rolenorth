// app/reports/[id]/page.tsx
import { createClientServer } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

import { ReportHeader } from "@/components/reports/ReportHeader";
import { ScoreCards } from "@/components/reports/ScoreCards";
import { InsightsGrid } from "@/components/reports/InsightsGrid";
import { SkillsSection } from "@/components/reports/SkillsSection";
import { ActionPlan } from "@/components/reports/ActionPlan";
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
  if (user?.email === "naveedahmedgopang76@gmail.com") {
    console.log("Admin Access Granted");
  }
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

  // Add near the top after fetching report

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-blue-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 ">
      <div id="report-content" className="max-w-6xl mx-auto px-6 py-12">
        <ReportHeader report={report} />

        <div className="flex justify-end mb-10">
          <DownloadPDFButton report={report} />
        </div>

        <ScoreCards analysis={analysis} />
        <InsightsGrid analysis={analysis} />
        <SkillsSection analysis={analysis} />
        <ActionPlan analysis={analysis} />
      </div>
    </div>
  );
}