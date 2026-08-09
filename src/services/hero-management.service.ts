import axios from 'axios';
import { getToken } from '@/utils/auth';

import {
  Hero,
  CreateHeroPayload,
  UpdateHeroPayload,
  HeroApiResponse,
} from '@/types/heroManagement';

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

// Get All Heroes
const getAllHeroes = async (
  isShowing?: boolean,
): Promise<HeroApiResponse<Hero[]>> => {
  const response = await axios.get<HeroApiResponse<Hero[]>>(
    `${BASE_URL}/heroes`,
    {
      ...getConfig(),

      params:
        isShowing !== undefined
          ? {
              isShowing,
            }
          : undefined,
    },
  );

  return response.data;
};

// Get Single Hero
const getHeroById = async (id: string): Promise<HeroApiResponse<Hero>> => {
  const response = await axios.get<HeroApiResponse<Hero>>(
    `${BASE_URL}/heroes/${id}`,
    getConfig(),
  );

  return response.data;
};

// Create Hero
const createHero = async (
  payload: CreateHeroPayload,
): Promise<HeroApiResponse<Hero>> => {
  const response = await axios.post<HeroApiResponse<Hero>>(
    `${BASE_URL}/heroes`,
    payload,
    getConfig(),
  );

  return response.data;
};

// Update Hero
const updateHero = async (
  id: string,
  payload: UpdateHeroPayload,
): Promise<HeroApiResponse<Hero>> => {
  const response = await axios.patch<HeroApiResponse<Hero>>(
    `${BASE_URL}/heroes/${id}`,
    payload,
    getConfig(),
  );

  return response.data;
};

// Delete Hero
const deleteHero = async (id: string): Promise<HeroApiResponse<Hero>> => {
  const response = await axios.delete<HeroApiResponse<Hero>>(
    `${BASE_URL}/heroes/${id}`,
    getConfig(),
  );

  return response.data;
};

export const HeroService = {
  getAllHeroes,
  getHeroById,
  createHero,
  updateHero,
  deleteHero,
};
