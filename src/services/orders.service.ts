import axios from 'axios';

import { getToken } from '@/utils/auth';

import {
  CheckoutPayload,
  GetAllOrdersParams,
  ISingleOrder,
  OrderStatus,
} from '@/types/orders';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

const getAuthHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  'Content-Type': 'application/json',
});

// ==============================
// CREATE ORDER
// ==============================

export const createOrder = async ({
  name,
  phone,
  district,
  thana,
  address,
  note,
  isInsideDhaka,
}: CheckoutPayload) => {
  const payload = {
    name,
    phone,
    district,
    thana,
    address,
    note,
    isInsideDhaka,
  };

  const res = await axios.post(`${BASE_URL}/orders/checkout`, payload, {
    headers: getAuthHeaders(),
  });

  return res.data;
};

// ==============================
// BUY NOW
// ==============================

export const singleOrder = async (payload: ISingleOrder) => {
  const res = await axios.post(`${BASE_URL}/orders/buy-now`, payload, {
    headers: getAuthHeaders(),
  });

  return res.data;
};

// ==============================
// GET ALL ORDERS
// ==============================

export const getAllOrders = async (params?: GetAllOrdersParams) => {
  const res = await axios.get(`${BASE_URL}/orders/all`, {
    params,
    headers: getAuthHeaders(),
  });

  console.log(res);
  return res.data;
};

// ==============================
// GET USER ORDERS
// ==============================

export const getOrdersByUser = async () => {
  const res = await axios.get(`${BASE_URL}/orders`, {
    headers: getAuthHeaders(),
  });

  return res.data;
};

// ==============================
// UPDATE ORDER STATUS
// ==============================

export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus,
) => {
  if (!orderId) {
    throw new Error('Order ID is required');
  }

  const res = await axios.patch(
    `${BASE_URL}/orders/${orderId}/status`,
    {
      status,
    },
    {
      headers: getAuthHeaders(),
    },
  );

  return res.data;
};

// ==============================
// DELETE ORDER
// ==============================

export const deleteOrder = async (orderId: string) => {
  if (!orderId) {
    throw new Error('Order ID is required');
  }

  const res = await axios.delete(`${BASE_URL}/orders/${orderId}`, {
    headers: getAuthHeaders(),
  });

  return res.data;
};
