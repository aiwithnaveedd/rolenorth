// app/admin/page.tsx
import { createClientServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminPage() {
  const supabase = await createClientServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Only you (the founder) can access this
  if (user?.email !== "naveedahmedgopang76@gmail.com") { 
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-350 via-zinc-300 to-black text-white p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">👑 Admin Panel</h1>
        <p className="text-zinc-400 mb-10">Welcome Naveed! You have full access.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/dashboard"
            className="block bg-zinc-300 border border-white/10 rounded-3xl p-8 hover:border-violet-500 transition-all"
          >
            <h3 className="text-2xl font-semibold mb-3">View All Reports</h3>
            <p className="text-zinc-400">Manage user reports</p>
          </Link>

          <Link
            href="/pricing"
            className="block bg-zinc-300 border border-white/10 rounded-3xl p-8 hover:border-violet-500 transition-all"
          >
            <h3 className="text-2xl font-semibold mb-3">Pricing Management</h3>
            <p className="text-zinc-400">Test subscription flows</p>
          </Link>
        </div>

        <div className="mt-12 text-sm text-zinc-500">
          You are logged in as Founder. All paid features are unlocked for you.
        </div>
      </div>
    </div>
  );
}