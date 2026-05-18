"use client";

import { useState } from "react";
import { UploadResumeForm } from "@/components/forms/UploadResumeForm";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function UploadPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stage, setStage] = useState<"parsing" | "analyzing">("parsing");

  const handleAnalysisStart = () => {
    setIsAnalyzing(true);
    setStage("parsing");
  };

  // const handleAnalysisComplete = () => {
  //   setIsAnalyzing(false);
  // };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-zinc-50 via-white to-blue-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-16">
        {!isAnalyzing && (
          <>
            <div className="mb-10 text-center">
              <span className="mb-4 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1 text-sm font-medium text-blue-700 dark:text-blue-400">
                AI-Powered Career Intelligence
              </span>

              <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white md:text-6xl">
                Analyze Your Career Future
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
                Upload your resume and discover your career strengths, skill
                gaps, automation exposure, and future-proof opportunities.
              </p>
            </div>

            <UploadResumeForm
              onAnalysisStart={handleAnalysisStart}
              // onAnalysisComplete={handleAnalysisComplete}
            />
          </>
        )}

        {/* ====================== FULL SCREEN LOADING ====================== */}
        {isAnalyzing && (
          <div className="w-full max-w-2xl">
            <div className="rounded-3xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-white/20 dark:border-zinc-700 shadow-2xl p-12 md:p-16">
              <LoadingSpinner stage={stage} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}