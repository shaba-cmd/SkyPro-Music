import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/store';
import { setAllTracks } from '@/store/features/trackSlice';
import { TrackType } from '@/sharedTypes/sharedTypes';

export const useTracksLoader = (loader: () => Promise<TrackType[]>) => {
  const dispatch = useAppDispatch();
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    setIsFetching(true);
    setError('');

    loader()
      .then((tracks) => {
        if (!isActive) return;
        dispatch(setAllTracks(tracks));
      })
      .catch(() => {
        if (!isActive) return;
        setError('Не удалось загрузить треки. Попробуйте позже');
        dispatch(setAllTracks([]));
      })
      .finally(() => {
        if (isActive) setIsFetching(false);
      });

    return () => {
      isActive = false;
    };
  }, [loader, dispatch]);

  return { isFetching, error };
};
