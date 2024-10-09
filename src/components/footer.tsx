import { useTranslations } from 'next-intl';

import React from 'react';

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-black py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-4">
          <div className="text-center md:text-left">
            <span className="mb-4 block text-sm uppercase text-zinc-400">
              {t('footer.address')}
            </span>
            <a
              href="https://maps.app.goo.gl/zuYZDU7CTi799CrY9"
              target="_blank"
              rel="noopener"
            >
              <address className="uppercase not-italic leading-tight tracking-tight text-white">
                Cam. Hoya Meleque, s/n,
                <br /> 38400 Puerto de la Cruz,
                <br /> Santa Cruz de Tenerife, Spain
              </address>
            </a>
          </div>
          <div className="text-center">
            <span className="mb-4 block text-sm uppercase text-zinc-400">
              {t('footer.contact')}
            </span>
            <div className="uppercase leading-tight tracking-tight text-white">
              <p className="mb-4">Cristo Calzadilla {t('globals.architect')}</p>
              <a href="mailto:cristocalzadilla@gmail.com">
                cristocalzadilla@gmail.com
              </a>
              <br />
              <a href="tel:+34606098933">+34606098933</a>
            </div>
          </div>
          <div className="text-center md:text-right">
            <span className="mb-4 block text-sm uppercase text-zinc-400">
              {t('footer.social')}
            </span>
            <div className="uppercase leading-tight tracking-tight text-white">
              <a href="" className="block">
                Instagram
              </a>
              <a href="" className="block">
                Facebook
              </a>
              <a href="" className="block">
                Linkedin
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
