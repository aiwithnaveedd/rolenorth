// app/reports/compare/CompareClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from "lucide-react";

type Report = {
  id: string;
  created_at: string;
  analysis: any;
};

type Props = {
  initialReports: Report[];
};

export default function CompareClient({ initialReports }: Props) {
  const [reports] = useState<Report[]>(initialReports || []);
  const [report1Id, setReport1Id] = useState<string>(
    reports.length >= 1 ? reports[0].id : "",
  );
  const [report2Id, setReport2Id] = useState<string>(
    reports.length >= 2 ? reports[1].id : "",
  );

  if (reports.length < 2) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900">
            Not enough reports
          </h2>
          <p className="text-zinc-600 mb-6">
            You need at least 2 reports to compare.
          </p>
          <Button asChild>
            <Link href="/upload">Create New Analysis</Link>
          </Button>
        </div>
      </div>
    );
  }

  const report1 = reports.find((r) => r.id === report1Id);
  const report2 = reports.find((r) => r.id === report2Id);

  const analysis1 = report1
    ? typeof report1.analysis === "string"
      ? JSON.parse(report1.analysis)
      : report1.analysis
    : null;

  const analysis2 = report2
    ? typeof report2.analysis === "string"
      ? JSON.parse(report2.analysis)
      : report2.analysis
    : null;

  const getTrend = (val1: number, val2: number) => {
    if (val1 > val2) return { icon: TrendingUp, color: "text-emerald-600" };
    if (val1 < val2) return { icon: TrendingDown, color: "text-red-600" };
    return { icon: Minus, color: "text-zinc-400" };
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-10">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
            Compare Reports
          </h1>
        </div>

        {/* Dropdown Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Report 1 (Newer)
            </label>
            <select
              value={report1Id}
              onChange={(e) => setReport1Id(e.target.value)}
              className="w-full p-3 border border-zinc-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {reports.map((report) => (
                <option key={report.id} value={report.id}>
                  {new Date(report.created_at).toLocaleDateString()} — Report
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Report 2 (Older)
            </label>
            <select
              value={report2Id}
              onChange={(e) => setReport2Id(e.target.value)}
              className="w-full p-3 border border-zinc-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {reports.map((report) => (
                <option key={report.id} value={report.id}>
                  {new Date(report.created_at).toLocaleDateString()} — Report
                </option>
              ))}
            </select>
          </div>
        </div>

        {analysis1 && analysis2 && (
          <>
            {/* Side-by-Side Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-white border border-zinc-200 rounded-3xl p-8">
                <h3 className="text-lg font-semibold mb-6 text-zinc-900">
                  {new Date(report1!.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </h3>
                <div className="space-y-8">
                  <div>
                    <p className="text-sm text-zinc-500">Overall Score</p>
                    <p className="text-5xl font-bold text-zinc-900">
                      {analysis1.overall_score || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">ATS Score</p>
                    <p className="text-5xl font-bold text-zinc-900">
                      {analysis1.ats_score || "—"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-zinc-200 rounded-3xl p-8">
                <h3 className="text-lg font-semibold mb-6 text-zinc-900">
                  {new Date(report2!.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </h3>
                <div className="space-y-8">
                  <div>
                    <p className="text-sm text-zinc-500">Overall Score</p>
                    <p className="text-5xl font-bold text-zinc-900">
                      {analysis2.overall_score || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">ATS Score</p>
                    <p className="text-5xl font-bold text-zinc-900">
                      {analysis2.ats_score || "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-8">
              <h3 className="text-xl font-semibold mb-6 text-zinc-900">
                Key Metrics Comparison
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-200">
                      <th className="text-left py-4 pr-8 text-zinc-600">
                        Metric
                      </th>
                      <th className="text-center py-4 text-zinc-600">
                        Report 1
                      </th>
                      <th className="text-center py-4 text-zinc-600">
                        Report 2
                      </th>
                      <th className="text-center py-4 text-zinc-600">Change</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {["overall_score", "ats_score"].map((key) => {
                      const val1 = Number(analysis1[key] || 0);
                      const val2 = Number(analysis2[key] || 0);
                      const trend = getTrend(val1, val2);
                      const TrendIcon = trend.icon;

                      return (
                        <tr key={key}>
                          <td className="py-5 font-medium capitalize text-zinc-900">
                            {key.replace("_", " ")}
                          </td>
                          <td className="text-center font-semibold text-zinc-900">
                            {val1}
                          </td>
                          <td className="text-center font-semibold text-zinc-900">
                            {val2}
                          </td>
                          <td className="text-center">
                            <span
                              className={`inline-flex items-center gap-1 ${trend.color}`}
                            >
                              <TrendIcon className="w-5 h-5" />
                              <span>{(val1 - val2).toFixed(1)}</span>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}