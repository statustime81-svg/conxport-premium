import type { EnquiryStatus } from '../../../types/crm';
import { crmStatusLabel } from '../../../lib/crm/format';
export default function StatusBadge({status}:{status:EnquiryStatus}){return <span style={{display:'inline-block',border:'1px solid #4b8181',borderRadius:40,padding:'4px 10px',fontSize:12,color:'#87ebdd'}}>{crmStatusLabel(status)}</span>;}
