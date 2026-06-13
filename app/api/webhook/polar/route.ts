import * as polar from "@polar-sh/sdk";
import { createClientServer } from "@/lib/supabase/server";

const webhookSecret = process.env.POLAR_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("webhook-signature") || "";

  try {
    const WebhookClass = (polar as any).Webhook || (polar as any).default?.Webhook;
    if (!WebhookClass) {
      throw new Error("Webhook class not found in @polar-sh/sdk");
    }
    const webhook = new WebhookClass(webhookSecret);
    const event = webhook.verify(body, signature);

    const supabase = await createClientServer();

    if (event.type === "checkout.completed") {
      const checkout = event.data;
      const userId = checkout.metadata?.user_id as string;

      if (checkout.metadata?.plan_type === "one_time_report") {
        await supabase.from("user_reports").upsert({
          user_id: userId,
          has_access: true,
          purchased_at: new Date().toISOString(),
        });
      }
    }

    if (
      event.type === "subscription.created" ||
      event.type === "subscription.updated"
    ) {
      const sub = event.data;
      await supabase.from("user_subscriptions").upsert({
        user_id: sub.metadata?.user_id as string,
        polar_subscription_id: sub.id,
        plan_type: sub.product?.id || sub.metadata?.plan_type,
        status: sub.status,
        current_period_end: sub.current_period_end
          ? new Date(sub.current_period_end)
          : null,
      });
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response("Invalid signature", { status: 400 });
  }
}
