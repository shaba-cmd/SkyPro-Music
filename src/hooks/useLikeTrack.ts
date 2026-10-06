import { useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { addLikedTrack, removeLikedTrack } from '@/store/features/trackSlice';
import { addLike, removeLike } from '@/services/tracks/tracksApi';
import { SessionExpiredError, withReauth } from '@/utils/withReauth';
import { Slide, toast } from 'react-toastify';

export const useLikeTrack = (track: TrackType | null) => {
  const dispatch = useAppDispatch();

  const favoriteTracks = useAppSelector((state) => state.tracks.favoriteTracks);
  const access = useAppSelector((state) => state.auth.access);
  const refresh = useAppSelector((state) => state.auth.refresh);
  const theme = useAppSelector((state) => state.theme.theme);

  const [isLoading, setIsLoading] = useState(false);

  const notify = (text: string) =>
    toast.error(text, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme,
      transition: Slide,
    });

  const isLike = favoriteTracks.some((item) => item._id === track?._id);

  const toggleLike = async () => {
    if (!access) {
      notify('Необходима авторизация');
      return;
    }
    if (!track || isLoading) return;

    const actionApi = isLike ? removeLike : addLike;
    const actionSlice = isLike ? removeLikedTrack : addLikedTrack;

    setIsLoading(true);

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
        notify(error.message);
      } else {
        notify('Не удалось изменить избранное');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLike, isLoading, toggleLike };
};
