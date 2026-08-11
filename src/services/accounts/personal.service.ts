import axios from 'axios';

import { getToken } from '@/utils/auth';
import {
  GetPersonalEntriesParams,
  GetPersonalEntriesResponse,
  PersonalEntryPayload,
} from '@/types/acconts/personal-entry.types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

const PERSONAL_URL = `${BASE_URL}/personal-entries`;

const getAuthHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  'Content-Type': 'application/json',
});

// ==============================
// GET ALL PERSONAL ENTRIES
// ==============================

export const getAllPersonalEntries = async (
  params?: GetPersonalEntriesParams,
): Promise<GetPersonalEntriesResponse['data']> => {
  const response = await axios.get(PERSONAL_URL, {
    params,
    headers: getAuthHeaders(),
  });

  console.log(response);
  return response.data.data;
};

// ==============================
// GET SINGLE PERSONAL ENTRY
// ==============================

export const getSinglePersonalEntry = async (id: string) => {
  const response = await axios.get(`${PERSONAL_URL}/${id}`, {
    headers: getAuthHeaders(),
  });

  return response.data;
};

// ==============================
// CREATE PERSONAL ENTRY
// ==============================

export const createPersonalEntry = async (payload: PersonalEntryPayload) => {
  const response = await axios.post(PERSONAL_URL, payload, {
    headers: getAuthHeaders(),
  });

  return response.data;
};

// ==============================
// UPDATE PERSONAL ENTRY
// ==============================

export const updatePersonalEntry = async (
  id: string,
  payload: PersonalEntryPayload,
) => {
  const response = await axios.patch(`${PERSONAL_URL}/${id}`, payload, {
    headers: getAuthHeaders(),
  });

  return response.data;
};

// ==============================
// DELETE PERSONAL ENTRY
// ==============================

export const deletePersonalEntry = async (id: string) => {
  const response = await axios.delete(`${PERSONAL_URL}/${id}`, {
    headers: getAuthHeaders(),
  });

  return response.data;
};
