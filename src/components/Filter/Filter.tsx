'use client';

import FilterItem from '@/components/FilterItem/FilterItem';
import styles from './filter.module.css';
import { useState } from 'react';

const FILTERS = [
  { title: 'исполнителю', type: 'author' },
  { title: 'году выпуска', type: 'year' },
  { title: 'жанру', type: 'genre' },
] as const;

export default function Filter() {
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      {FILTERS.map(({ title, type }) => (
        <FilterItem
          key={type}
          title={title}
          type={type}
          isOpen={openFilter === type}
          onToggle={() =>
            setOpenFilter((prev) => (prev === type ? null : type))
          }
        />
      ))}
    </div>
  );
}
