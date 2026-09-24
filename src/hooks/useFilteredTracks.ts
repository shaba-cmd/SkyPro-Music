import { useMemo } from 'react';
import { useAppSelector } from '@/store/store';
import { TrackType } from '@/sharedTypes/sharedTypes';

const getTime = (date: string) => {
  const time = new Date(date).getTime();
  return Number.isNaN(time) ? 0 : time;
};

export const useFilteredTracks = (): TrackType[] => {
  const allTracks = useAppSelector((state) => state.tracks.allTracks);
  const searchQuery = useAppSelector((state) => state.tracks.searchQuery);
  const filters = useAppSelector((state) => state.tracks.filters);

  return useMemo(() => {
    let result = allTracks;

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
        (a, b) =>
          (getTime(a.release_date) - getTime(b.release_date)) * direction,
      );
    }

    return result;
  }, [allTracks, searchQuery, filters]);
};

export const useFilterOptions = () => {
  const allTracks = useAppSelector((state) => state.tracks.allTracks);

  return useMemo(() => {
    const authors = new Set<string>();
    const genres = new Set<string>();

    allTracks.forEach((track) => {
      if (track.author) authors.add(track.author);
      track.genre?.forEach((genre) => genre && genres.add(genre));
    });

    return {
      authors: Array.from(authors).sort(),
      genres: Array.from(genres).sort(),
    };
  }, [allTracks]);
};
