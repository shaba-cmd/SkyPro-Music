import styles from './message.module.css';
import Image from 'next/image';

type MessageProps = {
  text: string;
  onRetry?: () => void;
};

export default function Message({ text, onRetry }: MessageProps) {
  return (
    <div className={styles.message}>
      <article className={styles.message__box}>
        <Image
          src="/img/smile_sad.png"
          alt="sad smile"
          width={120}
          height={120}
          priority
        />
        <p className={styles.message__error}>Ошибка загрузки</p>
        <p className={styles.message__desc} role="status">
          {text}
        </p>
        <button onClick={onRetry} className={styles.message__btn}>
          Повторить
        </button>
      </article>
    </div>
  );
}
