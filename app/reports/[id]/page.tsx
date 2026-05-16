import { createClientServer } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ← This is the fix

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
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Career Analysis Report</h1>
        <a
          href={`/reports/${id}`}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to Reports
        </a>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border">
        <div className="flex justify-between mb-8">
          <div>
            <p className="text-sm text-zinc-500">ATS Score</p>
            <p className="text-6xl font-bold text-green-600">
              {report.ats_score}/100
            </p>
          </div>
          <p className="text-sm text-zinc-500">
            {new Date(report.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed">
          {typeof report.analysis === "string" ? (
            <div
              dangerouslySetInnerHTML={{
                __html: report.analysis.replace(/\n/g, "<br><br>"),
              }}
            />
          ) : (
            <pre>{JSON.stringify(report.analysis, null, 2)}</pre>
          )}
        </div>
      </div>
    </div>
  );
}