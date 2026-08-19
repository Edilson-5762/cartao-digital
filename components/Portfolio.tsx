import { portfolioUrl } from "@/lib/site-data";

export function Portfolio() {
  return (
    <section id="portfolio" className="px-4 py-16">
      <div className="mx-auto max-w-4xl rounded-2xl border border-gold-500/30 p-6 text-center sm:p-10">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">Quer ver meus projetos?</h2>
        <p className="mt-3 text-ink-muted">
          Reuni meus projetos em um portfólio dedicado. Dá uma olhada no que
          venho construindo.
        </p>
        <a
          href={portfolioUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-green-400 px-8 py-3 font-medium text-graphite-950 transition-all duration-200 hover:opacity-80 active:bg-green-600 visited:bg-green-600"
        >
          Ver meus projetos
        </a>
      </div>
    </section>
  );
}
