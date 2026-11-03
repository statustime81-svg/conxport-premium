import {inventoryClient} from './inventoryAccess';
import type {InventoryMovement} from '../types/inventory';
export async function getInventoryMovements():Promise<InventoryMovement[]>{const db=await inventoryClient();const {data,error}=await db.from('inventory_movements').select('id,product_id,warehouse_id,delta,reason,actor_id,created_at').order('created_at',{ascending:false}).limit(300);if(error)throw error;return (data??[]) as InventoryMovement[];}
