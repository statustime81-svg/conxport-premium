import {readdirSync,readFileSync,existsSync} from 'node:fs';import {join,relative} from 'node:path';
let failures=0,warnings=0;
function walk(dir){if(!existsSync(dir))return [];return readdirSync(dir,{withFileTypes:true}).flatMap(entry=>{const p=join(dir,entry.name);return entry.isDirectory()?walk(p):[p]})}
for(const file of walk('src')){if(!/\.(tsx?|jsx?)$/.test(file))continue;const content=readFileSync(file,'utf8');
 if(/VITE_(?:SUPABASE_)?(?:SERVICE_ROLE|SECRET|PRIVATE_KEY)/i.test(content)){console.error('FAIL privileged browser env:',relative('.',file));failures++}
 if(/dangerouslySetInnerHTML/.test(content)){console.warn('REVIEW HTML rendering:',relative('.',file));warnings++}
 if(/localStorage\.setItem\(\s*['"](?:token|password|secret)/i.test(content)){console.error('FAIL sensitive localStorage:',relative('.',file));failures++}
}
for(const file of walk('supabase/migrations')){if(!file.endsWith('.sql'))continue;const content=readFileSync(file,'utf8');if(/disable row level security/i.test(content)){console.error('FAIL RLS disabled:',file);failures++}}
console.log(`Static security scan: ${failures} failures, ${warnings} manual reviews. This does NOT verify live RLS or auth.`);if(failures)process.exitCode=1;
