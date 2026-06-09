// lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { analysisPrompt } from "./prompts";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

const MODELS = [
  "gemini-2.5-flash", // Primary
  "gemini-1.5-flash", // Fallback 1
  "gemini-2.0-flash-exp", // Fallback 2 (if available)
];

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function analyzeWithAI(
  resumeText: string,
  metadata: {
    currentLocation: string;
    targetLocation?: string;
  },
  retryCount = 0,
) {
  const maxRetries = 3;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const modelName = MODELS[attempt % MODELS.length];

    try {
      console.log(
        `🤖 Attempt ${attempt + 1}/${maxRetries + 1} - Using ${modelName}`,
      );

      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          temperature: 0.2,
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

      // Clean and parse JSON
      responseText = responseText
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();

      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) responseText = jsonMatch[0];

      const parsedAnalysis = JSON.parse(responseText);

      console.log("✅ Successfully parsed structured JSON");

      return {
        success: true,
        analysis: parsedAnalysis,
        overall_score: parsedAnalysis.overall_score || 78,
        ats_score: parsedAnalysis.ats_score || parsedAnalysis.ats?.score || 78,
      };
    } catch (error: any) {
      console.error(
        `❌ Attempt ${attempt + 1} failed with ${modelName}:`,
        error?.message,
      );

      const isServiceError =
        error?.status === 503 ||
        error?.message?.includes("Service Unavailable") ||
        error?.message?.includes("high demand");

      if (isServiceError && attempt < maxRetries) {
        const backoff = Math.pow(2, attempt) * 1000 + Math.random() * 500; // Exponential backoff
        console.log(`⏳ Retrying in ${Math.round(backoff)}ms...`);
        await delay(backoff);
        continue;
      }

      // Final error
      if (error?.status === 503 || error?.message?.includes("high demand")) {
        throw new Error(
          "AI service is currently busy. Please try again in a few minutes.",
        );
      }

      throw new Error("Failed to analyze resume. Please try again.");
    }
  }

  throw new Error("All analysis attempts failed. Please try again later.");
}