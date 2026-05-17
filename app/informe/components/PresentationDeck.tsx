"use client";

import { Children, type ReactNode, type TouchEvent, useEffect, useRef, useState } from "react";

type SlideMeta = {
  id: string;
  label: string;
};

type PresentationDeckProps = {
  slides: SlideMeta[];
  period: string;
  children: ReactNode;
};

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = target.tagName;
  return tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT" || target.isContentEditable;
}

export default function PresentationDeck({ slides, period, children }: PresentationDeckProps) {
  const renderedSlides = Children.toArray(children);
  const [currentSlide, setCurrentSlide] = useState(() => {
    if (typeof window === "undefined") {
      return 0;
    }

    const hash = window.location.hash.replace("#", "");
    const hashIndex = slides.findIndex((slide) => slide.id === hash);
    return hashIndex >= 0 ? hashIndex : 0;
  });
  const touchStartX = useRef<number | null>(null);

  const goToSlide = (index: number) => {
    setCurrentSlide(Math.max(0, Math.min(index, slides.length - 1)));
  };

  const goToPrevious = () => {
    setCurrentSlide((index) => Math.max(index - 1, 0));
  };

  const goToNext = () => {
    setCurrentSlide((index) => Math.min(index + 1, slides.length - 1));
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const hashIndex = slides.findIndex((slide) => slide.id === hash);

      if (hashIndex >= 0) {
        setCurrentSlide(hashIndex);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [slides]);

  useEffect(() => {
    const currentId = slides[currentSlide]?.id;
    if (!currentId) {
      return;
    }

    window.history.replaceState(null, "", `#${currentId}`);
  }, [currentSlide, slides]);

  useEffect(() => {
    const lastIndex = slides.length - 1;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) {
        return;
      }

      if (event.key === "ArrowRight" || event.key === "ArrowDown" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        setCurrentSlide((index) => Math.min(index + 1, lastIndex));
        return;
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        setCurrentSlide((index) => Math.max(index - 1, 0));
        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        setCurrentSlide(0);
        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        setCurrentSlide(lastIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slides.length]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const endX = event.changedTouches[0]?.clientX;

    if (touchStartX.current === null || endX === undefined) {
      touchStartX.current = null;
      return;
    }

    const deltaX = endX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) < 50) {
      return;
    }

    if (deltaX < 0) {
      goToNext();
      return;
    }

    goToPrevious();
  };

  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top_left,rgba(59,163,165,0.16),transparent_24%),linear-gradient(180deg,#f8fbfb_0%,#eef5f5_50%,#f7fbfb_100%)] font-sans text-slate-900">
      <div className="px-4 pt-4 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[28px] border border-white/70 bg-white/80 px-4 py-4 shadow-lg shadow-brand-900/5 backdrop-blur">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-black text-white">
                T
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-700">Tecsup x SeoLab</p>
                <p className="text-sm font-semibold text-slate-600">{period}</p>
              </div>
            </div>

            <nav className="flex flex-wrap gap-2">
              {slides.map((slide, index) => {
                const isActive = index === currentSlide;

                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goToSlide(index)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? "border-brand-600 bg-brand-600 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-brand-200 hover:text-brand-700"
                    }`}
                  >
                    {slide.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      <main className="flex flex-1 flex-col px-4 pb-4 pt-4 sm:px-6">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4">
          <div className="flex flex-col gap-3 rounded-[28px] border border-white/70 bg-white/75 px-4 py-4 shadow-lg shadow-brand-900/5 backdrop-blur md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-700">Modo presentación</p>
              <p className="mt-1 text-sm text-slate-500">
                Usa <span className="font-semibold text-slate-700">flechas</span>, <span className="font-semibold text-slate-700">espacio</span> o los botones para avanzar.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
                {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={goToPrevious}
                disabled={currentSlide === 0}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-brand-200 hover:text-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={goToNext}
                disabled={currentSlide === slides.length - 1}
                className="rounded-full border border-brand-600 bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          </div>

          <div
            className="relative flex-1 overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex h-full transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {renderedSlides.map((slide, index) => (
                <div
                  key={slides[index]?.id ?? index}
                  aria-hidden={index !== currentSlide}
                  className="h-full w-full shrink-0 overflow-y-auto"
                >
                  {slide}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="px-4 pb-4 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[28px] border border-white/70 bg-white/80 px-4 py-4 shadow-lg shadow-brand-900/5 backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {slides.map((slide, index) => {
                const isActive = index === currentSlide;

                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goToSlide(index)}
                    aria-label={`Ir a ${slide.label}`}
                    className={`h-3 rounded-full transition-all ${isActive ? "w-10 bg-brand-600" : "w-3 bg-slate-300 hover:bg-brand-300"}`}
                  />
                );
              })}
            </div>

            <p className="text-sm text-slate-500">Deck ejecutivo de Tecsup sobre presencia en ecosistemas de IA.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
