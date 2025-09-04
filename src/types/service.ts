export interface CustomerRecord {
  id: string;
  name: string;
  phone: string;
  address: string;
  serviceDate: string; // ISO date string
  serviceType: 'sump' | 'tank' | 'both';
  price: number;
  notes?: string;
  createdAt: string;
}

export interface MonthlyStats {
  totalIncome: number;
  customersServed: number;
  serviceBreakdown: {
    sump: number;
    tank: number;
    both: number;
  };
  month: string; // YYYY-MM format
}

export interface ServiceFormData {
  name: string;
  phone: string;
  address: string;
  serviceDate: string;
  serviceType: 'sump' | 'tank' | 'both';
  price: string;
  notes: string;
}

export type TabValue = 'home' | 'add' | 'analytics';