'use client';

import FilterItem from '@/components/FilterItem/FiterItem';
import styles from './filter.module.css';
import { useState } from 'react';

export default function Filter() {
  const title: string[] = ['исполнителю', 'году выпуска', 'жанру'];
  const [activeFilter, setActiveFilter] = useState<number | null>();

  const handleClick = (index: number, el: string) => {
    setActiveFilter((prev) => (prev === index ? null : index));
  };

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      {title.map((el, index) => {
        return (
          <FilterItem
            key={index}
            title={el}
            isActive={activeFilter === index}
            activeFilter={activeFilter}
            onClick={() => handleClick(index, el)}
          />
        );
      })}
    </div>
  );
}
