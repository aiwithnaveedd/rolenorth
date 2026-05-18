// components/ui/LoadingSpinner.tsx
import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  subMessage?: string;
  progress?: number; // 0-100 for progress bar
}

export default function LoadingSpinner({ 
  message = "Analyzing your resume...", 
  subMessage = "This usually takes 15-30 seconds",
  progress 
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="relative mb-8">
        {/* Outer glow ring */}
        <div className="w-20 h-20 border-4 border-zinc-200 dark:border-zinc-800 rounded-full animate-pulse" />
        
        {/* Spinning circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-transparent border-t-violet-600 border-r-violet-600 rounded-full animate-spin" />
      </div>

      <h3 className="text-xl font-semibold mb-2">{message}</h3>
      <p className="text-zinc-500 dark:text-zinc-400 max-w-xs">{subMessage}</p>

      {progress !== undefined && (
        <div className="w-64 mt-8 bg-zinc-200 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
          <div 
            className="h-1.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}