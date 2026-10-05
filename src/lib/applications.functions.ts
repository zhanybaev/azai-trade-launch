import { createServerFn } from '@tanstack/react-start';
import { applicationSchema } from './application-schema';

export const submitApplication = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => applicationSchema.parse(input))
  .handler(async ({ data }) => {
    const { createClient } = await import('@supabase/supabase-js');
    const url = process.env['SUPABASE_URL'];
    const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
    if (!url || !key) return { success: false, message: 'Applications are temporarily unavailable. Please call 347-988-6771.' };
    const client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
        headers.set('apikey', key);
        return fetch(input, { ...init, headers });
      } },
    });
    const { website: _website, ...application } = data;
    const { error } = await client.from('driver_applications').insert(application);
    if (error) return { success: false, message: 'Your application could not be sent. Please try again or call 347-988-6771.' };
    return { success: true, message: 'Application received.' };
  });