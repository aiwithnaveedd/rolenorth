// components/reports/ReportSkeleton.tsx
export function ReportSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-950 animate-pulse">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="h-12 w-96 bg-zinc-800 rounded-xl mb-12" />

        <div className="h-48 bg-zinc-900 rounded-3xl mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="h-80 bg-zinc-900 rounded-3xl" />
            <div className="grid md:grid-cols-2 gap-8">
              <div className="h-96 bg-zinc-900 rounded-3xl" />
              <div className="h-96 bg-zinc-900 rounded-3xl" />
            </div>
          </div>
          <div className="lg:col-span-4 space-y-8">
            <div className="h-64 bg-zinc-900 rounded-3xl" />
            <div className="h-64 bg-zinc-900 rounded-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
