import { TrackType } from '@/sharedTypes/sharedTypes';
import { BASE_URL } from '../constants';
import axios from 'axios';

export type SelectionType = {
  _id: number;
  name?: string;
  items: number[];
};

export const getTracks = async (): Promise<TrackType[]> => {
  const { data } = await axios.get(`${BASE_URL}/catalog/track/all/`);
  return data.data;
};

export const getSelection = async (id: string): Promise<SelectionType> => {
  const { data } = await axios.get(`${BASE_URL}/catalog/selection/${id}/`);

  if (!data.data) {
    throw new Error('Подборка не найдена');
  }

  return data.data;
};
