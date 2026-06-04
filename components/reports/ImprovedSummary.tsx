"use client";

import { Card } from "@/components/ui/card";

interface ImprovedSummaryProps {
  summary?: string;
}

export function ImprovedSummary({ summary }: ImprovedSummaryProps) {
  return (
    <Card className="p-8">
      <h3 className="text-xl font-semibold mb-4">AI Professional Summary</h3>
      <div className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300">
        {summary || "No summary available yet."}
      </div>
    </Card>
  );
}
