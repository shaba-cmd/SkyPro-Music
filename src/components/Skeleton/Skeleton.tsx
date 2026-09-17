import { CSSProperties } from 'react';
import cn from 'classnames';
import styles from './skeleton.module.css';

type SkeletonProps = {
  className?: string;
  style?: CSSProperties;
};

export default function Skeleton({ className, style }: SkeletonProps) {
  return (
    <div
      className={cn(styles.skeleton, className)}
      style={style}
      aria-hidden="true"
    />
  );
}

export function TrackSkeleton() {
  return (
    <div className={styles.trackRow}>
      <Skeleton className={styles.trackCover} />
      <Skeleton className={styles.trackTitle} />
      <Skeleton className={styles.trackAuthor} />
      <Skeleton className={styles.trackAlbum} />
      <Skeleton className={styles.trackTime} />
    </div>
  );
}

export function TrackListSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div role="status" aria-label="Загрузка треков">
      {Array.from({ length: count }, (_, index) => (
        <TrackSkeleton key={index} />
      ))}
    </div>
  );
}

export function SidebarSkeleton({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton key={index} className={styles.sidebarItem} />
      ))}
    </>
  );
}

export function PlayerTrackSkeleton() {
  return (
    <div className={styles.playerTrack}>
      <Skeleton className={styles.playerCover} />
      <div>
        <Skeleton className={styles.playerName} />
        <Skeleton className={styles.playerAuthor} style={{ marginTop: 6 }} />
      </div>
    </div>
  );
}
