'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { RefObject, useEffect, useRef } from 'react';

import { Link, usePathname } from '@/i18n/routing';
import { AnimatePresence, motion, useCycle } from 'framer-motion';

import { cn } from '@/lib/utils';

type NavigationProps = {
  theme?: 'light' | 'dark';
};

export default function Navigation({ theme = 'dark' }: NavigationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const url = `${pathname}${searchParams.size > 0 ? '?' + searchParams : ''}`;
  const [open, toggleOpen] = useCycle(false, true);
  const t = useTranslations();

  const menuVariants = {
    visible: {
      x: 0,
      transition: {
        stiffness: 50,
        restDelta: 2,
      },
    },
    hidden: {
      x: 500,
      transition: {
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const toggleVariants = {
    visible: {
      rotateZ: 0,
      transition: {
        damping: 400,
        delay: 0.25,
      },
    },
    hidden: {
      rotateZ: 45,
    },
  };

  return (
    <nav className="container mx-auto flex items-center px-4 py-6 md:px-0 md:py-8">
      <div
        className={cn('flex-shrink-0 text-sm md:text-base', {
          'text-white': theme === 'light',
          'text-text': theme === 'dark',
        })}
      >
        <Link
          href={url}
          locale="es"
          className="transition-colors duration-100 ease-linear hover:text-zinc-400"
        >
          ESP
        </Link>
        <span> | </span>
        <Link
          href={url}
          locale="en"
          className="transition-colors duration-100 ease-linear hover:text-zinc-400"
        >
          ENG
        </Link>
      </div>
      <div className="flex-1 text-center">
        <Link href="/">
          <Image
            src={theme === 'light' ? '/logo_white.svg' : '/logo_black.svg'}
            alt="Logo"
            width={80}
            height={99}
            className="inline-block w-12 md:w-20"
          />
        </Link>
      </div>
      <div className="flex-shrink-0">
        <button onClick={() => toggleOpen()}>
          <div
            className={cn('h-6 w-6 md:h-8 md:w-8', {
              'text-white': theme === 'light',
              'text-text': theme === 'dark',
            })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="0" x2="24" y1="12" y2="12" />
              <line x1="0" x2="24" y1="4" y2="4" />
              <line x1="0" x2="24" y1="20" y2="20" />
            </svg>
          </div>
        </button>
      </div>

      <AnimatePresence>
        <motion.div
          initial={false}
          animate={open ? 'visible' : 'hidden'}
          variants={menuVariants}
          className="fixed right-0 top-0 z-20 h-screen w-full max-w-[500px]"
        >
          <motion.div
            className="absolute inset-0 -z-10 bg-slate-700"
            variants={menuVariants}
          />
          <button
            className="absolute right-8 top-8 z-10"
            onClick={() => toggleOpen()}
          >
            <div className="h-6 w-6 text-white md:h-8 md:w-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <motion.path
                  d="M24 0 0 24"
                  style={{ transformOrigin: '0%' }}
                  variants={toggleVariants}
                />
                <motion.path
                  d="M0 0 24 24"
                  style={{ transformOrigin: '0%' }}
                  variants={toggleVariants}
                />
              </svg>
            </div>
          </button>
          <ul className="mt-[100px] flex flex-col p-8 text-right text-3xl font-semibold uppercase text-white">
            <li className="transition-transform duration-100 ease-in hover:translate-y-[-2px]">
              <Link href="/proyectos">{t('navigation.projects')}</Link>
            </li>
            <li className="transition-transform duration-100 ease-in hover:translate-y-[-2px]">
              <Link href="/#estudio" scroll>
                {t('navigation.studio')}
              </Link>
            </li>
            <li className="transition-transform duration-100 ease-in hover:translate-y-[-2px]">
              <Link href="/#noticias" scroll>
                {t('navigation.news')}
              </Link>
            </li>
            <li className="transition-transform duration-100 ease-in hover:translate-y-[-2px]">
              <Link href="/#servicios" scroll>
                {t('navigation.services')}
              </Link>
            </li>
          </ul>
        </motion.div>
      </AnimatePresence>
    </nav>
  );
}

export function NavigationLoader() {
  return (
    <nav className="container mx-auto px-4 py-6 md:px-0 md:py-8">
      <div>
        <span>ESP</span>
        <span> | </span>
        <span>ENG</span>
      </div>
    </nav>
  );
}

export const useDimensions = (ref: RefObject<HTMLElement>) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current.height = ref.current?.offsetHeight ?? 0;
    dimensions.current.width = ref.current?.offsetWidth ?? 0;
  });

  return dimensions.current;
};
