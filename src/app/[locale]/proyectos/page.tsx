import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

import { Locales } from '@/const';
import { routing } from '@/i18n/routing';

import Navigation from '@/components/navigation';
import { ProjectCard } from '@/components/project-card';

import { getFileSrc, getProjects } from '@/lib/directus';

export const revalidate = 60;

export default async function ProjectsPage({
  params: { locale },
}: {
  params: { locale: Locales };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const projects = await getProjects();

  return (
    <div>
      <Navigation />
      <main>
        <div className="container mx-auto">
          <div className="mb-8 mt-12 text-center md:mb-16">
            <h1 className="text-4xl font-semibold uppercase leading-tight tracking-tight md:text-7xl xl:text-8xl">
              {t('navigation.projects')}
            </h1>
          </div>

          <div className="grid-cols grid gap-4 pb-16 md:grid-cols-2">
            {projects.map((project) => (
              <Link key={project.id} href={`/proyectos/${project.slug}`}>
                <ProjectCard
                  name={project.title}
                  imageSrc={
                    project.header_image
                      ? getFileSrc(project.header_image.id)
                      : undefined
                  }
                />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
