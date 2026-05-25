// app/reports/compare/page.tsx
import { createClientServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp } from "lucide-react";

export default async function CompareReportsPage() {
  const supabase = await createClientServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/");

  const { data: reports } = await supabase
    .from("reports")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(6);

  if (!reports || reports.length < 2) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-blue-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950  text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-10">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <h1 className="text-4xl font-bold tracking-tight">Compare Reports</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {reports.slice(0, 2).map((report: any, index: number) => {
            const analysis = typeof report.analysis === "string" 
              ? JSON.parse(report.analysis) 
              : report.analysis;

            return (
              <div key={report.id} className="bg-zinc-300/70 border border-white/10 rounded-3xl p-8">
                <div className="flex justify-between mb-6">
                  <div>
                    <p className="text-sm text-zinc-500">Report #{index + 1}</p>
                    <p className="text-lg font-medium">
                      {new Date(report.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-bold text-emerald-400">
                      {analysis?.overall_score || "—"}
                    </div>
                    <p className="text-xs text-zinc-500">Score</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Key Strengths</h4>
                    <ul className="text-sm text-zinc-300 space-y-1">
                      {(analysis?.strengths || []).slice(0, 3).map((s: string, i: number) => (
                        <li key={i}>• {s}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Areas to Improve</h4>
                    <ul className="text-sm text-zinc-250 space-y-1">
                      {(analysis?.weaknesses || []).slice(0, 3).map((w: string, i: number) => (
                        <li key={i}>• {w}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button asChild className="w-full mt-8" variant="outline">
                  <Link href={`/reports/${report.id}`}>View Full Report</Link>
                </Button>
              </div>
            );
          })}
        </div>

        <p className="text-center text-zinc-300 mt-12 text-sm">
          More comparison features (charts, skill trends) coming soon.
        </p>
      </div>
    </div>
  );
}