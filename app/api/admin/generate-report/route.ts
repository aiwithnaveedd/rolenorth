// app/api/admin/generate-report/route.ts
import { createClientServer } from "@/lib/supabase/server"; // ← IMPORTANT: Use SERVER client
import { NextResponse } from "next/server";
import { analyzeWithAI } from "@/lib/gemini";

export async function POST(request: Request) {
  const supabase = await createClientServer(); // Server client with cookies

  // Founder protection (using your email)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.email !== "naveedahmedgopang76@gmail.com") {
    console.warn("Unauthorized admin attempt:", user?.email);
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { userId } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    // Get user's profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("current_location")
      .eq("id", userId)
      .single();

    if (profileError && profileError.code !== "PGRST116") {
      // PGRST116 = no rows
      console.error("Profile fetch error:", profileError);
    }

    // Get latest report with raw_text
    const { data: latestReport, error: reportError } = await supabase
      .from("reports")
      .select("file_path, raw_text")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (!latestReport?.raw_text) {
      return NextResponse.json(
        {
          error: "User has no resume uploaded yet. Ask them to upload first.",
        },
        { status: 400 },
      );
    }

    // if (!latestReport?.raw_text) {
    //   return NextResponse.json(
    //     {
    //       error:
    //         "No resume text found for this user. Please upload a resume first.",
    //     },
    //     { status: 400 },
    //   );
    // }

    const metadata = {
      currentLocation: profile?.current_location || "Not specified",
      targetLocation: undefined,
    };

    // AI Analysis
    const aiResult = await analyzeWithAI(latestReport.raw_text, metadata);

    // Insert new report version
    const { error: insertError } = await supabase.from("reports").insert({
      user_id: userId,
      file_path: latestReport.file_path,
      raw_text: latestReport.raw_text,
      analysis: aiResult.analysis,
      ats_score: aiResult.ats_score,
      version: 1, // TODO: Improve version logic later
    });

    if (insertError) {
      console.error("Insert error:", insertError);
      throw insertError;
    }

    return NextResponse.json({
      success: true,
      ats_score: aiResult.ats_score,
    });
  } catch (error: any) {
    console.error("❌ Admin generate report error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to generate report",
      },
      { status: 500 },
    );
  }
}