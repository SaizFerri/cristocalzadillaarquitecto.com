import Image from 'next/image';

type ProjectCardProps = {
  name: string;
  imageSrc?: string;
};

export function ProjectCard({ name, imageSrc }: ProjectCardProps) {
  return (
    <div className="group relative aspect-16x9 overflow-hidden">
      <div className="absolute inset-0 z-10 translate-y-[1000px] bg-black opacity-50 transition-transform duration-500 ease-in-out group-hover:translate-y-0"></div>
      <span className="absolute left-0 right-0 top-[50%] z-10 translate-y-[-50%] text-center text-2xl font-semibold uppercase leading-tight tracking-tight text-white opacity-0 transition-opacity duration-100 group-hover:opacity-100 group-hover:delay-300">
        {name}
      </span>
      {imageSrc && (
        <Image
          src={imageSrc}
          fill
          alt={name}
          className="transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
      )}
    </div>
  );
}
