import { useLocale } from 'next-intl';
import Image from 'next/image';

import { intlFormat } from 'date-fns';

type NewsCardProps = {
  title: string;
  teaser: string;
  createdAt: string;
  imageSrc?: string;
};

export function NewsCard({
  title,
  teaser,
  createdAt,
  imageSrc,
}: NewsCardProps) {
  const locale = useLocale();
  return (
    <div className="">
      <div className="relative mb-4 h-[330px]">
        <div className="aspect-16x9">
          <Image
            src={imageSrc ?? 'logo_black.svg'}
            fill
            alt={title}
            className="transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>
      </div>

      <h3 className="mb-2 text-xl font-semibold leading-snug tracking-tight">
        {title}
      </h3>
      <p className="mb-3 leading-snug tracking-tight text-gray-600">{teaser}</p>
      <time className="text-sm text-muted-foreground">
        {intlFormat(
          new Date(createdAt),
          {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          },
          {
            locale,
          },
        )}
      </time>
    </div>
  );
}
