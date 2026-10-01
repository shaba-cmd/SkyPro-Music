import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setTheme } from '@/store/features/themeSlice';

export const useThemeSync = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  const isRestored = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');

    if (saved === 'light' || saved === 'dark') {
      dispatch(setTheme(saved));
    }

    isRestored.current = true;
  }, [dispatch]);

  useEffect(() => {
    if (!isRestored.current) return;

    document.documentElement.dataset.theme = theme;

    try {
      localStorage.setItem('theme', theme);
    } catch {
      // приватный режим
    }
  }, [theme]);
};
