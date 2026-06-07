// components/reports/SkillsSection.tsx
import { Star, Award, PlusCircle } from "lucide-react";

interface SkillsSectionProps {
  analysis: any;
}

export function SkillsSection({ analysis }: SkillsSectionProps) {
  // Flexible key mapping - handles different AI response structures
  const technicalSkills =
    analysis.key_technical_skills ||
    analysis.key_skills ||
    analysis.skills ||
    analysis.technical_skills ||
    analysis["Key Technical Skills"] ||
    [];

  const missingSkills =
    analysis.missing_important_skills ||
    analysis.missing_skills ||
    analysis.recommended_skills ||
    analysis["Missing Important Skills"] ||
    [];

  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-8">
        <Award className="w-6 h-6 text-zinc-900" />
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Skills Analysis
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Key Technical Skills */}
        <div className="bg-white border border-zinc-200 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-5 h-5 text-amber-500" />
            <h3 className="text-xl font-semibold text-zinc-900">
              Key Technical Skills
            </h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {Array.isArray(technicalSkills) && technicalSkills.length > 0 ? (
              technicalSkills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-100 hover:bg-zinc-200 rounded-2xl text-sm font-medium text-zinc-800 transition-all duration-200"
                >
                  <Star className="w-4 h-4 text-amber-500" />
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-zinc-500 italic py-4">
                No technical skills data available in this analysis.
              </p>
            )}
          </div>
        </div>

        {/* Missing / Recommended Skills */}
        <div className="bg-white border border-zinc-200 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <PlusCircle className="w-5 h-5 text-blue-600" />
            <h3 className="text-xl font-semibold text-zinc-900">
              Recommended Skills to Add
            </h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {Array.isArray(missingSkills) && missingSkills.length > 0 ? (
              missingSkills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-50 border border-blue-100 rounded-2xl text-sm font-medium text-blue-700 hover:bg-blue-100 transition-all duration-200"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-emerald-600 italic py-4">
                Excellent! No major missing skills detected.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}