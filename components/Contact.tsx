// components/Contact.tsx
import { contactLinks, location } from "@/lib/site-data";
import { SocialIcon } from "./SocialIcon";

export function Contact() {
  return (
    <section id="contato" className="px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold text-ink">Contato</h2>
        <p className="mt-2 text-ink-muted">{location}</p>

        <ul className="mt-8 space-y-4">
          {contactLinks.map((contact) => (
            <li key={contact.href}>
              <a
                href={contact.href}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-graphite-900 p-4 text-ink hover:border-gold-500/50"
              >
                <SocialIcon name={contact.icon} className="h-5 w-5 text-gold-400" />
                {contact.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
