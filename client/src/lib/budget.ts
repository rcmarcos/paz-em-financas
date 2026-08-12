export type BudgetMethod = "503020" | "conscious-spending" | "pay-yourself";

export type BudgetAllocation = {
  label: string;
  percentage: number;
  amount: number;
  description: string;
  tone: "green" | "terracotta" | "ochre" | "blue";
};

const methodAllocations: Record<BudgetMethod, Omit<BudgetAllocation, "amount">[]> = {
  "503020": [
    { label: "Necessidades", percentage: 50, description: "Moradia, contas, alimentação básica e transporte.", tone: "green" },
    { label: "Desejos", percentage: 30, description: "Lazer, restaurantes, assinaturas e compras pessoais.", tone: "terracotta" },
    { label: "Prioridades e futuro", percentage: 20, description: "Reserva de emergência, metas e investimentos.", tone: "ochre" },
  ],
  "conscious-spending": [
    { label: "Custos fixos", percentage: 55, description: "Moradia, contas essenciais, transporte e dívidas.", tone: "green" },
    { label: "Investimentos", percentage: 10, description: "Aportes para aposentadoria e construção de patrimônio.", tone: "blue" },
    { label: "Economias de curto prazo", percentage: 10, description: "Viagens, grandes compras e objetivos próximos.", tone: "ochre" },
    { label: "Gastos sem culpa", percentage: 25, description: "Lazer e prazeres que fazem sentido para você.", tone: "terracotta" },
  ],
  "pay-yourself": [
    { label: "Pague-se primeiro", percentage: 10, description: "Transferência automática para a sua prioridade financeira.", tone: "blue" },
    { label: "Contas e necessidades", percentage: 60, description: "Custos essenciais e compromissos do mês.", tone: "green" },
    { label: "Estilo de vida", percentage: 30, description: "Desejos, lazer e gastos pessoais com limite claro.", tone: "terracotta" },
  ],
};

export const calculateBudget = (income: number, method: BudgetMethod): BudgetAllocation[] => {
  const safeIncome = Number.isFinite(income) && income > 0 ? income : 0;
  return methodAllocations[method].map((allocation) => ({
    ...allocation,
    amount: Math.round((safeIncome * allocation.percentage) / 100 * 100) / 100,
  }));
};

export type EmergencyFundGoal = {
  essentialExpenses: number;
  months: number;
  currentReserve: number;
  monthlyContribution: number;
  targetAmount: number;
  remainingAmount: number;
  progressPercentage: number;
  monthsToGoal: number | null;
};

export const calculateEmergencyFund = (
  essentialExpenses: number,
  months: number,
  currentReserve: number,
  monthlyContribution: number,
): EmergencyFundGoal => {
  const safeExpenses = Number.isFinite(essentialExpenses) && essentialExpenses > 0 ? essentialExpenses : 0;
  const safeMonths = Number.isFinite(months) && months > 0 ? months : 0;
  const safeCurrent = Number.isFinite(currentReserve) && currentReserve > 0 ? currentReserve : 0;
  const safeContribution = Number.isFinite(monthlyContribution) && monthlyContribution > 0 ? monthlyContribution : 0;
  const targetAmount = Math.round(safeExpenses * safeMonths * 100) / 100;
  const remainingAmount = Math.max(0, Math.round((targetAmount - safeCurrent) * 100) / 100);
  const progressPercentage = targetAmount > 0 ? Math.min(100, Math.round((safeCurrent / targetAmount) * 1000) / 10) : 0;
  const monthsToGoal = remainingAmount === 0 ? 0 : safeContribution > 0 ? Math.ceil(remainingAmount / safeContribution) : null;

  return {
    essentialExpenses: safeExpenses,
    months: safeMonths,
    currentReserve: safeCurrent,
    monthlyContribution: safeContribution,
    targetAmount,
    remainingAmount,
    progressPercentage,
    monthsToGoal,
  };
};

export const budgetMethodLabels: Record<BudgetMethod, string> = {
  "503020": "Regra 50/30/20",
  "conscious-spending": "Conscious Spending Plan",
  "pay-yourself": "Pague-se Primeiro",
};
