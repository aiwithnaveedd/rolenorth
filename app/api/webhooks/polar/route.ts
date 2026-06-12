// app/api/webhooks/polar/route.ts
import { Webhook } from "@polar-sh/sdk";
import { polar } from "@/lib/polar";
import { createClient } from "@/utils/supabase/server";

const webhookSecret = process.env.POLAR_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("webhook-signature") || "";

  try {
    const webhook = new Webhook(webhookSecret);
    const event = webhook.verify(body, signature);

    const supabase = await createClient();

    // Handle subscription events
    if (event.type === "subscription.created" || event.type === "subscription.updated") {
      const sub = event.data;

      await supabase.from("user_subscriptions").upsert({
        user_id: sub.metadata?.user_id as string,
        polar_subscription_id: sub.id,
        plan_type: sub.product_id,
        status: sub.status,
        current_period_end: sub.current_period_end ? new Date(sub.current_period_end) : null,
        updated_at: new Date(),
      });
    }

    // Handle successful one-time payments if needed
    if (event.type === "checkout.completed") {
      const checkout = event.data;
      // Optional: mark one-time report as unlocked
    }

    return new Response("OK", { status: 200 });
  } catch (err: any) {
    console.error("Polar webhook error:", err);
    return new Response("Invalid signature", { status: 400 });
  }
}