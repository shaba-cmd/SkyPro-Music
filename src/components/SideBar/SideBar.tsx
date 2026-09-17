'use client';

import Image from 'next/image';
import styles from './sidebar.module.css';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { clearAuth } from '@/store/features/authSlice';
import { useRouter } from 'next/navigation';

export default function SideBar({ page }: { page: boolean }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(clearAuth());
    router.replace('/auth/sign-in');
  };

  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personalName}>{user?.username}</p>
        <div
          onClick={handleLogout}
          role="button"
          tabIndex={0}
          className={styles.sidebar__icon}
        >
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout"></use>
          </svg>
        </div>
      </div>
      {!page && (
        <div className={styles.sidebar__block}>
          <div className={styles.sidebar__list}>
            <div className={styles.sidebar__item}>
              <Link className={styles.sidebar__link} href="/music/category/1">
                <Image
                  className={styles.sidebar__img}
                  src="/img/playlist01.png"
                  alt="day's playlist"
                  width={250}
                  height={150}
                  priority
                />
              </Link>
            </div>
            <div className={styles.sidebar__item}>
              <Link className={styles.sidebar__link} href="/music/category/2">
                <Image
                  className={styles.sidebar__img}
                  src="/img/playlist02.png"
                  alt="day's playlist"
                  width={250}
                  height={150}
                  priority
                />
              </Link>
            </div>
            <div className={styles.sidebar__item}>
              <Link className={styles.sidebar__link} href="/music/category/3">
                <Image
                  className={styles.sidebar__img}
                  src="/img/playlist03.png"
                  alt="day's playlist"
                  width={250}
                  height={150}
                  priority
                />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
