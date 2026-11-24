import ProductShowcase from "./ProductShowcase";
import { getCollectionHighlights, getDepartments } from "@/lib/catalog";

export default function NewArrivals() {
  const tabs = getDepartments().map((d) => ({
    key: d.slug,
    label: d.name,
    products: getCollectionHighlights("new-arrivals", d.slug),
    viewAll: { label: `View All ${d.name} Collection`, href: `/shop/${d.slug}` },
  }));

  return <ProductShowcase title="New Arrivals" subtitle="Fresh from the workshop" tabs={tabs} />;
}
