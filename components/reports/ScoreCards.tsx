// components/reports/ScoreCards.tsx
import { TrendingUp, Award, Target } from "lucide-react";

type ScoreCardsProps = {
  overAllScore: number | string;
  atsScore: number | string;
};

export default function ResumeScoreCard({
  overAllScore,
  atsScore,
}: ScoreCardsProps) {
  const overall = overAllScore;
  const ats = atsScore;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Overall Score */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-8 hover:shadow-md transition-all">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
            <Award className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500">
              Overall Career Score
            </p>
            <p className="text-5xl font-bold text-zinc-900 mt-1">{overall}</p>
          </div>
        </div>
        <p className="text-zinc-600 text-sm">
          Based on skills, experience & market fit
        </p>
      </div>

      {/* ATS Score */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-8 hover:shadow-md transition-all">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
            <Target className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500">
              ATS Compatibility
            </p>
            <p className="text-5xl font-bold text-emerald-600 mt-1">{ats}</p>
            <p className="text-xs text-emerald-600">/100</p>
          </div>
        </div>
        <p className="text-zinc-600 text-sm">
          How well your resume passes Applicant Tracking Systems
        </p>
      </div>

      {/* Improvement Potential */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-8 hover:shadow-md transition-all">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500">
              Growth Potential
            </p>
            <p className="text-5xl font-bold text-amber-600 mt-1">High</p>
          </div>
        </div>
        <p className="text-zinc-600 text-sm">
          Strong foundation with clear areas for quick improvement
        </p>
      </div>
    </div>
  );
}
// "use client";

// import { Card } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Trophy } from "lucide-react";

// interface ResumeScoreCardProps {
//   score: number;
// }

// export function ResumeScoreCard({ score = 0 }: ResumeScoreCardProps) {
//   const getScoreColor = (s: number) =>
//     s >= 85
//       ? "text-emerald-600 dark:text-emerald-400"
//       : s >= 70
//         ? "text-amber-600 dark:text-amber-400"
//         : "text-rose-600 dark:text-rose-400";

//   return (
//     <Card className="p-8 text-center relative overflow-hidden border border-zinc-200 dark:border-zinc-800">
//       <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-4" />
//       <p className="text-sm uppercase tracking-widest text-zinc-500">
//         Overall Score
//       </p>
//       <div className={`text-7xl font-bold ${getScoreColor(score)} mt-3`}>
//         {Math.round(score)}
//       </div>
//       <p className="text-sm text-zinc-500">/ 100</p>

//       <Progress value={score} className="mt-8 h-3" />
//     </Card>
//   );
// }
