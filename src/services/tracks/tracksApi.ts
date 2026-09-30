import { TrackType } from '@/sharedTypes/sharedTypes';
import { BASE_URL } from '../constants';
import axios from 'axios';

export type SelectionType = {
  _id: number;
  name?: string;
  items: number[];
};

export const getTracks = async (): Promise<TrackType[]> => {
  const { data } = await axios.get(`${BASE_URL}/catalog/track/all/`, {
    timeout: 15000,
  });

  return data.data;
};

export const getSelection = async (id: string): Promise<SelectionType> => {
  const { data } = await axios.get(`${BASE_URL}/catalog/selection/${id}/`);

  if (!data.data) {
    throw new Error('Подборка не найдена');
  }

  return data.data;
};

const withToken = (access: string) => ({
  headers: { Authorization: `Bearer ${access}` },
});

export const getFavoriteTracks = async (
  access: string,
): Promise<TrackType[]> => {
  const { data } = await axios.get(
    `${BASE_URL}/catalog/track/favorite/all/`,
    withToken(access),
  );
  return data.data;
};

export const addLike = async (access: string, id: number) => {
  await axios.post(
    `${BASE_URL}/catalog/track/${id}/favorite/`,
    {},
    withToken(access),
  );
};

export const removeLike = async (access: string, id: number) => {
  await axios.delete(
    `${BASE_URL}/catalog/track/${id}/favorite/`,
    withToken(access),
  );
};
