'use client';

import cn from 'classnames';
import styles from '@/components/PageLayout/pagelayout.module.css';
import Filter from '@/components/Filter/Filter';
import Track from '@/components/Track/Track';
import { useAppSelector } from '@/store/store';
import { getTracks } from '@/services/tracks/tracksApi';
import { useFilteredTracks } from '@/hooks/useFilteredTracks';
import { TrackListSkeleton } from '@/components/Skeleton/Skeleton';
import Message from '@/components/Message/Message';
import { useTracksLoader } from '@/hooks/useTracksLoader';

export default function Main() {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const visibleTracks = useFilteredTracks();
  const { isFetching, error } = useTracksLoader(getTracks);

  return (
    <>
      <h2 className={styles.main__h2}>Треки</h2>
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
              <use href="#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={styles.content__playlist}>
          {isFetching ? (
            <TrackListSkeleton />
          ) : error ? (
            <Message text={error} isError />
          ) : visibleTracks.length === 0 ? (
            <Message text="Ничего не найдено" />
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
