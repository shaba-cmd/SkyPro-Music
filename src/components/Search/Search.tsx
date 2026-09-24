'use client';

import styles from './search.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setSearchQuery } from '@/store/features/trackSlice';

export default function Search() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.tracks.searchQuery);

  return (
    <div className={styles.centerblock__search}>
      <svg className={styles.search__svg}>
        <use href="#icon-search" />
      </svg>
      <input
        className={styles.search__text}
        type="search"
        placeholder="Поиск"
        name="search"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      />
    </div>
  );
}
