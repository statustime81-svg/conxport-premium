export type CmsKind='homepage'|'page'|'blog'|'case_study'|'resource';
export type CmsEntry={id:string;kind:CmsKind;slug:string;title:string;excerpt:string;body:string;image_url:string|null;external_url:string|null;seo_title:string;seo_description:string;is_published:boolean;published_at:string|null;created_at:string;updated_at:string};
export type CmsInput=Pick<CmsEntry,'kind'|'slug'|'title'|'excerpt'|'body'|'image_url'|'external_url'|'seo_title'|'seo_description'|'is_published'>;
export const cmsKinds: {value:CmsKind;label:string}[]=[{value:'homepage',label:'Homepage'},{value:'page',label:'Pages'},{value:'blog',label:'Blog'},{value:'case_study',label:'Case studies'},{value:'resource',label:'Resources'}];
