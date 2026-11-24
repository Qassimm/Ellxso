"use client";
import { useEffect, useMemo, useState } from "react";
import { FiSliders } from "react-icons/fi";
import ProductCard from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import { countActive, filterProducts, sortProducts } from "@/lib/filters";
import FilterSidebar from "./FilterSidebar";

export default function ProductListing({ products, filters, sortOptions, defaultSort, browse }) {
  const [selected, setSelected] = useState({});
  const [sort, setSort] = useState(defaultSort);
  const [showFilters, setShowFilters] = useState(false);

  const visible = useMemo(
    () => sortProducts(filterProducts(products, filters, selected), sort),
    [products, filters, selected, sort]
  );
  const activeCount = countActive(selected);

  const toggle = (name, value) =>
    setSelected((prev) => {
      const current = prev[name] ?? [];
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      return { ...prev, [name]: next };
    });
  const clear = () => setSelected({});

  // Drawer khula ho: Esc se band, aur peeche page scroll lock
  useEffect(() => {
    if (!showFilters) return;
    const onKey = (e) => e.key === "Escape" && setShowFilters(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [showFilters]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => setShowFilters(true)}
          aria-expanded={showFilters}
          className="flex items-center gap-2 border border-navy px-4 py-2 text-sm lg:hidden"
        >
          <FiSliders size={16} /> Filters{activeCount > 0 && ` (${activeCount})`}
        </button>
        <p className="text-sm opacity-70" aria-live="polite">
          Showing {visible.length} of {products.length} products
        </p>
        <label className="flex items-center gap-2 text-sm">
          Sort by
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-navy/30 bg-cream px-3 py-2"
          >
            {sortOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[260px_1fr]">
        {/* Backdrop (sirf mobile/tablet) */}
        <div
          onClick={() => setShowFilters(false)}
          className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
            showFilters ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />

        {/* Mobile: left drawer (75%) | Desktop: sticky sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-3/4 bg-cream shadow-xl transition-transform duration-300 ease-out
            ${showFilters ? "translate-x-0" : "-translate-x-full"}
            lg:sticky lg:top-[7.5rem] lg:z-auto lg:w-auto lg:translate-x-0 lg:self-start lg:bg-transparent lg:shadow-none`}
        >
          <FilterSidebar
            filters={filters}
            selected={selected}
            browse={browse}
            activeCount={activeCount}
            onToggle={toggle}
            onClear={clear}
            onClose={() => setShowFilters(false)}
          />
        </aside>

        {visible.length === 0 ? (
          <div className="py-20 text-center">
            <p className="mb-4">No products match these filters.</p>
            <Button variant="outline" onClick={clear}>Clear filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 content-start gap-4 lg:grid-cols-3 lg:gap-6">
            {visible.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 3} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}