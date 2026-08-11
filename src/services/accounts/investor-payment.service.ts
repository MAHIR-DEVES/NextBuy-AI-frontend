import axios from 'axios';

import { getToken } from '@/utils/auth';

import {
  InvestorPaymentPayload,
  InvestorPaymentQuery,
  InvestorPaymentResponse,
} from '@/types/accounts/investor-payment.types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const getAllInvestorPayments = async (
  query?: InvestorPaymentQuery,
): Promise<InvestorPaymentResponse> => {
  const response = await axios.get(`${BASE_URL}/investor-payments`, {
    params: query,
    ...getConfig(),
  });

  return response.data.data;
};

export const createInvestorPayment = async (
  payload: InvestorPaymentPayload,
) => {
  const response = await axios.post(
    `${BASE_URL}/investor-payments`,
    payload,
    getConfig(),
  );

  return response.data;
};

export const updateInvestorPayment = async (
  id: string,
  payload: Partial<InvestorPaymentPayload>,
) => {
  const response = await axios.patch(
    `${BASE_URL}/investor-payments/${id}`,
    payload,
    getConfig(),
  );

  return response.data;
};

export const deleteInvestorPayment = async (id: string) => {
  const response = await axios.delete(
    `${BASE_URL}/investor-payments/${id}`,
    getConfig(),
  );

  return response.data;
};

export const getSingleInvestorPayment = async (id: string) => {
  const response = await axios.get(
    `${BASE_URL}/investor-payments/${id}`,
    getConfig(),
  );

  return response.data;
};
