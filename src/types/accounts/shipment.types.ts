export type ShipmentStatus = 'PAID' | 'UNPAID';

export type ShippingStatus = 'PROCESSING' | 'COMPLETED';

export interface Shipment {
  id: string;
  date: string;
  description?: string | null;

  amount: string | number;
  status: ShipmentStatus;

  productName: string;
  quantity: number;

  shippingCompany: string;
  weight: string | number;
  perKgRate: string | number;
  shippingCharge: string | number;

  billingStatus: ShipmentStatus;
  shippingStatus: ShippingStatus;

  receivingDate?: string | null;

  investorName?: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface ShipmentPayload {
  date: string;
  description?: string;

  amount: number;
  status: ShipmentStatus;

  productName: string;
  quantity: number;

  shippingCompany: string;
  weight: number;
  perKgRate: number;
  shippingCharge: number;

  billingStatus: ShipmentStatus;
  shippingStatus: ShippingStatus;

  receivingDate?: string;

  investorName?: string;
}

export interface ShipmentQuery {
  search?: string;
  status?: ShipmentStatus;
  billingStatus?: ShipmentStatus;
  shippingStatus?: ShippingStatus;
  investorName?: string;
  shippingCompany?: string;
  page?: number;
  limit?: number;
}

export interface ShipmentMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ShipmentSummary {
  totalShipments: number;
  paid: number;
  unpaid: number;
  processing: number;
  completed: number;
  totalAmount: number;
  totalShippingCharge: number;
  totalQuantity: number;
  totalWeight: number;
}

export interface ShipmentResponse {
  data: Shipment[];
  meta: ShipmentMeta;
  summary: ShipmentSummary;
}
