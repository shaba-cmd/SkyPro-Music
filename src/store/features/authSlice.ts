import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokensType, UserType } from '@/sharedTypes/authTypes';
import { StoredAuth } from '@/services/auth/authStorage';

type AuthStateType = {
  user: UserType | null;
  access: string | null;
  refresh: string | null;
  isHydrated: boolean;
};

const initialState: AuthStateType = {
  user: null,
  access: null,
  refresh: null,
  isHydrated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ user: UserType; tokens: TokensType }>,
    ) => {
      state.user = action.payload.user;
      state.access = action.payload.tokens.access;
      state.refresh = action.payload.tokens.refresh;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.access = action.payload;
    },
    hydrateAuth: (state, action: PayloadAction<StoredAuth | null>) => {
      if (action.payload) {
        state.user = action.payload.user;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
      }
      state.isHydrated = true;
    },
    clearAuth: (state) => {
      state.user = null;
      state.access = null;
      state.refresh = null;
    },
  },
});

export const { setAuth, setAccessToken, hydrateAuth, clearAuth } =
  authSlice.actions;
export const authSliceReducer = authSlice.reducer;
