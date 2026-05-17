import ReportHeader from "./components/ReportHeader";
import ExecutiveSummary from "./components/ExecutiveSummary";
import DiagnosisSection from "./components/DiagnosisSection";
import ActionPlan from "./components/ActionPlan";
import PresentationDeck from "./components/PresentationDeck";
import { reportMeta } from "./data";

export default function InformePageContent() {
  const slides = [
    { id: "portada", label: "Portada" },
    { id: "resumen", label: "Resumen" },
    { id: "diagnostico", label: "Diagnóstico" },
    { id: "plan", label: "Plan" },
  ];

  return (
    <PresentationDeck slides={slides} period={reportMeta.period}>
        <ReportHeader />
        <ExecutiveSummary />
        <DiagnosisSection />
        <ActionPlan />
    </PresentationDeck>
  );
}
