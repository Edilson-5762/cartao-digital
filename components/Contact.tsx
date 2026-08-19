// components/Contact.tsx
import { contactLinks, location } from "@/lib/site-data";
import { SocialIcon } from "./SocialIcon";

export function Contact() {
  return (
    <section id="contato" className="px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">Contato</h2>
        <p className="mt-2 text-ink-muted">{location}</p>

        <ul className="mt-8 space-y-4">
          {contactLinks.map((contact) => {
            const isExternal = !contact.href.startsWith("mailto:");

            return (
              <li key={contact.href}>
                <a
                  href={contact.href}
                  {...(isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="flex items-center gap-3 rounded-xl border border-white/10 p-4 text-ink transition-all duration-200 hover:border-gold-500/50 hover:opacity-80 active:opacity-60"
                >
                  <SocialIcon
                    name={contact.icon}
                    className="h-5 w-5 shrink-0 text-gold-400"
                  />
                  <span className="min-w-0 wrap-break-word">{contact.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
