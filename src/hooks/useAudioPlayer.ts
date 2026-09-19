import { useRef, useState, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setIsLoading,
  setIsPlay,
  setNextTrack,
  setPrevTrack,
} from '@/store/features/trackSlice';

export const useAudioPlayer = () => {
  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const volume = useAppSelector((state) => state.tracks.volume);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const nextTrack = useCallback(() => {
    dispatch(setNextTrack());
  }, [dispatch]);
  const prevTrack = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.currentTime > 1) {
      audio.currentTime = 0;
      setCurrentTime(0);
      return;
    }

    dispatch(setPrevTrack());
  }, [dispatch]);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Number(e.target.value);
    setCurrentTime(Number(e.target.value));
  };

  const safePlay = useCallback(
    (audio: HTMLAudioElement) => {
      audio.play().catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError')
          return;
        dispatch(setIsPlay(false));
      });
    },
    [dispatch],
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (audio.src !== currentTrack.track_file) {
      dispatch(setIsLoading(true));

      audio.src = currentTrack.track_file;
      audio.load();
      setCurrentTime(0);

      safePlay(audio);
      dispatch(setIsPlay(true));
      return;
    }

    if (isPlay) {
      safePlay(audio);
    } else {
      audio.pause();
    }
  }, [currentTrack, isPlay, safePlay, dispatch]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      setDuration(audio.duration);
      dispatch(setIsLoading(false));
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('canplay', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('canplay', updateDuration);
    };
  }, [dispatch, currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener('ended', nextTrack);
    return () => audio.removeEventListener('ended', nextTrack);
  }, [nextTrack]);

  return {
    audioRef,
    currentTrack,
    isPlay,
    currentTime,
    duration,
    nextTrack,
    prevTrack,
    handleProgressChange,
  };
};
