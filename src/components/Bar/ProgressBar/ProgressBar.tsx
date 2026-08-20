import styles from './progressBar.module.css';
import { formatTime } from '@/utils/helper';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onProgressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}

export default function ProgressBar({
  currentTime,
  duration,
  onProgressChange,
  onDragStart,
  onDragEnd,
}: ProgressBarProps) {
  return (
    <div className={styles.bar__playerProgress}>
      <div className={styles.progress__track}>
        <input
          className={styles.progress__input}
          type="range"
          min="0"
          max={duration || 1}
          step="0.1"
          value={currentTime}
          onChange={onProgressChange}
          onMouseDown={onDragStart}
          onMouseUp={onDragEnd}
          onTouchStart={onDragStart}
          onTouchEnd={onDragEnd}
        />
        <div
          className={styles.progress__bar}
          style={{
            width: duration ? `${(currentTime / duration) * 100}%` : '0%',
          }}
        />
        <div className={styles.progress__timeBox}>
          <span className={styles.progress__time}>
            {formatTime(currentTime)}
          </span>
          <span className={styles.progress__time}>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
