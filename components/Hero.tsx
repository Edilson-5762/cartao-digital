export function Hero() {
  return (
    <section id="inicio" className="relative px-4 pb-16 pt-10">
      <div className="mx-auto max-w-6xl">
        <img
          src="/hero/bainer.png"
          alt="Banner Stack Analytics — Full Stack Developer"
          className="w-full rounded-2xl"
        />

        <div className="mt-10 grid items-center gap-8 md:grid-cols-[2fr_1fr]">
          <div>
            <p className="inline-block rounded-full border border-gold-500/40 px-3 py-1 text-xs text-gold-400">
              Disponível para novas oportunidades
            </p>
            <h1 className="mt-4 text-4xl font-bold text-ink md:text-5xl">
              Full Stack Developer | Data Analytics
            </h1>
            <p className="mt-2 text-ink-muted">Edilson Coelho Moraes</p>

            <ul className="mt-6 space-y-2 text-ink-muted">
              <li>Código limpo e performático</li>
              <li>Soluções web escaláveis</li>
              <li>Análise de dados orientada a negócio</li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#portfolio"
                className="rounded-full bg-gold-500 px-6 py-3 font-medium text-graphite-950"
              >
                Meus projetos
              </a>
              <a
                href="#contato"
                className="rounded-full border border-white/20 px-6 py-3 font-medium text-ink"
              >
                Fale comigo
              </a>
            </div>
          </div>

          <img
            src="/hero/developer.png"
            alt="Foto de Edilson Coelho Moraes"
            className="w-full max-w-xs justify-self-center rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
