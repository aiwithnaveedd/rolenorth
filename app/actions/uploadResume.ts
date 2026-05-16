"use server";

import { createClientServer } from "@/lib/supabase/server";
import { parseFile } from "@/lib/parser";
import { analyzeWithClaude } from "@/lib/claude";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

export async function uploadResume(formData: FormData) {
  const supabase = await createClientServer();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("You must be logged in");

    const file = formData.get("resume") as File;
    const currentLocation = formData.get("currentLocation") as string;
    const targetLocation =
      (formData.get("targetLocation") as string) || undefined;

    if (!file) throw new Error("No file uploaded");

    // Validate file
    if (!file.name.toLowerCase().match(/\.(pdf|docx)$/)) {
      throw new Error("Only PDF and DOCX files are allowed");
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name;

    // 1. Parse resume
    const resumeText = await parseFile(buffer, fileName);

    if (!resumeText || resumeText.trim().length < 100) {
      throw new Error("Could not extract sufficient text from your resume");
    }

    // 2. Analyze with Claude
    const analysisResult = await analyzeWithClaude(resumeText, {
      currentLocation,
      targetLocation,
    });

    // 3. Upload file to storage
    const fileExt = fileName.split(".").pop();
    const storagePath = `${user.id}/${uuidv4()}.${fileExt}`;

    await supabase.storage
      .from("resumes")
      .upload(storagePath, buffer, { contentType: file.type, upsert: true });

    // 4. Save report
    const { data: report, error: dbError } = await supabase
      .from("reports")
      .insert({
        user_id: user.id,
        file_path: storagePath,
        raw_text: resumeText.substring(0, 50000), // safety limit
        analysis: analysisResult.analysis,
        ats_score: analysisResult.ats_score,
      })
      .select()
      .single();

    if (dbError) throw dbError;

    revalidatePath("/dashboard");
    revalidatePath("/reports");

    return {
      success: true,
      reportId: report.id,
      message: "Resume analyzed successfully!",
    };
  } catch (error: any) {
    console.error("Upload Error:", error);
    return {
      success: false,
      error: error.message || "Failed to process resume",
    };
  }
}
