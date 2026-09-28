import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setFavoriteTracks } from '@/store/features/trackSlice';
import { getFavoriteTracks } from '@/services/tracks/tracksApi';
import { withReauth } from '@/utils/withReauth';

export const useFavoritesLoader = () => {
  const dispatch = useAppDispatch();
  const access = useAppSelector((state) => state.auth.access);
  const refresh = useAppSelector((state) => state.auth.refresh);
  const isHydrated = useAppSelector((state) => state.auth.isHydrated);

  useEffect(() => {
    if (!isHydrated || !access) return;

    let isActive = true;

    withReauth((token) => getFavoriteTracks(token), access, refresh, dispatch)
      .then((tracks) => {
        if (isActive) dispatch(setFavoriteTracks(tracks));
      })
      .catch(() => {});

    return () => {
      isActive = false;
    };
  }, [isHydrated, access, refresh, dispatch]);
};
