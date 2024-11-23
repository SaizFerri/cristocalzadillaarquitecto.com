import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { Locales } from '@/const';
import { routing } from '@/i18n/routing';
import { format } from 'date-fns';

import Navigation from '@/components/navigation';
import Wysiwyg from '@/components/wysiwyg';

import { getAllNewsSlugs, getFileSrc, getNewsBySlug } from '@/lib/directus';

import { translate } from '@/utils/translate';

export const revalidate = 60;

export default async function NewsItemPage({
  params: { locale, slug },
}: {
  params: { locale: Locales; slug: string };
}) {
  unstable_setRequestLocale(locale);
  const newsItem = await getNewsBySlug(slug);

  if (!newsItem) {
    notFound();
  }

  const t = translate(newsItem, locale);

  return (
    <div>
      <header className="w-full">
        <Navigation />
        <div className="container mx-auto mb-12 mt-8 px-2 text-center">
          <h1 className="mb-6 text-4xl font-semibold uppercase leading-none tracking-tight md:mb-10 md:text-5xl xl:text-7xl">
            {newsItem.title}
          </h1>
          <time className="text-sm text-muted-foreground">
            {format(new Date(newsItem.date_created), 'dd/MM/yyyy')}
          </time>
        </div>
      </header>

      <main className="bg-white">
        <div className="container-tight mx-auto">
          <Wysiwyg content={t('content')} />

          {newsItem.gallery && newsItem.gallery.length > 0 && (
            <section className="flex flex-col items-center gap-8 px-1 py-16 lg:px-0">
              {newsItem.gallery?.map(({ id, title, width, height }) => (
                <Image
                  key={id}
                  src={getFileSrc(id)}
                  alt={title}
                  width={width}
                  height={height}
                />
              ))}
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs();

  return slugs.flatMap((slug) => {
    return routing.locales.map((locale) => ({ locale, slug }));
  });
}
