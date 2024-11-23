import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

import { Locales } from '@/const';
import { routing } from '@/i18n/routing';

import Navigation from '@/components/navigation';
import { NewsCard } from '@/components/news-card';

import { getFileSrc, getNews } from '@/lib/directus';

import { translate } from '@/utils/translate';

export const revalidate = 60;

export default async function NewsPage({
  params: { locale },
}: {
  params: { locale: Locales };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const news = await getNews();

  return (
    <div>
      <Navigation />
      <main>
        <div className="container mx-auto">
          <div className="mb-8 mt-12 text-center md:mb-16">
            <h1 className="text-4xl font-semibold uppercase leading-tight tracking-tight md:text-7xl xl:text-8xl">
              {t('navigation.news')}
            </h1>
          </div>

          <div className="grid-cols grid gap-4 pb-16 md:grid-cols-3">
            {news.map((newsItem) => {
              const t = translate(newsItem, locale);
              return (
                <Link key={newsItem.id} href={`/noticias/${newsItem.slug}`}>
                  <NewsCard
                    title={t('title')}
                    teaser={t('teaser')}
                    createdAt={newsItem.date_created}
                    imageSrc={
                      newsItem.header_image
                        ? getFileSrc(newsItem.header_image.id)
                        : undefined
                    }
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
