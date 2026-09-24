import axios from 'axios';
import { BASE_URL } from '../constants';
import {
  AuthUserRequest,
  RefreshResponse,
  SignUpResponse,
  TokensType,
  UserType,
} from '@/sharedTypes/authTypes';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const signUpUser = async (data: AuthUserRequest): Promise<UserType> => {
  const { data: response } = await api.post<SignUpResponse>('/user/signup/', {
    ...data,
    username: data.email.split('@')[0],
  });

  return response.result;
};

export const loginUser = async (data: AuthUserRequest): Promise<UserType> => {
  const { data: user } = await api.post<UserType>('/user/login/', data);

  return user;
};

export const getTokens = async (data: AuthUserRequest): Promise<TokensType> => {
  const { data: tokens } = await api.post<TokensType>('/user/token/', data);

  return tokens;
};

export const refreshToken = async (
  refresh: string,
): Promise<RefreshResponse> => {
  const { data } = await api.post<RefreshResponse>('/user/token/refresh/', {
    refresh,
  });

  return data;
};
