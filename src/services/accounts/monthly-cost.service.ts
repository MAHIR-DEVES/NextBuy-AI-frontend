import axios from 'axios';

import { getToken } from '@/utils/auth';

import {
  MonthlyCostPayload,
  MonthlyCostQuery,
  MonthlyCostResponse,
} from '@/types/accounts/monthly-cost.types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const getAllMonthlyCosts = async (
  query?: MonthlyCostQuery,
): Promise<MonthlyCostResponse> => {
  const response = await axios.get(`${BASE_URL}/monthly-costs`, {
    params: query,
    ...getConfig(),
  });

  console.log(response);
  return response.data.data;
};

export const getSingleMonthlyCost = async (id: string) => {
  const response = await axios.get(
    `${BASE_URL}/monthly-costs/${id}`,
    getConfig(),
  );

  return response.data;
};

export const createMonthlyCost = async (payload: MonthlyCostPayload) => {
  const response = await axios.post(
    `${BASE_URL}/monthly-costs`,
    payload,
    getConfig(),
  );

  return response.data;
};

export const updateMonthlyCost = async (
  id: string,
  payload: Partial<MonthlyCostPayload>,
) => {
  const response = await axios.patch(
    `${BASE_URL}/monthly-costs/${id}`,
    payload,
    getConfig(),
  );

  return response.data;
};

export const deleteMonthlyCost = async (id: string) => {
  const response = await axios.delete(
    `${BASE_URL}/monthly-costs/${id}`,
    getConfig(),
  );

  return response.data;
};
