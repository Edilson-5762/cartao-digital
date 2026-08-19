import { portfolioUrl } from "@/lib/site-data";

export function Portfolio() {
  return (
    <section id="portfolio" className="px-4 py-16">
      <div className="mx-auto max-w-4xl rounded-2xl border border-gold-500/30 bg-graphite-900 p-10 text-center">
        <h2 className="text-3xl font-bold text-ink">Quer ver meus projetos?</h2>
        <p className="mt-3 text-ink-muted">
          Reuni meus projetos em um portfólio dedicado. Dá uma olhada no que
          venho construindo.
        </p>
        <a
          href={portfolioUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-gold-500 px-8 py-3 font-medium text-graphite-950"
        >
          Ver meus projetos
        </a>
      </div>
    </section>
  );
}
