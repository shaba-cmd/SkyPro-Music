import { ReactNode } from 'react';
import styles from './pagelayout.module.css';
import Nav from '@/components/Nav/Nav';
import Search from '@/components/Search/Search';
import SideBar from '@/components/SideBar/SideBar';
import Bar from '@/components/Bar/Bar';
import SvgSprite from '@/components/SvgSprite/SvgSprite';

type PageLayoutProps = {
  children: ReactNode;
  page?: boolean;
};

export default function PageLayout({
  children,
  page = false,
}: PageLayoutProps) {
  return (
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
  );
}
