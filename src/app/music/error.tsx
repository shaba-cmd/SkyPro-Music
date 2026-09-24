'use client';

import { useEffect, useTransition } from 'react';
import Message from '@/components/Message/Message';
import { TrackListSkeleton } from '@/components/Skeleton/Skeleton';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleRetry = () => {
    startTransition(() => {
      reset();
    });
  };

  if (isPending) {
    return <TrackListSkeleton />;
  }

  return (
    <>
      <Message
        text="Не удалось отобразить страницу. Попробуйте ещё раз."
        onRetry={handleRetry}
      />
    </>
  );
}
