import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAppDispatch } from '@/store/store';
import { resetFilters } from '@/store/features/trackSlice';

export const useResetFiltersOnNavigate = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetFilters());
  }, [pathname, dispatch]);
};
