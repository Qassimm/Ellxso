"use client";
import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// One reusable section for Top Sellers and New Arrivals.
// tabs = [{ key, label, products: [...], viewAll: { label, href } }, ...]
export default function ProductShowcase({ title, subtitle, tabs }) {
  const [active, setActive] = useState(tabs[0].key);
  const current = tabs.find((t) => t.key === active);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-semibold md:text-5xl">{title}</h2>
        <p className="mt-2 opacity-90">{subtitle}</p>
        <div className="mt-6 flex justify-center gap-3" role="tablist">
          {tabs.map((t) => (
            <Button
              key={t.key}
              size="sm"
              role="tab"
              aria-selected={t.key === active}
              variant={t.key === active ? "default" : "outline"}
              onClick={() => setActive(t.key)}
              className="min-w-24 capitalize"
            >
              {t.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {current.products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link href={current.viewAll.href} className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
          {current.viewAll.label}
        </Link>
      </div>
    </section>
  );
}
