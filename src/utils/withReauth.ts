import axios from 'axios';
import { AppDispatch } from '@/store/store';
import { setAccessToken, clearAuth } from '@/store/features/authSlice';
import { refreshToken } from '@/services/auth/authApi';

export class SessionExpiredError extends Error {
  constructor() {
    super('Сессия истекла. Войдите заново');
    this.name = 'SessionExpiredError';
  }
}

export const withReauth = async <T>(
  apiFunction: (access: string) => Promise<T>,
  access: string,
  refresh: string | null,
  dispatch: AppDispatch,
): Promise<T> => {
  try {
    return await apiFunction(access);
  } catch (error) {
    const isUnauthorized =
      axios.isAxiosError(error) && error.response?.status === 401;

    if (!isUnauthorized) throw error;

    if (!refresh) {
      dispatch(clearAuth());
      throw new SessionExpiredError();
    }

    try {
      const { access: newAccess } = await refreshToken(refresh);
      dispatch(setAccessToken(newAccess));

      return await apiFunction(newAccess);
    } catch {
      dispatch(clearAuth());
      throw new SessionExpiredError();
    }
  }
};
