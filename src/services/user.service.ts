import axios from 'axios';
import { getToken } from '@/utils/auth';

const token = getToken();
const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export const getMe = async () => {
  const res = await axios.get(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
