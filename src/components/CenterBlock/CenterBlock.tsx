'use client';

import cn from 'classnames';
import styles from './centerblock.module.css';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import { data } from '@/data';
import Track from '../Track/Track';
import { useAppSelector } from '@/store/store';

export default function CenterBlock() {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Filter />
      <div className={styles.centerblock__content}>
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
    </div>
  );
}
