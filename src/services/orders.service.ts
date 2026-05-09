import axios from 'axios';
import { CartItem } from '@/types/cart.type';
import { getToken } from '@/utils/auth';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;
const token = getToken();

export type CheckoutPayload = {
  items: CartItem[];
  name: string;
  phone: string;
  address: string;
  isInsideDhaka: boolean;
};

export const createOrder = async ({
  items,
  name,
  phone,
  address,
  isInsideDhaka,
}: CheckoutPayload) => {
  const payload = {
    name,
    phone,
    address,
    isInsideDhaka,

    items: items.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
    })),
  };

  const res = await axios.post(`${BASE_URL}/orders/checkout`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

interface ISingleOrder {
  name: string;
  phone: string;
  address: string;
  isInsideDhaka: boolean;
  productId: string;
  quantity: number;
}

export const singleOrder = async (payload: ISingleOrder) => {
  const res = await axios.post(`${BASE_URL}/orders/buy-now`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return res.data;
};

export const getAllOrders = async () => {
  const res = await axios.get(`${BASE_URL}/orders/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
