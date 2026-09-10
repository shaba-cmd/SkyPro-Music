import { TrackType } from '@/sharedTypes/sharedTypes';
import { BASE_URL } from '../constants';
import axios from 'axios';

export const getTracks = (): Promise<TrackType[]> => {
  return axios
    .get(BASE_URL + '/catalog/track/all/')
    .then((res) => res.data.data);
};

export const getFavoriteTracks = (): Promise<TrackType[]> => {
  return axios.get(BASE_URL + '/catalog/track/favorite/all/').then((res) => {
    console.log(res);
    return res.data.data;
  });
};

export const addFavoriteTracks = (id: number) => {
  return axios
    .post(`${BASE_URL}/catalog/track/${id}/favorite/`)
    .then((res) => res.data.data);
};
