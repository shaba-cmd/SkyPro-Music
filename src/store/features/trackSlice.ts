import { TrackType } from '@/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  playlist: TrackType[];
  isLoading: boolean;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: true,
  playlist: [],
  isLoading: false,
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    setPlaylist(state, action: PayloadAction<TrackType[]>) {
      state.playlist = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setCurrentTrack, setIsPlay, setPlaylist, setIsLoading } =
  trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
