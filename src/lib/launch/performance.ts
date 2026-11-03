export function formatBytes(bytes: number): string {if (!Number.isFinite(bytes)||bytes<0)return 'Unknown';return `${(bytes/1024).toFixed(1)} KB`;}
export function isHeavyAsset(bytes: number, limitMB=5): boolean {return Number.isFinite(bytes) && bytes>limitMB*1024*1024;}
export function shouldEnable3D(prefersReducedMotion: boolean, coarsePointer: boolean): boolean {return !prefersReducedMotion && !coarsePointer;}
