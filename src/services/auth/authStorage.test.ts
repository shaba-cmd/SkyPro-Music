import { loadAuthState, saveAuthState } from './authStorage';

const STORAGE_KEY = 'skypro-music-auth';

const validState = {
  user: { _id: 1, email: 'test@test.ru', username: 'test' },
  access: 'access-token',
  refresh: 'refresh-token',
};

describe('authStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  describe('loadAuthState', () => {
    it('возвращает null, если в хранилище пусто', () => {
      expect(loadAuthState()).toBeNull();
    });

    it('возвращает null на невалидном JSON', () => {
      localStorage.setItem(STORAGE_KEY, 'не json');

      expect(loadAuthState()).toBeNull();
    });

    it('возвращает null, если нет refresh', () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...validState, refresh: null }),
      );

      expect(loadAuthState()).toBeNull();
    });

    it('возвращает null, если нет пользователя', () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...validState, user: null }),
      );

      expect(loadAuthState()).toBeNull();
    });

    it('возвращает сохранённое состояние', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validState));

      expect(loadAuthState()).toEqual(validState);
    });
  });

  describe('saveAuthState', () => {
    it('сохраняет состояние в хранилище', () => {
      saveAuthState({ ...validState, isHydrated: true } as never);

      const raw = localStorage.getItem(STORAGE_KEY);

      expect(JSON.parse(raw as string)).toEqual(validState);
    });

    it('удаляет запись, если refresh отсутствует', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validState));

      saveAuthState({ user: null, access: null, refresh: null });

      expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    });

    it('не падает, если хранилище недоступно', () => {
      jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('QuotaExceededError');
      });

      expect(() => saveAuthState(validState)).not.toThrow();
    });
  });
});
