import React, { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

type PageHeaderProps = {
  className?: string;
};

export default function PageHeader({
  className,
  children,
}: PropsWithChildren<PageHeaderProps>) {
  return (
    <header className={cn('mb-8 mt-12 text-center md:mb-16', className)}>
      {children}
    </header>
  );
}
