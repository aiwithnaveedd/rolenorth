// lib/polar.ts
import { Polar } from "@polar-sh/sdk";

export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: (process.env.POLAR_SERVER as "sandbox" | "production") || "sandbox",
  // server: "sandbox" // Use this for testing
});

export const POLAR_WEBHOOK_SECRET = process.env.POLAR_WEBHOOK_SECRET!;