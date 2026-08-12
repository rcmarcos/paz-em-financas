import { describe, expect, it } from "vitest";
import { entries, getAutomationLevel, getEffortLevel, recommendEntries } from "./catalog";

describe("catálogo comparativo", () => {
  it("inclui as dez fichas internacionais novas", () => {
    expect(entries).toHaveLength(23);
    expect(entries.filter((entry) => entry.region === "Internacional")).toHaveLength(13);
  });

  it("normaliza os níveis de esforço e automação para os filtros", () => {
    expect(getEffortLevel("Baixo a médio")).toBe("Baixo");
    expect(getEffortLevel("Alto")).toBe("Alto");
    expect(getAutomationLevel("Manual ou assistida")).toBe("Assistida");
    expect(getAutomationLevel("Assistida ou alta")).toBe("Alta");
  });

  it("retorna opções diferentes para objetivos e perfis diferentes", () => {
    const beginner = recommendEntries({ profile: "iniciantes", goal: "quitar-dividas", effort: "baixa-manutenção", automation: "alta-automacao" });
    const detail = recommendEntries({ profile: "detalhista", goal: "patrimonio", effort: "media-manutencao", automation: "assistida" });

    expect(beginner.length).toBeGreaterThan(0);
    expect(detail.length).toBeGreaterThan(0);
    expect(beginner[0]?.id).not.toBe(detail[0]?.id);
    expect(beginner.length).toBeLessThanOrEqual(3);
  });
});
