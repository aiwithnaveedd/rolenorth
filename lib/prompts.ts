/**
 * Resume analysis prompt
 */

export function analysisPrompt(text: string) {
  return `
You are an expert AI Resume Analyzer.

Analyze the following resume and provide:

1. Professional Summary
2. Key Technical Skills
3. Strengths
4. Weaknesses
5. Missing Important Skills
6. ATS Score out of 100
7. Suggestions for Improvement

Keep the response clean, professional, and structured.

Resume Content:
${text}
`;
}