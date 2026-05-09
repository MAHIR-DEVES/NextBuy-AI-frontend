export interface OrderItem {
  id: string;
  name: string;
  productId: string;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface Order {
  id: string;
  name: string;
  phone: string;
  address: string;
  isInsideDhaka: boolean;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  total: number;
  shippingFee: number;
  createdAt: string;
  updatedAt: string;

  items: OrderItem[];
  user: OrderUser;
  userId: string;
}
