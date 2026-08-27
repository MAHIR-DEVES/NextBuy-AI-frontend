import axios from 'axios';
import { getToken } from '@/utils/auth';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export const getMe = async () => {
  const token = getToken();
  const res = await axios.get(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const updateUserRole = async (
  userId: string,
  role: 'ADMIN' | 'SUPER_ADMIN' | 'SELLER' | 'CUSTOMER',
) => {
  const token = getToken();

  console.log('TOKEN:', token);
  console.log('TOKEN LENGTH:', token?.length);

  if (!token) {
    throw new Error('Authentication token not found');
  }

  const res = await axios.put(
    `${BASE_URL}/users/${userId}`,
    { role },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};
