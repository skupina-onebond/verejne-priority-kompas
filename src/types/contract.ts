export type ContractStatus = 'active' | 'hidden' | 'bookmarked' | 'completed';

export type ValueCategory = 'low' | 'medium' | 'high';

export interface Finding {
  severity: 'nízká' | 'střední' | 'vysoká';
  category: string;
  description: string;
}

export interface PublicContract {
  id: string;
  title: string;
  description: string;
  value: number;
  valueCategory: ValueCategory;
  deadline: string;
  contracting_authority: string;
  sector: string;
  region: string;
  status: ContractStatus;
  created_at: string;

  // Voliteľné, ale užitočné
  administrator?: string;
  supplier?: string;
  supplierAnalysis?: string;
  additional_info?: string;
  analysis?: string;
  analysisResult?: string;

  // 💡 Dôležité pre kontrolóra
  findings?: Finding[];
  recommendations?: string[];

  // 🔻 Tieto polia nebudeme používať
  // riskScore?: number;
  // barometer?: any;
}
