// components/reports/ActionPlan.tsx
import { Target, Clock, ArrowRight } from "lucide-react";

interface ActionPlanProps {
  analysis: any;
}

export function ActionPlan({ analysis }: ActionPlanProps) {
  // Flexible fallback to support different AI response structures
  const actionPlan = analysis?.action_plan || {};

  const periods = [
    { key: "30_days", label: "First 30 Days", icon: Clock },
    { key: "60_days", label: "Days 31-60", icon: Target },
    { key: "90_days", label: "Days 61-90", icon: ArrowRight },
  ];

  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-8">
        <Target className="w-6 h-6 text-zinc-900" />
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Your 90-Day Action Plan
        </h2>
      </div>

      <p className="text-zinc-600 mb-10 max-w-2xl">
        A structured roadmap to help you implement the recommendations from your
        career analysis.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {periods.map(({ key, label, icon: Icon }) => {
          const items =
            actionPlan[key] || analysis[`${key}_plan`] || analysis[key] || [];

          return (
            <div
              key={key}
              className="bg-white border border-zinc-200 rounded-3xl p-8 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-zinc-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-zinc-700" />
                </div>
                <h4 className="font-semibold text-xl text-zinc-900">{label}</h4>
              </div>

              <ul className="space-y-4">
                {Array.isArray(items) && items.length > 0 ? (
                  items.map((item: string, i: number) => (
                    <li
                      key={i}
                      className="flex gap-3 text-[15px] text-zinc-700 leading-relaxed"
                    >
                      <span className="text-emerald-600 font-medium mt-1 flex-shrink-0">
                        →
                      </span>
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-zinc-500 italic py-2">
                    No specific actions defined for this period.
                  </li>
                )}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="mt-10 text-center text-sm text-zinc-500">
        💡 Tip: Review and update your progress every 30 days for best results.
      </div>
    </div>
  );
}