import { TrackType } from '@/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type YearSortType = 'По умолчанию' | 'Сначала новые' | 'Сначала старые';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  volume: number;
  isLoading: boolean;
  allTracks: TrackType[];
  playlist: TrackType[];
  shufflePlaylist: TrackType[];
  isShuffle: boolean;
  searchQuery: string;
  filters: {
    authors: string[];
    genres: string[];
    yearSort: YearSortType;
  };
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  volume: 0.3,
  isLoading: false,
  allTracks: [],
  playlist: [],
  shufflePlaylist: [],
  isShuffle: false,
  searchQuery: '',
  filters: {
    authors: [],
    genres: [],
    yearSort: 'По умолчанию',
  },
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
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    toggleShuffle(state) {
      state.isShuffle = !state.isShuffle;
    },
    setNextTrack(state) {
      const playlist = state.isShuffle ? state.shufflePlaylist : state.playlist;
      if (!playlist.length) return;

      const currentIndex = playlist.findIndex(
        (ind) => ind._id === state.currentTrack?._id,
      );

      const nextIndex = (currentIndex + 1) % playlist.length;

      state.currentTrack = playlist[nextIndex];
      state.isPlay = true;
    },
    setPrevTrack(state) {
      const playlist = state.isShuffle ? state.shufflePlaylist : state.playlist;
      if (!playlist.length) return;

      const currentIndex = playlist.findIndex(
        (ind) => ind._id === state.currentTrack?._id,
      );

      const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;

      state.currentTrack = playlist[prevIndex];
      state.isPlay = true;
    },
    setAllTracks(state, action: PayloadAction<TrackType[]>) {
      state.allTracks = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    toggleAuthorFilter(state, action: PayloadAction<string>) {
      const { authors } = state.filters;
      state.filters.authors = authors.includes(action.payload)
        ? authors.filter((item) => item !== action.payload)
        : [...authors, action.payload];
    },
    toggleGenreFilter(state, action: PayloadAction<string>) {
      const { genres } = state.filters;
      state.filters.genres = genres.includes(action.payload)
        ? genres.filter((item) => item !== action.payload)
        : [...genres, action.payload];
    },
    setYearSort(state, action: PayloadAction<YearSortType>) {
      state.filters.yearSort = action.payload;
    },
    resetFilters(state) {
      state.filters = initialState.filters;
      state.searchQuery = '';
    },
  },
});

export const {
  setCurrentTrack,
  setPlaylist,
  setIsPlay,
  setVolume,
  setIsLoading,
  toggleShuffle,
  setNextTrack,
  setPrevTrack,
  setAllTracks,
  setSearchQuery,
  toggleAuthorFilter,
  toggleGenreFilter,
  setYearSort,
  resetFilters,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
