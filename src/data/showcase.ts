/** Design-stage examples only. Replace with published Supabase catalogue records. */
export type ShowcaseCategory = { slug: string; name: string; description: string; accent: string; icon: 'monitor' | 'microscope' | 'stethoscope' | 'bed' };
export type ShowcaseProduct = { slug: string; name: string; category: string; model: string; summary: string; accent: string; icon: ShowcaseCategory['icon'] };

export const categories: ShowcaseCategory[] = [
  { slug: 'critical-care', name: 'Critical Care', description: 'Explore ICU monitoring and patient support solutions.', accent: '#47d8c2', icon: 'monitor' },
  { slug: 'laboratory-equipment', name: 'Laboratory Equipment', description: 'Discover precision instruments for modern laboratories.', accent: '#8dc5ff', icon: 'microscope' },
  { slug: 'diagnostic-equipment', name: 'Diagnostics', description: 'Equipment concepts for diagnostic workflows.', accent: '#a5e1b6', icon: 'stethoscope' },
  { slug: 'hospital-furniture', name: 'Hospital Furniture', description: 'Essential patient-room and clinical furnishings.', accent: '#cfb9ff', icon: 'bed' },
];

export const featuredProducts: ShowcaseProduct[] = [
  { slug: 'patient-monitor-concept', name: 'Multi-Parameter Patient Monitor', category: 'Critical Care', model: 'Illustrative model', summary: 'A placeholder product preview for the upcoming catalogue.', accent: '#47d8c2', icon: 'monitor' },
  { slug: 'digital-microscope-concept', name: 'Digital Laboratory Microscope', category: 'Laboratory Equipment', model: 'Illustrative model', summary: 'An example presentation, not a listed product or specification.', accent: '#8dc5ff', icon: 'microscope' },
  { slug: 'examination-bed-concept', name: 'Clinical Examination Bed', category: 'Hospital Furniture', model: 'Illustrative model', summary: 'A demonstration card pending real inventory and photography.', accent: '#cfb9ff', icon: 'bed' },
];
