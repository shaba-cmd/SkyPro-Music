'use client';

import cn from 'classnames';
import styles from './bar.module.css';
import Link from 'next/link';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import VolumeControl from './VolumeControl/VolumeControl';
import ProgressBar from './ProgressBar/ProgressBar';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setIsPlay, toggleShuffle } from '@/store/features/trackSlice';

export default function Bar() {
  const {
    audioRef,
    currentTrack,
    isPlay,
    currentTime,
    duration,
    nextTrack,
    prevTrack,
    handleProgressChange,
  } = useAudioPlayer();
  const dispatch = useAppDispatch();
  const isShuffle = useAppSelector((state) => state.tracks.isShuffle);

  const [loopTrack, setLoopTrack] = useState(false);

  if (!currentTrack) return null;

  return (
    <div className={styles.bar}>
      <audio ref={audioRef} loop={loopTrack}></audio>
      <div className={styles.bar__content}>
        <ProgressBar
          currentTime={currentTime}
          duration={duration || 0}
          handleProgressChange={handleProgressChange}
        />

        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div
                className={cn(styles.player__btnPrev, styles.btnIcon)}
                onClick={prevTrack}
              >
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div
                className={cn(styles.player__btnPlay, styles.btn)}
                onClick={() => dispatch(setIsPlay(!isPlay))}
              >
                <svg className={styles.player__btnPlaySvg}>
                  <use
                    href={`/img/icon/sprite.svg#icon-${isPlay ? 'stop' : 'play'}`}
                  ></use>
                </svg>
              </div>
              <div
                className={cn(styles.player__btnNext, styles.btnIcon)}
                onClick={nextTrack}
              >
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                className={cn(styles.player__btnRepeat, styles.btnIcon, {
                  [styles.btn_active]: loopTrack,
                })}
                onClick={() => setLoopTrack(!loopTrack)}
              >
                <svg className={styles.player__btnRepeatSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                className={cn(styles.player__btnShuffle, styles.btnIcon, {
                  [styles.btn_active]: isShuffle,
                })}
                onClick={() => dispatch(toggleShuffle())}
              >
                <svg className={styles.player__btnShuffleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div>
                  <div className={styles.trackPlay__album}>
                    <Link className={styles.trackPlay__albumLink} href="">
                      {currentTrack.name}
                    </Link>
                  </div>
                  <div className={styles.trackPlay__author}>
                    <Link className={styles.trackPlay__authorLink} href="">
                      {currentTrack.author}
                    </Link>
                  </div>
                </div>
              </div>

              <div className={styles.trackPlay__box}>
                <div className={styles.btnIcon}>
                  <svg className={styles.trackPlay__likeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div className={styles.btnIcon}>
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <VolumeControl />
        </div>
      </div>
    </div>
  );
}
