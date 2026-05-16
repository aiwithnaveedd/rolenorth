'use client';

import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button'; // we'll create later

export default function LoginPage() {
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">RoleNorth</h1>
        <Button onClick={handleGoogleLogin} size="lg">
          Continue with Google
        </Button>
      </div>
    </div>
  );
}