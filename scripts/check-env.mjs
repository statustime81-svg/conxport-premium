import { existsSync, readFileSync } from 'node:fs';
const keys=['VITE_SUPABASE_URL','VITE_SUPABASE_ANON_KEY'];
const files=['.env.local','.env.production','.env'];const data={...process.env};
for(const file of files){if(!existsSync(file))continue;for(const line of readFileSync(file,'utf8').split(/\r?\n/)){const match=line.match(/^([A-Z][A-Z0-9_]*)=(.*)$/);if(match && !data[match[1]])data[match[1]]=match[2].replace(/^['"]|['"]$/g,'');}}
const missing=keys.filter(k=>!data[k] || /YOUR_|placeholder|example/i.test(data[k]));
if(missing.length){console.error('Missing required public env:',missing.join(', '));process.exitCode=1;}
if(Object.keys(data).some(k=>k.startsWith('VITE_') && /SERVICE_ROLE|SECRET|PRIVATE_KEY/.test(k))){console.error('WARNING: privileged key has VITE_ prefix');process.exitCode=1;}
if(!missing.length && !process.exitCode)console.log('Public environment configuration looks present (credentials not printed).');
