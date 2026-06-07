// components/reports/ReportHeader.tsx
import { CalendarDays, User } from "lucide-react";

type ReportHeaderProps = {
  report: any;
};

export default function ReportHeader({ report }: ReportHeaderProps) {
  return (
    <div className="mb-10">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-2xl border border-zinc-200 mb-4">
            <CalendarDays className="w-4 h-4 text-zinc-500" />
            <span className="text-sm text-zinc-600">
              {new Date(report.created_at).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
            Career Analysis Report
          </h1>
          <p className="text-zinc-600 mt-2 max-w-2xl">
            Comprehensive AI-powered insights into your professional profile and
            career trajectory.
          </p>
        </div>

        <div className="flex-shrink-0">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-lg">
            <User className="w-10 h-10" />
          </div>
        </div>
      </div>
    </div>
  );
}