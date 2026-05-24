// hooks/useSubscription.ts
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useSubscription() {
  const [isPaid, setIsPaid] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkStatus() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setIsPaid(false);
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("users")
        .select("subscription_status")
        .eq("id", user.id)
        .single();

      const paid = profile?.subscription_status === "active" || 
                   profile?.subscription_status === "one_time";

      setIsPaid(paid);
      setLoading(false);
    }

    checkStatus();
  }, []);

  return { isPaid, loading };
}