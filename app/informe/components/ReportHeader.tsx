import Image from "next/image";
import { reportMeta } from "../data";
import seoLabLogo from "../../../SeoLab Logo (3).png";

export default function ReportHeader() {
  const metaCards = [
    { label: "Período", value: reportMeta.period },
    { label: "Para", value: reportMeta.to },
    { label: "De", value: reportMeta.from },
    { label: "Menciones", value: reportMeta.totalMentions.toLocaleString("es-PE") },
  ];
  const storyPoints = [
    "Dónde ya existe tracción de marca en ecosistemas de IA.",
    "Qué fricciones frenan la conversión y la confianza.",
    "Qué prioridades deben activarse de inmediato en mayo.",
  ];

  return (
    <section id="portada" className="h-full px-4 pt-4 sm:px-6 sm:pt-6">
      <div className="mx-auto grid h-full max-w-7xl overflow-hidden rounded-[36px] border border-brand-900/10 bg-slate-950 text-white shadow-[0_35px_100px_-45px_rgba(15,23,42,0.9)] lg:grid-cols-[minmax(0,1.25fr)_22rem]">
        <div className="relative flex flex-col justify-between px-6 py-8 sm:px-10 sm:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,163,165,0.34),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(13,148,136,0.22),transparent_26%)]" />

          <div className="relative z-10 flex flex-wrap items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.15] text-2xl font-black">
                T
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-brand-100">Tecsup</p>
                <p className="text-xs text-white/70">Instituto de Educación Superior Tecnológico</p>
              </div>
            </div>

            <span className="rounded-full border border-white/[0.15] bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-brand-50">
              Deck 2026
            </span>
          </div>

          <div className="relative z-10 max-w-4xl py-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-brand-100">Presentación Ejecutiva</p>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl">
              Informe Ejecutivo de Tecsup en <span className="text-brand-100">Ecosistemas de IA</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              Una lectura ejecutiva para entender cómo Tecsup aparece en respuestas generadas por IA, qué señales
              impulsan la conversación y qué decisiones deben mover la captación hacia resultados.
            </p>
          </div>

          <div className="relative z-10 grid gap-4 md:grid-cols-4">
            {metaCards.map((item) => (
              <div key={item.label} className="rounded-[24px] border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-sm">
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-brand-100">{item.label}</p>
                <p className="mt-2 text-sm font-semibold leading-snug text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="relative flex flex-col justify-between gap-6 border-t border-white/10 bg-white/[0.06] px-6 py-8 backdrop-blur-sm lg:border-l lg:border-t-0 lg:px-8 lg:py-10">
          <div className="self-end rounded-[24px] bg-white px-4 py-3 shadow-xl shadow-black/20">
            <Image src={seoLabLogo} alt="SeoLab" priority className="h-auto w-36 sm:w-40 lg:w-44" />
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/10 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-100">Qué verás hoy</p>
            <ul className="mt-5 space-y-4">
              {storyPoints.map((point, index) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-black text-brand-100">
                    0{index + 1}
                  </span>
                  <p className="text-sm leading-7 text-slate-200">{point}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[28px] bg-brand-400/[0.12] p-6 ring-1 ring-inset ring-brand-300/20">
            <p className="text-sm font-semibold text-brand-50">Mensaje central</p>
            <p className="mt-3 text-sm leading-7 text-slate-200">
              Tecsup ya tiene volumen y notoriedad en IA. La oportunidad inmediata está en reducir la fricción
              alrededor de costos y reforzar señales de confianza para acelerar la conversión.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
