"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";

interface ResumeScoreCardProps {
  score: number;
  analysisDate: string;
}

export function ResumeScoreCard({ score, analysisDate }: ResumeScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-600";
    if (score >= 70) return "text-amber-600";
    return "text-rose-600";
  };

  return (
    <Card className="p-8 relative overflow-hidden">
      <div className="absolute top-4 right-4">
        <Trophy className="w-10 h-10 text-amber-400" />
      </div>

      <div className="text-center">
        <p className="text-sm text-zinc-500 mb-1">Overall Score</p>
        <div className={`text-7xl font-bold ${getScoreColor(score)}`}>
          {score}
        </div>
        <p className="text-sm text-zinc-500">/ 100</p>
      </div>

      <Progress value={score} className="mt-6 h-3" />

      <p className="text-xs text-center text-zinc-500 mt-3">
        Analyzed on {new Date(analysisDate).toLocaleDateString()}
      </p>
    </Card>
  );
}
  