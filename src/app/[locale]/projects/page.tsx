import { unstable_setRequestLocale } from 'next-intl/server';

import React from 'react';

import { Locales } from '@/const';

export default function ProjectsPage({
  params: { locale },
}: {
  params: { locale: Locales };
}) {
  unstable_setRequestLocale(locale);
  return <div>ProjectsPage</div>;
}
