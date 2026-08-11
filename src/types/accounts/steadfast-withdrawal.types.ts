export type SteadfastWithdrawalStatus = 'PAID' | 'UNPAID';

export type SteadfastWithdrawalClearanceStatus = 'COMPLETED' | 'PENDING';

export interface SteadfastWithdrawal {
  id: string;
  date: string;
  description: string;
  amount: string | number;
  status: SteadfastWithdrawalStatus;
  withdrawBy: string;
  paymentMethod: string;
  clearanceStatus: SteadfastWithdrawalClearanceStatus;
  createdAt: string;
  updatedAt: string;
}

export interface SteadfastWithdrawalPayload {
  date: string;
  description: string;
  amount: number;
  status: SteadfastWithdrawalStatus;
  withdrawBy: string;
  paymentMethod: string;
  clearanceStatus: SteadfastWithdrawalClearanceStatus;
}

export interface SteadfastWithdrawalMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface SteadfastWithdrawalSummary {
  totalWithdrawals: number;
  paid: number;
  unpaid: number;
  totalAmount: number | string;
}

export interface SteadfastWithdrawalQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: SteadfastWithdrawalStatus;
  clearanceStatus?: SteadfastWithdrawalClearanceStatus;
  withdrawBy?: string;
}

export interface GetSteadfastWithdrawalsResponse {
  success: boolean;
  message: string;
  data: {
    data: SteadfastWithdrawal[];
    meta: SteadfastWithdrawalMeta;
    summary: SteadfastWithdrawalSummary;
  };
}
