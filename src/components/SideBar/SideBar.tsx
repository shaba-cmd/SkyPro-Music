'use client';

import Image from 'next/image';
import styles from './sidebar.module.css';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { clearAuth } from '@/store/features/authSlice';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Skeleton from '@/components/Skeleton/Skeleton';
import skeletonStyles from '@/components/Skeleton/skeleton.module.css';

const PLAYLISTS = [
  { id: 2, img: '/img/playlist01.png', alt: 'Плейлист дня' },
  { id: 3, img: '/img/playlist02.png', alt: '100 танцевальных хитов' },
  { id: 4, img: '/img/playlist03.png', alt: 'Инди-заряд' },
];

function PlaylistImage({ src, alt }: { src: string; alt: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={styles.sidebar__imageWrapper}>
      {!isLoaded && <Skeleton className={skeletonStyles.sidebarItem} />}
      <Image
        className={styles.sidebar__img}
        src={src}
        alt={alt}
        width={250}
        height={150}
        onLoad={() => setIsLoaded(true)}
        style={{ opacity: isLoaded ? 1 : 0 }}
      />
    </div>
  );
}

export default function SideBar({ page }: { page: boolean }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user?.username);

  const handleLogout = () => {
    dispatch(clearAuth());
    router.replace('/auth/sign-in');
  };

  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personalName}>{user}</p>
        <div
          onClick={handleLogout}
          role="button"
          tabIndex={0}
          className={styles.sidebar__icon}
        >
          <svg>
            <use href="#logout"></use>
          </svg>
        </div>
      </div>
      {!page && (
        <div className={styles.sidebar__block}>
          <div className={styles.sidebar__list}>
            {PLAYLISTS.map(({ id, img, alt }) => (
              <div key={id} className={styles.sidebar__item}>
                <Link
                  className={styles.sidebar__link}
                  href={`/music/category/${id}`}
                >
                  <PlaylistImage src={img} alt={alt} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
