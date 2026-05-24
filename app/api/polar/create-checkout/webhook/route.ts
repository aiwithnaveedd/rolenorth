// app/api/polar/webhook/route.ts
import { polar } from "@/lib/polar";
import { createClientServer } from "@/lib/supabase/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const signature = request.headers.get("x-polar-signature") || "";

    // Polar webhook verification (basic for now)
    // You can add full signature verification later if needed

    const supabase = await createClientServer();

    const eventType = body.event;
    const data = body.data;

    switch (eventType) {
      case "checkout.created":
      case "checkout.succeeded":
        if (data.metadata?.user_id) {
          await supabase
            .from("users")
            .update({
              subscription_status: "active",
              subscription_tier: data.product?.name || "paid",
              updated_at: new Date().toISOString(),
            })
            .eq("id", data.metadata.user_id);
        }
        break;

      case "subscription.canceled":
        if (data.user_id) {
          await supabase
            .from("users")
            .update({
              subscription_status: "canceled",
            })
            .eq("id", data.user_id);
        }
        break;
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Polar Webhook Error:", error);
    return new Response("Error", { status: 500 });
  }
}