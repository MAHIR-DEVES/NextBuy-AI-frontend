export type MonthlyCostStatus = 'PAID' | 'UNPAID';

export interface MonthlyCost {
  id: string;
  date: string;
  description: string;
  amount: string | number;
  status: MonthlyCostStatus;
  createdAt: string;
  updatedAt: string;
}

export interface MonthlyCostPayload {
  date: string;
  description: string;
  amount: number;
  status: MonthlyCostStatus;
}

export interface MonthlyCostQuery {
  search?: string;
  status?: MonthlyCostStatus;
  page?: number;
  limit?: number;
}

export interface MonthlyCostMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface MonthlyCostSummary {
  totalCosts: number;
  paid: number;
  unpaid: number;
  totalAmount: number;
}

export interface MonthlyCostResponse {
  data: MonthlyCost[];
  meta: MonthlyCostMeta;
  summary: MonthlyCostSummary;
}
