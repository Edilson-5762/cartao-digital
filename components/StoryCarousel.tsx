// components/StoryCarousel.tsx
"use client";

import { useState } from "react";
import { storySlides } from "@/lib/site-data";

export function StoryCarousel() {
  const [index, setIndex] = useState(0);
  const slide = storySlides[index];

  function goNext() {
    setIndex((current) => (current + 1) % storySlides.length);
  }

  function goPrev() {
    setIndex((current) => (current - 1 + storySlides.length) % storySlides.length);
  }

  return (
    <section id="historia" className="px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">Minha História</h2>
        <p className="mt-2 text-ink-muted">
          De açougueiro a vigilante, e agora em transição para desenvolvedor.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 md:items-center">
          <div className="aspect-4/3 w-full overflow-hidden rounded-2xl sm:aspect-16/10 md:aspect-4/3">
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gold-400">{slide.period}</p>
            <h3 className="mt-1 text-xl font-semibold text-ink sm:text-2xl">
              {slide.title}
            </h3>
            <p className="mt-3 wrap-break-word text-ink-muted">{slide.description}</p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            type="button"
            aria-label="Slide anterior"
            onClick={goPrev}
            className="text-ink"
          >
            ←
          </button>

          <div className="flex gap-2">
            {storySlides.map((s, i) => (
              <button
                key={s.image}
                type="button"
                aria-label={`Ir para slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full ${
                  i === index ? "bg-gold-500" : "bg-white/20"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Próximo slide"
            onClick={goNext}
            className="text-ink"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
