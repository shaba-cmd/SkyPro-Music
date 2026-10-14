import Link from 'next/link';
import styles from './message.module.css';
import Image from 'next/image';

type MessageProps = {
  text: string;
  onRetry?: () => void;
  auth?: boolean;
};

export default function Message({ text, onRetry, auth }: MessageProps) {
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
        <p className={styles.message__error}>{onRetry && 'Ошибка загрузки'}</p>
        <p className={styles.message__desc} role="status">
          {text}
        </p>
        {onRetry && (
          <button className={styles.message__btn} onClick={onRetry}>
            Повторить
          </button>
        )}
        {auth && (
          <Link className={styles.message__btn} href="/auth/sign-in">
            Войти
          </Link>
        )}
      </article>
    </div>
  );
}
