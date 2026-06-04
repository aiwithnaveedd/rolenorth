"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";

interface ResumeScoreCardProps {
  score: number;
}

export function ResumeScoreCard({ score = 0 }: ResumeScoreCardProps) {
  const getScoreColor = (s: number) =>
    s >= 85
      ? "text-emerald-600 dark:text-emerald-400"
      : s >= 70
        ? "text-amber-600 dark:text-amber-400"
        : "text-rose-600 dark:text-rose-400";

  return (
    <Card className="p-8 text-center relative overflow-hidden border border-zinc-200 dark:border-zinc-800">
      <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-4" />
      <p className="text-sm uppercase tracking-widest text-zinc-500">
        Overall Score
      </p>
      <div className={`text-7xl font-bold ${getScoreColor(score)} mt-3`}>
        {Math.round(score)}
      </div>
      <p className="text-sm text-zinc-500">/ 100</p>

      <Progress value={score} className="mt-8 h-3" />
    </Card>
  );
}
