import { useEffect, useMemo, useState } from "react";
import { Calculator, CircleHelp, ShieldCheck } from "lucide-react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { budgetMethodLabels, calculateBudget, calculateEmergencyFund, type BudgetMethod } from "@/lib/budget";

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const toNumber = (value: string) => Number(value.replace(/\./g, "").replace(",", ".")) || 0;

export default function BudgetCalculator() {
  const [income, setIncome] = useState("5000");
  const [method, setMethod] = useState<BudgetMethod>("503020");
  const [reserveMonths, setReserveMonths] = useState("6");
  const [essentialExpenses, setEssentialExpenses] = useState("2500");
  const [currentReserve, setCurrentReserve] = useState("0");
  const [monthlyContribution, setMonthlyContribution] = useState("500");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const numericIncome = toNumber(income);
  const allocations = useMemo(() => calculateBudget(numericIncome, method), [method, numericIncome]);
  const emergencyFund = useMemo(() => calculateEmergencyFund(
    toNumber(essentialExpenses),
    toNumber(reserveMonths),
    toNumber(currentReserve),
    toNumber(monthlyContribution),
  ), [currentReserve, essentialExpenses, monthlyContribution, reserveMonths]);
  const chartData = allocations.map((allocation) => ({ ...allocation, value: allocation.amount }));
  const chartColors = { green: "#2d7860", terracotta: "#c45a3b", ochre: "#b88b3d", blue: "#527a8b" } as const;

  useEffect(() => {
    window.localStorage.setItem("atlas-calculator-result", JSON.stringify({ income: numericIncome, method, allocations, emergencyFund }));
  }, [allocations, emergencyFund, method, numericIncome]);

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
          <div className="emergency-goal-form">
            <div className="emergency-goal-heading"><div><ShieldCheck size={16} /><strong>Meta de reserva de emergência</strong></div><span>Defina um alvo realista</span></div>
            <p className="emergency-goal-copy">A meta combina suas despesas essenciais com o número de meses que você quer proteger.</p>
            <div className="emergency-goal-fields">
              <label>Despesas essenciais mensais<input inputMode="decimal" value={essentialExpenses} onChange={(event) => setEssentialExpenses(event.target.value)} aria-label="Despesas essenciais mensais" /></label>
              <label>Meses de proteção<input inputMode="decimal" value={reserveMonths} onChange={(event) => setReserveMonths(event.target.value)} aria-label="Meses de proteção" /></label>
              <label>Reserva já acumulada<input inputMode="decimal" value={currentReserve} onChange={(event) => setCurrentReserve(event.target.value)} aria-label="Reserva já acumulada" /></label>
              <label>Aporte mensal planejado<input inputMode="decimal" value={monthlyContribution} onChange={(event) => setMonthlyContribution(event.target.value)} aria-label="Aporte mensal planejado" /></label>
            </div>
          </div>
        </div>
        <div className="calculator-results">
          <div className="calculator-results-heading"><span>Projeção mensal</span><strong>{currency.format(numericIncome)}</strong></div>
          <div className="allocation-list">{allocations.map((allocation) => <div className="allocation-item" key={allocation.label}><div className="allocation-heading"><div><span className={`allocation-dot allocation-${allocation.tone}`} /> <strong>{allocation.label}</strong></div><strong>{currency.format(allocation.amount)}</strong></div><div className="allocation-track"><div className={`allocation-bar allocation-${allocation.tone}`} style={{ width: `${allocation.percentage}%` }} /></div><div className="allocation-meta"><span>{allocation.percentage}% da renda</span><span>{allocation.description}</span></div></div>)}</div>
          <div className="calculator-chart-block"><div className="calculator-chart-heading"><span>Visualização da distribuição</span><small>Passe o cursor sobre cada fatia</small></div><div className="calculator-chart"><ResponsiveContainer width="100%" height={220}><PieChart><Pie data={chartData} dataKey="value" nameKey="label" cx="50%" cy="48%" innerRadius={58} outerRadius={82} paddingAngle={3} onMouseEnter={(_, index) => setActiveIndex(index)} onMouseLeave={() => setActiveIndex(null)}>{chartData.map((entry, index) => <Cell key={entry.label} fill={chartColors[entry.tone]} opacity={activeIndex === null || activeIndex === index ? 1 : .42} stroke="#fffdf8" strokeWidth={2} />)}</Pie><Tooltip formatter={(value: number, name: string) => [currency.format(value), name]} contentStyle={{ border: "1px solid #dbe3d6", borderRadius: 0, background: "#fffdf8", color: "#1b4a40", fontSize: 11 }} /><Legend iconType="circle" wrapperStyle={{ fontSize: 10, color: "#657169" }} /></PieChart></ResponsiveContainer></div></div>
          <div className="calculator-total"><Calculator size={15} /><span>Distribuição calculada</span><strong>{currency.format(allocations.reduce((sum, item) => sum + item.amount, 0))}</strong></div>
          <div className="emergency-goal-summary">
            <div className="emergency-goal-summary-heading"><div><ShieldCheck size={17} /><strong>Sua meta de proteção</strong></div><span>{emergencyFund.progressPercentage}% concluída</span></div>
            <div className="emergency-progress-track"><div className="emergency-progress-bar" style={{ width: `${emergencyFund.progressPercentage}%` }} /></div>
            <div className="emergency-goal-metrics"><div><span>Alvo total</span><strong>{currency.format(emergencyFund.targetAmount)}</strong></div><div><span>Falta acumular</span><strong>{currency.format(emergencyFund.remainingAmount)}</strong></div><div><span>Prazo estimado</span><strong>{emergencyFund.monthsToGoal === null ? "Defina um aporte" : emergencyFund.monthsToGoal === 0 ? "Meta alcançada" : `${emergencyFund.monthsToGoal} ${emergencyFund.monthsToGoal === 1 ? "mês" : "meses"}`}</strong></div></div>
            <p>Com {emergencyFund.months} {emergencyFund.months === 1 ? "mês" : "meses"} de despesas protegidas e aporte mensal de {currency.format(emergencyFund.monthlyContribution)}.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
