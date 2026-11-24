import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { discountPercent, formatPrice } from "@/lib/format";

export default function ProductCard({ product: p, priority = false }) {
  const discount = discountPercent(p.price, p.oldPrice);

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          priority={priority}
          className="object-cover"
        />
        {discount > 0 && (
          <span className="absolute left-2 top-2 rounded bg-navy px-2 py-0.5 text-xs text-cream">-{discount}%</span>
        )}
        {!p.inStock && (
          <span className="absolute right-2 top-2 rounded bg-cream px-2 py-0.5 text-xs text-navy">Sold out</span>
        )}
      </div>
      <CardContent className="space-y-2">
        <p className="truncate text-sm">{p.name}</p>
        <p className="truncate text-xs opacity-60">{p.brand} · {p.strapMaterial}</p>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm">
            {formatPrice(p.price)}
            {p.oldPrice > p.price && (
              <span className="ml-1 text-xs line-through opacity-50">{formatPrice(p.oldPrice)}</span>
            )}
          </div>
          <Button size="sm" className="shrink-0" disabled={!p.inStock}>Quick buy</Button>
        </div>
      </CardContent>
    </Card>
  );
}
