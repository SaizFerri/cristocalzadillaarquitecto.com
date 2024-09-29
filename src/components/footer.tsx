import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-3">
          <div className="text-left">
            <span className="mb-4 block text-sm uppercase text-zinc-400">
              Direccion
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
              Contacto
            </span>
            <div className="uppercase leading-tight tracking-tight text-white">
              <p className="mb-4">Cristo Calzadilla</p>
              <a href="mailto:">cristocalzadilla@saiz.com</a>
              <br />
              <a href="tel:1213123123">666555444</a>
            </div>
          </div>
          <div className="text-right">
            <span className="mb-4 block text-sm uppercase text-zinc-400">
              Social media
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