export function safeExternalUrl(value: string): string | null {
  try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password ? url.href : null; }
  catch { return null; }
}
export function safeInternalPath(value: string): string | null {
  if (!value.startsWith('/') || value.startsWith('//') || /[\\\r\n]/.test(value)) return null;
  try { const path = new URL(value, 'https://local.invalid');return path.origin === 'https://local.invalid' ? `${path.pathname}${path.search}${path.hash}` : null; } catch {return null;}
}
