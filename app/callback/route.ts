import { createClientServer } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { createOrUpdateProfile } from '@/lib/supabase/utils';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  try {
    if (code) {
      const supabase = await createClientServer();
      const { data: { user } } = await supabase.auth.exchangeCodeForSession(code);

      if (user) {
        await createOrUpdateProfile(user);
      }
    }
  } catch (error) {
    console.error('Callback error:', error);
  }

  return NextResponse.redirect(new URL('/dashboard', requestUrl.origin));
}