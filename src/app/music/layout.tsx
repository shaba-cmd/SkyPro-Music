import { ReactNode } from 'react';
import PageLayout from '@/components/PageLayout/PageLayout';

export default function MusicLayout({ children }: { children: ReactNode }) {
  return <PageLayout>{children}</PageLayout>;
}
