import { createClientServer } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
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

  if (!report) notFound();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Career Analysis Report</h1>
          <p className="text-zinc-500 mt-1">
            Generated on{" "}
            {new Date(report.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <DownloadPDFButton report={report} />
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-lg p-10 leading-relaxed">
        <div className="flex justify-between items-start mb-10 border-b pb-8">
          <div>
            <p className="text-sm uppercase tracking-widest text-zinc-500">
              ATS SCORE
            </p>
            <p className="text-7xl font-bold text-emerald-600 mt-2">
              {report.ats_score}
              <span className="text-3xl text-emerald-600/70">/100</span>
            </p>
          </div>
        </div>

        <div
          className="prose dark:prose-invert max-w-none text-[17px] leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: report.analysis.replace(/\n/g, "<br><br>"),
          }}
        />
      </div>
    </div>
  );
}
