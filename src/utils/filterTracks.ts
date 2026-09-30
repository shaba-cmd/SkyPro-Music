import { TrackType } from '@/sharedTypes/sharedTypes';
import { YearSortType } from '@/store/features/trackSlice';

export type FiltersType = {
  authors: string[];
  genres: string[];
  yearSort: YearSortType;
};

const getTime = (date: string) => {
  const time = new Date(date).getTime();
  return Number.isNaN(time) ? 0 : time;
};

export const filterTracks = (
  tracks: TrackType[],
  searchQuery: string,
  filters: FiltersType,
): TrackType[] => {
  let result = tracks;

  const query = searchQuery.trim().toLowerCase();
  if (query) {
    result = result.filter(
      (track) =>
        track.name.toLowerCase().includes(query) ||
        track.author.toLowerCase().includes(query),
    );
  }

  if (filters.authors.length) {
    result = result.filter((track) => filters.authors.includes(track.author));
  }

  if (filters.genres.length) {
    result = result.filter((track) =>
      track.genre.some((genre) => filters.genres.includes(genre)),
    );
  }

  if (filters.yearSort !== 'По умолчанию') {
    const direction = filters.yearSort === 'Сначала новые' ? -1 : 1;

    result = [...result].sort(
      (a, b) => (getTime(a.release_date) - getTime(b.release_date)) * direction,
    );
  }

  return result;
};

export const getFilterOptions = (tracks: TrackType[]) => {
  const authors = new Set<string>();
  const genres = new Set<string>();

  tracks.forEach((track) => {
    if (track.author) authors.add(track.author);
    track.genre?.forEach((genre) => genre && genres.add(genre));
  });

  return {
    authors: Array.from(authors).sort(),
    genres: Array.from(genres).sort(),
  };
};
