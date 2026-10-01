import { formatTime } from './helper';

describe('formatTime', () => {
  it('форматирует секунды в мм:сс', () => {
    expect(formatTime(205)).toBe('3:25');
  });

  it('добавляет ведущий ноль к секундам', () => {
    expect(formatTime(65)).toBe('1:05');
  });

  it('возвращает 0:00 для нуля', () => {
    expect(formatTime(0)).toBe('0:00');
  });

  it('обрабатывает значения меньше минуты', () => {
    expect(formatTime(45)).toBe('0:45');
  });

  it('обрабатывает ровные минуты', () => {
    expect(formatTime(180)).toBe('3:00');
  });
});
