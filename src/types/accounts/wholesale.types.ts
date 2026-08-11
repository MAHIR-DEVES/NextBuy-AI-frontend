export type WholesaleStatus = 'PAID' | 'UNPAID';

export interface Wholesale {
  id: string;

  date: string;
  description?: string | null;

  amount: string | number;
  status: WholesaleStatus;

  productName: string;
  quantity: number;

  priceRmb: string | number;
  priceTaka: string | number;

  weight: string | number;
  costPerKg: string | number;

  shipping: string | number;
  courierChina?: string | null;

  note?: string | null;

  onePairPrice: string | number;
  salePrice: string | number;

  loss: string | number;
  profit: string | number;

  createdAt: string;
  updatedAt: string;
}

export interface WholesalePayload {
  date: string;
  description?: string;

  amount: number;
  status?: WholesaleStatus;

  productName: string;
  quantity: number;

  priceRmb: number;
  priceTaka: number;

  weight: number;
  costPerKg: number;

  shipping: number;
  courierChina?: string;

  note?: string;

  onePairPrice: number;
  salePrice: number;

  loss?: number;
  profit?: number;
}

export interface WholesaleQuery {
  search?: string;
  status?: WholesaleStatus;
  productName?: string;
  courierChina?: string;

  page?: number;
  limit?: number;
}

export interface WholesaleMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface WholesaleSummary {
  totalWholesales: number;
  paid: number;
  unpaid: number;

  totalAmount: number;
  totalShipping: number;
  totalQuantity: number;
  totalWeight: number;
  totalProfit: number;
  totalLoss: number;
}

export interface WholesaleResponse {
  data: Wholesale[];
  meta: WholesaleMeta;
  summary: WholesaleSummary;
}
