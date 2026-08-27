import { useRef, useState, useEffect } from 'react';
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

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const nextTrack = () => {
    dispatch(setNextTrack());
  };

  const prevTrack = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.currentTime > 1) {
      audio.currentTime = 0;
      setCurrentTime(0);
      return;
    }

    dispatch(setPrevTrack());
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Number(e.target.value);
    setCurrentTime(Number(e.target.value));
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (audio.src !== currentTrack.track_file) {
      dispatch(setIsLoading(true));

      audio.src = currentTrack.track_file;
      audio.load();
      setDuration(currentTrack.time || 0);
      setCurrentTime(0);

      audio.play().catch(() => dispatch(setIsPlay(false)));

      return;
    }

    if (isPlay) {
      audio.play().catch(() => dispatch(setIsPlay(false)));
    } else {
      audio.pause();
    }
  }, [currentTrack, isPlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };

    const loaded = () => {
      dispatch(setIsLoading(false));
    };

    audio.addEventListener('timeupdate', update);
    audio.addEventListener('loadedmetadata', loaded);
    return () => {
      audio.removeEventListener('timeupdate', update);
      audio.removeEventListener('loadedmetadata', loaded);
    };
  }, [duration]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener('ended', nextTrack);
    return () => audio.removeEventListener('ended', nextTrack);
  }, [currentTrack]);

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
