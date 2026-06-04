// app/reports/[id]/page.tsx
import { createClientServer } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";


import { ReportHeader } from "@/components/reports/ReportHeader";
import { ResumeScoreCard } from "@/components/reports/ScoreCards";
import { InsightsGrid } from "@/components/reports/InsightsGrid";
import { SkillsSection } from "@/components/reports/SkillsSection";
import { ActionPlan } from "@/components/reports/ActionPlan";
import { DownloadPDFButton } from "@/components/reports/ReportPDF";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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

  let analysis: any = {};
  const rawAnalysis = report.analysis;

  try {
    if (typeof rawAnalysis === "string") {
      const cleaned = rawAnalysis.trim().replace(/^```json\n?|\n?```$/g, "");
      if (cleaned.startsWith("{") || cleaned.startsWith("[")) {
        analysis = JSON.parse(cleaned);
      } else {
        analysis = { content: rawAnalysis };
      }
    } else {
      analysis = rawAnalysis || {};
    }
  } catch (e) {
    console.warn("Analysis parsing failed, treating as markdown");
    analysis = { content: rawAnalysis || "No content available" };
  }
  // Add near the top after fetching report

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-blue-50">
      <div
        id="report-content"
        className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12"
      >
        {/* Back Button + Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" asChild className="hover:bg-zinc-100">
            <Link href="/reports" className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Back to Reports
            </Link>
          </Button>

          <DownloadPDFButton report={report} />
        </div>

        <ReportHeader report={report} />

        <div className="space-y-10 mt-10">
          <ResumeScoreCard
            score={analysis.overall_score || analysis.ats?.score || 87}
            analysisDate={report.created_at}
          />
          <InsightsGrid analysis={analysis} />
          <SkillsSection analysis={analysis} />
          <ActionPlan analysis={analysis} />
        </div>
      </div>
    </div>
  );
}