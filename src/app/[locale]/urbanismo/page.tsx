import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

import { Locales } from '@/const';
import { routing } from '@/i18n/routing';

import { Container } from '@/components/container';
import Navigation from '@/components/navigation';
import PageHeader from '@/components/page/page-header';
import PageTitle from '@/components/page/page-title';
import TextColumns from '@/components/text-columns';

export default function UrbanismPage({
  params: { locale },
}: {
  params: { locale: Locales };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <div>
      <Navigation />
      <main>
        <Container>
          <PageHeader>
            <PageTitle>{t('urbanismPage.title')}</PageTitle>
            <p className="mt-4 text-xl uppercase leading-tight tracking-tight text-gray-600">
              {t('urbanismPage.description')}
            </p>
          </PageHeader>

          <div>
            <Image
              src="/urbanism.webp"
              alt={t('urbanismPage.title')}
              width={1920}
              height={1080}
            />
          </div>

          <div className="container-tight">
            <section className="pb-16 pt-32">
              <h2 className="text-4xl font-semibold uppercase leading-tight tracking-tight">
                Lorem Ipsum et dolorem
              </h2>
              <TextColumns className="mt-4">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Laudantium corrupti iste esse cumque. Dolores odit
                  necessitatibus optio blanditiis numquam dolorem quo beatae
                  harum facere veritatis. Ullam quis obcaecati laborum sit.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Laudantium corrupti iste esse cumque. Dolores odit
                  necessitatibus optio blanditiis numquam dolorem quo beatae
                  harum facere veritatis. Ullam quis obcaecati laborum sit.
                </p>
              </TextColumns>
            </section>

            <section className="py-16">
              <h2 className="text-4xl font-semibold uppercase leading-tight tracking-tight">
                Lorem Ipsum et dolorem
              </h2>
              <TextColumns className="mt-4">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Laudantium corrupti iste esse cumque. Dolores odit
                  necessitatibus optio blanditiis numquam dolorem quo beatae
                  harum facere veritatis. Ullam quis obcaecati laborum sit.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Laudantium corrupti iste esse cumque. Dolores odit
                  necessitatibus optio blanditiis numquam dolorem quo beatae
                  harum facere veritatis. Ullam quis obcaecati laborum sit.
                </p>
              </TextColumns>
            </section>
          </div>
        </Container>
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
