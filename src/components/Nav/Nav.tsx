'use client';

import Image from 'next/image';
import styles from './nav.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch } from '@/store/store';
import { clearAuth } from '@/store/features/authSlice';
import { useThemeTransition } from '@/hooks/useThemeTransition';
import { PLAYLISTS } from '../SideBar/SideBar';
import cn from 'classnames';

export default function Nav() {
  const dispatch = useAppDispatch();
  const { theme, toggleWithAnimation } = useThemeTransition();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.main__nav}>
      <Link href="/music/main">
        <div className={styles.nav__logo}>
          <Image
            width={250}
            height={170}
            className={styles.logo__image}
            src={`/img/logo${theme === 'light' ? '-light' : ''}.png`}
            alt={'logo'}
            priority
          />
        </div>
      </Link>
      <div
        onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
        className={styles.nav__burger}
      >
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className={styles.menu__list}
          >
            <li className={styles.menu__item}>
              <Link href="/music/main" className={styles.menu__link}>
                Главное
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link href="/music/my-playlist" className={styles.menu__link}>
                Мой плейлист
              </Link>
            </li>
            {PLAYLISTS.map(({ id, alt }) => (
              <li key={id} className={cn(styles.menu__item, styles.menu__pl)}>
                <Link
                  className={styles.menu__link}
                  href={`/music/category/${id}`}
                >
                  {alt}
                </Link>
              </li>
            ))}
            <li className={styles.menu__item}>
              <Link
                href="/auth/sign-in"
                replace
                prefetch={false}
                className={styles.menu__link}
                onClick={() => dispatch(clearAuth())}
              >
                Выйти
              </Link>
            </li>
            <li className={styles.menu__item}>
              <div
                onClick={toggleWithAnimation}
                role="button"
                tabIndex={0}
                aria-label="Переключить тему"
              >
                <svg>
                  <use
                    className={styles.menu__theme}
                    href={theme === 'dark' ? '#icon-light' : '#icon-dark'}
                  />
                </svg>
              </div>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
