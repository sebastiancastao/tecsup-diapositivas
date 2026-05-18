"use client";

import { Children, type ReactNode, type TouchEvent, useEffect, useRef, useState } from "react";

type SlideMeta = {
  id: string;
  label: string;
};

type DeckViewMode = "presentation" | "full";

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

function clampIndex(index: number, totalSlides: number) {
  return Math.max(0, Math.min(index, totalSlides - 1));
}

function getInitialSlide(slides: SlideMeta[]) {
  if (typeof window === "undefined") {
    return 0;
  }

  const hash = window.location.hash.replace("#", "");
  const hashIndex = slides.findIndex((slide) => slide.id === hash);
  return hashIndex >= 0 ? hashIndex : 0;
}

function getViewModeFromLocation(): DeckViewMode {
  if (typeof window === "undefined") {
    return "presentation";
  }

  const params = new URLSearchParams(window.location.search);
  return params.get("view") === "full" ? "full" : "presentation";
}

export default function PresentationDeck({ slides, period, children }: PresentationDeckProps) {
  const renderedSlides = Children.toArray(children);
  const [currentSlide, setCurrentSlide] = useState(() => getInitialSlide(slides));
  const [viewMode, setViewMode] = useState<DeckViewMode>(() => getViewModeFromLocation());
  const touchStartX = useRef<number | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const previousViewMode = useRef<DeckViewMode>(viewMode);
  const activeSlideIndex = clampIndex(currentSlide, slides.length);

  const goToSlide = (index: number, behavior: ScrollBehavior = "smooth") => {
    const nextIndex = clampIndex(index, slides.length);

    setCurrentSlide(nextIndex);

    if (viewMode === "full") {
      slideRefs.current[nextIndex]?.scrollIntoView({ behavior, block: "start" });
    }
  };

  const goToPrevious = () => {
    goToSlide(activeSlideIndex - 1);
  };

  const goToNext = () => {
    goToSlide(activeSlideIndex + 1);
  };

  useEffect(() => {
    const handleLocationChange = () => {
      const nextViewMode = getViewModeFromLocation();
      const hash = window.location.hash.replace("#", "");
      const hashIndex = slides.findIndex((slide) => slide.id === hash);

      setViewMode(nextViewMode);

      if (hashIndex >= 0) {
        setCurrentSlide(hashIndex);

        if (nextViewMode === "full") {
          window.requestAnimationFrame(() => {
            slideRefs.current[hashIndex]?.scrollIntoView({ behavior: "auto", block: "start" });
          });
        }
      }
    };

    window.addEventListener("hashchange", handleLocationChange);
    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("hashchange", handleLocationChange);
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, [slides]);

  useEffect(() => {
    const currentId = slides[activeSlideIndex]?.id;
    if (!currentId) {
      return;
    }

    const url = new URL(window.location.href);

    if (viewMode === "full") {
      url.searchParams.set("view", "full");
    } else {
      url.searchParams.delete("view");
    }

    url.hash = currentId;
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, [activeSlideIndex, slides, viewMode]);

  useEffect(() => {
    const lastIndex = slides.length - 1;
    const goToIndex = (index: number) => {
      const nextIndex = clampIndex(index, slides.length);

      setCurrentSlide(nextIndex);

      if (viewMode === "full") {
        slideRefs.current[nextIndex]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) {
        return;
      }

      if (event.key === "ArrowRight" || event.key === "ArrowDown" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        goToIndex(activeSlideIndex + 1);
        return;
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        goToIndex(activeSlideIndex - 1);
        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        goToIndex(0);
        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        goToIndex(lastIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSlideIndex, slides.length, viewMode]);

  useEffect(() => {
    if (viewMode !== "full") {
      return;
    }

    const nodes = slideRefs.current.filter((node): node is HTMLDivElement => node !== null);
    if (!nodes.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (!visibleEntries.length) {
          return;
        }

        const mostVisible = visibleEntries.reduce((bestEntry, entry) =>
          entry.intersectionRatio > bestEntry.intersectionRatio ? entry : bestEntry,
        );
        const nextIndex = Number((mostVisible.target as HTMLDivElement).dataset.slideIndex);

        if (!Number.isNaN(nextIndex)) {
          setCurrentSlide(nextIndex);
        }
      },
      {
        threshold: [0.2, 0.45, 0.7],
        rootMargin: "-12% 0px -30% 0px",
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [slides.length, viewMode]);

  useEffect(() => {
    if (viewMode === "full" && previousViewMode.current !== "full") {
      const activeSlide = slideRefs.current[activeSlideIndex];

      if (activeSlide) {
        window.requestAnimationFrame(() => {
          activeSlide.scrollIntoView({ behavior: "auto", block: "start" });
        });
      }
    }

    previousViewMode.current = viewMode;
  }, [activeSlideIndex, viewMode]);

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

  const viewModeButtonClass = (mode: DeckViewMode) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
      viewMode === mode
        ? "bg-brand-600 text-white shadow-sm"
        : "text-slate-600 hover:text-brand-700"
    }`;

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
                const isActive = index === activeSlideIndex;

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
          <div className="flex flex-col gap-4 rounded-[28px] border border-white/70 bg-white/75 px-4 py-4 shadow-lg shadow-brand-900/5 backdrop-blur lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-700">
                {viewMode === "presentation" ? "Modo presentacion" : "Modo full view"}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {viewMode === "presentation"
                  ? "Usa flechas, espacio o los botones para avanzar."
                  : "Recorre todo el informe con scroll o salta entre secciones con los botones."}
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:items-end">
              <div className="inline-flex w-fit rounded-full border border-slate-200 bg-slate-50 p-1">
                <button
                  type="button"
                  onClick={() => setViewMode("presentation")}
                  aria-pressed={viewMode === "presentation"}
                  className={viewModeButtonClass("presentation")}
                >
                  Presentacion
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("full")}
                  aria-pressed={viewMode === "full"}
                  className={viewModeButtonClass("full")}
                >
                  Full view
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
                  {String(activeSlideIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={goToPrevious}
                  disabled={activeSlideIndex === 0}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-brand-200 hover:text-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  disabled={activeSlideIndex === slides.length - 1}
                  className="rounded-full border border-brand-600 bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>

          {viewMode === "presentation" ? (
            <div
              className="relative flex-1 overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex h-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeSlideIndex * 100}%)` }}
              >
                {renderedSlides.map((slide, index) => (
                  <div
                    key={slides[index]?.id ?? index}
                    ref={(node) => {
                      slideRefs.current[index] = node;
                    }}
                    data-slide-index={index}
                    aria-hidden={index !== activeSlideIndex}
                    className="h-full w-full shrink-0 overflow-y-auto"
                  >
                    {slide}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {renderedSlides.map((slide, index) => (
                <div
                  key={slides[index]?.id ?? index}
                  ref={(node) => {
                    slideRefs.current[index] = node;
                  }}
                  data-slide-index={index}
                  className="scroll-mt-28 [&>section]:h-auto [&>section]:min-h-[calc(100vh-7rem)] [&>section>div]:h-auto [&>section>div]:min-h-[calc(100vh-9rem)]"
                >
                  {slide}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="px-4 pb-4 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[28px] border border-white/70 bg-white/80 px-4 py-4 shadow-lg shadow-brand-900/5 backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {slides.map((slide, index) => {
                const isActive = index === activeSlideIndex;

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
