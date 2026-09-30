import { useEffect, useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { addLikedTrack, removeLikedTrack } from '@/store/features/trackSlice';
import { addLike, removeLike } from '@/services/tracks/tracksApi';
import { SessionExpiredError, withReauth } from '@/utils/withReauth';

export const useLikeTrack = (track: TrackType | null) => {
  const dispatch = useAppDispatch();

  const favoriteTracks = useAppSelector((state) => state.tracks.favoriteTracks);
  const access = useAppSelector((state) => state.auth.access);
  const refresh = useAppSelector((state) => state.auth.refresh);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isLike = favoriteTracks.some((item) => item._id === track?._id);

  const toggleLike = async () => {
    if (!access) {
      setErrorMsg('Необходима авторизация');
      return;
    }
    if (!track || isLoading) return;

    const actionApi = isLike ? removeLike : addLike;
    const actionSlice = isLike ? removeLikedTrack : addLikedTrack;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      await withReauth(
        (token) => actionApi(token, track._id),
        access,
        refresh,
        dispatch,
      );

      dispatch(actionSlice(track));
    } catch (error) {
      if (error instanceof SessionExpiredError) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg('Не удалось изменить избранное');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!errorMsg) return;

    const timer = setTimeout(() => setErrorMsg(null), 4000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  return { isLike, isLoading, errorMsg, toggleLike };
};
