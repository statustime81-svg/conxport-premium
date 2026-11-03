export function stockLabel(quantity:number,threshold:number){return quantity===0?'Out of stock':quantity<=threshold?'Low stock':'In stock';}
export function stockTone(quantity:number,threshold:number){return quantity===0?'#fb7185':quantity<=threshold?'#fbbf24':'#48d7bd';}
export function formatInventoryDate(value:string){return new Date(value).toLocaleString(undefined,{dateStyle:'medium',timeStyle:'short'});}
