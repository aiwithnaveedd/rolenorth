"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Toaster, toast } from "sonner";
import { Users, FileText, TrendingUp, Plus, RefreshCw } from "lucide-react";

interface Profile {
  id: string;
  full_name: string | null;
  email?: string;
  current_location: string | null;
  created_at: string;
  updated_at: string;
}

interface Report {
  id: string;
  user_id: string;
  ats_score: number | null;
  created_at: string;
  analysis?: any;
}

const CardSkeleton = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border">
    <div className="flex items-center gap-4">
      <div className="w-8 h-8 bg-zinc-200 rounded-lg animate-pulse" />
      <div className="space-y-2 flex-1">
        <div className="h-4 bg-zinc-200 rounded w-24 animate-pulse" />
        <div className="h-9 bg-zinc-200 rounded w-20 animate-pulse" />
      </div>
    </div>
  </div>
);
export default function AdminDashboard() {
  const supabase = createClient();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingFor, setGeneratingFor] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(isRefresh = false) {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const [profilesRes, reportsRes] = await Promise.all([
        supabase
          .from("profiles")
          .select("*")
          .order("updated_at", { ascending: false }),
        supabase
          .from("reports")
          .select("*")
          .order("created_at", { ascending: false }),
      ]);

      if (profilesRes.error) {
        console.error("Profiles fetch error:", profilesRes.error);
        toast.error("Error loading profiles");
      }

      if (reportsRes.error) {
        console.error("Reports fetch error:", reportsRes.error);
        toast.error("Error loading reports");
      }

      setProfiles(profilesRes.data || []);
      setReports(reportsRes.data || []);

      console.log("✅ Profiles loaded:", profilesRes.data?.length || 0);
      console.log("✅ Reports loaded:", reportsRes.data?.length || 0);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load admin data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  async function generateReportForUser(userId: string) {
    if (!userId) return toast.error("Select a user");

    setGeneratingFor(userId);
    try {
      const res = await fetch("/api/admin/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Report generated successfully!");
        await fetchData(); // Refresh data after generation
      } else {
        toast.error(data.error || "Failed to generate report");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setGeneratingFor(null);
    }
  }

  const totalUsers = profiles.length;
  const totalReports = reports.length;
  const avgATS = reports.length
    ? Math.round(
        reports.reduce((sum, r) => sum + (r.ats_score || 0), 0) /
          reports.length,
      )
    : 0;

  // Loading Skeleton Component

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-8">
      <Toaster position="top-center" richColors />

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <TrendingUp className="w-10 h-10 text-black" /> Admin Panel
          </h1>
          <button
            onClick={() => fetchData(true)}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl hover:bg-zinc-100 disabled:opacity-70 transition"
          >
            <RefreshCw
              className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
            />
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {loading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            <>
              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <div className="flex items-center gap-4">
                  <Users className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-zinc-500">Total Users</p>
                    <p className="text-4xl font-semibold">{totalUsers}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <div className="flex items-center gap-4">
                  <FileText className="w-8 h-8 text-emerald-600" />
                  <div>
                    <p className="text-sm text-zinc-500">Total Reports</p>
                    <p className="text-4xl font-semibold">{totalReports}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <div className="flex items-center gap-4">
                  <TrendingUp className="w-8 h-8 text-amber-600" />
                  <div>
                    <p className="text-sm text-zinc-500">Avg ATS Score</p>
                    <p className="text-4xl font-semibold">{avgATS}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-10">
          <h2 className="text-2xl font-semibold mb-6">All Users</h2>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-14 bg-zinc-100 rounded-xl animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <table className="w-full min-w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Joined</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {profiles.map((profile) => (
                    <tr key={profile.id} className="border-b hover:bg-zinc-50">
                      <td className="py-4 px-4">{profile.full_name || "—"}</td>
                      <td className="py-4 px-4 text-zinc-600">
                        {profile.current_location || "—"}
                      </td>
                      <td className="py-4 px-4 text-sm text-zinc-500">
                        {new Date(profile.updated_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => generateReportForUser(profile.id)}
                          disabled={generatingFor === profile.id}
                          className="flex items-center gap-2 px-5 py-2 bg-zinc-300 text-white rounded-xl hover:bg-zinc-400 disabled:opacity-70 text-sm transition"
                        >
                          {generatingFor === profile.id ? (
                            "Generating..."
                          ) : (
                            <>
                              <Plus className="w-4 h-4" /> Generate Report
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {profiles.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-12 text-center text-zinc-500"
                      >
                        No users yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-2xl font-semibold mb-6">Recent Reports</h2>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-14 bg-zinc-100 rounded-xl animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left">User ID</th>
                    <th className="py-3 px-4 text-left">ATS Score</th>
                    <th className="py-3 px-4 text-left">Generated</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.slice(0, 10).map((report) => (
                    <tr key={report.id} className="border-b">
                      <td className="py-4 px-4 font-mono text-sm">
                        {report.user_id}
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-semibold">
                          {report.ats_score ?? "—"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-zinc-500">
                        {new Date(report.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {reports.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="py-12 text-center text-zinc-500"
                      >
                        No reports yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}