import taxonomy from "@/Data/taxonomy.json";
import rawProducts from "@/Data/products.json";

const { departments, filters: filterDefs, sortingOptions, productCollections: collections } = taxonomy;

// Extra filter that only appears on pages mixing men and women (best sellers, new arrivals...)
const genderFilter = { name: "Gender", field: "gender", options: departments.map((d) => d.name) };

const catalog = rawProducts.map((p) => ({
  ...p,
  gender: departments.find((d) => d.slug === p.department).name,
  isOnSale: p.oldPrice > p.price,
}));

// ---------- collections (best sellers, new arrivals, featured, on sale) ----------
function collectionProducts(c, { limited = true } = {}) {
  let list = catalog;
  if (c.filterBy) list = list.filter((p) => Object.entries(c.filterBy).every(([k, v]) => p[k] === v));
  if (c.sortBy) {
    const dir = c.order === "descending" ? -1 : 1;
    list = [...list].sort((a, b) => (a[c.sortBy] > b[c.sortBy] ? 1 : a[c.sortBy] < b[c.sortBy] ? -1 : 0) * dir);
  }
  return limited && c.limit ? list.slice(0, c.limit) : list;
}

/** Top N products of a collection for one department, used by the home page sections. */
export function getCollectionHighlights(collectionSlug, departmentSlug, count = 4) {
  const c = collections.find((x) => x.slug === collectionSlug);
  return collectionProducts(c, { limited: false })
    .filter((p) => p.department === departmentSlug)
    .slice(0, count);
}

export const getDepartments = () => departments.map(({ name, slug }) => ({ name, slug }));

// ---------- filter descriptors ----------
// Fixed option lists come from taxonomy.json; Brand and Color are built from the products on the page.
function buildFilters(defs, items) {
  return defs.map((def) => {
    const values = def.options ?? [...new Set(items.map((p) => p[def.field]))].sort();
    return {
      name: def.name,
      field: def.field,
      swatch: Boolean(def.swatch),
      options: values.map((value) => ({ value, count: items.filter((p) => p[def.field] === value).length })),
    };
  });
}

function listing({ title, items, defs = filterDefs, crumbs, browse, defaultSort = "Recommended" }) {
  return {
    title,
    count: items.length,
    products: items,
    filters: buildFilters(defs, items),
    sortOptions: sortingOptions,
    defaultSort,
    crumbs,
    browse,
  };
}

// ---------- listing for /shop/[...slug] ----------
export function getListing(parts = []) {
  const [a, b, ...rest] = parts;
  if (!a || rest.length) return null;
  const home = { label: "Home", href: "/" };

  // /shop/best-sellers, /shop/new-arrivals, /shop/featured, /shop/on-sale
  const col = collections.find((x) => x.slug === a);
  if (col) {
    if (b) return null;
    const defaultSort = col.sortBy === "soldCount" ? "Best Selling" : col.sortBy === "createdAt" ? "Newest First" : "Recommended";
    return listing({
      title: col.name,
      items: collectionProducts(col),
      defs: [genderFilter, ...filterDefs],
      crumbs: [home, { label: col.name }],
      defaultSort,
    });
  }

  const dept = departments.find((d) => d.slug === a);
  if (!dept) return null;
  const deptItems = catalog.filter((p) => p.department === dept.slug);
  const deptHref = `/shop/${dept.slug}`;

  const browseLinks = (activeHref) => ({
    title: "Categories",
    activeHref,
    links: [
      { label: `All ${dept.name}'s Watches`, href: deptHref, count: deptItems.length },
      ...dept.subcategories.map((s) => ({
        label: s.name,
        href: `${deptHref}/${s.slug}`,
        count: deptItems.filter((p) => p.subcategories.includes(s.slug)).length,
      })),
    ],
  });

  // /shop/men
  if (!b)
    return listing({
      title: `${dept.name}'s Collection`,
      items: deptItems,
      crumbs: [home, { label: dept.name }],
      browse: browseLinks(deptHref),
    });

  // /shop/men/formal-watches
  const sub = dept.subcategories.find((s) => s.slug === b);
  if (!sub) return null;
  return listing({
    title: `${dept.name}'s ${sub.name}`,
    items: deptItems.filter((p) => p.subcategories.includes(sub.slug)),
    crumbs: [home, { label: dept.name, href: deptHref }, { label: sub.name }],
    browse: browseLinks(`${deptHref}/${sub.slug}`),
  });
}

/** Every valid /shop/... path, used by generateStaticParams. */
export function getAllSlugs() {
  const slugs = collections.map((c) => [c.slug]);
  for (const d of departments) {
    slugs.push([d.slug]);
    d.subcategories.forEach((s) => slugs.push([d.slug, s.slug]));
  }
  return slugs;
}
