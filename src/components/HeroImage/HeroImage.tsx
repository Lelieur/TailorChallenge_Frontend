import Image from "next/image";

export default function HeroImage({ src }: { src: string }): React.ReactNode {
  return (
    <div className="relative w-full mb-4 md:mb-0 md:w-1/2 h-full rounded-lg overflow-hidden">
      <Image
        src={src}
        alt="Interior of a modern, dimly lit restaurant with wooden tables, pendant lights, and a few people dining."
        fill
        className="object-cover"
      />
    </div>
  );
}
