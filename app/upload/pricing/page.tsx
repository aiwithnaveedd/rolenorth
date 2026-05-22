// app/pricing/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "One-Time Report",
    price: "9.99",
    period: "one-time",
    description: "Perfect for a single career analysis",
    features: [
      "1 AI Resume Analysis",
      "Full Career Intelligence Report",
      "PDF Download",
      "Strengths & Weaknesses",
      "90-Day Action Plan",
    ],
    buttonText: "Get Report - $9.99",
    popular: false,
    priceId: "one_time",
  },
  {
    name: "Basic Monthly",
    price: "15",
    period: "/month",
    description: "Monthly career insights",
    features: [
      "Unlimited Reports",
      "Monthly Career Health Tracking",
      "Progress Comparison",
      "Basic AI Insights",
      "Email Support",
    ],
    buttonText: "Start Basic Plan",
    popular: false,
    priceId: "monthly_basic",
  },
  {
    name: "Pro Monthly",
    price: "49",
    period: "/month",
    description: "Most Popular",
    features: [
      "Everything in Basic",
      "Advanced Skill Decay Analysis",
      "Automation Risk Assessment",
      "Career Pivot Strategies",
      "Priority AI Analysis",
      "Dedicated Support",
    ],
    buttonText: "Go Pro - $49/mo",
    popular: true,
    priceId: "monthly_pro",
  },
  {
    name: "Transition Quarterly",
    price: "199",
    period: "/quarter",
    description: "For serious career changers",
    features: [
      "Everything in Pro",
      "3 Months Unlimited Access",
      "1:1 Career Strategy Call",
      "Resume Optimization Tips",
      "Job Market Intelligence",
      "Personalized Coaching Insights",
    ],
    buttonText: "Choose Quarterly",
    popular: false,
    priceId: "quarterly_transition",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1 text-sm font-medium text-blue-400">
            Pricing
          </span>
          <h1 className="text-5xl font-bold tracking-tight mt-6 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Choose the plan that best fits your career goals. Cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 border ${
                plan.popular
                  ? "border-violet-500 bg-zinc-900/70 scale-105"
                  : "border-white/10 bg-zinc-900/50"
              } transition-all hover:border-white/20`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-semibold px-6 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4" /> MOST POPULAR
                </div>
              )}

              <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-5xl font-bold"> ${plan.price}</span>
                <span className="text-zinc-400 ml-2">{plan.period}</span>
              </div>

              <p className="text-zinc-400 mb-8 min-h-[48px]">{plan.description}</p>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-300">
                    <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                size="lg"
                className={`w-full h-14 text-base font-semibold rounded-2xl ${
                  plan.popular
                    ? "bg-violet-600 hover:bg-violet-700"
                    : "bg-white text-black hover:bg-zinc-200"
                }`}
              >
                <Link href={`/subscribe?plan=${plan.priceId}`}>
                  {plan.buttonText}
                </Link>
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-zinc-500 mt-12 text-sm">
          All plans include secure Google login and instant AI analysis.
          <br /> Questions? Contact us at support@rolenorth.com
        </p>
      </div>
    </div>
  );
}