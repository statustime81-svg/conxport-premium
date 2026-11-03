export default function CmsStatus({published}:{published:boolean}){return <span className="cx-overline" style={{color:published?'#64dcb7':'#e4bd85'}}>{published?'Published':'Draft'}</span>;}
