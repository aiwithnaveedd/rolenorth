// app/dashboard/page.tsx
import { createClientServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Calendar,
  TrendingUp,
  Award,
  Plus,
  ArrowRight,
  Crown,
} from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClientServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/");

  const { data: reports } = await supabase
    .from("reports")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // Get user subscription status
  const { data: profile } = await supabase
    .from("users")
    .select("subscription_status, subscription_tier")
    .eq("id", user.id)
    .single();

  const isSubscribed =
    profile?.subscription_status === "active" ||
    profile?.subscription_status === "one_time";

  return (
    <div className="min-h-screen ">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-zinc-400 mt-2">
              Welcome back, {user.email?.split("@")[0]}
            </p>
          </div>

          <Button
            asChild
            size="lg"
            className="rounded-2xl bg-violet-600 hover:bg-violet-700"
          >
            <Link href="/upload" className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              New Career Analysis
            </Link>
          </Button>
        </div>

        {/* Subscription Status Bar */}
        <div className="mb-10 bg-zinc-500/70 border border-white/10 rounded-3xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Crown className="w-9 h-9 text-amber-400" />
            <div>
              <p className="font-semibold text-lg">
                {isSubscribed ? "✅ Premium Active" : "Free Plan"}
              </p>
              <p className="text-sm text-zinc-400">
                {profile?.subscription_tier || "Limited to 1 report"}
              </p>
            </div>
          </div>
          {!isSubscribed && (
            <Button asChild variant="outline">
              <Link href="/pricing">Upgrade Now</Link>
            </Button>
          )}
        </div>

        {/* Subscription Status */}
        {/* <div className="mb-12 bg-zinc-900/70 border border-white/10 rounded-3xl p-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Crown className="w-10 h-10 text-amber-400" />
            <div>
              <p className="text-lg font-semibold">
                {isSubscribed ? "Premium Active" : "Free Plan"}
              </p>
              <p className="text-zinc-400">
                {profile?.subscription_tier || "Limited Access"}
              </p>
            </div>
          </div>
          {!isSubscribed && (
            <Button asChild variant="outline">
              <Link href="/pricing">Upgrade Plan</Link>
            </Button>
          )}
        </div> */}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-zinc-300 border border-white/10 rounded-3xl p-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-2xl">
                <Award className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <p className="text-4xl font-bold">{reports?.length || 0}</p>
                <p className="text-zinc-400">Total Reports</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-300 border border-white/10 rounded-3xl p-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-2xl">
                <TrendingUp className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <p className="text-4xl font-bold">87</p>
                <p className="text-zinc-400">Avg. Career Score</p>
              </div>
            </div>
          </div>

          <div className=" border bg-zinc-300 border-white/10 rounded-3xl p-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-500/10 rounded-2xl">
                <Calendar className="w-8 h-8 text-amber-400" />
              </div>
              <div>
                <p className="text-4xl font-bold">3</p>
                <p className="text-zinc-400">This Month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold">Recent Reports</h2>
            {reports && reports.length > 0 && (
              <Link
                href="/reports"
                className="text-violet-400 hover:text-violet-300 flex items-center gap-2 text-sm"
              >
                View All Reports →
              </Link>
            )}
          </div>

          {reports && reports.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.slice(0, 6).map((report: any) => {
                const analysis =
                  typeof report.analysis === "string"
                    ? JSON.parse(report.analysis)
                    : report.analysis;

                return (
                  <Link
                    key={report.id}
                    href={`/reports/${report.id}`}
                    className="group  border border-white/10 hover:border-violet-500/50 rounded-3xl p-8 transition-all hover:scale-[1.02]"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs text-zinc-500">
                          {new Date(report.created_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </p>
                        <h3 className="font-semibold text-xl mt-3 group-hover:text-violet-400 transition-colors">
                          Career Intelligence Report
                        </h3>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-emerald-400">
                          {analysis?.overall_score ||
                            analysis?.ats_score ||
                            "—"}
                        </div>
                        <p className="text-xs text-zinc-500">Score</p>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-sm">
                      <span className="text-zinc-400">View Full Report</span>
                      <ArrowRight className="w-4 h-4 text-violet-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="bg-zinc-300/50 border border-white/10 rounded-3xl p-20 text-center">
              <FileText className="w-20 h-20 mx-auto text-zinc-600 mb-6" />
              <h3 className="text-3xl font-semibold mb-3">No Reports Yet</h3>
              <p className="text-zinc-400 max-w-md mx-auto mb-8">
                Upload your resume to get your first AI-powered career
                intelligence report.
              </p>
              <Button asChild size="lg" className="rounded-2xl">
                <Link href="/upload">Start Your First Analysis</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
