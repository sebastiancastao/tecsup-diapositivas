import type { ReactNode } from "react";

type SlideShellProps = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  accent?: ReactNode;
  children: ReactNode;
  tone?: "light" | "dark";
};

export default function SlideShell({
  id,
  index,
  eyebrow,
  title,
  description,
  accent,
  children,
  tone = "light",
}: SlideShellProps) {
  const isDark = tone === "dark";

  return (
    <section id={id} className="h-full px-4 py-4 sm:px-6 sm:py-6">
      <div
        className={`mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-[32px] border ${
          isDark
            ? "border-white/10 bg-slate-950 text-white shadow-[0_30px_90px_-45px_rgba(15,23,42,0.9)]"
            : "border-white/70 bg-white/90 text-slate-900 shadow-[0_30px_90px_-45px_rgba(20,78,79,0.45)] backdrop-blur"
        }`}
      >
        <div className={`border-b px-6 py-6 sm:px-10 sm:py-8 ${isDark ? "border-white/10" : "border-slate-100"}`}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-3">
                <span
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-black ${
                    isDark ? "bg-white/10 text-brand-100" : "bg-brand-100 text-brand-700"
                  }`}
                >
                  {index}
                </span>
                <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${isDark ? "text-brand-100" : "text-brand-700"}`}>
                  {eyebrow}
                </p>
              </div>
              <h2 className={`text-3xl font-black tracking-tight sm:text-4xl md:text-5xl ${isDark ? "text-white" : "text-slate-900"}`}>
                {title}
              </h2>
              <p className={`mt-4 max-w-2xl text-sm leading-7 sm:text-base ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                {description}
              </p>
            </div>
            {accent ? <div className="w-full lg:max-w-sm">{accent}</div> : null}
          </div>
        </div>

        <div className="flex-1 px-6 py-6 sm:px-10 sm:py-8">{children}</div>
      </div>
    </section>
  );
}
