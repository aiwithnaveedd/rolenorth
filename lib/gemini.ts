// lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { analysisPrompt } from "./prompts";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function analyzeWithAI(resumeText: string, metadata: {
  currentLocation: string;
  targetLocation?: string;
}) {
  try {
    console.log("🤖 Calling Gemini with Structured JSON...");

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const fullPrompt =
      analysisPrompt(resumeText) +
      `\n\nCurrent Location: ${metadata.currentLocation}\nTarget Location: ${metadata.targetLocation || "Not specified"}`;

    const result = await model.generateContent(fullPrompt);
    let responseText = result.response.text();

    // Clean JSON if Gemini adds extra text
    responseText = responseText.replace(/```json\n?|\n?```/g, "").trim();

    const parsed = JSON.parse(responseText);

    return {
      analysis: parsed, // Now full structured object
      ats_score: parsed.ats?.score || 75,
    };
  } catch (error: any) {
    console.error("Gemini Structured Error:", error);
    throw new Error("Failed to analyze resume. Please try again.");
  }
}