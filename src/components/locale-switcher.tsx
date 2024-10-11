'use client';

import { useSearchParams } from 'next/navigation';

import { useTransition } from 'react';

import { Locales } from '@/const';
import { usePathname, useRouter } from '@/i18n/routing';

type LocaleSwitcherProps = {
  className?: string;
};

export default function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const url = `${pathname}${searchParams.size > 0 ? '?' + searchParams : ''}`;

  function onLangChange(nextLocale: Locales) {
    startTransition(() => {
      router.replace(url, { locale: nextLocale });
    });
  }

  return (
    <div className={className}>
      <button
        onClick={() => onLangChange('es')}
        className="transition-colors duration-100 ease-linear hover:text-zinc-400"
        disabled={isPending}
      >
        ESP
      </button>
      <span> | </span>
      <button
        onClick={() => onLangChange('en')}
        className="transition-colors duration-100 ease-linear hover:text-zinc-400"
        disabled={isPending}
      >
        ENG
      </button>
    </div>
  );
}
