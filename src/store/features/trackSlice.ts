import { TrackType } from '@/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  isLoading: boolean;
  playlist: TrackType[];
  shufflePlaylist: TrackType[];
  isShuffle: boolean;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  isLoading: false,
  playlist: [],
  shufflePlaylist: [],
  isShuffle: false,
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setPlaylist(state, action: PayloadAction<TrackType[]>) {
      state.playlist = action.payload;
      state.shufflePlaylist = [...state.playlist].sort(
        () => Math.random() - 0.5,
      );
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    toggleShuffle(state) {
      state.isShuffle = !state.isShuffle;
    },
    setNextTrack(state) {
      const playlist = state.isShuffle ? state.shufflePlaylist : state.playlist;

      const currentIndex = playlist.findIndex(
        (ind) => ind._id === state.currentTrack?._id,
      );

      if (currentIndex < playlist.length - 1) {
        state.currentTrack = playlist[currentIndex + 1];
        state.isPlay = true;
      } else {
        state.currentTrack = playlist[0];
      }
    },
    setPrevTrack(state) {
      const playlist = state.isShuffle ? state.shufflePlaylist : state.playlist;

      const currentIndex = playlist.findIndex(
        (ind) => ind._id === state.currentTrack?._id,
      );

      if (currentIndex > 0) {
        state.currentTrack = playlist[currentIndex - 1];
        state.isPlay = true;
      }
    },
  },
});

export const {
  setCurrentTrack,
  setPlaylist,
  setIsPlay,
  setIsLoading,
  toggleShuffle,
  setNextTrack,
  setPrevTrack,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
