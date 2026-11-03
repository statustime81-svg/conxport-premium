import {inventoryClient} from './inventoryAccess';
import type {InventoryBalance} from '../types/inventory';
export async function getInventoryBalances():Promise<InventoryBalance[]>{const db=await inventoryClient();const {data,error}=await db.from('inventory_balances').select('product_id,warehouse_id,quantity,low_stock_threshold').limit(2000);if(error)throw error;return (data??[]) as InventoryBalance[];}
