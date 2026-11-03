-- CONXPORT TEST DATA. Run only in a development / staging Supabase project.
-- Assumes migrations 0001-0008 (and 0009 for settings) already exist.
-- Idempotent upserts; preserves unrelated records. Do not run in production.
-- Synthetic examples for admin QA, not genuine product specifications or certificates.
BEGIN;

-- If category.image_url has not yet been migrated, add it for catalogue cards.
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS image_url text;

-- Slugs are strictly lowercase and hyphenated; names and SKUs retain their case.
INSERT INTO public.categories (name,slug,description,parent_id,is_published)
VALUES
 ('Hospital Furniture','hospital-furniture','TEST: hospital beds and care-room furniture',NULL,true),
 ('Critical Care','critical-care','TEST: ICU and monitoring equipment',NULL,true),
 ('Diagnostic Equipment','diagnostic-equipment','TEST: diagnostic devices',NULL,true),
 ('Laboratory Equipment','laboratory-equipment','TEST: sample processing and laboratory devices',NULL,true),
 ('Surgical Equipment','surgical-equipment','TEST: operating theatre equipment',NULL,true),
 ('Hospital Supplies','hospital-supplies','TEST: hospital consumables and related equipment',NULL,true)
ON CONFLICT (slug) DO UPDATE SET name=EXCLUDED.name,description=EXCLUDED.description,is_published=EXCLUDED.is_published;

INSERT INTO public.categories (name,slug,description,parent_id,is_published)
SELECT x.name,x.slug,x.description,c.id,true
FROM (VALUES
 ('ICU Beds','icu-beds','TEST: intensive care beds','hospital-furniture'),
 ('Patient Monitors','patient-monitors','TEST: vital signs monitoring','critical-care'),
 ('Ventilators','ventilators','TEST: respiratory support devices','critical-care'),
 ('Ultrasound Systems','ultrasound-systems','TEST: sonography devices','diagnostic-equipment'),
 ('Centrifuges','centrifuges','TEST: laboratory sample centrifuges','laboratory-equipment'),
 ('Operating Lights','operating-lights','TEST: surgical lights','surgical-equipment')
) AS x(name,slug,description,parent_slug)
JOIN public.categories c ON c.slug=x.parent_slug
ON CONFLICT (slug) DO UPDATE SET name=EXCLUDED.name,description=EXCLUDED.description,parent_id=EXCLUDED.parent_id,is_published=true;

INSERT INTO public.products (name,slug,sku,summary,description,primary_category_id,is_published)
SELECT x.name,x.slug,x.sku,x.summary,x.description,c.id,true
FROM (VALUES
 ('Electric ICU Bed - Demo','electric-icu-bed-demo','CX-DEMO-BED-001','Demo adjustable ICU bed','TEST RECORD ONLY. Specifications and availability are illustrative.','icu-beds'),
 ('Multi-Parameter Monitor - Demo','multi-parameter-monitor-demo','CX-DEMO-MON-002','Demo bedside patient monitor','TEST RECORD ONLY. Not an actual offer or medical device listing.','patient-monitors'),
 ('ICU Ventilator - Demo','icu-ventilator-demo','CX-DEMO-VEN-003','Demo respiratory equipment','TEST RECORD ONLY. Technical specifications are intentionally omitted.','ventilators'),
 ('Portable Ultrasound - Demo','portable-ultrasound-demo','CX-DEMO-US-004','Demo ultrasound listing','TEST RECORD ONLY. Confirm clinical approvals before publishing real data.','ultrasound-systems'),
 ('Laboratory Centrifuge - Demo','laboratory-centrifuge-demo','CX-DEMO-LAB-005','Demo sample-processing centrifuge','TEST RECORD ONLY. Not a verified supplier product.','centrifuges'),
 ('LED Surgical Light - Demo','led-surgical-light-demo','CX-DEMO-OR-006','Demo operating light','TEST RECORD ONLY. No real manufacturer claims.','operating-lights'),
 ('Manual Hospital Bed - Demo','manual-hospital-bed-demo','CX-DEMO-BED-007','Demo standard hospital bed','TEST RECORD ONLY.','hospital-furniture'),
 ('ECG Device - Demo','ecg-device-demo','CX-DEMO-DIAG-008','Demo ECG system','TEST RECORD ONLY.','diagnostic-equipment'),
 ('Microscope - Demo','microscope-demo','CX-DEMO-LAB-009','Demo laboratory microscope','TEST RECORD ONLY.','laboratory-equipment'),
 ('Patient Transfer Trolley - Demo','patient-transfer-trolley-demo','CX-DEMO-SUP-010','Demo medical trolley','TEST RECORD ONLY.','hospital-supplies')
) AS x(name,slug,sku,summary,description,category_slug)
JOIN public.categories c ON c.slug=x.category_slug
ON CONFLICT (slug) DO UPDATE SET name=EXCLUDED.name,sku=EXCLUDED.sku,summary=EXCLUDED.summary,description=EXCLUDED.description,primary_category_id=EXCLUDED.primary_category_id,is_published=true,updated_at=now();

