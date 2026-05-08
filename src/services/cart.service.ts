import { getToken } from '@/utils/auth';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

const token = getToken();

export const addToCart = async (productId: string, quantity: number = 1) => {
  const res = await fetch(`${BASE_URL}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to add to cart');
  }

  return res.json();
};

export const getCartItems = async () => {
  const res = await fetch(`${BASE_URL}/cart`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to add to cart');
  }

  return res.json();
};

// update quantity
export const updateCartItem = async (cartId: string, quantity: number) => {
  const res = await fetch(`${BASE_URL}/cart/${cartId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      quantity,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to update cart');
  }

  return res.json();
};

// delete item
export const deleteCartItem = async (cartId: string) => {
  const res = await fetch(`${BASE_URL}/cart/${cartId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to delete cart item');
  }

  return res.json();
};
