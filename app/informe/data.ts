export const reportMeta = {
  title: "Informe Ejecutivo de Tecsup en Ecosistemas de IA",
  to: "Equipo Tecsup",
  from: "Equipo de Estrategia Digital",
  period: "",
  totalMentions: 19992,
};

export const topicMentions = [
  {
    topic: "Oferta academica",
    mentions: 11417,
    reading: "El interes principal se centra en que pueden estudiar en Tecsup.",
  },
  {
    topic: "Costos y financiamiento",
    mentions: 10852,
    reading: "La viabilidad economica es el segundo factor de decision mas importante.",
  },
  {
    topic: "Infraestructura y tecnologia",
    mentions: 8487,
    reading: "Nuestra tecnologia y laboratorios son un diferenciador clave.",
  },
  {
    topic: "Empleabilidad y vinculacion industrial",
    mentions: 8456,
    reading: "La promesa de un buen futuro laboral es un pilar de nuestra marca.",
  },
];

export const keyQuestions = [
  {
    question: "Que tal es el Instituto Tecsup?",
    mentions: 10292,
    intent: "Busqueda de reputacion y validacion.",
  },
  {
    question: "Cuanto cuesta estudiar en Tecsup?",
    mentions: 6733,
    intent: "Busqueda de viabilidad y decision economica.",
  },
  {
    question: "Cual es el mejor instituto del Peru?",
    mentions: 2856,
    intent: "Busqueda comparativa frente a la competencia.",
  },
];

export const sentimentData = [
  {
    concept: "Oferta academica",
    positive: 20.67,
    neutral: 75.71,
    negative: 3.62,
    reading: "Percepcion positiva de nuestras carreras.",
    alert: false,
  },
  {
    concept: "Costos y financiamiento",
    positive: 2.63,
    neutral: 92.65,
    negative: 4.72,
    reading: "Este tema genera dudas e incertidumbre. La comunicacion no esta siendo lo suficientemente persuasiva.",
    alert: true,
  },
  {
    concept: "Empleabilidad",
    positive: 0.77,
    neutral: 14.65,
    negative: 7.71,
    reading: "A pesar de ser un pilar, la percepcion de la empleabilidad no es tan positiva como deberia.",
    alert: true,
  },
];

export const priorities = [
  {
    id: 1,
    title: "Optimizar legibilidad para IA, LLM.txt y performance tecnica",
    color: "from-amber-500 to-yellow-500",
    badge: "Tecnico",
    badgeColor: "bg-amber-100 text-amber-700",
    objective:
      "Facilitar que los modelos de IA y Google entiendan, rastreen, indexen y recomienden correctamente las paginas estrategicas de Tecsup.",
    actions: [
      "Crear llm.txt con fuentes principales por intencion de busqueda",
      "Implementar analisis semantico por cluster y FAQs estructuradas",
      "Agregar schema markup en paginas educativas, institucionales y transaccionales",
      "Optimizar performance tecnica: velocidad, renderizado e indexacion",
      "Reforzar elegibilidad para Google AI Overviews",
    ],
    metrics: [
      "Aumento de visibilidad en AI Search y Google AI Overviews, visible en Overview",
      "Incremento de citaciones mediante schema markup y contenido estructurado, visible en Prompt Tracking -> Sources -> Reddit Overview",
      "Mejora en indexacion, rastreabilidad y performance tecnica",
    ],
  },
  {
    id: 2,
    title: "Hub de Costos, Pensiones, Becas y Financiamiento",
    color: "from-red-500 to-orange-500",
    badge: "Alta urgencia",
    badgeColor: "bg-red-100 text-red-700",
    objective:
      "Reducir la friccion en la etapa de decision y aumentar la probabilidad de conversion, asegurando que los usuarios comprendan claramente el valor de estudiar en Tecsup.",
    actions: [
      "Crear pagina principal de costos y pensiones",
      "Agregar bloques de costos en cada carrera priorizada",
      "Crear seccion de becas, descuentos y financiamiento",
      "Incluir FAQs para IA sobre costos y financiamiento",
      "Integrar la informacion para que la IA la cite correctamente",
    ],
    metrics: [
      "Incremento de menciones positivas en temas de costos (SEMrush AI)",
      "Concept and sentiment -> Concept Analysis",
      "Mayor presencia en prompts de conversion: costos, pensiones y becas",
      "Concepts aggregated -> volumen total de menciones y sentimiento",
      "Concept and sentiment -> Concept Analysis",
    ],
  },
  {
    id: 3,
    title: "Cerrar brechas competitivas en carreras y categorias",
    color: "from-brand-500 to-brand-700",
    badge: "Estrategico",
    badgeColor: "bg-brand-100 text-brand-700",
    objective:
      "Aumentar la visibilidad y cobertura de Tecsup en los conceptos y carreras donde los competidores tienen mayor presencia.",
    actions: [
      "Crear clusters de contenido por carrera y area tecnica",
      "Desarrollar pagina pilar + paginas de apoyo por carrera",
      "Incluir informacion completa: duracion, malla, campo laboral, costos, laboratorios, acreditaciones, sedes, modalidades, empleabilidad, convenios",
      "Optimizar las paginas para que las IA generen respuestas claras y comparativas",
    ],
    metrics: [
      "Reduccion de la brecha competitiva (concept and sentiment en SEMrush AI)",
      "Crecimiento en graficos de conceptos y brechas competitivas",
      "Evolucion de menciones y sentimiento por concepto",
      "Cambios en prompts de conversion",
    ],
  },
  {
    id: 4,
    title: "Reforzar entidades de confianza que las IA puedan citar",
    color: "from-brand-400 to-brand-600",
    badge: "Autoridad",
    badgeColor: "bg-brand-50 text-brand-700",
    objective:
      "Aumentar la autoridad percibida de Tecsup en respuestas generadas por IA y fortalecer las senales externas de confianza.",
    actions: [
      "Transformar acreditaciones, empleabilidad, laboratorios, convenios y casos de exito en activos digitales citables",
      "Reforzar presencia en Reddit, Quora, foros, comunidades educativas y sitios de resenas",
      "Garantizar que IA pueda usar estas fuentes externas para responder consultas con autoridad",
    ],
    metrics: [
      "Incremento de menciones positivas y citaciones de Tecsup en IA",
      "Mayor presencia en prompts de reputacion y comparacion institucional",
      "Aumento de menciones en plataformas 2.0 (Reddit, Quora, foros)",
    ],
  },
  {
    id: 5,
    title: "Redisenar el journey desde IA hasta conversion",
    color: "from-emerald-500 to-teal-500",
    badge: "Conversion",
    badgeColor: "bg-emerald-100 text-emerald-700",
    objective:
      "Llevar al usuario desde una respuesta de IA hasta una accion concreta de contacto, asesoria o postulacion.",
    actions: [
      "Mapear consultas de IA a paginas especificas segun intencion",
      "Crear CTAs claros y personalizados por etapa del journey",
      "Agregar modulos reutilizables en paginas de carrera: costos, becas, malla, empleabilidad, laboratorios, preguntas frecuentes",
      "Medir leads desde experiencias IA y ajustar recorrido hacia la conversion",
    ],
    metrics: [
      "Incremento de trafico cualificado desde experiencias de IA",
      "Aumento del CTR hacia paginas estrategicas de Tecsup",
      "Crecimiento de leads desde consultas sobre costos, carreras y empleabilidad",
    ],
  },
];
