'use client';

import cn from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './filteritem.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setYearSort,
  toggleAuthorFilter,
  toggleGenreFilter,
  YearSortType,
} from '@/store/features/trackSlice';
import { useFilterOptions } from '@/hooks/useFilteredTracks';

const YEAR_OPTIONS: YearSortType[] = [
  'По умолчанию',
  'Сначала новые',
  'Сначала старые',
];

type FilterItemProps = {
  title: string;
  type: 'author' | 'year' | 'genre';
  isOpen: boolean;
  onToggle: () => void;
};

export default function FilterItem({
  title,
  type,
  isOpen,
  onToggle,
}: FilterItemProps) {
  const dispatch = useAppDispatch();
  const { authors, genres } = useFilterOptions();
  const filters = useAppSelector((state) => state.tracks.filters);

  const options =
    type === 'author' ? authors : type === 'genre' ? genres : YEAR_OPTIONS;

  const isSelected = (option: string) => {
    if (type === 'author') return filters.authors.includes(option);
    if (type === 'genre') return filters.genres.includes(option);
    return filters.yearSort === option;
  };

  const handleSelect = (option: string) => {
    if (type === 'author') return dispatch(toggleAuthorFilter(option));
    if (type === 'genre') return dispatch(toggleGenreFilter(option));
    dispatch(setYearSort(option as YearSortType));
  };

  const counter =
    type === 'author'
      ? filters.authors.length
      : type === 'genre'
        ? filters.genres.length
        : filters.yearSort !== 'По умолчанию'
          ? 1
          : 0;

  return (
    <div className={styles.fiter__box}>
      <div
        onClick={onToggle}
        className={cn(styles.filter__button, {
          [styles.filter__button_active]: isOpen,
        })}
      >
        <p>{title}</p>
      </div>

      <AnimatePresence>
        {counter > 0 && (
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={styles.filter__button_counter}
          >
            {counter}
          </motion.span>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={styles.filter__list}
          >
            <div
              className={cn({
                [styles.filter__list_scroll]: options.length > 5,
              })}
            >
              <div className={styles.filter__list_item}>
                {options.map((option) => (
                  <p
                    key={option}
                    className={cn({
                      [styles.filter__list_active]: isSelected(option),
                    })}
                    onClick={() => handleSelect(option)}
                  >
                    {option}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
