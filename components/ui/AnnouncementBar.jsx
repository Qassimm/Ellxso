import site from "@/Data/site.json";
import { socialIcons } from "@/lib/social-icons";

const REPEAT = Array.from({ length: 6 });

export default function AnnouncementBar() {
  const { welcome, marquee } = site.announcement;

  return (
    <div className="bg-navy/95 py-2 text-sm text-cream">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 md:px-8">
        <p className="hidden shrink-0 whitespace-nowrap md:block">{welcome}</p>

        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="flex w-max animate-marquee-x">
            {[0, 1].map((g) => (
              <div key={g} className="flex shrink-0" aria-hidden={g === 1}>
                {REPEAT.map((_, i) => (
                  <span key={i} className="whitespace-nowrap px-10 uppercase">{marquee}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          {site.socials.map(({ label, icon, href }) => {
            const Icon = socialIcons[icon];
            return (
              <a key={label} href={href} aria-label={label} className="text-cream/85 hover:text-cream">
                <Icon size={15} />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
