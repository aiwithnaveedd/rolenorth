import { createClientServer } from './server';

export async function createOrUpdateProfile(user: any) {
  const supabase = await createClientServer();

  // Use service role for first profile creation
  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      id: user.id,
      full_name: user.user_metadata?.full_name || user.user_metadata?.name || '',
      avatar_url: user.user_metadata?.avatar_url,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'id'
    });

  if (error) {
    console.error('Profile sync error:', error);
    // Don't throw — we don't want login to fail
  } else {
    console.log('Profile synced successfully');
  }
}