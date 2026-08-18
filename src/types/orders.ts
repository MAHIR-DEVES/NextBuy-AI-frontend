import { ProductPayload } from '@/services/product.service';

export type GetAllOrdersParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
};

export type CheckoutPayload = {
  name: string;
  phone: string;
  address: string;
  note?: string;
  thana: string;
  district: string;
  size?: string;
  isInsideDhaka: boolean;
};

export interface ISingleOrder {
  name: string;
  phone: string;
  address: string;
  isInsideDhaka: boolean;
  productId: string;
  quantity: number;
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  name: string;
  price: number;
}

export type OrderStatus =
  | 'PENDING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'PARTIAL';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  size: string | null;
  color: string | null;
  product: ProductPayload;
}

export interface OrderUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
}

export interface Order {
  id: string;
  userId: string;
  total: number;
  status: OrderStatus;
  quantity: number;
  totalAmount: number;
  name: string;
  phone: string;
  district: string;
  thana: string;
  address: string;
  note: string | null;

  isInsideDhaka: boolean;
  shippingFee: number;

  createdAt: string;
  updatedAt: string;

  items: OrderItem[];
  user: OrderUser;
}

export interface OrdersMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface OrdersSummary {
  totalOrders: number;
  totalPending: number;
  totalShipped: number;
  totalDelivered: number;
  totalCancelled: number;
  totalPartial: number;
}

export interface GetAllOrdersResponse {
  success: boolean;
  message: string;

  data: {
    orders: Order[];
    meta: OrdersMeta;
    summary: OrdersSummary;
  };
}

export interface UpdateOrderPayload {
  name?: string;
  phone?: string;
  district?: string;
  thana?: string;
  address?: string;
  note?: string | null;
  status?: OrderStatus;
}
