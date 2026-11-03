export type EnquiryStatus = 'new' | 'contacted' | 'quoted' | 'closed_won' | 'closed_lost';
export type BuyerType = 'hospital' | 'laboratory' | 'distributor' | 'institution' | 'individual' | 'other';
export interface CatalogueProduct {
  id: string;
  name: string;
  slug: string;
  sku: string;
  summary: string | null;
  description: string | null;
  is_published: boolean;
  primary_category_id: string | null;
  created_at: string;
}
export interface CatalogueCategory {
  id: string;
  parent_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  is_published: boolean;
}
export interface EnquiryRecord {
  id: string;
  reference: string;
  user_id: string | null;
  full_name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  city: string | null;
  buyer_type: BuyerType;
  quantity: number;
  requirements: string;
  status: EnquiryStatus;
  created_at: string;
}
