'use client';

import Link from 'next/link';
import styles from './track.module.css';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { formatTime } from '@/utils/helper';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentTrack, setIsPlay } from '@/store/features/trackSlice';
import cn from 'classnames';
// import { addFavoriteTracks } from '@/services/tracks/tracksApi';

type TrackTypeProp = {
  track: TrackType;
  selectedTrack: boolean;
};

export default function Track({ track, selectedTrack }: TrackTypeProp) {
  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const isLoading = useAppSelector((state) => state.tracks.isLoading);

  console.log(track);

  const handleClick = () => {
    if (currentTrack?._id === track._id) {
      dispatch(setIsPlay(!isPlay));
      return;
    }

    dispatch(setCurrentTrack(track));
    dispatch(setIsPlay(true));
  };

  // const AddTrack = () => {
  //   if (currentTrack?._id === track._id) {
  //     addFavoriteTracks(track._id).catch((err) => console.log(err));
  //   }
  // };

  return (
    <article className={styles.playlist__item}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage} onClick={handleClick}>
            <svg className={styles.track__titleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
            </svg>
            {selectedTrack && isLoading && (
              <div className={styles.loaderContainer}>
                <span className={styles.loader}></span>
              </div>
            )}
            {selectedTrack && !isLoading && (
              <div className={styles.track__selectedBox}>
                <span
                  className={cn(styles.track__selected, {
                    [styles.track__selectedAnim]: isPlay,
                  })}
                ></span>
                <span
                  className={cn(styles.track__selectedSec, {
                    [styles.track__selectedSecAnim]: isPlay,
                  })}
                ></span>
              </div>
            )}
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
            {formatTime(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </article>
  );
}
