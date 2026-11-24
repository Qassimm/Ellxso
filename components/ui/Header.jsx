"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiChevronDown,
  FiMenu,
  FiSearch,
  FiShoppingBag,
  FiUser,
  FiX,
} from "react-icons/fi";
import navigation from "@/Data/navigation.json";
import site from "@/Data/site.json";

export default function Header() {
  const [open, setOpen] = useState(null); // desktop dropdown (label)
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState(null);

  const closeAll = () => {
    setOpen(null);
    setMobileOpen(false);
    setMobileSub(null);
  };

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeAll();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Drawer khula ho to peeche page scroll lock
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className="sticky top-0 z-40 border-b border-cream/10 bg-navy text-cream"
      onMouseLeave={() => setOpen(null)}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-4 py-4 md:grid-cols-[1fr_auto_1fr] md:px-8">
        <Link href="/" onClick={closeAll} aria-label={site.name}>
          <Image
            src={site.logo.src}
            width={site.logo.width}
            height={site.logo.height}
            alt={site.name}
            priority
            className="h-auto w-32 md:w-[200px]"
          />
        </Link>

        {/* Desktop links */}
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {navigation.map((n) =>
            n.items ? (
              <div key={n.label} className="relative">
                <button
                  aria-expanded={open === n.label}
                  onMouseEnter={() => setOpen(n.label)}
                  onFocus={() => setOpen(n.label)}
                  onClick={() => setOpen(open === n.label ? null : n.label)}
                  className={`flex cursor-pointer items-center gap-1 hover:text-cream ${open === n.label ? "text-cream" : "text-cream/85"}`}
                >
                  {n.label}
                  <FiChevronDown
                    size={14}
                    className={`transition-transform ${open === n.label ? "rotate-180" : ""}`}
                  />
                </button>

                {open === n.label && (
                  <div className="absolute left-0 top-full pt-4">
                    <ul className="flex min-w-[200px] flex-col gap-1 whitespace-nowrap rounded-md border border-black/10 bg-white px-5 py-4 text-black shadow-xl">
                      {n.items.map((it) => (
                        <li key={it.label}>
                          <Link
                            href={it.href}
                            onClick={closeAll}
                            className="block py-1.5 text-black transition-opacity hover:opacity-60"
                          >
                            {it.label}
                          </Link>
                        </li>
                      ))}
                      {n.href && (
                        <li className="mt-2 border-t border-black/10 pt-3">
                          <Link
                            href={n.href}
                            onClick={closeAll}
                            className="text-sm text-black underline underline-offset-4 hover:opacity-60"
                          >
                            View all {n.label} →
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={n.label}
                href={n.href}
                onMouseEnter={() => setOpen(null)}
                className="text-cream/85 hover:text-cream"
              >
                {n.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center justify-end gap-5 md:gap-10">
          <button
            aria-label="Login"
            className="cursor-pointer text-cream/75 hover:text-cream"
          >
            <FiUser size={20} />
          </button>
          <button
            aria-label="Search"
            className="cursor-pointer text-cream/75 hover:text-cream"
          >
            <FiSearch size={20} />
          </button>
          <button
            aria-label="Store"
            className="cursor-pointer text-cream/75 hover:text-cream"
          >
            <FiShoppingBag size={20} />
          </button>
          <button
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="cursor-pointer text-cream md:hidden"
          >
            <FiMenu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile/tablet: backdrop */}
      <div
        onClick={closeAll}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile/tablet: full screen drawer */}
      <aside
        aria-label="Mobile menu"
        aria-hidden={!mobileOpen}
        className={`fixed inset-0 z-50 flex h-dvh w-full flex-col bg-navy text-cream transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          mobileOpen ? "visible translate-x-0" : "invisible -translate-x-full"
        }`}
      >
        {/* Drawer header (fixed) */}
        <div className="flex shrink-0 items-center justify-between border-b border-cream/10 px-4 py-4">
          <Link href="/" onClick={closeAll} aria-label={site.name}>
            <Image
              src={site.logo.src}
              width={site.logo.width}
              height={site.logo.height}
              alt={site.name}
              className="h-auto w-28"
            />
          </Link>
          <button
            onClick={closeAll}
            aria-label="Close menu"
            className="cursor-pointer text-cream"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Links (scrollable) */}
        <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-2">
          {navigation.map((n) =>
            n.items ? (
              <div key={n.label} className="border-b border-cream/10">
                <button
                  onClick={() =>
                    setMobileSub(mobileSub === n.label ? null : n.label)
                  }
                  aria-expanded={mobileSub === n.label}
                  className="flex w-full cursor-pointer items-center justify-between py-3"
                >
                  {n.label}
                  <FiChevronDown
                    size={16}
                    className={`transition-transform ${mobileSub === n.label ? "rotate-180" : ""}`}
                  />
                  
                </button>
                {mobileSub === n.label && (
                  <ul className="pb-2 pl-1">
                    {n.href && (
                      <li>
                        <Link
                          href={n.href}
                          onClick={closeAll}
                          className="block py-2 text-cream/80"
                        >
                          All {n.label}
                        </Link>
                      </li>
                    )}
                    {n.items.map((it) => (
                      <li key={it.label}>
                        <Link
                          href={it.href}
                          onClick={closeAll}
                          className="block py-2 text-cream/80"
                        >
                          {it.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Link
                key={n.label}
                href={n.href}
                onClick={closeAll}
                className="block border-b border-cream/10 py-3"
              >
                {n.label}
              </Link>
            ),
          )}
        </nav>
      </aside>
    </header>
  );
}
