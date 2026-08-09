import axios from 'axios';
import { getToken } from '@/utils/auth';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

const getConfig = () => {
  const token = getToken();

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
};

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryPayload {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive?: boolean;
}

const getAllCategories = async () => {
  const response = await axios.get(`${BASE_URL}/categories`, getConfig());

  return response.data;
};

const createCategory = async (data: CategoryPayload) => {
  const response = await axios.post(
    `${BASE_URL}/categories`,
    data,
    getConfig(),
  );

  return response.data;
};

const updateCategory = async (id: string, data: Partial<CategoryPayload>) => {
  const response = await axios.patch(
    `${BASE_URL}/categories/${id}`,
    data,
    getConfig(),
  );

  return response.data;
};

const deleteCategory = async (id: string) => {
  const response = await axios.delete(
    `${BASE_URL}/categories/${id}`,
    getConfig(),
  );

  return response.data;
};

export const CategoryService = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
