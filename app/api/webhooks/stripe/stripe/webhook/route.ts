// app/api/stripe/webhook/route.ts
import { stripe } from "@/lib/stripe";
import { createClientServer } from "@/lib/supabase/server";
import { NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const supabase = await createClientServer();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.user_id;

        if (userId) {
          await supabase
            .from("users")
            .update({
              subscription_status:
                session.mode === "subscription" ? "active" : "one_time",
              subscription_tier: session.metadata?.plan_type || "one-time",
            })
            .eq("id", userId);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        // Optional: Mark user as canceled
        console.log("Subscription canceled:", subscription.id);
        break;
      }

      case "invoice.payment_succeeded": {
        // Handle recurring payments
        console.log("Subscription payment successful");
        break;
      }
    }

    return new Response("Success", { status: 200 });
  } catch (error) {
    console.error("Webhook handling error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}