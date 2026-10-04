import styles from './skeleton.module.css';
import Skeleton from 'react-loading-skeleton';

export function PageSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div role="status" aria-label="Загрузка страницы">
      <Skeleton width={280} height={58} style={{ marginBottom: 45 }} />
      <div className={styles.filterRow}>
        <Skeleton width={140} height={38} borderRadius={60} />
        <Skeleton width={140} height={38} borderRadius={60} />
        <Skeleton width={140} height={38} borderRadius={60} />
      </div>
      <div role="status" aria-label="Загрузка треков">
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className={styles.trackRow}>
            <Skeleton width={51} height={51} />
            <Skeleton width={356} height={19} />
            <Skeleton width={271} height={19} />
            <Skeleton width={205} height={19} />
            <Skeleton width={40} height={19} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PlaylistImageSkeleton() {
  return <Skeleton width={250} height={150} borderRadius={6} />;
}
