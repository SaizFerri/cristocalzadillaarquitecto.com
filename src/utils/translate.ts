import { Locales, isProduction } from '@/const';

import { Translation } from '@/lib/directus';

type Data = {
  translations: Translation[];
  [key: string]: any;
};

export const defaultLocale = 'es';

export function translate<T extends Data>(
  data: T,
  locale: Locales = defaultLocale,
) {
  const translation = data.translations.find(
    (translation: Translation) => translation.languages_code === locale,
  );
  return (prop: keyof T) => {
    if (translation && prop in translation) {
      return translation[prop as keyof Translation];
    }

    if (locale === defaultLocale) {
      return data[prop as keyof T];
    }

    return isProduction
      ? data[prop as keyof T]
      : `${String(prop)}_NO_TRANSLATION`;
  };
}
