// app/reports/compare/page.tsx
import { createClientServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import CompareClient from "./CompareClient";

type Report = {
  id: string;
  created_at: string;
  analysis: any;
};

export default async function CompareReportsPage() {
  let reports: Report[] = [];

  try {
    const supabase = await createClientServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/");
    }

    const { data } = await supabase
      .from("reports")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    reports = data || [];
  } catch (error) {
    console.error("Failed to fetch reports:", error);
  }

  return <CompareClient initialReports={reports} />;
}