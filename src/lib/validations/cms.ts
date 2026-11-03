import {z} from 'zod';
export const cmsSchema=z.object({
 kind:z.enum(['homepage','page','blog','case_study','resource']),
 slug:z.string().min(1).max(160).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/,'Use lowercase letters, numbers and hyphens'),
 title:z.string().trim().min(2).max(180),excerpt:z.string().max(500),body:z.string().max(100000),
 image_url:z.union([z.literal(''),z.url().refine(x=>/^https:\/\//.test(x),'Use HTTPS')]).nullable(),
 external_url:z.union([z.literal(''),z.url().refine(x=>/^https:\/\//.test(x),'Use HTTPS')]).nullable(),
 seo_title:z.string().max(70),seo_description:z.string().max(180),is_published:z.boolean()
});
