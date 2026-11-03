export type Warehouse={id:string;name:string;code:string};
export type InventoryProduct={id:string;name:string;sku:string};
export type InventoryBalance={product_id:string;warehouse_id:string;quantity:number;low_stock_threshold:number};
export type InventoryMovement={id:string;product_id:string;warehouse_id:string;delta:number;reason:string;actor_id:string|null;created_at:string};
export type InventoryRow=InventoryBalance & {product?:InventoryProduct;warehouse?:Warehouse};
export type StockAdjustment={productId:string;warehouseId:string;delta:number;reason:string};
