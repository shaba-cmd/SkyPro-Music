import styles from './signup.module.css';
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
              className={styles.modal__input}
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
            <button className={styles.modal__btnSignupEnt}>
              {isSignUp ? 'Зарегистрироваться' : 'Войти'}
            </button>
            {!isSignUp && (
              <Link href={'/auth/sign-up'} className={styles.modal__btnSignup}>
                Зарегистрироваться
              </Link>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
