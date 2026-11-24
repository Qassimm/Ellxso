import { FaStar } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import reviews from "@/Data/reviews.json";

const STARS = Array.from({ length: 5 });

function Column({ items, dir }) {
  return (
    <div className="h-[420px] overflow-hidden">
      <div className={dir === "up" ? "animate-marquee-up" : "animate-marquee-down"}>
        {[0, 1].map((g) => (
          <div key={g} className="space-y-4 pb-4" aria-hidden={g === 1}>
            {items.map((r) => (
              <Card key={r} className="border-2">
                <CardContent className="p-6">
                  <div className="mb-3 flex gap-1 text-[#F4B400]" aria-label="5 out of 5 stars" role="img">
                    {STARS.map((_, i) => (
                      <FaStar key={i} size={16} />
                    ))}
                  </div>
                  <p className="text-lg leading-relaxed">{r}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="bg-cream py-16 text-navy">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <h2 className="mb-20 text-center text-3xl font-semibold md:text-6xl">What our customers say</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <Column items={reviews.left} dir="up" />
          <Column items={reviews.right} dir="down" />
        </div>
      </div>
    </section>
  );
}
