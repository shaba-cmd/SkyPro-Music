import { useAppSelector } from '@/store/store';
import styles from './progressBar.module.css';
import { formatTime } from '@/utils/helper';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  handleProgressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProgressBar({
  currentTime,
  duration,
  handleProgressChange,
}: ProgressBarProps) {
  const isLoading = useAppSelector((state) => state.tracks.isLoading);

  return (
    <div className={styles.bar__playerProgress}>
      <input
        className={styles.progress__input}
        type="range"
        max={duration || 0}
        step="0.1"
        value={currentTime}
        onChange={handleProgressChange}
        disabled={isLoading}
      />
      <div className={styles.progress__timeBox}>
        <span className={styles.progress__time}>{formatTime(currentTime)}</span>
        <span className={styles.progress__time}>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
