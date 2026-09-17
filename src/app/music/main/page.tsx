'use client';

import cn from 'classnames';
import styles from '../layout.module.css';
import Filter from '@/components//Filter/Filter';
import Track from '@/components//Track/Track';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Suspense, useEffect } from 'react';
import { getTracks } from '@/services/tracks/tracksApi';
import { setPlaylist } from '@/store/features/trackSlice';
import Loading from '@/app/user/Loading';

export default function Main() {
  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const playlist = useAppSelector((state) => state.tracks.playlist);

  useEffect(() => {
    getTracks()
      .then((res) => {
        dispatch(setPlaylist(res));
      })
      .catch((err) => console.log(err));
  }, []);

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
        <Suspense fallback={<Loading text={'Загрузка треков...'} />}>
          <div className={styles.content__playlist}>
            {playlist.map((el) => (
              <Track
                key={el._id}
                track={el}
                selectedTrack={(currentTrack?._id || null) === el._id}
              />
            ))}
          </div>
        </Suspense>
      </div>
    </>
  );
}
