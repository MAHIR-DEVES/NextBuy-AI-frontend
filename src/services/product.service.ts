import { getToken } from '@/utils/auth';

type ProductQuery = {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  isFeatured?: boolean;
  brand?: string;
  rating?: number;
};

export type ProductPayload = {
  name: string;
  slug?: string;
  description?: string;
  brand?: string;
  category?: string;
  tags?: string[];
  thumbnail?: string;
  images?: string[];
  videoUrl?: string;
  model?: string;
  material?: string;
  price?: number;
  specialPrice?: number | null;
  discount?: number | null;
  stock?: number;
  weight?: number | null;
  dimensions?: {
    length: number | null;
    width: number | null;
    height: number | null;
  };
  dangerousGoods?: boolean;
  warrantyType?: string;
  warrantyPeriod?: string;
  highlights?: string[];
  isFeatured?: boolean;
  isPublished?: boolean;
  colorVariants?: Array<{
    color: string;
    image?: string;
    sizes: Array<{
      size: string;
      price: number;
      specialPrice?: number | null;
      stock: number;
      sku: string;
    }>;
  }>;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export const getProducts = async (params?: ProductQuery) => {
  //  build query string dynamically
  const query = new URLSearchParams();

  if (params?.page) query.append('page', String(params.page));
  if (params?.limit) query.append('limit', String(params.limit));
  if (params?.search) query.append('search', params.search);
  if (params?.categoryId) query.append('categoryId', params.categoryId);
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

export const getSingleProduct = async (slugOrId: string) => {
  const res = await fetch(`${BASE_URL}/products/${slugOrId}`, {
    method: 'GET',
    cache: 'no-store',
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result?.message || 'Failed to fetch product');
  }

  return result;
};

export const createProduct = async (payload: ProductPayload) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result?.message || result?.error || 'Failed to create product',
    );
  }

  return result;
};

export const updateProduct = async (id: string, payload: ProductPayload) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  let res = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(payload),
  });

  if (
    !res.ok &&
    (res.status === 404 || res.status === 405 || res.status === 400)
  ) {
    res = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(payload),
    });
  }

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result?.message || result?.error || 'Failed to update product',
    );
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
