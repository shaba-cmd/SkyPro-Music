'use client';

import cn from 'classnames';
import styles from './bar.module.css';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useRef, useState } from 'react';
import {
  setCurrentTrack,
  setIsLoading,
  setIsPlay,
} from '@/store/features/trackSlice';
import { formatTime } from '@/utils/helper';

export default function Bar() {
  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const playlist = useAppSelector((state) => state.tracks.playlist);
  const isLoading = useAppSelector((state) => state.tracks.isLoading);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const currentIndex = playlist.findIndex(
    (track) => track._id === currentTrack?._id,
  );

  const nextTrack = () => {
    if (currentIndex < playlist.length - 1) {
      dispatch(setCurrentTrack(playlist[currentIndex + 1]));
    }
  };

  const prevTrack = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.currentTime > 1) {
      audio.currentTime = 0;
      return;
    }

    if (currentIndex > 0) {
      dispatch(setCurrentTrack(playlist[currentIndex - 1]));
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = Number(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleProgressMouseDown = () => {
    setIsDragging(true);
  };

  const handleProgressMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!currentTrack || !audio) return;

    if (audio.src !== currentTrack.track_file) {
      dispatch(setIsLoading(true));
      audio.src = currentTrack.track_file;
      audio.load();

      if (currentTrack.time) {
        setDuration(currentTrack.time);
      }

      if (isPlay) {
        audio
          .play()
          .then(() => {
            dispatch(setIsLoading(false));
          })
          .catch(() => {
            dispatch(setIsPlay(false));
            dispatch(setIsLoading(false));
          });
      } else {
        dispatch(setIsLoading(false));
      }
    }
  }, [currentTrack, dispatch, isPlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlay) {
      dispatch(setIsLoading(true));
      audio
        .play()
        .then(() => {
          if (audio.duration && !isNaN(audio.duration)) {
            setDuration(audio.duration);
          }
          dispatch(setIsLoading(false));
        })
        .catch(() => {
          dispatch(setIsPlay(false));
          dispatch(setIsLoading(false));
        });
    } else {
      audio.pause();
    }
  }, [isPlay, currentTrack, dispatch]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (!isDragging) {
        setCurrentTime(audio.currentTime);
      }

      if (
        audio.duration &&
        !isNaN(audio.duration) &&
        audio.duration !== duration
      ) {
        setDuration(audio.duration);
      }
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
      dispatch(setIsLoading(false));
    };

    const handleCanPlay = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
      dispatch(setIsLoading(false));
    };

    const interval = setInterval(() => {
      if (
        audio.duration &&
        !isNaN(audio.duration) &&
        audio.duration !== duration
      ) {
        setDuration(audio.duration);
      }
    }, 100);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('canplay', handleCanPlay);
      clearInterval(interval);
    };
  }, [isDragging, duration, dispatch]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      dispatch(setIsPlay(false));

      if (currentIndex < playlist.length - 1) {
        dispatch(setCurrentTrack(playlist[currentIndex + 1]));
      }
    };

    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, [dispatch, playlist, currentIndex]);

  if (!currentTrack) return <></>;

  const toggleAudioPlay = () => {
    dispatch(setIsPlay(!isPlay));
  };

  return (
    <div className={styles.bar}>
      <audio ref={audioRef}></audio>
      <div className={styles.bar__content}>
        <div className={styles.bar__playerProgress}>
          <div className={styles.progress__track}>
            <input
              className={styles.progress__input}
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={currentTime}
              onChange={handleProgressChange}
              onMouseDown={handleProgressMouseDown}
              onMouseUp={handleProgressMouseUp}
              onTouchStart={handleProgressMouseDown}
              onTouchEnd={handleProgressMouseUp}
            />
            <div
              className={styles.progress__bar}
              style={{
                width: duration ? `${(currentTime / duration) * 100}%` : '0%',
              }}
            />
            <div className={styles.progress__timeBox}>
              <span className={styles.progress__time}>
                {formatTime(currentTime)}
              </span>
              <span className={styles.progress__time}>
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>

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
                onClick={toggleAudioPlay}
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
              <div className={cn(styles.player__btnRepeat, styles.btnIcon)}>
                <svg className={styles.player__btnRepeatSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div className={cn(styles.player__btnShuffle, styles.btnIcon)}>
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

          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={cn(styles.volume__progress, styles.btn)}>
                <input
                  className={cn(styles.volume__progressLine, styles.btn)}
                  type="range"
                  name="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, #ffffff 0%, #ffffff ${volume * 100}%,
                    #797979 ${volume * 100}%, #797979 100%)`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
