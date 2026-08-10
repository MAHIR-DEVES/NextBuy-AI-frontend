import { CartItem } from './cart.type';

export type GetAllOrdersParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
};

export type CheckoutPayload = {
  items: CartItem[];
  name: string;
  phone: string;
  address: string;
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
  id?: string;
  productId: string;
  quantity: number;
  name?: string;
  price?: number;
}

export type OrderStatus =
  | 'PENDING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'PARTIAL';

export interface OrderUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface Order {
  id: string;
  userId?: string;

  name: string;
  phone: string;
  address: string;
  quantity: number;

  isInsideDhaka: boolean;

  total?: number;
  totalAmount?: number;

  shippingFee?: number;

  status: OrderStatus;

  createdAt?: string;
  updatedAt?: string;

  items?: OrderItem[];

  user?: OrderUser;
}

export interface OrderMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface OrderSummary {
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

  data: Order[];

  meta: OrderMeta;

  summary: OrderSummary;
}
