// app/api/polar/create-checkout/route.ts
import { NextRequest } from "next/server";
import { polar } from "@/lib/polar";
import { createClientServer } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { productId, planType } = await req.json();

    const supabase = await createClientServer();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user?.id || !user?.email) {
      console.error("Auth error:", authError);
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Use real Product ID from Polar Dashboard
    const checkout = await polar.checkouts.create({
      products: [productId], // Must be real UUID
      customer: {
        email: user.email,
      },
      successUrl: process.env.NEXT_PUBLIC_POLAR_SUCCESS_URL!,
      cancelUrl: process.env.NEXT_PUBLIC_POLAR_CANCEL_URL!,
      metadata: {
        user_id: user.id,
        plan_type: planType || "default",
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