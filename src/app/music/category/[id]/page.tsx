'use client';

import cn from 'classnames';
import styles from '@/components/PageLayout/pagelayout.module.css';
import Filter from '@/components/Filter/Filter';
import Track from '@/components/Track/Track';
import { useAppSelector } from '@/store/store';
import { useParams } from 'next/navigation';
import { useFilteredTracks } from '@/hooks/useFilteredTracks';
import { useCallback, useState } from 'react';
import { getSelection, getTracks } from '@/services/tracks/tracksApi';
import { useTracksLoader } from '@/hooks/useTracksLoader';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { TrackListSkeleton } from '@/components/Skeleton/Skeleton';
import Message from '@/components/Message/Message';

export default function Category() {
  const params = useParams<{ id: string }>();
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const visibleTracks = useFilteredTracks();
  const [title, setTitle] = useState('');

  const loader = useCallback(async () => {
    const [selection, tracks] = await Promise.all([
      getSelection(params.id),
      getTracks(),
    ]);

    setTitle(selection.name ?? '');

    const tracksById = new Map(tracks.map((track) => [track._id, track]));

    return selection.items
      .map((trackId) => tracksById.get(trackId))
      .filter((track): track is TrackType => Boolean(track));
  }, [params.id]);

  const { isFetching, error } = useTracksLoader(loader);

  if (error) {
    return <Message text={error} />;
  }

  return (
    <>
      <h2 className={styles.main__h2}>{title || 'Загрузка...'}</h2>
      <Filter />
      <div className={styles.main__content}>
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
              <use xlinkHref="#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={styles.content__playlist}>
          {isFetching ? (
            <TrackListSkeleton />
          ) : visibleTracks.length === 0 ? (
            <Message text="В этой подборке пока нет треков" />
          ) : (
            visibleTracks.map((el) => (
              <Track
                key={el._id}
                track={el}
                playlist={visibleTracks}
                selectedTrack={currentTrack?._id === el._id}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
