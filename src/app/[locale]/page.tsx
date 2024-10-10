import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Suspense } from 'react';

import { Locales } from '@/const';
import { Link } from '@/i18n/routing';
import { MoveDown, MoveRight } from 'lucide-react';

import Navigation, { NavigationLoader } from '@/components/navigation';
import { ProjectCard } from '@/components/project-card';
import ServiceCard from '@/components/service-card';
import { VelocityScroll } from '@/components/vertical-scroll-text';

import { getFileSrc, getProjects } from '@/lib/directus';

export const revalidate = 60;

export default async function Home({
  params: { locale },
}: {
  params: { locale: Locales };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const projects = await getProjects({ limit: 6 });

  return (
    <div>
      <div className="w-ful fixed left-0 top-0 -z-10 h-[100dvh] w-full">
        <div className="absolute h-full w-full bg-black opacity-55"></div>
        <video
          preload="auto"
          autoPlay
          muted
          loop
          poster="/poster.webp"
          className="h-screen w-full object-cover"
        >
          <source src="/headervideo.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      <header className="h-screen w-full">
        <Suspense fallback={<NavigationLoader />}>
          <Navigation theme="light" />
        </Suspense>
        <div className="flex h-[calc(100dvh-107px)] flex-col items-center justify-end md:h-[calc(100dvh-163px)]">
          <h1 className="mb-24 text-center text-4xl font-semibold uppercase leading-none tracking-tight text-white md:text-7xl xl:text-8xl">
            Cristo Calzadilla <br />
            {t('globals.architect')}
          </h1>
          <MoveDown className="duration-2000 mb-8 animate-bounce text-zinc-400" />
        </div>
      </header>

      <main className="bg-white">
        <section className="bg-black py-4">
          <VelocityScroll
            text={t('homepage.textShow')}
            className="text-2xl font-bold uppercase leading-tight text-white lg:text-5xl"
            defaultVelocity={0.5}
          />
        </section>

        <section className="container-tight">
          <div className="pb-12 pt-24 lg:pb-16 lg:pt-32">
            <div className="mb-12">
              <h2 className="mb-8 text-2xl font-semibold uppercase leading-tight tracking-tight md:text-[32px]">
                {t('homepage.about.title')}
              </h2>
            </div>
            <div className="flex flex-col md:flex-row md:gap-8">
              <p className="text-justify text-lg leading-snug tracking-tight md:max-w-[50%]">
                {t('homepage.about.p1')}
              </p>
              <p className="text-justify text-lg leading-snug tracking-tight md:max-w-[50%]">
                {t('homepage.about.p2')}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container-tight">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-semibold uppercase leading-tight tracking-tight md:text-8xl">
                {t('homepage.projects.title')}
              </h2>
              <Link
                href="proyectos"
                className="group inline-flex items-center gap-2 text-sm uppercase"
              >
                <MoveRight className="w-0 origin-left stroke-1 text-gray-500 transition-[width] duration-200 ease-in-out group-hover:w-6" />
                <span>{t('homepage.projects.goToProjects')}</span>
              </Link>
            </div>
          </div>
          <div className="grid-cols grid gap-1 px-2 md:grid-cols-2 md:px-6 lg:grid-cols-3 lg:px-8">
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
        </section>

        <section className="container-tight">
          <div className="py-12 lg:py-16">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-semibold uppercase leading-tight tracking-tight md:text-8xl">
                {t('homepage.studio.title')}
              </h2>
            </div>
            <h3 className="mb-8 text-xl font-semibold uppercase leading-tight tracking-tight md:text-2xl">
              {t('homepage.studio.section.title')}
            </h3>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-[minmax(0,320px),1fr]">
              <div className="h-96 bg-gray-500" />
              <div>
                <p className="text-justify text-lg leading-snug tracking-tight">
                  {t('homepage.studio.section.p1')}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container-tight">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-semibold uppercase leading-tight tracking-tight md:text-8xl">
                {t('homepage.services.title')}
              </h2>
            </div>
          </div>
          <div className="grid-cols grid gap-8 px-2 md:grid-cols-2 md:px-6 lg:grid-cols-4 lg:px-8">
            <Link href="urbanismo">
              <ServiceCard
                src="/urbanism.webp"
                title={t('homepage.services.section.urbanism.title')}
                description={t(
                  'homepage.services.section.urbanism.description',
                )}
              />
            </Link>

            <Link href="estructuras">
              <ServiceCard
                src="/structures.jpg"
                title={t('homepage.services.section.structures.title')}
                description={t(
                  'homepage.services.section.structures.description',
                )}
              />
            </Link>

            <Link href="eficiencia-energetica">
              <ServiceCard
                src="/energy.webp"
                title={t('homepage.services.section.energyEfficiency.title')}
                description={t(
                  'homepage.services.section.energyEfficiency.description',
                )}
              />
            </Link>

            <Link href="certificaciones">
              <ServiceCard
                src="/energy.webp"
                title={t('homepage.services.section.certifications.title')}
                description={t(
                  'homepage.services.section.certifications.description',
                )}
              />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
