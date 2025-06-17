
export type ContractStatus = 'active' | 'hidden' | 'bookmarked' | 'completed';

export type BarometerLevel = 'low' | 'medium' | 'high';

export type ValueCategory = 'low' | 'medium' | 'high';

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
  barometer: BarometerLevel;
  status: ContractStatus;
  additional_info?: string;
  created_at: string;
  riskScore?: number;
  analysisResult?: string;
}
