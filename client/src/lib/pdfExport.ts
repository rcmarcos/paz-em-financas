import { jsPDF } from "jspdf";
import { budgetMethodLabels, type BudgetMethod } from "@/lib/budget";
import { entries } from "@/lib/catalog";
import { practicalGuides } from "@/lib/guides";
import { personalValues } from "@/lib/behaviorMap";

type StoredCalculatorResult = {
  income: number;
  method: BudgetMethod;
  allocations: { label: string; percentage: number; amount: number }[];
  emergencyFund?: {
    essentialExpenses: number;
    months: number;
    currentReserve: number;
    monthlyContribution: number;
    targetAmount: number;
    remainingAmount: number;
    progressPercentage: number;
    monthsToGoal: number | null;
  };
};

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const readStorage = <T,>(key: string, fallback: T): T => {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) as T : fallback;
  } catch {
    return fallback;
  }
};

export const exportPersonalReport = () => {
  if (typeof window === "undefined") return;

  const favoriteIds = readStorage<string[]>("atlas-favorites", []);
  const checklist = readStorage<Record<string, boolean>>("atlas-checklists", {});
  const calculator = readStorage<StoredCalculatorResult | null>("atlas-calculator-result", null);
  const peaceValuesIds = readStorage<string[]>("atlas-peace-values", ["tranquility"]);
  const peaceGoal = window.localStorage.getItem("atlas-peace-goal") || "Criar reserva de 6 meses e eliminar gastos impulsivos com delivery.";
  
  const favoriteEntries = entries.filter(entry => favoriteIds.includes(entry.id));
  const activeValues = personalValues.filter(v => peaceValuesIds.includes(v.id));

  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 54;

  const ensureSpace = (height = 22) => {
    if (y + height > pageHeight - 48) {
      doc.addPage();
      y = 54;
    }
  };

  const paragraph = (text: string, size = 10, color: [number, number, number] = [82, 99, 89]) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(size);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, pageWidth - 108);
    ensureSpace(lines.length * 14 + 8);
    doc.text(lines, 54, y);
    y += lines.length * 14 + 8;
  };

  const heading = (text: string) => {
    ensureSpace(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(27, 74, 64);
    doc.text(text, 54, y);
    y += 22;
  };

  // Header banner
  doc.setFillColor(27, 74, 64);
  doc.rect(0, 0, pageWidth, 6, "F");
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(27, 74, 64);
  doc.text("Paz em Finanças", 54, y);
  y += 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(196, 90, 59);
  doc.text("Plano de Vida e Orçamento Alinhado", 54, y);
  y += 22;

  paragraph(`Relatório gerado em ${new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(new Date())}. Baseado na filosofia estoica, no essencialismo e nas finanças comportamentais.`, 9, [120, 132, 123]);
  y += 6;

  heading("Mapa de Paz Financeira & Valores");
  paragraph(`Prioridade prática no trimestre: “${peaceGoal}”`, 10);
  if (activeValues.length > 0) {
    paragraph("Valores norteadores selecionados:", 10);
    activeValues.forEach(val => paragraph(`• ${val.name}: ${val.description}`, 9));
  }
  y += 6;

  heading("Simulação de Orçamento");
  if (calculator) {
    paragraph(`Método: ${budgetMethodLabels[calculator.method]} | Renda Líquida: ${currency.format(calculator.income)}`, 10);
    calculator.allocations.forEach(allocation => paragraph(`• ${allocation.label}: ${allocation.percentage}% — ${currency.format(allocation.amount)}`, 10));
  } else {
    paragraph("Nenhuma simulação salva ainda. Visite a calculadora para criar seu cenário.", 10);
  }
  y += 6;

  heading("Reserva de Emergência");
  if (calculator?.emergencyFund) {
    const goal = calculator.emergencyFund;
    const deadline = goal.monthsToGoal === null ? "prazo não definido" : goal.monthsToGoal === 0 ? "meta alcançada" : `${goal.monthsToGoal} meses`;
    paragraph(`Alvo de ${goal.months} meses de despesas essenciais: ${currency.format(goal.targetAmount)}`, 10);
    paragraph(`Progresso atual: ${currency.format(goal.currentReserve)} (${goal.progressPercentage}% concluído). Falta ${currency.format(goal.remainingAmount)}.`, 10);
    paragraph(`Aporte mensal: ${currency.format(goal.monthlyContribution)} | Prazo estimado: ${deadline}`, 10);
  } else {
    paragraph("Nenhuma meta de reserva salva ainda.", 10);
  }
  y += 6;

  heading("Metodologias Favoritas");
  if (favoriteEntries.length > 0) {
    favoriteEntries.forEach(entry => paragraph(`• ${entry.name} (${entry.kind}): ${entry.summary}`, 10));
  } else {
    paragraph("Nenhuma metodologia marcada como favorita.", 10);
  }
  y += 6;

  heading("Progresso nos Guias Práticos");
  const completedSteps = Object.values(checklist).filter(Boolean).length;
  paragraph(`Passos concluídos e marcados nos guias: ${completedSteps}`, 10);

  ensureSpace(40);
  doc.setDrawColor(226, 221, 209);
  doc.line(54, y, pageWidth - 54, y);
  y += 18;
  paragraph("Este plano é um guia pessoal de clareza e alinhamento. Ajuste os números no seu ritmo e sem julgamento.", 9, [120, 132, 123]);

  doc.save("paz-em-financas-meu-plano.pdf");
};
