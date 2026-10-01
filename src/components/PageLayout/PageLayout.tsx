'use client';

import { ReactNode } from 'react';
import styles from './pagelayout.module.css';
import Nav from '@/components/Nav/Nav';
import Search from '@/components/Search/Search';
import SideBar from '@/components/SideBar/SideBar';
import Bar from '@/components/Bar/Bar';
import SvgSprite from '@/components/SvgSprite/SvgSprite';
import { useResetFiltersOnNavigate } from '@/hooks/useResetFiltersOnNavigate';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type PageLayoutProps = {
  children: ReactNode;
  page?: boolean;
};

export default function PageLayout({
  children,
  page = false,
}: PageLayoutProps) {
  useResetFiltersOnNavigate();

  return (
    <SkeletonTheme
      baseColor="var(--skeleton-base)"
      highlightColor="var(--skeleton-highlight)"
    >
      <div className={styles.wrapper}>
        <SvgSprite />
        <div className={styles.container}>
          <main className={styles.main}>
            <Nav />
            <div className={styles.centerblock}>
              <Search />
              {children}
            </div>
            <SideBar page={page} />
          </main>
          <Bar />
        </div>
      </div>
    </SkeletonTheme>
  );
}
