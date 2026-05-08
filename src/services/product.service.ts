import { getToken } from '@/utils/auth';

type ProductQuery = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  isFeatured?: boolean;
  brand?: string;
  rating?: number;
};
const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export const getProducts = async (params?: ProductQuery) => {
  //  build query string dynamically
  const query = new URLSearchParams();

  if (params?.page) query.append('page', String(params.page));
  if (params?.limit) query.append('limit', String(params.limit));
  if (params?.search) query.append('search', params.search);
  if (params?.category) query.append('category', params.category);
  if (params?.minPrice) query.append('minPrice', String(params.minPrice));
  if (params?.maxPrice) query.append('maxPrice', String(params.maxPrice));
  if (params?.sortBy) query.append('sortBy', params.sortBy);
  if (params?.sortOrder) query.append('sortOrder', params.sortOrder);
  if (params?.isFeatured !== undefined)
    query.append('isFeatured', String(params.isFeatured));
  if (params?.brand) query.append('brand', params.brand);
  if (params?.rating) query.append('rating', String(params.rating));

  const url = `${process.env.NEXT_PUBLIC_BASE_API}/products${
    query.toString() ? `?${query.toString()}` : ''
  }`;

  const res = await fetch(url, {
    next: {
      revalidate: 60,
      tags: ['products'],
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
};

export const getSingleProduct = async (id: string) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'GET',
    cache: 'no-store',
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || 'Failed to fetch product');
  }

  return result;
};

export const deleteProduct = async (id: string) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};
