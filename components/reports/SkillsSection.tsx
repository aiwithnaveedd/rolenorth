// components/reports/SkillsSection.tsx
interface SkillsSectionProps {
  analysis: any;
}

export function SkillsSection({ analysis }: SkillsSectionProps) {
  const skills = analysis.key_technical_skills || analysis.skills || [];

  return (
    <div className="mb-12 bg-zinc-900/70 border border-white/10 rounded-3xl p-10">
      <h2 className="text-3xl font-semibold mb-8">Key Technical Skills</h2>

      <div className="flex flex-wrap gap-3">
        {skills.length > 0 ? (
          skills.map((skill: string, i: number) => (
            <span
              key={i}
              className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 border border-white/10 rounded-full text-sm transition-colors"
            >
              {skill}
            </span>
          ))
        ) : (
          <p className="text-zinc-400">No specific skills data available.</p>
        )}
      </div>

      {/* Missing Skills */}
      {(analysis.missing_skills || analysis.missing_important_skills)?.length >
        0 && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4 text-amber-400">
            Recommended Skills to Learn
          </h3>
          <div className="flex flex-wrap gap-3">
            {analysis.missing_skills?.map((skill: string, i: number) => (
              <span
                key={i}
                className="px-5 py-2 bg-amber-950 border border-amber-500/30 rounded-full text-sm"
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
