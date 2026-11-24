import Image from "next/image";
import Link from "next/link";
import home from "@/Data/home.json";

export default function Categories() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10 md:px-8">
      <div className="flex justify-start gap-6 overflow-x-auto pb-2 sm:justify-center md:gap-10">
        {home.categories.map((c) => (
          <Link key={c.name} href={c.href} className="group flex shrink-0 flex-col items-center gap-3">
            <div className="rounded-full border border-navy/20 bg-cream p-1.5 transition-colors group-hover:border-navy">
              <Image
                src={c.src}
                alt=""
                width={96}
                height={96}
                sizes="96px"
                className="h-20 w-20 rounded-full object-cover transition-transform duration-300 group-hover:scale-105 md:h-24 md:w-24"
              />
            </div>
            <span className="whitespace-nowrap text-sm">{c.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
