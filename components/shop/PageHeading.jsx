import Link from "next/link";

// Centered heading on a blurred navy background
export default function PageHeading({ title, count, crumbs }) {
  return (
    <section className="relative overflow-hidden bg-navy py-14 text-center text-cream md:py-20">
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-navy-soft blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-cream/10 blur-3xl" />

      <div className="relative px-4">
        <nav aria-label="Breadcrumb" className="mb-4 text-xs text-cream/70">
          <ol className="flex flex-wrap items-center justify-center gap-2">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {c.href ? (
                  <Link href={c.href} className="hover:text-cream hover:underline">{c.label}</Link>
                ) : (
                  <span aria-current="page" className="text-cream">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="text-3xl font-semibold md:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-cream/70">{count} {count === 1 ? "product" : "products"}</p>
      </div>
    </section>
  );
}
