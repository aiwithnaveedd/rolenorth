// components/reports/InsightsGrid.tsx
import { TrendingUp, AlertTriangle } from "lucide-react";

interface InsightsGridProps {
  analysis: any;
}

export function InsightsGrid({ analysis }: InsightsGridProps) {
  const strengths =
    analysis.strengths || analysis.market_position?.strengths || [];
  const weaknesses =
    analysis.weaknesses ||
    analysis.market_position?.weaknesses ||
    analysis.areas_to_improve ||
    [];

  return (
    <div className="grid md:grid-cols-2 gap-8 mb-12">
      {/* Strengths */}
      <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-3xl p-9">
        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-emerald-400">
          <TrendingUp className="w-6 h-6" /> Key Strengths
        </h3>
        {strengths.length > 0 ? (
          <ul className="space-y-4">
            {strengths.map((item: string, i: number) => (
              <li key={i} className="flex gap-3 text-zinc-300">
                <span className="text-emerald-500 mt-1.5">●</span>
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-zinc-400">No strengths data available.</p>
        )}
      </div>

      {/* Weaknesses */}
      <div className="bg-rose-950/40 border border-rose-500/30 rounded-3xl p-9">
        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-rose-400">
          <AlertTriangle className="w-6 h-6" /> Areas to Improve
        </h3>
        {weaknesses.length > 0 ? (
          <ul className="space-y-4">
            {weaknesses.map((item: string, i: number) => (
              <li key={i} className="flex gap-3 text-zinc-300">
                <span className="text-rose-500 mt-1.5">●</span>
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-zinc-400">No improvement areas identified.</p>
        )}
      </div>
    </div>
  );
}