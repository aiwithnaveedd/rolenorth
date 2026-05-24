// components/reports/ScoreCards.tsx
import { Award } from "lucide-react";

interface ScoreCardsProps {
  analysis: any;
}

export function ScoreCards({ analysis }: ScoreCardsProps) {
  const overallScore = analysis.overall_score || analysis.ats?.score || 87;

  return (
    <div className="mb-16 rounded-3xl  p-12 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(at_center,#4f46e510_0%,transparent_70%)]" />

      <p className="uppercase tracking-[4px] text-sm text-zinc-500 mb-3">
        OVERALL CAREER HEALTH SCORE
      </p>

      <div className="text-[128px] font-bold leading-none text-white mb-2 tracking-tighter">
        {overallScore}
      </div>

      <p className="text-3xl font-medium text-emerald-400">
        {overallScore >= 85
          ? "Strong Future Outlook"
          : overallScore >= 70
            ? "Good Potential"
            : "Needs Attention"}
      </p>
    </div>
  );
}
