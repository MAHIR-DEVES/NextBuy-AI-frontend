import axios from 'axios';
import { getToken } from '@/utils/auth';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

type WishlistPayload = {
  productId: string;
};

export const createWishlist = async (payload: WishlistPayload) => {
  const token = getToken();

  const res = await axios.post(`${BASE_URL}/wishlist`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getMyWishlist = async () => {
  const token = getToken();

  const res = await axios.get(`${BASE_URL}/wishlist`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// DELETE WISHLIST
export const deleteWishlist = async (wishlistId: string) => {
  const token = getToken();

  const res = await axios.delete(`${BASE_URL}/wishlist/${wishlistId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
