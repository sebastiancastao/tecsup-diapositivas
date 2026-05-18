import { priorities } from "../data";
import SlideShell from "./SlideShell";

const detailDocUrl =
  "https://docs.google.com/document/d/1WfpsArAdwLSrtY3P2NT8RXfvphWFEysD7t4kJH6Pzwk/edit?usp=sharing";

export default function ActionPlan() {
  const immediatePriority = priorities[0];

  return (
    <SlideShell
      id="plan"
      index="04"
      eyebrow="Plan de Accion"
      title="Cinco movimientos para pasar de presencia a captacion"
      description="El plan ya no se presenta como lista larga, sino como un set de jugadas ejecutivas priorizadas. La recomendacion es activar primero la base tecnica y semantica para que Tecsup gane legibilidad, citabilidad y mejor traccion en ecosistemas de IA."
      accent={
        <div className="rounded-[26px] border border-brand-100 bg-brand-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-700">Prioridad inmediata</p>
          <p className="mt-3 text-lg font-black tracking-tight text-slate-900">{immediatePriority.title}</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Construye la capa tecnica que facilita rastreo, indexacion, citacion y elegibilidad para AI Search y Google AI Overviews.
          </p>
        </div>
      }
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-[28px] border border-brand-100 bg-brand-50/80 p-5 md:col-span-2 xl:col-span-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-brand-700">Alcance inicial</p>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            Los items de cada prioridad corresponden a las actividades que se deben ejecutar en una primera etapa.
            Luego se pueden ajustar segun aprendizaje, resultados y siguientes iteraciones del plan.
          </p>
        </div>

        {priorities.map((priority) => (
          <article
            key={priority.id}
            className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div
              className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${priority.color} text-sm font-black text-white shadow-lg`}
            >
              P{priority.id}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${priority.badgeColor}`}>
                {priority.badge}
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {priority.actions.length} acciones
              </span>
            </div>

            <h3 className="mt-4 text-xl font-black tracking-tight text-slate-900">{priority.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{priority.objective}</p>

            <div className="mt-6 grid gap-4">
              <div className="rounded-[22px] bg-slate-50 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-400">
                  Movimientos clave
                </p>
                <ul className="mt-3 space-y-2">
                  {priority.actions.slice(0, 3).map((action) => (
                    <li key={action} className="flex items-start gap-2 text-sm leading-6 text-slate-700">
                      <span className="mt-1.5 inline-block h-2 w-2 rounded-full bg-brand-500" />
                      {action}
                    </li>
                  ))}
                </ul>

                {priority.actions.length > 3 ? (
                  <details className="mt-3">
                    <summary className="cursor-pointer list-none text-xs font-semibold text-brand-700 marker:hidden">
                      + {priority.actions.length - 3} lineas de accion adicionales
                    </summary>
                    <ul className="mt-3 space-y-2 border-t border-slate-200 pt-3">
                      {priority.actions.slice(3).map((action) => (
                        <li key={action} className="flex items-start gap-2 text-sm leading-6 text-slate-700">
                          <span className="mt-1.5 inline-block h-2 w-2 rounded-full bg-brand-300" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : null}
              </div>

              <div className="rounded-[22px] border border-slate-100 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-400">
                  Metricas GEO
                </p>
                <ul className="mt-3 space-y-2">
                  {priority.metrics.slice(0, 2).map((metric) => (
                    <li key={metric} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                      <span className="mt-1.5 inline-block h-2 w-2 rounded-full bg-slate-300" />
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <a
              href={detailDocUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700 transition-colors hover:border-brand-300 hover:bg-brand-100"
            >
              Ver detalle
            </a>
          </article>
        ))}
      </div>
    </SlideShell>
  );
}
