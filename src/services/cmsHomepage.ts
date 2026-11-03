import {getCmsPublic} from './cmsPublic';import type{CmsEntry}from '../types/cms';
export async function getHomepageBlock(slug:string):Promise<CmsEntry|null>{return getCmsPublic('homepage',slug);}
