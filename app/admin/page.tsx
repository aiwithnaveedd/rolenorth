// app/admin/page.tsx
import { createClientServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  const supabase = await createClientServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Only you (the founder) can access this
  if (user?.email !== "naveedahmedgopang76@gmail.com") {
    redirect("/dashboard");
  }

  return <AdminDashboard />;
}