'use client';

import { useCallback, useMemo } from 'react';
import cn from 'classnames';
import styles from '@/components/PageLayout/pagelayout.module.css';
import Filter from '@/components/Filter/Filter';
import Track from '@/components/Track/Track';
import Message from '@/components/Message/Message';
import { PageSkeleton } from '@/components/Skeleton/Skeleton';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useFilteredTracks } from '@/hooks/useFilteredTracks';
import { useTracksLoader } from '@/hooks/useTracksLoader';
import { getFavoriteTracks } from '@/services/tracks/tracksApi';
import { withReauth } from '@/utils/withReauth';

export default function MyPlaylist() {
  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const access = useAppSelector((state) => state.auth.access);
  const refresh = useAppSelector((state) => state.auth.refresh);
  const isHydrated = useAppSelector((state) => state.auth.isHydrated);

  const favoriteTracks = useAppSelector((state) => state.tracks.favoriteTracks);
  const visibleTracks = useFilteredTracks();

  const loader = useCallback(async () => {
    if (!access) return [];

    return withReauth(
      (token) => getFavoriteTracks(token),
      access,
      refresh,
      dispatch,
    );
  }, [access, refresh, dispatch]);

  const playlistTracks = useMemo(() => {
    const favoriteIds = new Set(favoriteTracks.map((track) => track._id));
    return visibleTracks.filter((track) => favoriteIds.has(track._id));
  }, [visibleTracks, favoriteTracks]);

  const { isFetching, error, refetch } = useTracksLoader(loader);

  if (error) {
    return <Message text={error} onRetry={refetch} />;
  }

  if (isHydrated && !access) {
    return (
      <Message text="Войдите в аккаунт, чтобы сохранять треки" auth={true} />
    );
  }

  return (
    <>
      <h2 className={styles.main__h2}>{!isFetching && 'Мой плейлист'}</h2>
      {!isFetching && visibleTracks.length !== 0 && <Filter />}
      <div className={styles.main__content}>
        {!isFetching && visibleTracks.length !== 0 && (
          <div className={styles.content__title}>
            <div className={cn(styles.playlistTitle__col, styles.col01)}>
              Трек
            </div>
            <div className={cn(styles.playlistTitle__col, styles.col02)}>
              Исполнитель
            </div>
            <div className={cn(styles.playlistTitle__col, styles.col03)}>
              Альбом
            </div>
            <div className={cn(styles.playlistTitle__col, styles.col04)}>
              <svg className={styles.playlistTitle__svg}>
                <use href="#icon-watch"></use>
              </svg>
            </div>
          </div>
        )}
        <div className={styles.content__playlist}>
          {isFetching ? (
            <PageSkeleton />
          ) : playlistTracks.length === 0 ? (
            <Message text="В вашем плейлисте пока нет треков" />
          ) : (
            playlistTracks.map((el) => (
              <Track
                key={el._id}
                track={el}
                playlist={playlistTracks}
                selectedTrack={currentTrack?._id === el._id}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
