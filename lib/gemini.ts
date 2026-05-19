// lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { analysisPrompt } from "./prompts";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function analyzeWithAI(
  resumeText: string,
  metadata: {
    currentLocation: string;
    targetLocation?: string;
  },
) {
  try {
    console.log("🤖 Starting Gemini Career Analysis...");

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.2, // Lower = more consistent JSON
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8000,
      },
    });

    const fullPrompt = `
${analysisPrompt(resumeText)}

Additional User Context:
- Current Location: ${metadata.currentLocation}
- Target Location: ${metadata.targetLocation || "Not specified"}
- Focus on highly actionable and honest career advice.
`;

    const result = await model.generateContent(fullPrompt);
    let responseText = result.response.text();

    console.log("✅ Raw response received. Length:", responseText.length);

    // Clean response
    responseText = responseText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      responseText = jsonMatch[0];
    }

    const parsedAnalysis = JSON.parse(responseText);

    console.log("✅ Successfully parsed structured JSON");

    return {
      success: true,
      analysis: parsedAnalysis,
      overall_score: parsedAnalysis.overall_score || 78,
      ats_score: parsedAnalysis.ats_score || parsedAnalysis.ats?.score || 78,
    };
  } catch (error: any) {
    console.error("❌ Gemini Analysis Error:", error);

    if (error?.status === 404) {
      throw new Error("Gemini model not found. Check model name.");
    }
    if (
      error.message?.toLowerCase().includes("quota") ||
      error.message?.includes("rate limit")
    ) {
      throw new Error("AI service is busy. Please try again in a moment.");
    }

    throw new Error("Failed to analyze resume. Please try again.");
  }
}