-- Populate the many-to-many product -> category relation used by the catalogue.
INSERT INTO public.product_categories(product_id,category_id)
SELECT p.id,p.primary_category_id FROM public.products p WHERE p.slug LIKE '%-demo' AND p.primary_category_id IS NOT NULL
ON CONFLICT (product_id,category_id) DO NOTHING;
INSERT INTO public.product_categories(product_id,category_id)
SELECT p.id,c.parent_id FROM public.products p JOIN public.categories c ON p.primary_category_id=c.id
WHERE p.slug LIKE '%-demo' AND c.parent_id IS NOT NULL
ON CONFLICT (product_id,category_id) DO NOTHING;

-- One synthetic warehouse with inventory for each demo product.
INSERT INTO public.warehouses(name,code) VALUES('QA Demo Warehouse','CX-DEMO-WH')
ON CONFLICT(code) DO UPDATE SET name=EXCLUDED.name;
INSERT INTO public.inventory_balances(product_id,warehouse_id,quantity,low_stock_threshold)
SELECT p.id,w.id,case when p.sku='CX-DEMO-VEN-003' then 1 else 12 end,3
FROM public.products p CROSS JOIN public.warehouses w
WHERE p.sku LIKE 'CX-DEMO-%' AND w.code='CX-DEMO-WH'
ON CONFLICT(product_id,warehouse_id) DO UPDATE SET quantity=EXCLUDED.quantity, low_stock_threshold=EXCLUDED.low_stock_threshold;

-- Seed the live CMS tables so blog, case studies, pages, resources show content.
-- Synthetic editorial copy; not real client stories or guarantees.
INSERT INTO public.cms_entries(kind,slug,title,excerpt,body,is_published,published_at)
VALUES
 ('blog','equipment-selection-checklist-demo','Equipment Selection Checklist (Demo)','QA article for blog management.','Demo guide: collect requirements, request documents, compare products and obtain an approved quotation.',true,now()),
 ('blog','icu-procurement-overview-demo','ICU Procurement Overview (Demo)','QA article for healthcare equipment sourcing.','Sample CMS content for testing create, edit, publish and delete features.',true,now()),
 ('case_study','sample-hospital-planning-demo','Sample Hospital Planning (Demo)','Fictional scenario for admin testing only.','Synthetic case-study example. No actual customer, installation or results are claimed.',true,now()),
 ('resource','procurement-request-template-demo','Procurement Request Template (Demo)','Sample equipment requirements checklist.','Sample template fields: equipment name, quantity, department, required documents and contact details.',true,now()),
 ('page','equipment-support-overview-demo','Equipment Support Overview (Demo)','Draft-style sample page for CMS testing.','Demo information page. Replace with approved company content before production.',true,now()),
 ('homepage','main-demo','Homepage Test Block','Temporary homepage CMS block.','This is a synthetic test block. Remove after admin verification.',false,NULL)
ON CONFLICT(kind,slug) DO UPDATE SET title=EXCLUDED.title,excerpt=EXCLUDED.excerpt,body=EXCLUDED.body,is_published=EXCLUDED.is_published,published_at=EXCLUDED.published_at;

COMMIT;

-- QA: These return counts for the demo fixture.
SELECT 'demo_categories' AS entity, count(*) AS total FROM public.categories WHERE slug IN ('hospital-furniture','critical-care','diagnostic-equipment','laboratory-equipment','surgical-equipment','hospital-supplies','icu-beds','patient-monitors','ventilators','ultrasound-systems','centrifuges','operating-lights')
UNION ALL SELECT 'demo_products',count(*) FROM public.products WHERE sku LIKE 'CX-DEMO-%'
UNION ALL SELECT 'demo_cms',count(*) FROM public.cms_entries WHERE slug LIKE '%-demo';
