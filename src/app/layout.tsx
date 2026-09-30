import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/store/ReduxProvider';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['cyrillic', 'latin'],
});

export const metadata: Metadata = {
  title: 'SkyPro Music',
  description: 'Музыкальный сервис: каталог треков, подборки и избранное',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${montserrat.variable}`}>
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
