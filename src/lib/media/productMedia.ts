export type ModelMedia={url:string;filename:string};
export function isGlbPath(path:string){return /\.glb$/i.test(path.split('?')[0]||'')&&!path.includes('..')&&!path.startsWith('/');}
export function isImagePath(path:string){return /\.(png|jpe?g|webp|avif)$/i.test(path.split('?')[0]||'')&&!path.includes('..');}
export function safeModelName(path:string){return path.split('/').pop()||'Product model';}
