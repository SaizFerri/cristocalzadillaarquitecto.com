import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { Locales } from '@/const';
import { Link } from '@/i18n/routing';
import { MoveDown, MoveRight } from 'lucide-react';

import Navigation from '@/components/navigation';
import { ProjectCard } from '@/components/project-card';
import { VelocityScroll } from '@/components/vertical-scroll-text';

export default function Home({
  params: { locale },
}: {
  params: { locale: Locales };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <div>
      <div className="w-ful fixed left-0 top-0 -z-10 h-screen w-full">
        <div className="absolute h-full w-full bg-black opacity-55"></div>
        <video
          preload="auto"
          autoPlay
          muted
          loop
          poster="/headerframe.webp"
          className="h-screen w-full object-cover"
        >
          <source src="/headervideo.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
      <header className="h-screen w-full">
        <Navigation theme="light" />
        <div className="flex h-[calc(100vh-88px)] flex-col items-center justify-end">
          <h1 className="mb-[88px] text-center text-4xl font-semibold uppercase leading-none tracking-tight text-white md:text-7xl xl:text-8xl">
            Cristo Calzadilla <br />
            {t('globals.architect')}
          </h1>
          <MoveDown className="duration-2000 mb-8 animate-bounce text-zinc-400" />
        </div>
      </header>
      <main className="bg-white">
        <div className="bg-black py-4">
          <VelocityScroll
            text={t('homepage.textShow')}
            className="text-2xl font-bold uppercase leading-tight text-white lg:text-5xl"
            defaultVelocity={0.5}
          />
        </div>
        <div className="mx-auto max-w-[992px] px-4 lg:px-0">
          <div className="py-24 lg:py-32">
            <div className="mb-12">
              <h2 className="mb-8 text-2xl font-semibold uppercase leading-tight tracking-tight md:text-[32px]">
                {t('homepage.about.title')}
              </h2>
            </div>
            <div className="flex flex-col md:flex-row md:gap-8">
              <p className="text-justify text-lg leading-tight tracking-tight md:max-w-[50%]">
                {t('homepage.about.p1')}
              </p>
              <p className="text-justify text-lg leading-tight tracking-tight md:max-w-[50%]">
                {t('homepage.about.p2')}
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="mx-auto max-w-[992px] px-4 lg:px-0">
            <div className="mb-12 text-center">
              <h2 className="text-x mb-4 text-4xl font-semibold uppercase leading-tight tracking-tight md:text-8xl">
                {t('homepage.projects.title')}
              </h2>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 text-sm uppercase"
              >
                <MoveRight className="w-0 origin-left text-zinc-400 transition-[width] duration-200 ease-in-out group-hover:w-6" />
                <span>{t('homepage.projects.goToProjects')}</span>
              </Link>
            </div>
          </div>
          <div className="grid-cols grid gap-1 px-2 pb-16 md:grid-cols-2 md:px-6 lg:grid-cols-3 lg:px-8">
            <ProjectCard name="Casa del Arbol" imageSrc="/project-1.jpg" />
            <ProjectCard name="Casa del Arbol" imageSrc="/project-2.jpg" />
            <ProjectCard name="Casa del Arbol" imageSrc="/project-3.jpg" />
            <ProjectCard name="Casa del Arbol" imageSrc="/project-3.jpg" />
            <ProjectCard name="Casa del Arbol" imageSrc="/project-1.jpg" />
            <ProjectCard name="Casa del Arbol" imageSrc="/project-2.jpg" />
          </div>
        </div>
      </main>
    </div>
  );
}
