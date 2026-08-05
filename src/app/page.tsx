import styles from './page.module.css';
import Nav from '@/components/Nav/Nav';
import CenterBlock from '@/components/CenterBlock/CenterBlock';
import SideBar from '@/components/SideBar/SideBar';
import Bar from '@/components/Bar/Bar';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <CenterBlock />
          <SideBar />
        </main>
        <Bar />
      </div>
    </div>
  );
}
