import { useRef, useState, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setCurrentTrack,
  setIsPlay,
  setIsLoading,
} from '@/store/features/trackSlice';

export const useAudioPlayer = () => {
  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const playlist = useAppSelector((state) => state.tracks.playlist);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const currentIndex = playlist.findIndex(
    (track) => track._id === currentTrack?._id,
  );

  const nextTrack = () => {
    if (currentIndex < playlist.length - 1) {
      dispatch(setCurrentTrack(playlist[currentIndex + 1]));
      dispatch(setIsPlay(true));
    }
  };

  const prevTrack = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.currentTime > 1) {
      audio.currentTime = 0;
      setCurrentTime(0);
      return;
    }

    if (currentIndex > 0) {
      dispatch(setCurrentTrack(playlist[currentIndex - 1]));
      dispatch(setIsPlay(true));
    }
  };

  const togglePlay = () => {
    dispatch(setIsPlay(!isPlay));
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = Number(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
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

      if (isPlay) {
        audio.play().catch((err) => {
          if (err.name !== 'AbortError') {
            dispatch(setIsPlay(false));
          }
        });
      } else {
        dispatch(setIsLoading(false));
      }
      return;
    }

    if (isPlay) {
      audio.play().catch((err) => {
        if (err.name !== 'AbortError') {
          dispatch(setIsPlay(false));
        }
      });
    } else {
      audio.pause();
    }
  }, [currentTrack, isPlay, dispatch]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => {
      if (!isDragging) setCurrentTime(audio.currentTime);
      if (audio.duration) setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', update);
    audio.addEventListener('loadedmetadata', update);
    audio.addEventListener('canplay', update);

    return () => {
      audio.removeEventListener('timeupdate', update);
      audio.removeEventListener('loadedmetadata', update);
      audio.removeEventListener('canplay', update);
    };
  }, [isDragging, duration]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onEnd = () => {
      dispatch(setIsPlay(true));
      setCurrentTime(0);
      if (currentIndex < playlist.length - 1) {
        dispatch(setCurrentTrack(playlist[currentIndex + 1]));
      } else {
        dispatch(setIsPlay(false));
      }
    };

    audio.addEventListener('ended', onEnd);
    return () => audio.removeEventListener('ended', onEnd);
  }, [playlist, currentIndex, dispatch]);

  return {
    audioRef,
    currentTrack,
    isPlay,
    currentTime,
    duration,
    isDragging,
    setIsDragging,
    nextTrack,
    prevTrack,
    togglePlay,
    handleProgressChange,
  };
};
