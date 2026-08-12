import { OrderStatus } from './orders';

export type AnalyticsFilter = {
  year: number;
  month: number | null;
};

export type AnalyticsSummary = {
  totalOrders: number;
  deliveredOrders: number;
  pendingOrders: number;
  shippedOrders: number;
  cancelledOrders: number;
  partialOrders: number;

  totalSales: number;
  totalShippingRevenue: number;
  averageOrderValue: number;
  totalProductsSold: number;

  insideDhakaOrders: number;
  outsideDhakaOrders: number;
  insideDhakaRevenue: number;
  outsideDhakaRevenue: number;
};

export type RevenueTrend = {
  date: string;
  revenue: number;
  orders: number;
};

export type OrdersByStatus = {
  status: OrderStatus;
  count: number;
};

export type BestSellingProduct = {
  productId: string;
  productName: string;
  thumbnail: string;
  quantity: number;
  revenue: number;
};

export type TopDistrict = {
  district: string;
  orders: number;
  revenue: number;
};

export type TopCustomer = {
  userId: string;
  name: string;
  phone: string;
  orders: number;
  revenue: number;
};

export type AnalyticsData = {
  filter: AnalyticsFilter;
  summary: AnalyticsSummary;
  revenueTrend: RevenueTrend[];
  ordersByStatus: OrdersByStatus[];
  bestSellingProducts: BestSellingProduct[];
  topDistricts: TopDistrict[];
  topCustomers: TopCustomer[];
};

export type AnalyticsResponse = {
  success: boolean;
  message: string;
  data: AnalyticsData;
};

export type GetAnalyticsParams = {
  year?: number;
  month?: number;
};
