import { notFound } from "next/navigation";
import PageHeading from "@/components/shop/PageHeading";
import ProductListing from "@/components/shop/ProductListing";
import { getAllSlugs, getListing } from "@/lib/catalog";

// Every valid /shop/... URL is generated at build time from Data/taxonomy.json
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const listing = getListing(slug);
  return { title: listing ? listing.title : "Not found" };
}

export default async function ShopPage({ params }) {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) notFound();

  return (
    <main>
      <PageHeading title={listing.title} count={listing.count} crumbs={listing.crumbs} />
      <ProductListing
        key={slug.join("/")}
        products={listing.products}
        filters={listing.filters}
        sortOptions={listing.sortOptions}
        defaultSort={listing.defaultSort}
        browse={listing.browse}
      />
    </main>
  );
}
