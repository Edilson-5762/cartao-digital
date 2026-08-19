"use client";

import { useState } from "react";
import { navLinks } from "@/lib/site-data";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-graphite-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src="/logo-aguia-square.png"
            alt="Logo Stack Analytics"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="leading-tight">
            <p className="font-semibold text-ink">Stack Analytics</p>
            <p className="text-xs text-ink-muted">Edilson Ebenezer</p>
          </div>
        </div>

        <nav className="hidden gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink hover:text-gold-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Abrir menu"
          aria-expanded={mobileOpen}
          className="text-ink md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-4 border-t border-white/10 px-4 py-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
