export function analysisPrompt(text: string) {
  return `
You are a senior career analyst AI.

Return ONLY valid JSON (no markdown, no extra text).

Structure:

{
  "summary": "",
  "market_position": {
    "score": 0,
    "strengths": [],
    "weaknesses": []
  },
  "skills": {
    "strong": [],
    "moderate": [],
    "missing": []
  },
  "risk_analysis": {
    "automation_risk": "Low | Medium | High",
    "details": ""
  },
  "career_pivots": [
    {
      "role": "",
      "reason": ""
    }
  ],
  "ats": {
    "score": 0,
    "tips": []
  },
  "action_plan": {
    "30_days": [],
    "60_days": [],
    "90_days": []
  }
}

Resume:
${text}
`;
}
