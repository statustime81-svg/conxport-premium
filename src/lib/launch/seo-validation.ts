export interface SeoAuditResult { valid: boolean; issues: string[] }
export function validateSeoMetadata(title: string, description: string, canonical: string): SeoAuditResult {
  const issues: string[] = [];
  if (!title.trim() || title.length > 70) issues.push('Title should be present and at most 70 characters');
  if (!description.trim() || description.length > 160) issues.push('Description should be present and at most 160 characters');
  try {const url=new URL(canonical);if(url.protocol!=='https:')issues.push('Canonical URL should use HTTPS');if(url.hash)issues.push('Canonical URL should not contain a fragment');}
  catch {issues.push('Canonical URL must be absolute')}
  return {valid:issues.length===0, issues};
}
