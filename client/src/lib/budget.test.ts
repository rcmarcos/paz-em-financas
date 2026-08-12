import { describe, expect, it } from "vitest";
import { calculateBudget, calculateEmergencyFund } from "./budget";

describe("calculadora de orçamento", () => {
  it("divide a renda na regra 50/30/20", () => {
    const result = calculateBudget(5000, "503020");
    expect(result.map(item => item.amount)).toEqual([2500, 1500, 1000]);
    expect(result.reduce((sum, item) => sum + item.percentage, 0)).toBe(100);
  });

  it("calcula valores para a abordagem Conscious Spending", () => {
    const result = calculateBudget(10000, "conscious-spending");
    expect(result.find(item => item.label === "Custos fixos")?.amount).toBe(5500);
    expect(result.find(item => item.label === "Gastos sem culpa")?.amount).toBe(2500);
  });

  it("trata renda inválida como zero sem quebrar a interface", () => {
    expect(calculateBudget(-100, "pay-yourself").every(item => item.amount === 0)).toBe(true);
  });

  it("calcula alvo, progresso e prazo da reserva de emergência", () => {
    const result = calculateEmergencyFund(2500, 6, 3000, 500);
    expect(result.targetAmount).toBe(15000);
    expect(result.remainingAmount).toBe(12000);
    expect(result.progressPercentage).toBe(20);
    expect(result.monthsToGoal).toBe(24);
  });

  it("marca a meta como alcançada quando a reserva atual cobre o alvo", () => {
    const result = calculateEmergencyFund(2000, 3, 7000, 0);
    expect(result.targetAmount).toBe(6000);
    expect(result.remainingAmount).toBe(0);
    expect(result.progressPercentage).toBe(100);
    expect(result.monthsToGoal).toBe(0);
  });
});
