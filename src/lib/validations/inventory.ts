import { z } from 'zod';
export const warehouseSchema=z.object({name:z.string().trim().min(2).max(120),code:z.string().trim().toUpperCase().regex(/^[A-Z0-9][A-Z0-9_-]{1,19}$/,'2-20 uppercase letters, digits, _ or -')});
export const stockAdjustmentSchema=z.object({productId:z.string().uuid(),warehouseId:z.string().uuid(),delta:z.number().int().min(-100000).max(100000).refine(v=>v!==0),reason:z.string().trim().min(3).max(300)});
export const thresholdSchema=z.number().int().min(0).max(1000000);
