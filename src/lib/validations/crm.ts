import { z } from 'zod';
export const crmStatusSchema=z.enum(['new','contacted','quoted','closed_won','closed_lost']);
export const crmNoteSchema=z.string().trim().min(1).max(3000);
export const crmUuidSchema=z.string().uuid();
export const crmSearchSchema=z.string().trim().max(100);
