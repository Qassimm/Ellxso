import ProductShowcase from "./ProductShowcase";
import { getCollectionHighlights, getDepartments } from "@/lib/catalog";

export default function TopSellers() {
  const tabs = getDepartments().map((d) => ({
    key: d.slug,
    label: d.name,
    products: getCollectionHighlights("best-sellers", d.slug),
    viewAll: { label: `View All ${d.name} Collection`, href: `/shop/${d.slug}` },
  }));

  return <ProductShowcase title="Top Sellers" subtitle="Crafted to be worn daily" tabs={tabs} />;
}
