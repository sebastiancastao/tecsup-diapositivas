import { topicMentions, keyQuestions, sentimentData } from "../data";
import SlideShell from "./SlideShell";

const MAX_MENTIONS = Math.max(...topicMentions.map((item) => item.mentions));

function MentionBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${color} transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-16 text-right text-sm font-semibold text-slate-700">
        {value.toLocaleString("es-PE")}
      </span>
    </div>
  );
}

function SentimentBar({ positive, neutral, negative }: { positive: number; neutral: number; negative: number }) {
  return (
    <div className="flex h-2.5 rounded-full overflow-hidden gap-0.5 w-full min-w-[120px]">
      <div
        title={`Positivo: ${positive}%`}
        className="bg-green-400 rounded-l-full transition-all"
        style={{ width: `${positive}%` }}
      />
      <div
        title={`Neutral: ${neutral}%`}
        className="bg-gray-300 transition-all"
        style={{ width: `${neutral}%` }}
      />
      <div
        title={`Negativo: ${negative}%`}
        className="bg-red-400 rounded-r-full transition-all"
        style={{ width: `${negative}%` }}
      />
    </div>
  );
}

const barColors = [
  "bg-brand-400",
  "bg-brand-500",
  "bg-brand-600",
  "bg-brand-700",
];

export default function DiagnosisSection() {
  return (
    <SlideShell
      id="diagnostico"
      index="02"
      eyebrow="Diagnóstico"
      title="La conversación gira en oferta, precio y validación institucional"
      description="En formato de presentación, el patrón es más legible: las personas preguntan primero por la oferta, luego por el costo y finalmente por señales de reputación comparativa."
      accent={
        <div className="rounded-[26px] border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Señales clave</p>
          <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <p>
              <span className="font-semibold text-slate-900">Mayor volumen:</span> Oferta académica.
            </p>
            <p>
              <span className="font-semibold text-slate-900">Mayor riesgo:</span> Costos y financiamiento.
            </p>
            <p>
              <span className="font-semibold text-slate-900">Pregunta crítica:</span> “¿Qué tal es el Instituto Tecsup?”.
            </p>
          </div>
        </div>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[30px] border border-slate-100 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-700">Temáticas</p>
              <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
                Oferta académica y costos dominan el volumen de conversación
              </h3>
            </div>
            <span className="rounded-full bg-brand-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">
              4 focos
            </span>
          </div>

          <div className="mt-8 space-y-6">
            {topicMentions.map((item, i) => (
              <div
                key={item.topic}
                className="rounded-[24px] border border-slate-100 bg-slate-50/70 px-5 py-5 transition-colors hover:bg-brand-50/40"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="md:max-w-[15rem]">
                    <p className="text-base font-bold text-slate-900">{item.topic}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-500">{item.reading}</p>
                  </div>
                  <div className="flex-1 md:pl-8">
                    <MentionBar value={item.mentions} max={MAX_MENTIONS} color={barColors[i]} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-[30px] border border-slate-100 bg-white p-6 shadow-sm sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-700">Preguntas Clave</p>
            <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
              Las dudas de reputación y precio disparan la exploración
            </h3>

            <div className="mt-6 space-y-4">
              {keyQuestions.map((item) => (
                <div key={item.question} className="rounded-[24px] border border-slate-100 bg-slate-50 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <p className="max-w-[18rem] text-base font-semibold italic leading-7 text-slate-900">
                      &quot;{item.question}&quot;
                    </p>
                    <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-700">
                      {item.mentions.toLocaleString("es-PE")}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-500">{item.intent}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-slate-100 bg-white p-6 shadow-sm sm:p-7">
            <div className="flex flex-wrap items-center gap-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
              <span className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-green-400" />
                Positivo
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-gray-300" />
                Neutral
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-red-400" />
                Negativo
              </span>
            </div>

            <div className="mt-6 space-y-5">
              {sentimentData.map((item) => (
                <div key={item.concept} className="rounded-[24px] border border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900">{item.concept}</span>
                      {item.alert ? (
                        <span className="rounded-full bg-red-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-red-600">
                          Alerta
                        </span>
                      ) : null}
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-4 text-xs text-slate-500">
                      <span className="font-semibold text-green-600">{item.positive}%</span>
                      <span className="text-slate-400">{item.neutral}%</span>
                      <span className="font-semibold text-red-500">{item.negative}%</span>
                    </div>
                  </div>

                  <SentimentBar positive={item.positive} neutral={item.neutral} negative={item.negative} />
                  <p className="mt-3 text-sm leading-7 text-slate-500">{item.reading}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
