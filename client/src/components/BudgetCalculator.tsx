import { useMemo, useState } from "react";
import { Calculator, CircleHelp } from "lucide-react";
import { budgetMethodLabels, calculateBudget, type BudgetMethod } from "@/lib/budget";

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export default function BudgetCalculator() {
  const [income, setIncome] = useState("5000");
  const [method, setMethod] = useState<BudgetMethod>("503020");
  const numericIncome = Number(income.replace(",", ".")) || 0;
  const allocations = useMemo(() => calculateBudget(numericIncome, method), [method, numericIncome]);

  return (
    <section className="calculator-section" id="calculadora">
      <div className="calculator-intro">
        <p className="overline"><span className="overline-dot" /> Simule antes de começar</p>
        <h2>Quanto cabe em cada escolha?</h2>
        <p>Informe sua renda líquida mensal e escolha uma abordagem para visualizar uma primeira divisão de gastos. Use o resultado como ponto de partida, não como regra rígida.</p>
        <div className="calculator-note"><CircleHelp size={15} /> A simulação não substitui uma análise completa das suas despesas e prioridades.</div>
      </div>
      <div className="calculator-card">
        <div className="calculator-controls">
          <label className="calculator-label" htmlFor="income-input">Sua renda líquida mensal</label>
          <div className="calculator-input-wrap"><span>R$</span><input id="income-input" inputMode="decimal" value={income} onChange={(event) => setIncome(event.target.value)} placeholder="5000" /></div>
          <label className="calculator-label" htmlFor="method-select">Escolha uma abordagem</label>
          <select id="method-select" value={method} onChange={(event) => setMethod(event.target.value as BudgetMethod)}>{Object.entries(budgetMethodLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select>
        </div>
        <div className="calculator-results">
          <div className="calculator-results-heading"><span>Projeção mensal</span><strong>{currency.format(numericIncome)}</strong></div>
          <div className="allocation-list">{allocations.map((allocation) => <div className="allocation-item" key={allocation.label}><div className="allocation-heading"><div><span className={`allocation-dot allocation-${allocation.tone}`} /> <strong>{allocation.label}</strong></div><strong>{currency.format(allocation.amount)}</strong></div><div className="allocation-track"><div className={`allocation-bar allocation-${allocation.tone}`} style={{ width: `${allocation.percentage}%` }} /></div><div className="allocation-meta"><span>{allocation.percentage}% da renda</span><span>{allocation.description}</span></div></div>)}</div>
          <div className="calculator-total"><Calculator size={15} /><span>Distribuição calculada</span><strong>{currency.format(allocations.reduce((sum, item) => sum + item.amount, 0))}</strong></div>
        </div>
      </div>
    </section>
  );
}
