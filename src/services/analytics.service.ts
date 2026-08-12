import axios from 'axios';
import { getToken } from '@/utils/auth';
import { AnalyticsResponse, GetAnalyticsParams } from '@/types/analytics.type';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export const getAnalytics = async (
  params?: GetAnalyticsParams,
): Promise<AnalyticsResponse> => {
  const token = getToken();

  const response = await axios.get<AnalyticsResponse>(`${BASE_URL}/analytics`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
