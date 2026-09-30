import { useMemo } from 'react';
import { useAppSelector } from '@/store/store';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { filterTracks, getFilterOptions } from '@/utils/filterTracks';

export const useFilteredTracks = (): TrackType[] => {
  const allTracks = useAppSelector((state) => state.tracks.allTracks);
  const searchQuery = useAppSelector((state) => state.tracks.searchQuery);
  const filters = useAppSelector((state) => state.tracks.filters);

  return useMemo(
    () => filterTracks(allTracks, searchQuery, filters),
    [allTracks, searchQuery, filters],
  );
};

export const useFilterOptions = () => {
  const allTracks = useAppSelector((state) => state.tracks.allTracks);

  return useMemo(() => getFilterOptions(allTracks), [allTracks]);
};
