"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { heroSlides as slides } from "@/Data/home.json";

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <section className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s) => (

          <img key={s.src} src={s.src} alt={s.alt} className="block min-h-[220px] w-full shrink-0 object-cover" />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-4 flex flex-col items-center gap-3 md:bottom-8">
        <Button size="lg" className="max-md:h-9 max-md:px-6 max-md:text-sm rounded-lg">Shop Now</Button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to banner ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${i === index ? "w-7 bg-gray-600 border-white border" : "w-2.5 bg-gray-600"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}