import cn from 'classnames';
import styles from './filteritem.module.css';
import { data } from '@/data';
import { FilterItemProps, TrackType } from '@/sharedTypes/sharedTypes';
import { getUniqueValuesByKey } from '@/utils/helper';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function FilterItem({
  title,
  isActive,
  activeFilter,
  onClick,
}: FilterItemProps) {
  const key: keyof TrackType | null =
    activeFilter === 0 ? 'author' : activeFilter === 2 ? 'genre' : null;

  const filter = key ? getUniqueValuesByKey(data, key) : [];

  const [arrayFilter, setArrayFilter] = useState<string[]>([]);

  const filterClick = (el: string) => {
    setArrayFilter((a) => [...a, el]);
  };

  return (
    <div className={styles.fiter__box}>
      <div
        onClick={onClick}
        className={cn(styles.filter__button, {
          [styles.filter__button_active]: isActive,
        })}
      >
        <p>{title}</p>
      </div>
      <span
        className={cn({
          [styles.filter__button_counter]: arrayFilter.length > 0,
        })}
      >
        {arrayFilter.length || null}
      </span>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={styles.filter__list}
          >
            <div
              className={cn({
                [styles.filter__list_scroll]:
                  title !== 'году выпуска' && filter.length > 5,
              })}
            >
              <div className={styles.filter__list_item}>
                {title === 'году выпуска' ? (
                  <>
                    <p>По умолчанию</p>
                    <p>Сначала новые</p>
                    <p>Сначала старые</p>
                  </>
                ) : (
                  filter.map((el, index) => (
                    <p
                      className={cn({
                        [styles.filter__list_active]: arrayFilter.length > 0,
                      })}
                      key={index}
                      onClick={() => filterClick(el)}
                    >
                      {el}
                    </p>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
