import axios from 'axios';

import { getToken } from '@/utils/auth';
import {
  GetSteadfastWithdrawalsResponse,
  SteadfastWithdrawalPayload,
  SteadfastWithdrawalQuery,
} from '@/types/accounts/steadfast-withdrawal.types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

const STEADFAST_WITHDRAWAL_URL = `${BASE_URL}/steadfast-withdrawals`;

const getAuthHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  'Content-Type': 'application/json',
});

// ==============================
// GET ALL
// ==============================

export const getAllSteadfastWithdrawals = async (
  params?: SteadfastWithdrawalQuery,
): Promise<GetSteadfastWithdrawalsResponse> => {
  const response = await axios.get(STEADFAST_WITHDRAWAL_URL, {
    params,
    headers: getAuthHeaders(),
  });

  return response.data;
};

// ==============================
// GET SINGLE
// ==============================

export const getSingleSteadfastWithdrawal = async (id: string) => {
  const response = await axios.get(`${STEADFAST_WITHDRAWAL_URL}/${id}`, {
    headers: getAuthHeaders(),
  });

  return response.data;
};

// ==============================
// CREATE
// ==============================

export const createSteadfastWithdrawal = async (
  payload: SteadfastWithdrawalPayload,
) => {
  const response = await axios.post(STEADFAST_WITHDRAWAL_URL, payload, {
    headers: getAuthHeaders(),
  });

  return response.data;
};

// ==============================
// UPDATE
// ==============================

export const updateSteadfastWithdrawal = async (
  id: string,
  payload: SteadfastWithdrawalPayload,
) => {
  const response = await axios.patch(
    `${STEADFAST_WITHDRAWAL_URL}/${id}`,
    payload,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data;
};

// ==============================
// DELETE
// ==============================

export const deleteSteadfastWithdrawal = async (id: string) => {
  const response = await axios.delete(`${STEADFAST_WITHDRAWAL_URL}/${id}`, {
    headers: getAuthHeaders(),
  });

  return response.data;
};
