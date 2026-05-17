import { reportMeta, topicMentions } from "../data";
import SlideShell from "./SlideShell";

export default function ExecutiveSummary() {
  const summaryStats = [
    { label: "Menciones analizadas", value: reportMeta.totalMentions.toLocaleString("es-PE") },
    { label: "Tema dominante", value: topicMentions[0].topic },
    { label: "Fricción principal", value: "Costos y financiamiento" },
  ];
  const focusCards = [
    {
      icon: "📚",
      title: "Mayor interés",
      detail: "Oferta académica",
      tone: "bg-green-50 border-green-100 text-green-800",
    },
    {
      icon: "⚠️",
      title: "Área de mejora",
      detail: "Costos y financiamiento",
      tone: "bg-orange-50 border-orange-100 text-orange-800",
    },
    {
      icon: "🎯",
      title: "Acción clave",
      detail: "Convertir interés en inscripciones",
      tone: "bg-brand-50 border-brand-100 text-brand-800",
    },
  ];

  return (
    <SlideShell
      id="resumen"
      index="01"
      eyebrow="Resumen Ejecutivo"
      title="La marca ya genera tracción; el reto está en convertirla"
      description="La señal estratégica es clara: Tecsup ya aparece con volumen y reconocimiento, pero todavía necesita reforzar confianza y explicar mejor el valor económico para mover a los prospectos hacia la acción."
      accent={
        <div className="rounded-[26px] border border-brand-100 bg-brand-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-700">Headline</p>
          <p className="mt-3 text-lg font-black tracking-tight text-slate-900">
            Visibilidad fuerte, conversión contenida por precio y credibilidad.
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            El siguiente salto no depende de awareness, sino de resolver objeciones y aumentar citabilidad.
          </p>
        </div>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[30px] bg-[linear-gradient(135deg,#1d5355_0%,#276d6f_35%,#3ba3a5_100%)] p-8 text-white shadow-[0_25px_70px_-40px_rgba(29,83,85,0.9)] sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-100">Lectura Principal</p>
          <p className="mt-5 max-w-3xl text-2xl font-black leading-tight tracking-tight sm:text-4xl">
            Tecsup ya está en la conversación de IA. Ahora toca transformar interés disperso en decisión concreta.
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-white/80 sm:text-base">
            El análisis de casi <span className="font-bold text-white">20,000 menciones</span> durante los últimos
            tres meses confirma una presencia relevante en prompts educativos. La palanca inmediata está en reforzar
            confianza, claridad económica y señales que las IA puedan citar con facilidad.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {summaryStats.map((item) => (
              <div key={item.label} className="rounded-[24px] border border-white/[0.15] bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-brand-100">{item.label}</p>
                <p className="mt-3 text-lg font-bold leading-snug text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
          {focusCards.map((card) => (
            <div key={card.title} className={`rounded-[26px] border p-5 ${card.tone}`}>
              <div className="flex items-start gap-4">
                <span className="text-2xl">{card.icon}</span>
                <div>
                  <p className="text-sm font-semibold">{card.title}</p>
                  <p className="mt-1 text-lg font-black tracking-tight">{card.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}
