import { requireSupabase } from '../lib/supabase/client';
export type ShowcaseKind='testimonial'|'client'|'certificate'|'expo_photo'|'expo_video'|'faq';
export type ShowcaseItem={id:string;kind:ShowcaseKind;title:string;body:string;media_url:string|null;sort_order:number;is_published:boolean;created_at:string};
export async function getShowcase(kind:ShowcaseKind){const {data,error}=await requireSupabase().from('site_showcase').select('*').eq('kind',kind).eq('is_published',true).order('sort_order').limit(100);if(error)throw error;return (data??[]) as ShowcaseItem[];}
export function youtubeEmbed(value:string){try{const url=new URL(value);let id='';if(url.hostname==='youtu.be')id=url.pathname.slice(1);else if(['www.youtube.com','youtube.com','m.youtube.com','www.youtube-nocookie.com'].includes(url.hostname))id=url.searchParams.get('v') || (url.pathname.startsWith('/embed/')?url.pathname.split('/')[2]:'');if(!/^[a-zA-Z0-9_-]{11}$/.test(id))return '';return `https://www.youtube-nocookie.com/embed/${id}`;}catch{return '';}}
export function safeImage(value:string|null){if(!value)return '';try{const u=new URL(value);return u.protocol==='https:'?u.href:'';}catch{return '';}}
