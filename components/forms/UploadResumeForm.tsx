'use client';

import { useState } from 'react';
import { uploadResume } from '@/app/actions/uploadResume';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Upload,
  Loader2,
  FileText,
  MapPin,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';


// At the top of UploadResumeForm component
interface UploadResumeFormProps {
  onAnalysisStart?: () => void;
}
export function UploadResumeForm({ onAnalysisStart }: UploadResumeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAnalysisStart?.(); // ← This triggers the full loading screen
    setIsLoading(true);
    setMessage("");
    const formData = new FormData(e.currentTarget);

    try {
      const result = await uploadResume(formData);

      if (result.success && result.reportId) {
        setMessage("Analysis completed successfully! Redirecting...");
        // Small delay so user sees the loading screen longer
        setTimeout(() => {
          window.location.href = `/reports/${result.reportId}`;
        }, 800);
      } else {
        setMessage(result.error || "Something went wrong");
      }
    } catch (error: any) {
      setMessage(error.message || "Failed to process resume");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl shadow-2xl">
      {/* Glow Effects */}
      <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative z-10 p-8 md:p-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg">
            <Sparkles className="h-8 w-8" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Upload Your Resume
          </h2>

          <p className="mt-3 text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            Get AI-powered career insights, automation risk analysis, skill gap
            detection, and personalized career roadmap recommendations.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Resume Upload */}
          <div className="space-y-3">
            <Label
              htmlFor="resume"
              className="text-sm font-semibold text-zinc-800 dark:text-zinc-200"
            >
              Resume Upload
            </Label>

            <div className="group relative overflow-hidden rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50/70 dark:bg-zinc-800/40 transition hover:border-blue-500 hover:bg-blue-50/40 dark:hover:bg-zinc-800">
              <Input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf,.docx"
                required
                className="h-40 cursor-pointer border-0 bg-transparent p-6 file:hidden"
              />

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <div className="mb-4 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-4 text-white shadow-lg">
                  <FileText className="h-8 w-8" />
                </div>

                <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                  Drag & drop your resume here
                </p>

                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  PDF or DOCX • Max 10MB
                </p>
              </div>
            </div>
          </div>

          {/* Location Inputs */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-3">
              <Label
                htmlFor="currentLocation"
                className="text-sm font-semibold text-zinc-800 dark:text-zinc-200"
              >
                Current Location
              </Label>

              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />

                <Input
                  id="currentLocation"
                  name="currentLocation"
                  placeholder="Karachi, Pakistan"
                  required
                  className="h-14 rounded-xl border-zinc-300 bg-white/80 pl-12 dark:border-zinc-700 dark:bg-zinc-800/70"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="targetLocation"
                className="text-sm font-semibold text-zinc-800 dark:text-zinc-200"
              >
                Target Location
              </Label>

              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />

                <Input
                  id="targetLocation"
                  name="targetLocation"
                  placeholder="Remote / Dubai"
                  className="h-14 rounded-xl border-zinc-300 bg-white/80 pl-12 dark:border-zinc-700 dark:bg-zinc-800/70"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid gap-4 rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 p-5 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                <Sparkles className="h-5 w-5 text-blue-600" />
              </div>

              <div>
                <p className="font-semibold text-zinc-900 dark:text-white">
                  AI Insights
                </p>
                <p className="text-sm text-zinc-500">
                  Personalized career analysis
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900/30">
                <ShieldCheck className="h-5 w-5 text-purple-600" />
              </div>

              <div>
                <p className="font-semibold text-zinc-900 dark:text-white">
                  Secure Upload
                </p>
                <p className="text-sm text-zinc-500">
                  Your data stays protected
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-emerald-100 p-2 dark:bg-emerald-900/30">
                <Upload className="h-5 w-5 text-emerald-600" />
              </div>

              <div>
                <p className="font-semibold text-zinc-900 dark:text-white">
                  Fast Reports
                </p>
                <p className="text-sm text-zinc-500">
                  Results generated in seconds
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            disabled={isLoading}
            className="h-14 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-base font-semibold text-white shadow-lg transition-all hover:scale-[1.01] hover:shadow-xl"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing Resume...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-5 w-5" />
                Upload & Analyze Resume
              </>
            )}
          </Button>

          {/* Message */}
          {message && (
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-center text-sm dark:border-zinc-700 dark:bg-zinc-800">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

// 'use client';

// import { useState } from 'react';
// import { uploadResume } from '@/app/actions/uploadResume'; // Server Action
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Upload, Loader2 } from 'lucide-react';

// export function UploadResumeForm() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState('');

// const handleSubmit = async (formData: FormData) => {
//   setIsLoading(true);
//   setMessage("");

//   try {
//     const result = await uploadResume(formData);

//     if (result.success && result.reportId) {
//       setMessage("Analysis completed successfully! Redirecting...");
//       // Redirect to report
//       window.location.href = `/reports/${result.reportId}`;
//     } else {
//       setMessage(result.error || "Something went wrong");
//     }
//   } catch (error: any) {
//     setMessage(error.message || "Failed to process resume");
//   } finally {
//     setIsLoading(false);
//   }
// };

//   return (
//     <form
//       action={handleSubmit}
//       className="max-w-2xl space-y-6 bg-blue-100 dark:bg-gray-800 p-6 rounded-lg shadow-md w-full"
//     >
//       <div className="gap-3">
//         <Label className="font-bold mb-2" htmlFor="resume">
//           Resume (PDF or DOCX)
//         </Label>
//         <Input
//           id="resume"
//           name="resume"
//           type="file"
//           accept=".pdf,.docx"
//           required
//           className="border-dashed border-2 overflow-hidden border-zinc-500 dark:border-zinc-600 p-4  text-center cursor-pointer"
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <Label className="font-bold mb-2" htmlFor="currentLocation">
//             Current Location
//           </Label>
//           <Input
//             id="currentLocation"
//             name="currentLocation"
//             placeholder="Karachi, Pakistan"
//             required
//             className="border-dashed border-2 border-zinc-300 dark:border-zinc-600 p-4 text-center cursor-pointer"
//           />
//         </div>
//         <div>
//           <Label className="font-bold mb-2" htmlFor="targetLocation">
//             Target Location (Optional)
//           </Label>
//           <Input
//             id="targetLocation"
//             name="targetLocation"
//             placeholder="Remote / Dubai"
//             className="border-dashed border-2 border-zinc-300 dark:border-zinc-600 p-4 text-center cursor-pointer"
//           />
//         </div>
//       </div>

//       <Button type="submit" size="lg" disabled={isLoading} className="w-full">
//         {isLoading ? (
//           <>
//             {" "}
//             <Loader2 className="mr-2 animate-spin" /> Analyzing Resume...{" "}
//           </>
//         ) : (
//           <>
//             {" "}
//             <Upload className="mr-2" /> Upload & Analyze Resume{" "}
//           </>
//         )}
//       </Button>

//       {message && <p className="text-center">{message}</p>}
//     </form>
//   );
// }