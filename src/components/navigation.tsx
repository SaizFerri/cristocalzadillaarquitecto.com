import React from 'react';

import { Link } from '@/i18n/routing';

import { cn } from '@/lib/utils';

type NavigationProps = {
  theme?: 'light' | 'dark';
};

export default function Navigation({ theme = 'dark' }: NavigationProps) {
  return (
    <nav className="container mx-auto px-4 py-6 md:px-0 md:py-8">
      <div
        className={cn({
          'text-white': theme === 'light',
          'text-text': theme === 'dark',
        })}
      >
        <Link
          href="es"
          className="transition-colors duration-100 ease-linear hover:text-zinc-400"
        >
          ESP
        </Link>
        <span> | </span>
        <Link
          href="en"
          className="transition-colors duration-100 ease-linear hover:text-zinc-400"
        >
          ENG
        </Link>
      </div>
    </nav>
  );
}
