'use client';

import styles from './track.module.css';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { formatTime } from '@/utils/helper';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setCurrentTrack,
  setIsPlay,
  setPlaylist,
} from '@/store/features/trackSlice';
import cn from 'classnames';
// import { addFavoriteTracks } from '@/services/tracks/tracksApi';

type TrackTypeProp = {
  track: TrackType;
  playlist: TrackType[];
  selectedTrack: boolean;
};

export default function Track({
  track,
  playlist,
  selectedTrack,
}: TrackTypeProp) {
  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const isLoading = useAppSelector((state) => state.tracks.isLoading);

  const handleClick = () => {
    if (currentTrack?._id === track._id) {
      dispatch(setIsPlay(!isPlay));
      return;
    }

    dispatch(setPlaylist(playlist));
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
              <use href="#icon-note"></use>
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
          <span className={styles.track__titleLink}>{track.name}</span>
        </div>
        <div className={styles.track__author}>
          <span className={styles.track__authorLink}>{track.author}</span>
        </div>
        <div className={styles.track__album}>
          <span className={styles.track__albumLink}>{track.album}</span>
        </div>
        <div className={styles.track__timeSvgBox}>
          <svg className={styles.track__timeSvg}>
            <use href="#icon-like"></use>
          </svg>
          <span className={styles.track__timeText}>
            {formatTime(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </article>
  );
}
