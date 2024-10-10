import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { Suspense } from 'react';

import { Locales } from '@/const';
import { routing } from '@/i18n/routing';
import { MoveDown } from 'lucide-react';

import Navigation, { NavigationLoader } from '@/components/navigation';
import TextColumns from '@/components/text-columns';
import Wysiwyg from '@/components/wysiwyg';

import {
  getAllProjectSlugs,
  getFileSrc,
  getProjectBySlug,
} from '@/lib/directus';

export default async function ProjectPage({
  params: { locale, slug },
}: {
  params: { locale: Locales; slug: string };
}) {
  unstable_setRequestLocale(locale);
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <div className="w-ful fixed left-0 top-0 -z-10 h-[100dvh] w-full">
        <div className="absolute z-10 h-full w-full bg-black opacity-55"></div>
        <Image
          priority
          fill
          className="h-screen w-full object-cover"
          src={project.header_image ? getFileSrc(project.header_image.id) : ''}
          alt={project.title}
        />
      </div>

      <header className="h-screen w-full">
        <Suspense fallback={<NavigationLoader />}>
          <Navigation theme="light" />
        </Suspense>
        <div className="flex h-[calc(100dvh-107px)] flex-col items-center justify-end md:h-[calc(100dvh-163px)]">
          <div className="mb-24 text-center text-white">
            <h1 className="text-4xl font-semibold uppercase leading-none tracking-tight md:text-7xl xl:text-8xl">
              {project.title}
            </h1>
            {project.location && (
              <p className="mt-2 text-sm uppercase">{project.location}</p>
            )}
          </div>
          <MoveDown className="duration-2000 mb-8 animate-bounce text-zinc-400" />
        </div>
      </header>

      <main className="bg-white">
        <div className="container mx-auto">
          <div className="container-tight">
            <section className="py-16">
              <h2 className="text-3xl font-semibold uppercase leading-none tracking-tight">
                {project.content_title}
              </h2>
              <TextColumns className="mt-8">
                <Wysiwyg content={project.content_text_left} />
                <Wysiwyg content={project.content_text_right} />
              </TextColumns>
            </section>
          </div>

          {project.gallery && project.gallery.length > 0 && (
            <section className="flex flex-col gap-8 py-16">
              {project.gallery?.map(({ id, title, width, height }) => (
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
  const slugs = await getAllProjectSlugs();

  return slugs.flatMap((slug) => {
    return routing.locales.map((locale) => ({ locale, slug }));
  });
}
