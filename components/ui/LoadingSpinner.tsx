import { Loader2, Sparkles, Brain } from "lucide-react";

interface LoadingSpinnerProps {
  stage: "parsing" | "analyzing";
}

export default function LoadingSpinner({ stage }: LoadingSpinnerProps) {
  const messages = {
    parsing: {
      title: "Processing Resume",
      subtitle: "Extracting text and structure...",
      icon: Loader2,
    },
    analyzing: {
      title: "AI Career Analysis",
      subtitle:
        "Evaluating skills • Automation risk • Career pivots • Action plan",
      icon: Brain,
    },
  };

  const current = messages[stage];

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="relative mb-10">
        <div className="w-24 h-24 rounded-full border-4 border-zinc-200 dark:border-zinc-800" />
        <div className="absolute inset-0 flex items-center justify-center">
          <current.icon className="w-12 h-12 text-violet-600 animate-spin" />
        </div>
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-violet-500 rounded-full opacity-20 blur-xl animate-pulse" />
      </div>

      <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-3">
        {current.title}
      </h3>
      <p className="text-zinc-600 dark:text-zinc-400 max-w-sm">
        {current.subtitle}
      </p>

      <div className="mt-10 w-72 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-[loading_2.5s_ease-in-out_infinite]" />
      </div>

      <p className="mt-4 text-xs text-zinc-500">
        This usually takes 15–35 seconds
      </p>
    </div>
  );
}
