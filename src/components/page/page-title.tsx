import React, { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

type PageTitleProps = {
  className?: string;
};

export default function PageTitle({
  className,
  children,
}: PropsWithChildren<PageTitleProps>) {
  return (
    <h1
      className={cn(
        'text-4xl font-semibold uppercase leading-tight tracking-tight md:text-7xl xl:text-8xl',
        className,
      )}
    >
      {children}
    </h1>
  );
}
