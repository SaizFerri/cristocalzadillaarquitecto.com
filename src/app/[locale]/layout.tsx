import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';

import { Locales } from '@/const';
import { routing } from '@/i18n/routing';

import Footer from '@/components/footer';

import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Cristo Calzadilla Arquitecto',
  description:
    'Arquitecto urbano en Tenerife, Islas canarias y peninsula iberica',
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locales };
}>) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.className} text-text relative antialiased`}>
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
