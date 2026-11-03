import { createClient } from 'npm:@supabase/supabase-js@2';

const cors = {
  'Access-Control-Allow-Origin': Deno.env.get('SITE_ORIGIN') ?? 'http://localhost:5173',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const response = (body: unknown, status: number) => new Response(JSON.stringify(body), {
  status, headers: { ...cors, 'Content-Type': 'application/json' },
});
const stringField = (v: unknown, min: number, max: number): v is string =>
  typeof v === 'string' && v.trim().length >= min && v.trim().length <= max;

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  if (req.method !== 'POST') return response({ error: 'Method not allowed' }, 405);
  if (Number(req.headers.get('content-length') ?? 0) > 16384) return response({ error: 'Payload too large' }, 413);
  try {
    const input: unknown = await req.json();
    if (!input || typeof input !== 'object' || Array.isArray(input)) return response({ error: 'Invalid input' }, 400);
    const b = input as Record<string, unknown>;
    if (b.website) return response({ error: 'Rejected' }, 400); // honeypot
    if (![b.fullName,b.email,b.phone,b.company,b.country,b.requirements].every(Boolean)) return response({ error: 'Required fields missing' }, 400);
    if (!stringField(b.fullName,2,120) || !stringField(b.email,5,254) ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(b.email)) ||
        !stringField(b.phone,7,30) || !/^[+()\d\s.-]+$/.test(String(b.phone)) ||
        !stringField(b.company,2,160) || !stringField(b.country,2,80) ||
        !stringField(b.requirements,10,5000) || b.consent !== true ||
        !['hospital','laboratory','distributor','institution','individual','other'].includes(String(b.buyerType)) ||
        !Number.isInteger(b.quantity) || Number(b.quantity) < 1 || Number(b.quantity) > 100000 ||
        (b.city != null && !stringField(b.city,0,100))) return response({ error: 'Invalid enquiry details' }, 400);
    if (!Array.isArray(b.productIds) || b.productIds.length > 30 ||
        !b.productIds.every((id: unknown) => typeof id === 'string' && /^[0-9a-f-]{36}$/i.test(id)))
      return response({ error: 'Invalid product IDs' }, 400);
    if (new Set(b.productIds).size !== b.productIds.length) return response({ error: 'Duplicate products' }, 400);

    const url = Deno.env.get('SUPABASE_URL');
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!url || !serviceKey) return response({ error: 'Server configuration missing' }, 503);
    const admin = createClient(url, serviceKey, { auth: { persistSession: false } });
    let userId: string | null = null;
    const bearer = req.headers.get('Authorization')?.replace(/^Bearer\s+/i, '');
    if (bearer && bearer !== Deno.env.get('SUPABASE_ANON_KEY')) {
      const { data: authData } = await admin.auth.getUser(bearer);
      userId = authData.user?.id ?? null;
    }
    // Throttle by email in addition to the honeypot. Add CAPTCHA / IP throttling before public launch.
    const email = String(b.email).trim().toLowerCase();
    const since = new Date(Date.now() - 15 * 60_000).toISOString();
    const { count, error: countError } = await admin.from('enquiries')
      .select('id', { head: true, count: 'exact' }).eq('email', email).gte('created_at', since);
    if (countError) return response({ error: 'Unable to validate request' }, 503);
    if ((count ?? 0) >= 3) return response({ error: 'Too many enquiries. Please retry later.' }, 429);
    if (b.productIds.length) {
      const { data: products, error: productError } = await admin.from('products')
        .select('id').eq('is_published', true).in('id', b.productIds as string[]);
      if (productError || products?.length !== b.productIds.length) return response({ error: 'Unknown products' }, 400);
    }
    const { data: enquiry, error: insertError } = await admin.from('enquiries').insert({
      user_id: userId, full_name: String(b.fullName).trim(), email,
      phone: String(b.phone).trim(), company: String(b.company).trim(),
      country: String(b.country).trim(), city: String(b.city ?? '').trim() || null,
      buyer_type: b.buyerType, quantity: b.quantity, requirements: String(b.requirements).trim(),
    }).select('id,reference').single();
    if (insertError || !enquiry) return response({ error: 'Unable to save enquiry' }, 503);
    if (b.productIds.length) {
      const { error: itemsError } = await admin.from('enquiry_items').insert(
        (b.productIds as string[]).map(product_id => ({ enquiry_id: enquiry.id, product_id, quantity: Number(b.quantity) })),
      );
      if (itemsError) {
        await admin.from('enquiries').delete().eq('id', enquiry.id);
        return response({ error: 'Unable to save requested products' }, 503);
      }
    }
    return response({ reference: enquiry.reference }, 201);
  } catch {
    return response({ error: 'Unable to process request' }, 400);
  }
});
