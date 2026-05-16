"use client";

import { useState } from "react";
import { UploadResumeForm } from "@/components/forms/UploadResumeForm";

export default function UploadPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">Upload Your Resume</h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-8">
        Get AI-powered career analysis, skill decay insights, and pivot
        recommendations.
      </p>

      <UploadResumeForm />
    </div>
  );
}
