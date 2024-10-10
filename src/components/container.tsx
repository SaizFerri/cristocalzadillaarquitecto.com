import React, { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

type ContainerProps = {
  className?: string;
};

export function Container({
  className,
  children,
}: PropsWithChildren<ContainerProps>) {
  return <div className={cn('container mx-auto', className)}>{children}</div>;
}
