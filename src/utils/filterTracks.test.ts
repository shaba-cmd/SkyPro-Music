import { filterTracks, getFilterOptions, FiltersType } from './filterTracks';
import { TrackType } from '@/sharedTypes/sharedTypes';

const makeTrack = (
  id: number,
  name: string,
  author: string,
  genre: string[],
  release_date: string,
): TrackType =>
  ({
    _id: id,
    name,
    author,
    genre,
    release_date,
    album: 'Альбом',
    duration_in_seconds: 200,
    logo: null,
    track_file: `file-${id}.mp3`,
    staredUser: [],
  }) as TrackType;

const tracks = [
  makeTrack(1, 'Bounce', 'MED', ['Рок'], '2020-01-01'),
  makeTrack(2, 'Insire', 'Voisin', ['Поп'], '2015-06-15'),
  makeTrack(3, 'Deadfro5h', 'Starforsh', ['Рок', 'Электроника'], '2023-03-10'),
];

const noFilters: FiltersType = {
  authors: [],
  genres: [],
  yearSort: 'По умолчанию',
};

describe('filterTracks', () => {
  describe('поиск', () => {
    it('возвращает все треки при пустом запросе', () => {
      expect(filterTracks(tracks, '', noFilters)).toHaveLength(3);
    });

    it('находит трек по названию', () => {
      const result = filterTracks(tracks, 'bounce', noFilters);

      expect(result).toHaveLength(1);
      expect(result[0]._id).toBe(1);
    });

    it('находит трек по исполнителю', () => {
      const result = filterTracks(tracks, 'voisin', noFilters);

      expect(result[0]._id).toBe(2);
    });

    it('игнорирует регистр', () => {
      expect(filterTracks(tracks, 'BOUNCE', noFilters)).toHaveLength(1);
    });

    it('игнорирует пробелы по краям', () => {
      expect(filterTracks(tracks, '  bounce  ', noFilters)).toHaveLength(1);
    });

    it('возвращает пустой массив, если ничего не найдено', () => {
      expect(filterTracks(tracks, 'яяяя', noFilters)).toEqual([]);
    });
  });

  describe('фильтр по исполнителю', () => {
    it('оставляет треки выбранного исполнителя', () => {
      const result = filterTracks(tracks, '', {
        ...noFilters,
        authors: ['MED'],
      });

      expect(result).toHaveLength(1);
      expect(result[0].author).toBe('MED');
    });

    it('поддерживает несколько исполнителей', () => {
      const result = filterTracks(tracks, '', {
        ...noFilters,
        authors: ['MED', 'Voisin'],
      });

      expect(result).toHaveLength(2);
    });
  });

  describe('фильтр по жанру', () => {
    it('находит треки с указанным жанром', () => {
      const result = filterTracks(tracks, '', {
        ...noFilters,
        genres: ['Рок'],
      });

      expect(result).toHaveLength(2);
    });

    it('учитывает все жанры трека', () => {
      const result = filterTracks(tracks, '', {
        ...noFilters,
        genres: ['Электроника'],
      });

      expect(result[0]._id).toBe(3);
    });
  });

  describe('сортировка по году', () => {
    it('сортирует от новых к старым', () => {
      const result = filterTracks(tracks, '', {
        ...noFilters,
        yearSort: 'Сначала новые',
      });

      expect(result.map((t) => t._id)).toEqual([3, 1, 2]);
    });

    it('сортирует от старых к новым', () => {
      const result = filterTracks(tracks, '', {
        ...noFilters,
        yearSort: 'Сначала старые',
      });

      expect(result.map((t) => t._id)).toEqual([2, 1, 3]);
    });

    it('не мутирует исходный массив', () => {
      const original = [...tracks];

      filterTracks(tracks, '', { ...noFilters, yearSort: 'Сначала новые' });

      expect(tracks).toEqual(original);
    });
  });

  describe('комбинации', () => {
    it('применяет поиск и фильтр вместе', () => {
      const result = filterTracks(tracks, 'e', {
        ...noFilters,
        genres: ['Рок'],
      });

      expect(result.every((track) => track.genre.includes('Рок'))).toBe(true);
    });

    it('возвращает пустой массив при несовместимых условиях', () => {
      const result = filterTracks(tracks, 'bounce', {
        ...noFilters,
        authors: ['Voisin'],
      });

      expect(result).toEqual([]);
    });
  });
});

describe('getFilterOptions', () => {
  it('собирает уникальных исполнителей по алфавиту', () => {
    expect(getFilterOptions(tracks).authors).toEqual([
      'MED',
      'Starforsh',
      'Voisin',
    ]);
  });

  it('собирает уникальные жанры без повторов', () => {
    expect(getFilterOptions(tracks).genres).toEqual([
      'Поп',
      'Рок',
      'Электроника',
    ]);
  });

  it('возвращает пустые списки для пустого массива', () => {
    expect(getFilterOptions([])).toEqual({ authors: [], genres: [] });
  });
});
