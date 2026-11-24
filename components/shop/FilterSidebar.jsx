import Link from "next/link";
import { COLOR_SWATCHES } from "@/lib/filters";

function Group({ title, children }) {
  return (
    <details open className="group border-t border-navy/15 pt-4 first:border-0 first:pt-0">
      <summary className="flex cursor-pointer list-none items-center justify-between pb-3 text-sm font-semibold uppercase tracking-widest">
        {title}
        <span aria-hidden="true" className="text-lg leading-none transition-transform group-open:rotate-45">+</span>
      </summary>
      {children}
    </details>
  );
}

export default function FilterSidebar({ filters, selected, browse, activeCount, onToggle, onClear, onClose }) {
  return (
    // Mobile: drawer ki poori height | Desktop: screen height minus offset
    <div className="flex h-full flex-col overflow-hidden border-navy/30 bg-cream-deep/40 lg:h-[calc(100vh-9rem)] lg:rounded-lg lg:border">
      {/* Fixed header: scroll nahi hoga */}
      <div className="flex shrink-0 items-center justify-between p-5 pb-3">
        <h2 className="text-xl font-semibold">Filters</h2>
        <div className="flex items-center gap-4">
          {activeCount > 0 && (
            <button onClick={onClear} className="cursor-pointer text-xs underline underline-offset-4">
              Clear all ({activeCount})
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close filters"
            className="cursor-pointer text-2xl leading-none lg:hidden"
          >
            ×
          </button>
        </div>
      </div>

      {/* Sirf ye hissa scroll hoga */}
      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 pb-5 [scrollbar-width:thin]">
        {browse && (
          <Group title={browse.title}>
            <ul className="space-y-2 text-sm">
              {browse.links.map((l) => {
                const isActive = browse.activeHref === l.href;
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex justify-between hover:underline ${isActive ? "font-semibold underline" : ""}`}
                    >
                      {l.label}
                      <span className="opacity-50">{l.count}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Group>
        )}

        {filters.map((f) => (
          <Group key={f.name} title={f.name}>
            <ul className="space-y-2 text-sm">
              {f.options.map((o) => {
                const checked = selected[f.name]?.includes(o.value) ?? false;
                const disabled = o.count === 0 && !checked;
                return (
                  <li key={o.value}>
                    <label className={`flex items-center gap-2 ${disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"}`}>
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={disabled}
                        onChange={() => onToggle(f.name, o.value)}
                        className="h-4 w-4 accent-navy"
                      />
                      {f.swatch && (
                        <span
                          className="h-3.5 w-3.5 rounded-full border border-navy/30"
                          style={{ background: COLOR_SWATCHES[o.value] }}
                        />
                      )}
                      <span className="flex-1">{o.value}</span>
                      <span className="text-xs opacity-50">{o.count}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </Group>
        ))}
      </div>
    </div>
  );
}