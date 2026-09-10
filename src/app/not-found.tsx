import Link from 'next/link';
import PageLayout from './music/layout';
import Image from 'next/image';
import styles from './not-found.module.css';

export default function NotFound() {
  const page = true;

  return (
    <PageLayout page={page}>
      <div className={styles.notFound}>
        <article className={styles.notFound__box}>
          <h1 className={styles.notFound__error}>404</h1>
          <div className={styles.notFound__boxText}>
            <p className={styles.notFound__text}>Страница не найдена</p>
            <Image
              src="/img/not_found.png"
              alt="crying smile"
              width={52}
              height={52}
              priority
            />
          </div>
          <p className={styles.notFound__desc}>
            Возможно, она была удалена или перенесена на другой адрес
          </p>
          <Link href="/music/main" className={styles.notFound__btn}>
            Вернутсья на главную
          </Link>
        </article>
      </div>
    </PageLayout>
  );
}
