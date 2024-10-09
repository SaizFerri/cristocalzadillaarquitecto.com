import Image from 'next/image';

import React from 'react';

type ServiceCardProps = {
  src: string;
  title: string;
  description: string;
};

export default function ServiceCard({
  src,
  title,
  description,
}: ServiceCardProps) {
  return (
    <div>
      <div className="relative mb-4 h-[420px]">
        <Image
          src={src}
          fill
          alt={title}
          className="aspect-square object-cover"
        />
      </div>
      <h3 className="mb-2 text-xl font-semibold leading-snug tracking-tight">
        {title}
      </h3>
      <p className="leading-snug tracking-tight text-gray-600">{description}</p>
    </div>
  );
}
