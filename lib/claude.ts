// // lib/claude.ts - TEMPORARY MOCK (for testing)
// import { analysisPrompt } from "./prompts";

// export async function analyzeWithClaude(
//   resumeText: string,
//   metadata: {
//     currentLocation: string;
//     targetLocation?: string;
//   },
// ) {
//   console.log("🔄 Using MOCK Claude Analysis...");

//   // Simulate API delay
//   await new Promise((resolve) => setTimeout(resolve, 1500));

//   const mockAnalysis = `
// # Professional Summary
// You are a talented professional with strong technical foundations. Your background shows good potential in the current market.

// # Current Market Position
// **Overall Score: 78/100**

// **Strengths:**
// - Solid technical skills
// - Clear career progression
// - Good education background

// **Areas for Improvement:**
// - Missing some in-demand modern skills
// - Limited quantifiable achievements

// # Key Technical Skills
// **Strong:** ${resumeText.includes("JavaScript") || resumeText.includes("React") ? "JavaScript, React" : "Core Programming"}
// **Moderate:** Backend Development, Databases
// **Missing:** Cloud (AWS/Azure), AI/ML, DevOps

// # Automation & Skill Decay Risk
// - **High Risk:** Traditional manual processes
// - **Medium Risk:** Basic web development
// - **Low Risk:** Strategic thinking & leadership

// # Career Pivot Opportunities
// 1. **Full Stack Developer** → High demand, good salary growth
// 2. **Product Manager (Technical)** → Leverage domain knowledge
// 3. **AI Implementation Specialist** → Emerging high-growth area

// # ATS Score
// **82/100**
// Quick tips: Add more keywords, quantify achievements.

// # Action Plan (Next 30/60/90 Days)
// **30 Days:** Update resume with metrics, learn one new skill
// **60 Days:** Build 1-2 strong portfolio projects
// **90 Days:** Start applying aggressively + networking
// `;

//   return {
//     analysis: mockAnalysis,
//     ats_score: 82,
//   };
// }

// // lib/claude.ts
// import Anthropic from "@anthropic-ai/sdk";
// import { analysisPrompt } from "./prompts";

// const anthropic = new Anthropic({
//   apiKey: process.env.ANTHROPIC_API_KEY!,
// });

// export async function analyzeWithClaude(
//   resumeText: string,
//   metadata: {
//     currentLocation: string;
//     targetLocation?: string;
//   },
// ) {
//   try {
//     const prompt = analysisPrompt(resumeText);

//     const message = await anthropic.messages.create({
//       model: "claude-3-5-sonnet-20240620", // or claude-3-opus-20240229
//       max_tokens: 4000,
//       temperature: 0.2,
//       system: `You are an expert career advisor and resume analyst. Provide highly actionable, honest, and structured career analysis.`,
//       messages: [
//         {
//           role: "user",
//           content:
//             prompt +
//             `\n\nCurrent Location: ${metadata.currentLocation}\nTarget Location: ${metadata.targetLocation || "Not specified"}`,
//         },
//       ],
//     });

//     const responseText =
//       message.content[0]?.type === "text"
//         ? message.content[0].text
//         : "No response from Claude";

//     // Basic ATS score extraction (we can improve this later with structured output)
//     const atsMatch = responseText.match(/ATS Score[:\s]*(\d+)/i);
//     const atsScore = atsMatch ? parseInt(atsMatch[1]) : 75;

//     return {
//       analysis: responseText,
//       ats_score: Math.min(100, Math.max(50, atsScore)),
//     };
//   } catch (error: any) {
//     console.error("Claude API Error:", error);
//     throw new Error("Failed to analyze resume with AI. Please try again.");
//   }
// }
