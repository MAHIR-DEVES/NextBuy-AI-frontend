import axios from 'axios';

import {
  WholesalePayload,
  WholesaleQuery,
  WholesaleResponse,
} from '@/types/accounts/wholesale.types';
import { getToken } from '@/utils/auth';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

const getAuthHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  'Content-Type': 'application/json',
});

export const getAllWholesales = async (
  query?: WholesaleQuery,
): Promise<WholesaleResponse> => {
  const response = await axios.get(`${BASE_URL}/wholesales`, {
    params: query,
    headers: getAuthHeaders(),
  });

  return response.data.data;
};

export const getSingleWholesale = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/wholesales/${id}`, {
    headers: getAuthHeaders(),
  });

  return response.data;
};

export const createWholesale = async (payload: WholesalePayload) => {
  const response = await axios.post(`${BASE_URL}/wholesales`, payload, {
    headers: getAuthHeaders(),
  });

  return response.data;
};

export const updateWholesale = async (
  id: string,
  payload: Partial<WholesalePayload>,
) => {
  const response = await axios.patch(`${BASE_URL}/wholesales/${id}`, payload, {
    headers: getAuthHeaders(),
  });

  return response.data;
};

export const deleteWholesale = async (id: string) => {
  const response = await axios.delete(`${BASE_URL}/wholesales/${id}`, {
    headers: getAuthHeaders(),
  });

  return response.data;
};
