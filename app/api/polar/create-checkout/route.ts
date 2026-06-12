// app/api/polar/create-checkout/route.ts
import { NextRequest } from "next/server";
import { polar } from "@/lib/polar";
import { createClient } from "@/lib/supabase/client";

export async function POST(req: NextRequest) {
  try {
    const { productId, planType } = await req.json();
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const checkout = await polar.checkouts.create({
      productId, // Must match Polar Product ID
      customer: {
        email: user.email,
      },
      successUrl: process.env.NEXT_PUBLIC_POLAR_SUCCESS_URL!,
      cancelUrl: process.env.NEXT_PUBLIC_POLAR_CANCEL_URL!,
      metadata: {
        user_id: user.id,
        plan_type: planType,
      },
    });

    return Response.json({ url: checkout.url });
  } catch (error: any) {
    console.error("Polar Checkout Error:", error);
    return Response.json(
      { error: error.message || "Failed to create checkout" },
      { status: 500 },
    );
  }
}