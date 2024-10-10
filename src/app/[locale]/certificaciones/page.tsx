import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { Suspense } from 'react';

import { Locales } from '@/const';
import { routing } from '@/i18n/routing';

import Navigation, { NavigationLoader } from '@/components/navigation';

export default function CeertificationsPage({
  params: { locale },
}: {
  params: { locale: Locales };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <div>
      <Suspense fallback={<NavigationLoader />}>
        <Navigation />
      </Suspense>
      <main>
        <div className="container mx-auto">
          <div className="mb-8 text-center md:mb-16">
            <h1 className="text-4xl font-semibold uppercase leading-tight tracking-tight md:text-7xl xl:text-8xl">
              {t('certificationsPage.title')}
            </h1>
          </div>
        </div>
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
