import type{CmsKind}from '../../types/cms';
export function formatCmsDate(value:string|null){if(!value)return 'Not published';const n=new Date(value);return Number.isNaN(n.valueOf())?'Unknown':n.toLocaleDateString();}
export function cmsPublicPath(kind:CmsKind,slug:string){if(kind==='homepage')return '/';if(kind==='page')return `/${slug}`;return `/${kind==='case_study'?'case-studies':kind==='resource'?'resources':'blog'}/${slug}`;}
export function safeCmsUrl(value:string|null){if(!value)return '';try{const url=new URL(value);return url.protocol==='https:'?url.href:'';}catch{return '';}}
