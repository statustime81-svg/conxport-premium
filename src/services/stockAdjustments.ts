import {inventoryClient} from './inventoryAccess';
import {stockAdjustmentSchema,thresholdSchema} from '../lib/validations/inventory';
import type {StockAdjustment} from '../types/inventory';
export async function adjustStock(value:StockAdjustment):Promise<number>{const db=await inventoryClient();const parsed=stockAdjustmentSchema.parse(value);const {data,error}=await db.rpc('cx_adjust_stock',{p_product_id:parsed.productId,p_warehouse_id:parsed.warehouseId,p_delta:parsed.delta,p_reason:parsed.reason});if(error)throw error;return data as number;}
export async function setStockThreshold(productId:string,warehouseId:string,threshold:number){const db=await inventoryClient();const {error}=await db.rpc('cx_set_low_stock_threshold',{p_product_id:productId,p_warehouse_id:warehouseId,p_threshold:thresholdSchema.parse(threshold)});if(error)throw error;}
