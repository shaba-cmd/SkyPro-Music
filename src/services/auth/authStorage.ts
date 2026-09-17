import { UserType } from '@/sharedTypes/authTypes';

const STORAGE_KEY = 'skypro-music-auth';

export type StoredAuth = {
  user: UserType | null;
  access: string | null;
  refresh: string | null;
};

export const loadAuthState = (): StoredAuth | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as StoredAuth;

    if (!parsed?.refresh || !parsed?.user) return null;

    return parsed;
  } catch {
    return null;
  }
};

export const saveAuthState = (state: StoredAuth) => {
  try {
    if (!state.refresh) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        user: state.user,
        access: state.access,
        refresh: state.refresh,
      }),
    );
  } catch {}
};
