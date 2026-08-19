import { skills } from "@/lib/site-data";

export function Skills() {
  return (
    <section id="habilidades" className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-ink">
          Habilidades &amp; Tecnologias
        </h2>
        <p className="mt-2 text-ink-muted">Ferramentas que uso no dia a dia.</p>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-graphite-900 p-6"
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className="h-12 w-12 object-contain"
              />
              <span className="text-sm text-ink">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
