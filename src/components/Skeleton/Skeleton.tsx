import cn from 'classnames';
import styles from './skeleton.module.css';

export default function Skeleton({ className }: { className?: string }) {
  return <div className={cn(styles.skeleton, className)} aria-hidden="true" />;
}

export function TrackListSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div role="status" aria-label="Загрузка треков">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className={styles.trackRow}>
          <Skeleton className={styles.trackCover} />
          <Skeleton className={styles.trackTitle} />
          <Skeleton className={styles.trackAuthor} />
          <Skeleton className={styles.trackAlbum} />
          <Skeleton className={styles.trackTime} />
        </div>
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div role="status" aria-label="Загрузка страницы">
      <Skeleton className={styles.pageTitle} />
      <div className={styles.filterRow}>
        <Skeleton className={styles.filterButton} />
        <Skeleton className={styles.filterButton} />
        <Skeleton className={styles.filterButton} />
      </div>
      <TrackListSkeleton />
    </div>
  );
}
