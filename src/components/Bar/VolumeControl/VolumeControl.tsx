import { useAppDispatch, useAppSelector } from '@/store/store';
import styles from './volumeControl.module.css';
import { setVolume } from '@/store/features/trackSlice';

export default function VolumeControl() {
  const dispatch = useAppDispatch();
  const volume = useAppSelector((state) => state.tracks.volume);

  return (
    <div className={styles.bar__volumeBlock}>
      <div className={styles.volume__content}>
        <div className={styles.volume__image}>
          <svg className={styles.volume__svg}>
            <use href="#icon-volume"></use>
          </svg>
        </div>
        <div className={styles.volume__progress}>
          <input
            className={styles.volume__progressLine}
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => dispatch(setVolume(Number(e.target.value)))}
            style={{
              background: `linear-gradient(to right, #ffffff 0%, #ffffff ${volume * 100}%,
                    #797979 ${volume * 100}%, #797979 100%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
