import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found__container">
      <h1 className="not-found__status">404</h1>
      <h3 className="not-found__title">Страница не найдена</h3>
      <p className="not-found__text">
        Возможно, она была удалена или перенесена на другой адрес
      </p>
      <Link href="/" className="not-found__btn">
        Вернуться на главную
      </Link>
    </div>
  );
}
