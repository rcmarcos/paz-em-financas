import { jsPDF } from "jspdf";
import { budgetMethodLabels, type BudgetMethod } from "@/lib/budget";
import { entries } from "@/lib/catalog";
import { practicalGuides } from "@/lib/guides";

type StoredCalculatorResult = {
  income: number;
  method: BudgetMethod;
  allocations: { label: string; percentage: number; amount: number }[];
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
  const favoriteEntries = entries.filter(entry => favoriteIds.includes(entry.id));
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
    doc.setFontSize(15);
    doc.setTextColor(27, 74, 64);
    doc.text(text, 54, y);
    y += 24;
  };

  doc.setFillColor(27, 74, 64);
  doc.rect(0, 0, pageWidth, 22, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(27, 74, 64);
  doc.text("Guia Comparativo", 54, y);
  y += 20;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(196, 90, 59);
  doc.text("Meu plano de organização financeira", 54, y);
  y += 24;
  paragraph(`Relatório gerado em ${new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(new Date())}. Os dados foram lidos apenas do navegador deste dispositivo.`, 9, [120, 132, 123]);

  heading("Minha simulação de orçamento");
  if (calculator) {
    paragraph(`${budgetMethodLabels[calculator.method]} com renda líquida mensal de ${currency.format(calculator.income)}.`, 10, [82, 99, 89]);
    calculator.allocations.forEach(allocation => paragraph(`${allocation.label}: ${allocation.percentage}% — ${currency.format(allocation.amount)}`, 10));
  } else {
    paragraph("Nenhuma simulação foi salva ainda. Visite a calculadora no portal para criar seu primeiro cenário.", 10);
  }
  y += 5;

  heading("Metodologias favoritas");
  if (favoriteEntries.length > 0) {
    favoriteEntries.forEach(entry => paragraph(`${entry.name} — ${entry.kind}. ${entry.summary}`, 10));
  } else {
    paragraph("Nenhuma metodologia foi salva como favorita ainda. Use o ícone de estrela nas fichas do acervo.", 10);
  }
  y += 5;

  heading("Progresso dos guias práticos");
  practicalGuides.forEach(guide => {
    const completed = guide.steps.filter((_, index) => checklist[`${guide.id}-${index}`]).length;
    if (completed > 0) {
      paragraph(`${guide.title}: ${completed} de ${guide.steps.length} passos concluídos.`, 10);
    }
  });
  if (!Object.values(checklist).some(Boolean)) {
    paragraph("Nenhum passo foi marcado ainda. Abra um guia prático e use o checklist para acompanhar a implementação.", 10);
  }

  ensureSpace(40);
  doc.setDrawColor(226, 221, 209);
  doc.line(54, y, pageWidth - 54, y);
  y += 20;
  paragraph("Este relatório é um registro pessoal de organização. Adapte os percentuais e passos à sua realidade e confirme informações diretamente nas fontes oficiais.", 9, [120, 132, 123]);
  doc.save("meu-plano-financeiro.pdf");
};
