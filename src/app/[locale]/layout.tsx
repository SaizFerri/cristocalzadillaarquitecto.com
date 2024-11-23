import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';

import { Locales } from '@/const';
import { routing } from '@/i18n/routing';
import { Locale, setDefaultOptions } from 'date-fns';
import { enGB, es } from 'date-fns/locale';

import Footer from '@/components/footer';

import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

// TOOD: remove robots
export const metadata: Metadata = {
  title: 'Cristo Calzadilla Arquitecto',
  description:
    'Arquitecto urbano en Tenerife, Islas canarias y peninsula iberica',
  robots: { index: false, follow: false },
};

const localeMap: Record<Locales, Locale> = {
  es: es,
  en: enGB,
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locales };
}>) {
  unstable_setRequestLocale(locale);
  setDefaultOptions({ locale: localeMap[locale] });
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={`${inter.className} relative text-text antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Footer />
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
