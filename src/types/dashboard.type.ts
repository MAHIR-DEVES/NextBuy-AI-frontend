export type DashboardOrderStatus =
  | 'PENDING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'PARTIAL';

export interface DashboardSummary {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  averageOrderValue: number;
  last30DaysOrders: number;
  last7DaysOrders: number;
}

export interface RecentOrder {
  id: string;
  name: string;
  phone: string;
  total: number;
  status: DashboardOrderStatus;
  createdAt: string;
  itemsCount: number;
}

export interface OrderStatusCount {
  status: DashboardOrderStatus;
  count: number;
}

export interface TopProduct {
  productId: string;
  productName: string;
  thumbnail: string;
  quantity: number;
  revenue: number;
}

export interface RevenueTrendItem {
  date: string;
  revenue: number;
  orders: number;
}

export interface DashboardStats {
  summary: DashboardSummary;
  recentOrders: RecentOrder[];
  ordersByStatus: OrderStatusCount[];
  topProducts: TopProduct[];
  revenueTrend: RevenueTrendItem[];
}
