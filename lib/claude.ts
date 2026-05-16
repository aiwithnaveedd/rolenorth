/* eslint-disable @typescript-eslint/no-explicit-any */
import Anthropic from "@anthropic-ai/sdk";
import { analysisPrompt } from "@/lib/prompts"; // we'll improve prompt later

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function analyzeWithClaude(text: string, context: any) {
  const prompt = analysisPrompt(text);

  const message = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 4000,
    temperature: 0.3,
    system:
      "You are an expert career coach and resume analyst helping professionals understand their market position.",
    messages: [{ role: "user", content: prompt }],
  });

  const responseText =
    message.content[0].type === "text" ? message.content[0].text : "";

  // TODO: Parse structured output later (for now return raw)
  return {
    analysis: responseText,
    ats_score: Math.floor(Math.random() * 30) + 70, // placeholder
  };
}
