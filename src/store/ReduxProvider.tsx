'use client';

import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { hydrateAuth } from './features/authSlice';
import { loadAuthState, saveAuthState } from '@/services/auth/authStorage';

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const store = storeRef.current;
    if (!store) return;

    store.dispatch(hydrateAuth(loadAuthState()));

    let previousAuth = store.getState().auth;

    return store.subscribe(() => {
      const nextAuth = store.getState().auth;

      if (nextAuth !== previousAuth) {
        previousAuth = nextAuth;
        saveAuthState(nextAuth);
      }
    });
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
