// lib/auth.ts
import { createClientServer } from "@/lib/supabase/server";

export async function checkSubscription() {
  const supabase = await createClientServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { authorized: false };

  const { data: profile } = await supabase
    .from("users")
    .select("subscription_status, subscription_tier")
    .eq("id", user.id)
    .single();

  const isPaid = 
    profile?.subscription_status === "active" || 
    profile?.subscription_status === "one_time";

  return {
    authorized: true,
    isPaid,
    subscription: profile,
    user
  };
}