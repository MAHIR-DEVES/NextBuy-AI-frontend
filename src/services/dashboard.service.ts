import { DashboardStats } from '@/types/dashboard.type';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await fetch(`${BASE_URL}/dashboard-analytics`, {
    next: {
      revalidate: 30,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch dashboard statistics');
  }

  const result = await response.json();

  return result.data;
};
