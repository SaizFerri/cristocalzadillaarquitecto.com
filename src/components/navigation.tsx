'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { Link, usePathname } from '@/i18n/routing';

import { cn } from '@/lib/utils';

type NavigationProps = {
  theme?: 'light' | 'dark';
};

export default function Navigation({ theme = 'dark' }: NavigationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const url = `${pathname}${searchParams.size > 0 ? '?' + searchParams : ''}`;

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
            className="ml-[-68px] inline-block w-12 md:ml-[-78px] md:w-20"
          />
        </Link>
      </div>
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
