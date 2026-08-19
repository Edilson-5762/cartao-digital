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
          <div
            className={`aspect-4/3 w-full overflow-hidden rounded-2xl sm:aspect-16/10 md:aspect-4/3 ${
              slide.images.length > 1 ? "grid grid-cols-2 gap-1" : ""
            }`}
          >
            {slide.images.map((image) => (
              <img
                key={image}
                src={image}
                alt={slide.title}
                className="h-full w-full object-contain"
              />
            ))}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gold-400">{slide.period}</p>
            <h3 className="mt-1 text-xl font-semibold text-ink sm:text-2xl">
              {slide.title}
            </h3>
            <p className="mt-3 wrap-break-word text-ink-muted">{slide.description}</p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 sm:gap-6">
          <button
            type="button"
            aria-label="Slide anterior"
            onClick={goPrev}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-lg text-ink transition-all duration-200 hover:border-gold-400/60 hover:bg-white/10 hover:text-gold-400 active:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
          >
            ←
          </button>

          <div className="flex items-center gap-2.5">
            {storySlides.map((s, i) => (
              <button
                key={s.images[0]}
                type="button"
                aria-label={`Ir para slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={`h-3 rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 ${
                  i === index
                    ? "w-8 bg-gold-500"
                    : "w-3 bg-white/25 hover:bg-white/45"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Próximo slide"
            onClick={goNext}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-lg text-ink transition-all duration-200 hover:border-gold-400/60 hover:bg-white/10 hover:text-gold-400 active:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
