// app/api/webhooks/polar/route.ts
import * as PolarSDK from "@polar-sh/sdk";
import { createClient } from "@/lib/supabase/client";

const webhookSecret = process.env.POLAR_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("webhook-signature") || "";

  try {
    const webhook = new (PolarSDK as any).Webhook(webhookSecret);
    const event = webhook.verify(body, signature);

    console.log(`Received Polar event: ${event.type}`);

    const supabase = await createClient();

    if (event.type === "subscription.created" || event.type === "subscription.updated") {
      const sub = event.data;

      const { error } = await supabase.from("user_subscriptions").upsert({
        user_id: sub.metadata?.user_id as string,
        polar_subscription_id: sub.id,
        plan_type: sub.product_id || sub.product?.id, // safer
        status: sub.status,
        current_period_end: sub.current_period_end ? new Date(sub.current_period_end) : null,
        updated_at: new Date(),
      });

      if (error) console.error("Supabase upsert error:", error);
    }

    if (event.type === "checkout.completed") {
      const checkout = event.data;
      // Handle one-time purchases (e.g., single report)
      if (checkout.metadata?.plan_type === "one_time_report") {
        // Mark report access or credits in DB
        await supabase.from("user_reports").upsert({
          user_id: checkout.metadata.user_id,
          // add purchased report flag etc.
        });
      }
    }

    return new Response("OK", { status: 200 });
  } catch (err: any) {
    console.error("Polar webhook error:", err);
    return new Response("Invalid signature", { status: 400 });
  }
}