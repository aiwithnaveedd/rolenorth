// components/reports/ReportHeader.tsx
import { Award, Clock } from "lucide-react";

interface ReportHeaderProps {
  report: any;
}

export function ReportHeader({ report }: ReportHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl">
          <Award className="w-9 h-9 text-white" />
        </div>
        <div>
          <h1 className="text-5xl font-bold tracking-tighter">
            Career Intelligence Report
          </h1>
          <p className="text-zinc-400 mt-1 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Generated on{" "}
            {new Date(report.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
