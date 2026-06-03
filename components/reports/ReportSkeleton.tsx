"use client";

export function ReportSkeleton() {
  return (
    <div className="space-y-10">
      {/* Header Skeleton */}
      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <div className="h-9 w-80 bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
          <div className="h-5 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
        </div>
        <div className="h-11 w-40 bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
      </div>

      {/* Score Card */}
      <div className="h-80 bg-zinc-100 dark:bg-zinc-900 rounded-2xl animate-pulse" />

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-96 bg-zinc-100 dark:bg-zinc-900 rounded-2xl animate-pulse"
          />
        ))}
      </div>

      {/* Summary Section */}
      <div className="h-64 bg-zinc-100 dark:bg-zinc-900 rounded-2xl animate-pulse" />
    </div>
  );
}
