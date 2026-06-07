// app/api/polar/create-checkout/route.ts
import { polar } from "@/lib/polar";
import { createClientServer } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { productId }: { productId: string } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 },
      );
    }

    const supabase = await createClientServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Correct Polar Checkout API (Updated)
    const checkout = await polar.checkouts.create({
      products: [productId],
      customerId: user.id,
      metadata: {
        user_id: user.id,
      },
      successUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/success?polar_checkout_id={CHECKOUT_ID}`,
      // cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
    });

    return NextResponse.json({
      url: checkout.url,
      checkoutId: checkout.id,
    });
  } catch (error: any) {
    console.error("Polar Checkout Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 },
    );
  }
}