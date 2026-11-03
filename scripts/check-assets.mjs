import {existsSync,readdirSync,statSync} from 'node:fs';import {join} from 'node:path';
let count=0,oversize=0;function walk(dir){if(!existsSync(dir))return;for(const name of readdirSync(dir)){const file=join(dir,name);const s=statSync(file);if(s.isDirectory())walk(file);else if(/\.(glb|gltf|png|jpg|jpeg|webp|avif)$/i.test(name)){count++;if(s.size>5*1024*1024){console.warn('Large media asset:',file,Math.round(s.size/1048576)+'MB');oversize++}}}}
walk('public');console.log(`Scanned ${count} assets; ${oversize} above 5 MB. Remote Supabase media is not covered.`);
