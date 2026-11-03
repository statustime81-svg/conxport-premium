import { inventoryClient } from './inventoryAccess';
import {warehouseSchema} from '../lib/validations/inventory';
import type {Warehouse} from '../types/inventory';
export async function getWarehouses():Promise<Warehouse[]>{const db=await inventoryClient();const {data,error}=await db.from('warehouses').select('id,name,code').order('name').limit(500);if(error)throw error;return (data??[]) as Warehouse[];}
export async function saveWarehouse(value:{name:string;code:string},id?:string){const db=await inventoryClient();const parsed=warehouseSchema.parse(value);const query=id?db.from('warehouses').update(parsed).eq('id',id):db.from('warehouses').insert(parsed);const {error}=await query;if(error)throw error;}
export async function removeWarehouse(id:string){const db=await inventoryClient();const {data,error}=await db.from('warehouses').delete().eq('id',id).select('id');if(error)throw error;if(!data?.length)throw new Error('Warehouse not removed. Existing stock or movements may reference it.');}
