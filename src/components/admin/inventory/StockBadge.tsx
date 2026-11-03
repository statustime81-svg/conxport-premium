import {stockLabel,stockTone} from '../../../lib/inventory/format';
export default function StockBadge({quantity,threshold}:{quantity:number;threshold:number}){return <span style={{color:stockTone(quantity,threshold),fontWeight:650}}>{stockLabel(quantity,threshold)}</span>}
