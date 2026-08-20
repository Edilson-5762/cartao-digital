import { skills } from "@/lib/site-data";

const heroStack = skills.slice(0, 13);

export function Hero() {
  return (
    <section id="inicio" className="relative px-4 pb-12 pt-8 md:pb-16 md:pt-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-end gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-8">
        <div>
          <p className="inline-block rounded-full border border-green-400/40 px-3 py-1 text-xs text-green-400 transition-opacity duration-200 hover:opacity-80">
            Disponível para novas oportunidades
          </p>

          <h1 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-[2.75rem]">
            Full Stack Developer | Data Analytics
          </h1>

          <p className="mt-2 text-sm text-ink-muted sm:text-base">
            Edilson Moraes ·{" "}
            <a
              href="https://github.com/Edilson-5762/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-muted underline decoration-white/20 underline-offset-2 hover:text-gold-400"
            >
              github.com/Edilson-5762
            </a>
          </p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {[
              "Código limpo e performático",
              "Soluções web escaláveis",
              "Análise de dados orientada a negócio",
            ].map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/15 px-3 py-1 text-xs text-ink-muted sm:text-sm"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {heroStack.map((skill) => (
              <div
                key={skill.name}
                title={skill.name}
                className="rounded-lg border border-white/10 bg-white/5 p-1.5"
              >
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="h-6 w-6 object-contain sm:h-7 sm:w-7"
                />
              </div>
            ))}
          </div>

          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs text-ink-muted sm:text-sm">
            🎓 Pós em Data Analytics &amp; IA
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#portfolio"
              className="rounded-full bg-green-400 px-6 py-3 text-sm font-medium text-graphite-950 transition-all duration-200 hover:opacity-80 active:bg-green-600 visited:bg-green-600 sm:text-base"
            >
              Meus projetos
            </a>
            <a
              href="#contato"
              className="rounded-full border border-green-400 px-6 py-3 text-sm font-medium text-green-400 transition-all duration-200 hover:opacity-80 active:border-green-600 active:text-green-600 visited:border-green-600 visited:text-green-600 sm:text-base"
            >
              Fale comigo
            </a>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <img
            src="/hero/developer-cutout.png"
            alt="Foto de Edilson Moraes"
            className="h-auto max-h-[42vh] w-auto max-w-60 object-contain sm:max-h-[50vh] sm:max-w-70 md:max-h-[58vh] md:max-w-80"
          />
        </div>
      </div>
    </section>
  );
}
