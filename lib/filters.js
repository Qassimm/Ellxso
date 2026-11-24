// Pure helpers (no data imports) so they are safe to use in client components.

const num = (b) => Number(b);

// Sorting labels come from Data/taxonomy.json -> sortingOptions
export const SORTERS = {
  Recommended: (a, b) => num(b.isFeatured) - num(a.isFeatured) || b.soldCount - a.soldCount,
  "Newest First": (a, b) => b.createdAt.localeCompare(a.createdAt),
  "Oldest First": (a, b) => a.createdAt.localeCompare(b.createdAt),
  "Price: Low to High": (a, b) => a.price - b.price,
  "Price: High to Low": (a, b) => b.price - a.price,
  "Best Selling": (a, b) => b.soldCount - a.soldCount,
};

export const sortProducts = (items, sort) =>
  SORTERS[sort] ? [...items].sort(SORTERS[sort]) : items;

// selected = { [filterName]: string[] }. Values inside one filter are OR, different filters are AND.
export const filterProducts = (items, filters, selected) =>
  items.filter((p) =>
    filters.every((f) => {
      const values = selected[f.name];
      return !values?.length || values.includes(p[f.field]);
    })
  );

export const countActive = (selected) => Object.values(selected).filter((v) => v.length).length;

export const COLOR_SWATCHES = {
  Black: "#111111",
  White: "#FFFFFF",
  Silver: "#C0C0C0",
  Blue: "#1E3A8A",
  Gold: "#D4AF37",
  Pink: "#F4A6B8",
  "Rose Gold": "#B76E79",
  Green: "#2E7D5B",
  Brown: "#6B4226",
};
