import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterItem from './FilterItem';
import { renderWithStore } from '@/utils/testUtils';
import { makeStore } from '@/store/store';
import { setAllTracks } from '@/store/features/trackSlice';
import { TrackType } from '@/sharedTypes/sharedTypes';

const tracks = [
  {
    _id: 1,
    name: 'A',
    author: 'MED',
    genre: ['Рок'],
    release_date: '2020-01-01',
  },
  {
    _id: 2,
    name: 'B',
    author: 'Voisin',
    genre: ['Поп'],
    release_date: '2015-01-01',
  },
] as TrackType[];

const storeWithTracks = () => {
  const store = makeStore();
  store.dispatch(setAllTracks(tracks));
  return store;
};

describe('FilterItem', () => {
  it('показывает заголовок фильтра', () => {
    renderWithStore(
      <FilterItem
        title="исполнителю"
        type="author"
        isOpen={false}
        onToggle={jest.fn()}
      />,
      storeWithTracks(),
    );

    expect(screen.getByText('исполнителю')).toBeInTheDocument();
  });

  it('не показывает список, пока фильтр закрыт', () => {
    renderWithStore(
      <FilterItem
        title="исполнителю"
        type="author"
        isOpen={false}
        onToggle={jest.fn()}
      />,
      storeWithTracks(),
    );

    expect(screen.queryByText('MED')).not.toBeInTheDocument();
  });

  it('показывает исполнителей из стора в открытом виде', () => {
    renderWithStore(
      <FilterItem
        title="исполнителю"
        type="author"
        isOpen
        onToggle={jest.fn()}
      />,
      storeWithTracks(),
    );

    expect(screen.getByText('MED')).toBeInTheDocument();
    expect(screen.getByText('Voisin')).toBeInTheDocument();
  });

  it('вызывает onToggle по клику на заголовок', async () => {
    const onToggle = jest.fn();
    renderWithStore(
      <FilterItem
        title="исполнителю"
        type="author"
        isOpen={false}
        onToggle={onToggle}
      />,
      storeWithTracks(),
    );

    await userEvent.click(screen.getByText('исполнителю'));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('записывает выбранного исполнителя в стор', async () => {
    const store = storeWithTracks();
    renderWithStore(
      <FilterItem
        title="исполнителю"
        type="author"
        isOpen
        onToggle={jest.fn()}
      />,
      store,
    );

    await userEvent.click(screen.getByText('MED'));

    expect(store.getState().tracks.filters.authors).toEqual(['MED']);
  });

  it('показывает счётчик выбранных значений', async () => {
    const store = storeWithTracks();
    renderWithStore(
      <FilterItem
        title="исполнителю"
        type="author"
        isOpen
        onToggle={jest.fn()}
      />,
      store,
    );

    await userEvent.click(screen.getByText('MED'));

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('показывает варианты сортировки для типа year', () => {
    renderWithStore(
      <FilterItem
        title="году выпуска"
        type="year"
        isOpen
        onToggle={jest.fn()}
      />,
      storeWithTracks(),
    );

    expect(screen.getByText('Сначала новые')).toBeInTheDocument();
    expect(screen.getByText('Сначала старые')).toBeInTheDocument();
  });
});
