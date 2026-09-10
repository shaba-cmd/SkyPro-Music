'use client';

import cn from 'classnames';
import styles from '../../layout.module.css';
import Filter from '@/components//Filter/Filter';
import { data } from '@/data';
import Track from '@/components//Track/Track';
import { useAppSelector } from '@/store/store';
import { useParams } from 'next/navigation';

export default function Category() {
  const params = useParams<{ id: string }>();
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);

  return (
    <>
      <h2 className={styles.main__h2}>{params.id}</h2>
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
        <div className={styles.content__playlist}>
          {data.map((el) => (
            <Track
              key={el._id}
              track={el}
              playlist={data}
              selectedTrack={(currentTrack?._id || null) === el._id}
            />
          ))}
        </div>
      </div>
    </>
  );
}
