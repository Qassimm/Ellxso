import Link from "next/link";
import footer from "@/Data/footer.json"
import { socialIcons } from "@/lib/social-icons";

function LinkColumn({ title, links }) {
  return (
    <div>
      <h3 className="mb-4 text-sm tracking-widest">{title}</h3>
      <ul className="space-y-2 text-sm opacity-80">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="hover:underline">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-navy text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 md:px-8 lg:grid-cols-[1.3fr_1fr_0.7fr_0.7fr]">
        {footer.columns.map((c) => (
          <LinkColumn key={c.title} title={c.title} links={c.links} />
        ))}

        <div>
          <h3 className="mb-4 text-sm tracking-widest">FOLLOW US</h3>
          <div className="flex gap-4">
            {footer.socials.map(({ label, icon, href }) => {
              const Icon = socialIcons[icon];
              return (
                <a key={label} href={href} aria-label={label}><Icon size={20} /></a>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-8 text-xs opacity-60 md:px-8">{footer.copyright}</div>
    </footer>
  );
}
