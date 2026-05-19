// components/reports/InsightsGrid.tsx
import { TrendingUp, AlertTriangle } from "lucide-react";

interface InsightsGridProps {
  analysis: any;
}

export function InsightsGrid({ analysis }: InsightsGridProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-12">
      {/* Strengths */}
      <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-3xl p-9">
        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-emerald-400">
          <TrendingUp className="w-6 h-6" /> Key Strengths
        </h3>
        <ul className="space-y-4">
          {(
            analysis.strengths ||
            analysis.market_position?.strengths ||
            analysis.key_strengths ||
            []
          ).map((item: string, i: number) => (
            <li key={i} className="flex gap-3 text-zinc-300">
              <span className="text-emerald-500 mt-1.5">●</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Weaknesses / Areas to Improve */}
      <div className="bg-rose-950/40 border border-rose-500/30 rounded-3xl p-9">
        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-rose-400">
          <AlertTriangle className="w-6 h-6" /> Areas to Improve
        </h3>
        <ul className="space-y-4">
          {(
            analysis.weaknesses ||
            analysis.market_position?.weaknesses ||
            analysis.areas_to_improve ||
            []
          ).map((item: string, i: number) => (
            <li key={i} className="flex gap-3 text-zinc-300">
              <span className="text-rose-500 mt-1.5">●</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
