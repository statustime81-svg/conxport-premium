import {inventoryClient} from './inventoryAccess';
import type {InventoryProduct} from '../types/inventory';
export async function inventoryProducts():Promise<InventoryProduct[]>{const db=await inventoryClient();const {data,error}=await db.from('products').select('id,name,sku').order('name').limit(1000);if(error)throw error;return (data??[]) as InventoryProduct[];}
