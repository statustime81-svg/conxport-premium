import { useSyncExternalStore } from 'react';
export const QUOTE_STORAGE_KEY = 'conxport-quote-list-v1';
const EVENT = 'conxport-quote-list-change';
let cachedRaw: string | null = null;
let cachedItems: string[] = [];
function normalize(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((v): v is string => typeof v === 'string' && v.length > 0))];
}
export function getQuoteItems(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(QUOTE_STORAGE_KEY);
    if (raw !== cachedRaw) { cachedRaw = raw; cachedItems = normalize(JSON.parse(raw ?? '[]') as unknown); }
    return cachedItems;
  } catch { return []; }
}
function save(items: string[]) {
  if (typeof window === 'undefined') return;
  try {
    const next = normalize(items);
    localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(next));
    cachedRaw = null;
    window.dispatchEvent(new Event(EVENT));
  } catch { /* Storage may be unavailable; do not pretend items were saved. */ }
}
export const addQuoteItem = (slug: string) => save([...getQuoteItems(), slug]);
export const removeQuoteItem = (slug: string) => save(getQuoteItems().filter((x) => x !== slug));
export const clearQuoteItems = () => save([]);
function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(EVENT, callback);
  window.addEventListener('storage', callback);
  return () => { window.removeEventListener(EVENT, callback); window.removeEventListener('storage', callback); };
}
const serverSnapshot = (): string[] => [];
export function useQuoteItems() { return useSyncExternalStore(subscribe, getQuoteItems, serverSnapshot); }
