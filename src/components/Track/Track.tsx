import Link from 'next/link';
import styles from './track.module.css';
import { TrackElType } from '@/sharedTypes/sharedTypes';
import { formatTime } from '@/utils/helper';

export default function Track({ name, author, album, time }: TrackElType) {
  return (
    <article className={styles.playlist__item}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            <svg className={styles.track__titleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
            </svg>
          </div>
          <Link className={styles.track__titleLink} href="">
            {name}
          </Link>
        </div>
        <div className={styles.track__author}>
          <Link className={styles.track__authorLink} href="">
            {author}
          </Link>
        </div>
        <div className={styles.track__album}>
          <Link className={styles.track__albumLink} href="">
            {album}
          </Link>
        </div>
        <div className={styles.track__timeSvgBox}>
          <svg className={styles.track__timeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.track__timeText}>{formatTime(time)}</span>
        </div>
      </div>
    </article>
  );
}
