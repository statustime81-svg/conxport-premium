-- TEST ONLY. Explicitly deletes only records matching the unique DEMO identifiers.
-- Removes dependent product categories/inventory rows via foreign-key cascade/restrictions as needed.
BEGIN;
DELETE FROM public.inventory_balances WHERE product_id IN (SELECT id FROM public.products WHERE sku LIKE 'CX-DEMO-%');
DELETE FROM public.product_categories WHERE product_id IN (SELECT id FROM public.products WHERE sku LIKE 'CX-DEMO-%');
DELETE FROM public.product_media WHERE product_id IN (SELECT id FROM public.products WHERE sku LIKE 'CX-DEMO-%');
DELETE FROM public.products WHERE sku LIKE 'CX-DEMO-%';
DELETE FROM public.cms_entries WHERE slug IN ('equipment-selection-checklist-demo','icu-procurement-overview-demo','sample-hospital-planning-demo','procurement-request-template-demo','equipment-support-overview-demo','main-demo');
DELETE FROM public.warehouses WHERE code='CX-DEMO-WH';
DELETE FROM public.categories WHERE slug IN ('icu-beds','patient-monitors','ventilators','ultrasound-systems','centrifuges','operating-lights');
DELETE FROM public.categories WHERE slug IN ('hospital-furniture','critical-care','diagnostic-equipment','laboratory-equipment','surgical-equipment','hospital-supplies');
COMMIT;
