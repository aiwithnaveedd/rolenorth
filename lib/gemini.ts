// lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { analysisPrompt } from "./prompts";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function analyzeWithAI(resumeText: string, metadata: {
  currentLocation: string;
  targetLocation?: string;
}) {
  try {
    console.log("🤖 Calling Gemini 2.5 Flash...");

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",     // ← Changed to Flash (much better free tier)
    });

    const prompt = analysisPrompt(resumeText) + 
      `\n\nCurrent Location: ${metadata.currentLocation}\nTarget Location: ${metadata.targetLocation || 'Not specified'}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Extract ATS Score
    const atsMatch = responseText.match(/ATS Score[:\s]*(\d+)/i) || 
                     responseText.match(/(\d+)\s*\/\s*100/i);
    const atsScore = atsMatch ? parseInt(atsMatch[1]) : 78;

    return {
      analysis: responseText,
      ats_score: Math.min(100, Math.max(60, atsScore)),
    };

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error("AI analysis failed. Please try again later.");
  }
}