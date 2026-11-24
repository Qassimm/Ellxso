import Image from "next/image";
import Link from "next/link";
import home from "@/Data/home.json";

export default function PromoBanner() {
  const { src, width, height, alt, href } = home.promo;

  return (
    <section className="mx-auto py-16">
      <Link href={href} className="block">
        <Image src={src} alt={alt} width={width} height={height} sizes="100vw" className="h-auto w-full" />
      </Link>
    </section>
  );
}
