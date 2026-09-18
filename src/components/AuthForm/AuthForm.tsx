'use client';

import { SubmitEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import cn from 'classnames';
import styles from './authform.module.css';
import Button from '@/UI/Button/Button';
import { getTokens, loginUser, signUpUser } from '@/services/auth/authApi';
import { getAuthErrorMessage } from '@/services/auth/authErrors';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setAuth } from '@/store/features/authSlice';

export default function AuthForm({ isSignUp }: { isSignUp: boolean }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const access = useAppSelector((state) => state.auth.access);
  const isHydrated = useAppSelector((state) => state.auth.isHydrated);

  useEffect(() => {
    if (isHydrated && access) {
      router.replace('/music/main');
    }
  }, [isHydrated, access, router]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    repeatPassword: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError('');
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      return 'Заполните email';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return 'Некорректный email';
    }

    if (!formData.password.trim()) {
      return 'Заполните пароль';
    }
    if (formData.password.length < 6) {
      return 'Пароль должен быть не менее 6 символов';
    }

    if (isSignUp && !formData.repeatPassword.trim()) {
      return 'Повторите пароль';
    }
    if (isSignUp && formData.password !== formData.repeatPassword) {
      return 'Пароли должны совпадать';
    }

    return '';
  };

  const onSend = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError('');

    const credentials = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    try {
      const user = isSignUp
        ? await signUpUser(credentials)
        : await loginUser(credentials);

      const tokens = await getTokens(credentials);

      dispatch(setAuth({ user, tokens }));

      router.replace('/music/main');
      router.refresh();
    } catch (requestError: unknown) {
      setError(getAuthErrorMessage(requestError));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modal__block}>
          <form className={styles.modal__form} onSubmit={onSend}>
            <Link href="/music/main">
              <div className={styles.modal__logo}>
                <img src="/img/logo_modal.png" alt="logo" />
              </div>
            </Link>

            <input
              className={cn(styles.modal__input, styles.email)}
              type="text"
              name="email"
              placeholder="Почта"
              autoComplete="email"
              disabled={isLoading}
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className={cn(styles.modal__input, isSignUp && styles.email)}
              type="password"
              name="password"
              placeholder="Пароль"
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              disabled={isLoading}
              value={formData.password}
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                className={styles.modal__input}
                type="password"
                name="repeatPassword"
                placeholder="Повторите пароль"
                autoComplete="new-password"
                disabled={isLoading}
                value={formData.repeatPassword}
                onChange={handleChange}
              />
            )}

            <div className={styles.errorContainer}>{error}</div>

            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? 'Подождите...'
                : isSignUp
                  ? 'Зарегистрироваться'
                  : 'Войти'}
            </Button>

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
