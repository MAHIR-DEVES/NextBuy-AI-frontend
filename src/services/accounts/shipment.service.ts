import axios from 'axios';

import { getToken } from '@/utils/auth';

import {
  ShipmentPayload,
  ShipmentQuery,
  ShipmentResponse,
} from '@/types/accounts/shipment.types';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_API}/shipments`;

const getConfig = () => {
  const token = getToken();

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllShipments = async (
  query?: ShipmentQuery,
): Promise<ShipmentResponse> => {
  const response = await axios.get(BASE_URL, {
    params: query,
    ...getConfig(),
  });

  return response.data.data;
};

export const getSingleShipment = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/${id}`, {
    ...getConfig(),
  });

  return response.data.data;
};

export const createShipment = async (payload: ShipmentPayload) => {
  const response = await axios.post(BASE_URL, payload, {
    ...getConfig(),
  });

  return response.data;
};

export const updateShipment = async (
  id: string,
  payload: Partial<ShipmentPayload>,
) => {
  const response = await axios.patch(`${BASE_URL}/${id}`, payload, {
    ...getConfig(),
  });

  return response.data;
};

export const deleteShipment = async (id: string) => {
  const response = await axios.delete(`${BASE_URL}/${id}`, {
    ...getConfig(),
  });

  return response.data;
};
