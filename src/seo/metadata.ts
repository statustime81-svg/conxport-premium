export type MetaInfo={title:string;description:string;canonicalPath?:string;image?:string;type?:'website'|'article'|'product';noindex?:boolean};
export const SITE_NAME='ConXport';
export const DEFAULT_META:MetaInfo={title:'ConXport | Medical Equipment & Institutional Enquiries',description:'Explore hospital and laboratory equipment and request a tailored quotation from ConXport.',canonicalPath:'/'};
export function cleanMetaText(value:string,max=160){return value.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim().slice(0,max);}
export function absoluteUrl(path:string){const origin=(import.meta.env.VITE_SITE_URL as string|undefined)?.replace(/\/$/,'')||'http://localhost:5173';return new URL(path,origin).href;}
