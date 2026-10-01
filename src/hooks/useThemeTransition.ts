import { MouseEvent } from 'react';
import { flushSync } from 'react-dom';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setTheme } from '@/store/features/themeSlice';

export const useThemeTransition = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  const toggleWithAnimation = (event: MouseEvent<HTMLElement>) => {
    const next = theme === 'dark' ? 'light' : 'dark';

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        dispatch(setTheme(next));
      });
      document.documentElement.dataset.theme = next;
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 600,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        },
      );
    });
  };

  return { theme, toggleWithAnimation };
};
