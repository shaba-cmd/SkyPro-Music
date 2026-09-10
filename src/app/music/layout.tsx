import styles from './layout.module.css';
import Nav from '@/components/Nav/Nav';
import Search from '@/components/Search/Search';
import SideBar from '@/components/SideBar/SideBar';
import Bar from '@/components/Bar/Bar';
import { ReactNode } from 'react';

interface PageLayoutType {
  children: ReactNode;
  page: boolean;
}

export default function PageLayout({ children, page }: PageLayoutType) {
  return (
    <div className={styles.wrapper}>
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
