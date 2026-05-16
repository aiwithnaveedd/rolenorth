import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // TODO: Implement Stripe webhook later
  console.log("Stripe webhook received");
  return NextResponse.json({ received: true });
}
