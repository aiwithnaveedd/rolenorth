"use client";

export function ReportSkeleton() {
  return (
    <div className="space-y-10 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
          <div className="space-y-2">
            <div className="h-8 w-80 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
            <div className="h-4 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          </div>
        </div>
        <div className="h-10 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
      </div>

      {/* Score Card */}
      <div className="h-80 bg-zinc-100 dark:bg-zinc-900 rounded-3xl" />

      {/* Grid Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-96 bg-zinc-100 dark:bg-zinc-900 rounded-3xl"
          />
        ))}
      </div>

      {/* Summary */}
      <div className="h-72 bg-zinc-100 dark:bg-zinc-900 rounded-3xl" />
    </div>
  );
}
