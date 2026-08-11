export type InvestorPaymentStatus = 'PAID' | 'UNPAID';

export type InvestmentStatus = 'RUNNING' | 'COMPLETED';

export interface InvestorPayment {
  id: string;
  date: string;
  description: string;
  amount: string | number;
  status: InvestorPaymentStatus;

  investorName: string;

  investedAmount: string | number;
  receivedAmount: string | number;

  paymentBy: string;
  referenceBy: string;
  platform: string;

  investmentStatus: InvestmentStatus;

  monthsPaid: number;

  buyProducts: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface InvestorPaymentPayload {
  date: string;
  description: string;
  amount: number;
  status: InvestorPaymentStatus;

  investorName: string;

  investedAmount: number;
  receivedAmount: number;

  paymentBy: string;
  referenceBy: string;
  platform: string;

  investmentStatus: InvestmentStatus;

  monthsPaid: number;

  buyProducts: string;
}

export interface InvestorPaymentMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface InvestorPaymentSummary {
  totalPayments: number;
  paid: number;
  unpaid: number;
  totalAmount: number;
  totalInvestedAmount: number;
  totalReceivedAmount: number;
  totalMonthsPaid: number;
}

export interface InvestorPaymentResponse {
  data: InvestorPayment[];
  meta: InvestorPaymentMeta;
  summary: InvestorPaymentSummary;
}

export interface InvestorPaymentQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: InvestorPaymentStatus;
  investmentStatus?: InvestmentStatus;
  investorName?: string;
  platform?: string;
}
