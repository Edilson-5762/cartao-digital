// components/Footer.tsx
import { contactLinks } from "@/lib/site-data";
import { SocialIcon } from "./SocialIcon";

export function Footer() {
  const whatsapp = contactLinks.find((contact) => contact.icon === "whatsapp");

  return (
    <footer className="border-t border-white/10 px-4 py-10 text-center">
      {whatsapp && (
        <a
          href={whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Fale comigo no WhatsApp"
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-400 text-graphite-950 transition-all duration-200 hover:opacity-80 active:bg-green-600 visited:bg-green-600"
        >
          <SocialIcon name="whatsapp" className="h-7 w-7" />
        </a>
      )}

      <p className="mt-4 text-sm text-ink-muted">
        © {new Date().getFullYear()} Stack Analytics — Edilson Ebenezer
      </p>
    </footer>
  );
}
