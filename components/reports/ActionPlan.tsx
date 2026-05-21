// components/reports/ActionPlan.tsx
import { Target } from "lucide-react";

interface ActionPlanProps {
  analysis: any;
}

export function ActionPlan({ analysis }: ActionPlanProps) {
  return (
    <div className="bg-zinc-900/70 border border-white/10 rounded-3xl p-10">
      <h2 className="text-3xl font-semibold mb-10 flex items-center gap-3">
        <Target className="text-violet-400" /> Your 90-Day Action Plan
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {["30_days", "60_days", "90_days"].map((period) => (
          <div key={period} className="bg-black/40 rounded-2xl p-8">
            <h4 className="font-semibold text-xl mb-6 capitalize border-b border-white/10 pb-4">
              {period.replace("_", " ")}
            </h4>
            <ul className="space-y-5 text-zinc-300">
              {(
                analysis.action_plan?.[period] ||
                analysis[`${period}_plan`] ||
                []
              ).map((item: string, i: number) => (
                <li key={i} className="flex gap-3">
                  <span className="text-violet-500 font-mono">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
