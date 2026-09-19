import { ReactNode } from 'react';
import PageLayout from '@/components/PageLayout/PageLayout';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';

export default function MusicLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <PageLayout>{children}</PageLayout>
    </ProtectedRoute>
  );
}
