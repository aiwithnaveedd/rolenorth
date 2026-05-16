'use client';

import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  const supabase = createClient();

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/callback`,   // ← Important: /callback
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-md w-full text-center px-6">
        <h1 className="text-5xl font-bold mb-4">RoleNorth</h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10">
          Get AI-powered career insights from your resume
        </p>

        <Button onClick={signInWithGoogle} size="lg" className="w-full text-lg py-7">
          <LogIn className="mr-3" />
          Continue with Google
        </Button>
      </div>
    </div>
  );
}