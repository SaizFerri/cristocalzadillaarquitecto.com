import React, { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

type TextColumnsProps = {
  className?: string;
};

export default function TextColumns({
  className,
  children,
}: PropsWithChildren<TextColumnsProps>) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-4 text-justify text-lg leading-snug tracking-tight md:grid-cols-2 md:gap-8',
        className,
      )}
    >
      {children}
    </div>
  );
}
