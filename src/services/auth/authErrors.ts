import axios from 'axios';

const STATUS_MESSAGES: Record<number, string> = {
  400: 'Заполните все поля',
  401: 'Неверный email или пароль',
  500: 'Сервер не отвечает. Попробуйте позже',
};

export const getAuthErrorMessage = (error: unknown): string => {
  if (!axios.isAxiosError(error)) {
    return 'Произошла ошибка. Попробуйте ещё раз';
  }

  if (!error.response) {
    return 'Нет связи с сервером. Проверьте интернет';
  }

  const { status, data } = error.response;

  const knownMessage = STATUS_MESSAGES[status];
  if (knownMessage) return knownMessage;

  const responseData = data as
    { message?: string; detail?: string } | undefined;

  if (typeof responseData?.message === 'string') return responseData.message;
  if (typeof responseData?.detail === 'string') return responseData.detail;

  return 'Данные введены неверно';
};
