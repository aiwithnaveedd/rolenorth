// app/success/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SuccessPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const session_id = urlParams.get("session_id");
    if (session_id) setSessionId(session_id);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black flex items-center justify-center text-white">
      <div className="max-w-md text-center px-6">
        <div className="mx-auto w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-8">
          <CheckCircle className="w-12 h-12 text-emerald-400" />
        </div>

        <h1 className="text-5xl font-bold tracking-tight mb-4">Payment Successful!</h1>
        <p className="text-xl text-zinc-400 mb-10">
          Thank you for choosing RoleNorth. Your account has been upgraded.
        </p>

        <div className="space-y-4">
          <Button asChild size="lg" className="w-full h-14 text-lg">
            <Link href="/dashboard">
              Go to Dashboard <ArrowRight className="ml-2" />
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="w-full h-14">
            <Link href="/upload">Analyze Another Resume</Link>
          </Button>
        </div>

        {sessionId && (
          <p className="text-xs text-zinc-500 mt-8">
            Transaction ID: {sessionId.slice(0, 12)}...
          </p>
        )}
      </div>
    </div>
  );
}