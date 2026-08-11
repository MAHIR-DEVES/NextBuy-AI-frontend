export type PersonalEntryStatus = 'PAID' | 'UNPAID' | 'RECEIVED';

export type PersonalEntryType = 'COST' | 'RECEIVED';

export type ClearanceStatus = 'COMPLETED' | 'PENDING';

export interface PersonalEntry {
  id: string;
  date: string;
  description: string;
  amount: string | number;
  status: PersonalEntryStatus;
  type: PersonalEntryType;
  quantity: number;
  priceRmb: string | number;
  shippingCharge: string | number;
  paidReceivedBy: string;
  platform: string;
  clearanceStatus: ClearanceStatus;
  accountType: 'PERSONAL';
  createdAt: string;
  updatedAt: string;
}

export interface PersonalEntryPayload {
  date: string;
  description: string;
  amount: number;
  status: PersonalEntryStatus;
  type: PersonalEntryType;
  quantity: number;
  priceRmb: number;
  shippingCharge: number;
  paidReceivedBy: string;
  platform: string;
  clearanceStatus: ClearanceStatus;
}

export interface PersonalEntryMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PersonalEntrySummary {
  totalEntries: number;
  paid: number;
  unpaid: number;
  received: number;
}

export interface GetPersonalEntriesParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: PersonalEntryStatus;
  type?: PersonalEntryType;
}

export interface GetPersonalEntriesResponse {
  success: boolean;
  message: string;
  data: {
    data: PersonalEntry[];
    meta: PersonalEntryMeta;
    summary: PersonalEntrySummary;
  };
}
