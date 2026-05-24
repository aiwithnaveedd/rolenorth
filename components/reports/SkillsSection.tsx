// components/reports/SkillsSection.tsx
interface SkillsSectionProps {
  analysis: any;
}

export function SkillsSection({ analysis }: SkillsSectionProps) {
  // Try multiple possible keys from AI response
  const technicalSkills =
    analysis.key_technical_skills ||
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
    <div className="mb-12 bg-gradient-to-br from-zinc-50 via-white to-blue-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950  rounded-3xl p-10">
      <h2 className="text-3xl font-semibold mb-8 flex items-center gap-3">
        🔧 Key Technical Skills
      </h2>

      {technicalSkills.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {technicalSkills.map((skill: string, i: number) => (
            <span
              key={i}
              className="px-6 py-3 bg-zinc-300 hover:bg-zinc-700 border border-white/10 rounded-2xl text-sm font-medium transition-all"
            >
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <div className="bg-zinc-950 border border-white/10 rounded-2xl p-8 text-center">
          <p className="text-zinc-400 text-lg">
            No specific skills data available in this analysis.
          </p>
          <p className="text-sm text-zinc-500 mt-2">
            The AI might have returned skills in a different format.
          </p>
        </div>
      )}

      {/* Missing / Recommended Skills */}
      {missingSkills.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-5 text-amber-400 flex items-center gap-2">
            🚀 Recommended Skills to Learn
          </h3>
          <div className="flex flex-wrap gap-3">
            {missingSkills.map((skill: string, i: number) => (
              <span
                key={i}
                className="px-6 py-3 bg-amber-350 border border-amber-500/30 rounded-2xl text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}