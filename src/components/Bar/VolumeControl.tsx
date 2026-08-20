import cn from 'classnames';
import styles from './bar.module.css';
import { useEffect, useState } from 'react';

export default function VolumeControl() {
  const [volume, setVolume] = useState(0.3);

  useEffect(() => {
    const audio = document.querySelector('audio');
    if (audio) audio.volume = volume;
  }, [volume]);

  return (
    <div className={styles.bar__volumeBlock}>
      <div className={styles.volume__content}>
        <div className={styles.volume__image}>
          <svg className={styles.volume__svg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
          </svg>
        </div>
        <div className={cn(styles.volume__progress, styles.btn)}>
          <input
            className={cn(styles.volume__progressLine, styles.btn)}
            type="range"
            name="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
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
