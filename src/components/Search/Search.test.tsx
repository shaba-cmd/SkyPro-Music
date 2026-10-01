import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';
import { renderWithStore } from '@/utils/testUtils';
import { makeStore } from '@/store/store';
import { setSearchQuery } from '@/store/features/trackSlice';

describe('Search', () => {
  it('отображает поле поиска', () => {
    renderWithStore(<Search />);

    expect(screen.getByPlaceholderText('Поиск')).toBeInTheDocument();
  });

  it('записывает введённый текст в стор', async () => {
    const store = makeStore();
    renderWithStore(<Search />, store);

    await userEvent.type(screen.getByPlaceholderText('Поиск'), 'bounce');

    expect(store.getState().tracks.searchQuery).toBe('bounce');
  });

  it('показывает значение из стора', () => {
    const store = makeStore();
    store.dispatch(setSearchQuery('insire'));

    renderWithStore(<Search />, store);

    expect(screen.getByPlaceholderText('Поиск')).toHaveValue('insire');
  });
});
