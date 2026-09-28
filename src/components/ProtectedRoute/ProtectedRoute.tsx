'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/store';
import { useRef } from 'react';
import { useFavoritesLoader } from '@/hooks/useFavoritesLoader';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const router = useRouter();
  const access = useAppSelector((state) => state.auth.access);
  const isHydrated = useAppSelector((state) => state.auth.isHydrated);
  const hasRedirected = useRef(false);

  useFavoritesLoader();

  useEffect(() => {
    if (isHydrated && !access && !hasRedirected.current) {
      router.replace('/auth/sign-in');
    }
  }, [isHydrated, access, router]);

  if (!isHydrated || !access) return null;

  return <>{children}</>;
}
