import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Message from './Message';

describe('Message', () => {
  it('показывает переданный текст', () => {
    render(<Message text="Ничего не найдено" />);

    expect(screen.getByText('Ничего не найдено')).toBeInTheDocument();
  });

  it('не показывает кнопку без обработчика', () => {
    render(<Message text="Ошибка" />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('показывает кнопку повтора, если передан onRetry', () => {
    render(<Message text="Ошибка" onRetry={jest.fn()} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('вызывает onRetry по клику', async () => {
    const onRetry = jest.fn();
    render(<Message text="Ошибка" onRetry={onRetry} />);

    await userEvent.click(screen.getByRole('button'));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
