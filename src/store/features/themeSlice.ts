import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeType = 'dark' | 'light';

type ThemeStateType = {
  theme: ThemeType;
};

const initialState: ThemeStateType = {
  theme: 'dark',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeType>) {
      state.theme = action.payload;
    },
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export const themeSliceReducer = themeSlice.reducer;
