'use client';

import Link from 'next/link';
import styles from './track.module.css';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { formatTime } from '@/utils/helper';
import { useAppDispatch } from '@/store/store';
import { setCurrentTrack } from '@/store/features/trackSlice';

type TrackTypeProp = {
  track: TrackType;
};

export default function Track({ track }: TrackTypeProp) {
  const dispatch = useAppDispatch();

  function CurrentTrack() {
    dispatch(setCurrentTrack(track));
  }

  return (
    <article className={styles.playlist__item} onClick={CurrentTrack}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            <svg className={styles.track__titleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
            </svg>
          </div>
          <Link className={styles.track__titleLink} href="">
            {track.name}
          </Link>
        </div>
        <div className={styles.track__author}>
          <Link className={styles.track__authorLink} href="">
            {track.author}
          </Link>
        </div>
        <div className={styles.track__album}>
          <Link className={styles.track__albumLink} href="">
            {track.album}
          </Link>
        </div>
        <div className={styles.track__timeSvgBox}>
          <svg className={styles.track__timeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.track__timeText}>
            {formatTime(track.time)}
          </span>
        </div>
      </div>
    </article>
  );
}
