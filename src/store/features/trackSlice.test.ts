import {
  trackSliceReducer,
  setSearchQuery,
  toggleAuthorFilter,
  toggleGenreFilter,
  setYearSort,
  resetFilters,
  setNextTrack,
  setPrevTrack,
  addLikedTrack,
  removeLikedTrack,
} from './trackSlice';
import { TrackType } from '@/sharedTypes/sharedTypes';

const makeTrack = (id: number, author = 'Автор'): TrackType =>
  ({
    _id: id,
    name: `Трек ${id}`,
    author,
    album: 'Альбом',
    genre: ['Рок'],
    duration_in_seconds: 200,
    release_date: '2020-01-01',
    logo: null,
    track_file: `file-${id}.mp3`,
    staredUser: [],
  }) as TrackType;

const initial = trackSliceReducer(undefined, { type: 'init' });

describe('trackSlice', () => {
  describe('фильтры', () => {
    it('добавляет исполнителя в фильтр', () => {
      const state = trackSliceReducer(initial, toggleAuthorFilter('MED'));

      expect(state.filters.authors).toEqual(['MED']);
    });

    it('убирает исполнителя при повторном выборе', () => {
      const withAuthor = trackSliceReducer(initial, toggleAuthorFilter('MED'));
      const state = trackSliceReducer(withAuthor, toggleAuthorFilter('MED'));

      expect(state.filters.authors).toEqual([]);
    });

    it('накапливает несколько жанров', () => {
      const first = trackSliceReducer(initial, toggleGenreFilter('Рок'));
      const state = trackSliceReducer(first, toggleGenreFilter('Поп'));

      expect(state.filters.genres).toEqual(['Рок', 'Поп']);
    });

    it('сбрасывает фильтры и поиск', () => {
      let state = trackSliceReducer(initial, toggleAuthorFilter('MED'));
      state = trackSliceReducer(state, setSearchQuery('привет'));
      state = trackSliceReducer(state, setYearSort('Сначала новые'));
      state = trackSliceReducer(state, resetFilters());

      expect(state.filters.authors).toEqual([]);
      expect(state.filters.yearSort).toBe('По умолчанию');
      expect(state.searchQuery).toBe('');
    });
  });

  describe('переключение треков', () => {
    const playlist = [makeTrack(1), makeTrack(2), makeTrack(3)];

    const withPlaylist = (
      currentTrack: TrackType,
    ): ReturnType<typeof trackSliceReducer> => ({
      ...initial,
      playlist,
      currentTrack,
    });

    it('переходит к следующему треку', () => {
      const state = trackSliceReducer(
        withPlaylist(playlist[0]),
        setNextTrack(),
      );

      expect(state.currentTrack?._id).toBe(2);
      expect(state.isPlay).toBe(true);
    });

    it('с последнего трека переходит на первый', () => {
      const state = trackSliceReducer(
        withPlaylist(playlist[2]),
        setNextTrack(),
      );

      expect(state.currentTrack?._id).toBe(1);
      expect(state.isPlay).toBe(true);
    });

    it('с первого трека назад уходит на последний', () => {
      const state = trackSliceReducer(
        withPlaylist(playlist[0]),
        setPrevTrack(),
      );

      expect(state.currentTrack?._id).toBe(3);
    });

    it('ничего не делает при пустой очереди', () => {
      const state = trackSliceReducer(initial, setNextTrack());

      expect(state.currentTrack).toBeNull();
    });
  });

  describe('избранное', () => {
    it('добавляет трек в избранное', () => {
      const track = makeTrack(1);
      const state = trackSliceReducer(initial, addLikedTrack(track));

      expect(state.favoriteTracks).toHaveLength(1);
    });

    it('не добавляет дубликат', () => {
      const track = makeTrack(1);
      const first = trackSliceReducer(initial, addLikedTrack(track));
      const state = trackSliceReducer(first, addLikedTrack(track));

      expect(state.favoriteTracks).toHaveLength(1);
    });

    it('удаляет трек из избранного', () => {
      const track = makeTrack(1);
      const first = trackSliceReducer(initial, addLikedTrack(track));
      const state = trackSliceReducer(first, removeLikedTrack(track));

      expect(state.favoriteTracks).toEqual([]);
    });
  });
});
