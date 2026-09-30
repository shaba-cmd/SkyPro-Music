import { AxiosError, AxiosHeaders } from 'axios';
import { getAuthErrorMessage } from './authErrors';

const makeAxiosError = (status: number, data: unknown): AxiosError => {
  const error = new AxiosError('Request failed');

  error.response = {
    status,
    data,
    statusText: '',
    headers: new AxiosHeaders(),
    config: { headers: new AxiosHeaders() },
  };

  return error;
};

describe('getAuthErrorMessage', () => {
  it('возвращает общее сообщение для не-axios ошибки', () => {
    expect(getAuthErrorMessage(new Error('что-то'))).toBe(
      'Произошла ошибка. Попробуйте ещё раз',
    );
  });

  it('сообщает об отсутствии ответа сервера', () => {
    const error = new AxiosError('Network Error');

    expect(getAuthErrorMessage(error)).toBe(
      'Нет связи с сервером. Проверьте интернет',
    );
  });

  it('заменяет 401 понятным сообщением', () => {
    const error = makeAxiosError(401, {
      detail: 'Не найдено активной учетной записи',
    });

    expect(getAuthErrorMessage(error)).toBe('Неверный email или пароль');
  });

  it('показывает сообщение сервера для 403', () => {
    const error = makeAxiosError(403, {
      message: 'Введенный Email уже занят.',
    });

    expect(getAuthErrorMessage(error)).toBe('Введенный Email уже занят.');
  });

  it('подставляет заглушку, если сервер не прислал текст', () => {
    const error = makeAxiosError(418, {});

    expect(getAuthErrorMessage(error)).toBe('Данные введены неверно');
  });
});
