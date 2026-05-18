export const reportMeta = {
  title: "Informe Ejecutivo de Tecsup en Ecosistemas de IA",
  to: "Equipo Tecsup",
  from: "Equipo de Estrategia Digital",
  period: "",
  totalMentions: 19992,
};

export const topicMentions = [
  {
    topic: "Oferta académica",
    mentions: 11417,
    reading: "El interés principal se centra en qué pueden estudiar en Tecsup.",
  },
  {
    topic: "Costos y financiamiento",
    mentions: 10852,
    reading: "La viabilidad económica es el segundo factor de decisión más importante.",
  },
  {
    topic: "Infraestructura y tecnología",
    mentions: 8487,
    reading: "Nuestra tecnología y laboratorios son un diferenciador clave.",
  },
  {
    topic: "Empleabilidad y vinculación industrial",
    mentions: 8456,
    reading: "La promesa de un buen futuro laboral es un pilar de nuestra marca.",
  },
];

export const keyQuestions = [
  {
    question: "¿Qué tal es el Instituto Tecsup?",
    mentions: 10292,
    intent: "Búsqueda de reputación y validación.",
  },
  {
    question: "¿Cuánto cuesta estudiar en Tecsup?",
    mentions: 6733,
    intent: "Búsqueda de viabilidad y decisión económica.",
  },
  {
    question: "¿Cuál es el mejor instituto del Perú?",
    mentions: 2856,
    intent: "Búsqueda comparativa frente a la competencia.",
  },
];

export const sentimentData = [
  {
    concept: "Oferta académica",
    positive: 20.67,
    neutral: 75.71,
    negative: 3.62,
    reading: "Percepción positiva de nuestras carreras.",
    alert: false,
  },
  {
    concept: "Costos y financiamiento",
    positive: 2.63,
    neutral: 92.65,
    negative: 4.72,
    reading: "Este tema genera dudas e incertidumbre. La comunicación no está siendo lo suficientemente persuasiva.",
    alert: true,
  },
  {
    concept: "Empleabilidad",
    positive: 0.77,
    neutral: 14.65,
    negative: 7.71,
    reading: "A pesar de ser un pilar, la percepción de la empleabilidad no es tan positiva como debería.",
    alert: true,
  },
];

export const priorities = [
  {
    id: 1,
    title: "Hub de Costos, Pensiones, Becas y Financiamiento",
    color: "from-red-500 to-orange-500",
    badge: "Alta urgencia",
    badgeColor: "bg-red-100 text-red-700",
    objective:
      "Reducir la fricción en la etapa de decisión y aumentar la probabilidad de conversión, asegurando que los usuarios comprendan claramente el valor de estudiar en Tecsup.",
    actions: [
      "Cuánto cuesta estudiar en Tecsup",
      "Qué incluye la inversión",
      "Matrícula y pensiones",
      "Opciones de becas y descuentos",
      "Alternativas de financiamiento",
      "Retorno de inversión y empleabilidad",
    ],
    metrics: [
      "Incremento de menciones positivas en temas de costos (SEMrush AI)",
      "concept and sentiment → Concept Analysis",
      "Mayor presencia en prompts de conversión: costos, pensiones y becas",
      "concepts_aggregated → volumen total de menciones y sentimiento",
      "concept and sentiment → Concept Analysis",
    ],
  },
  {
    id: 2,
    title: "Cerrar brechas competitivas en carreras y categorías",
    color: "from-brand-500 to-brand-700",
    badge: "Estratégico",
    badgeColor: "bg-brand-100 text-brand-700",
    objective:
      "Aumentar la visibilidad y cobertura de Tecsup en los conceptos y carreras donde los competidores tienen mayor presencia.",
    actions: [
      "Computación, informática, redes y software",
      "Mecánica, mantenimiento y manufactura",
      "Electricidad, electrónica y automatización",
      "Mecatrónica e industria 4.0",
      "Minería, energía y operaciones industriales",
    ],
    metrics: [
      "Reducción de la brecha competitiva (concept_gap en SEMrush AI)",
      "Crecimiento en gráficos de conceptos y brechas competitivas",
      "Evolución de menciones y sentimiento por concepto",
      "Cambios en prompts de conversión",
    ],
  },
  {
    id: 3,
    title: "Reforzar entidades de confianza que las IA puedan citar",
    color: "from-brand-400 to-brand-600",
    badge: "Autoridad",
    badgeColor: "bg-brand-50 text-brand-700",
    objective:
      "Aumentar la autoridad percibida de Tecsup en respuestas generadas por IA y fortalecer las señales externas de confianza.",
    actions: [
      "Convertir acreditaciones en activos digitales verificables",
      "Publicar casos de éxito de empleabilidad con datos concretos",
      "Reforzar presencia en Reddit, Quora y foros especializados",
      "Fortalecer presencia en comunidades educativas y sitios de reseñas",
      "Ampliar diversidad de fuentes externas citables para IA",
    ],
    metrics: [
      "Incremento de menciones positivas y citaciones de Tecsup en IA",
      "Mayor presencia en prompts de reputación y comparación institucional",
      "Aumento de menciones en plataformas 2.0 (Reddit, Quora, foros)",
    ],
  },
  {
    id: 4,
    title: "Rediseñar el journey desde IA hasta conversión",
    color: "from-emerald-500 to-teal-500",
    badge: "Conversión",
    badgeColor: "bg-emerald-100 text-emerald-700",
    objective:
      "Llevar al usuario desde una respuesta de IA hasta una acción concreta de contacto, asesoría o postulación.",
    actions: [
      "Mapear cada intención de búsqueda hacia una página específica",
      "Incluir argumentos de confianza por etapa del journey",
      "Implementar CTAs alineados con la intención del usuario",
      "Crear páginas de destino para cada perfil de consulta en IA",
    ],
    metrics: [
      "Incremento de tráfico cualificado desde experiencias de IA",
      "Aumento del CTR hacia páginas estratégicas de Tecsup",
      "Crecimiento de leads desde consultas sobre costos, carreras y empleabilidad",
    ],
  },
  {
    id: 5,
    title: "Optimizar legibilidad para IA, LLM.txt y performance técnica",
    color: "from-amber-500 to-yellow-500",
    badge: "Técnico",
    badgeColor: "bg-amber-100 text-amber-700",
    objective:
      "Facilitar que los modelos de IA y Google entiendan, rastreen, indexen y recomienden correctamente las páginas estratégicas de Tecsup.",
    actions: [
      "Crear llm.txt con fuentes principales por intención de búsqueda",
      "Implementar análisis semántico por clúster y FAQs estructuradas",
      "Agregar schema markup en páginas educativas, institucionales y transaccionales",
      "Optimizar performance técnica: velocidad, renderizado e indexación",
      "Reforzar elegibilidad para Google AI Overviews",
    ],
    metrics: [
      "Aumento de visibilidad en AI Search y Google AI Overviews",
      "Incremento de citaciones mediante schema markup y contenido estructurado",
      "Mejora en indexación, rastreabilidad y performance técnica",
    ],
  },
];
