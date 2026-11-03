-- Public images only. Sensitive brochures and customer attachments are private.
insert into storage.buckets (id, name, public, file_size_limit)
values ('product-public','product-public',true,10485760),
       ('product-private','product-private',false,10485760),
       ('enquiry-attachments','enquiry-attachments',false,5242880)
on conflict (id) do nothing;

create policy "public product assets read" on storage.objects
  for select to anon, authenticated using (bucket_id = 'product-public');
-- Upload/update/delete to these buckets is intentionally disabled from the browser.
-- Controlled upload and gated signed-URL functions will be added later.
