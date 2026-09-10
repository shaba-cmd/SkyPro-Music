import Button from '@/UI/Button/Button';
import styles from './authform.module.css';
import cn from 'classnames';
import Link from 'next/link';

export default function AuthForm({ isSignUp }: { isSignUp: boolean }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modal__block}>
          <form className={styles.modal__form}>
            <Link href="/music/main">
              <div className={styles.modal__logo}>
                <img src="/img/logo_modal.png" alt="logo" />
              </div>
            </Link>

            <input
              className={cn(styles.modal__input, styles.login)}
              type="text"
              name="login"
              placeholder="Почта"
            />
            <input
              className={cn(styles.modal__input, isSignUp && styles.login)}
              type="password"
              name="password"
              placeholder="Пароль"
            />
            {isSignUp && (
              <input
                className={styles.modal__input}
                type="password"
                name="password"
                placeholder="Повторите пароль"
              />
            )}
            <div className={styles.errorContainer}></div>
            <Button>{isSignUp ? 'Зарегистрироваться' : 'Войти'}</Button>
            {!isSignUp && (
              <Link href="/auth/sign-up" className={styles.modal__btnSignup}>
                Зарегистрироваться
              </Link>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
