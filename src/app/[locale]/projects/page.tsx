import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import React, { Suspense } from 'react';

import { Locales } from '@/const';
import { routing } from '@/i18n/routing';

import Navigation from '@/components/navigation';
import { ProjectCard } from '@/components/project-card';

export default function ProjectsPage({
  params: { locale },
}: {
  params: { locale: Locales };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <div>
      <Suspense>
        <Navigation />
      </Suspense>
      <main>
        <div className="container mx-auto">
          <div className="mb-8 text-center md:mb-16">
            <p className="text-sm uppercase leading-tight tracking-tight md:text-lg">
              Cristo Calzadilla {t('globals.architect')}
            </p>
            <h1 className="text-4xl font-semibold uppercase leading-tight tracking-tight md:text-7xl xl:text-8xl">
              {t('navigation.projects')}
            </h1>
          </div>

          <div className="grid-cols grid gap-1 pb-16 md:grid-cols-2">
            <ProjectCard name="Casa del Arbol" imageSrc="/project-1.jpg" />
            <ProjectCard name="Casa del Arbol" imageSrc="/project-2.jpg" />
            <ProjectCard name="Casa del Arbol" imageSrc="/project-3.jpg" />
            <ProjectCard name="Casa del Arbol" imageSrc="/project-3.jpg" />
          </div>
        </div>
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
