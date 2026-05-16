import { createClientServer } from "@/lib/supabase/server";
import Link from "next/link";

export default async function ReportsPage() {
  const supabase = await createClientServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <p>Please log in</p>;

  const { data: reports } = await supabase
    .from("reports")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">My Reports</h1>

      {reports && reports.length > 0 ? (
        <div className="grid gap-4">
          {reports.map((report: any) => (
            <Link
              key={report.id}
              href={`/reports/${report.id}`}
              className="block p-6 bg-white dark:bg-zinc-900 rounded-2xl border hover:border-black transition-all"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">Resume Analysis</p>
                  <p className="text-sm text-zinc-500">
                    {new Date(report.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-green-600">
                    {report.ats_score}
                  </span>
                  <span className="text-xs text-zinc-500">/100</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No reports yet. Upload your first resume!</p>
      )}
    </div>
  );
}
