import { ReactElement, ReactNode } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/store/store';

export const renderWithStore = (
  ui: ReactElement,
  store: AppStore = makeStore(),
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  return { store, ...render(ui, { wrapper: Wrapper }) };
};
