'use client';

import cn from 'classnames';
import styles from '@/components/PageLayout/pagelayout.module.css';
import Filter from '@/components//Filter/Filter';
import Track from '@/components//Track/Track';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Suspense, useEffect } from 'react';
import { getTracks } from '@/services/tracks/tracksApi';
import { setPlaylist } from '@/store/features/trackSlice';
import { setAllTracks } from '@/store/features/trackSlice';
import { useFilteredTracks } from '@/hooks/useFilteredTracks';
import Loading from '../loading';

export default function Main() {
  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const visibleTracks = useFilteredTracks();

  useEffect(() => {
    getTracks()
      .then((tracks) => dispatch(setAllTracks(tracks)))
      .catch((err) => console.log(err));
  }, [dispatch]);

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
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <Suspense fallback={<Loading />}>
          <div className={styles.content__playlist}>
            {visibleTracks.map((el) => (
              <Track
                key={el._id}
                track={el}
                playlist={visibleTracks}
                selectedTrack={currentTrack?._id === el._id}
              />
            ))}
          </div>
        </Suspense>
      </div>
    </>
  );
}
