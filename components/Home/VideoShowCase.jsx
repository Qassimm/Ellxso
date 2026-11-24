import Link from "next/link";
import home from "@/Data/home.json";

export default function VideoShowCase() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {home.videos.map((v) => (
          <Link
            key={v.name}
            href={v.href}
            className="relative block aspect-[9/16] overflow-hidden rounded-2xl bg-navy/10"
          >
            <video
              src={v.src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-x-0 bottom-0 bg-navy py-3 text-center text-sm uppercase tracking-widest text-cream">
              {v.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
