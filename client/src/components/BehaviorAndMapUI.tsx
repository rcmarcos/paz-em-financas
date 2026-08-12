import { useState, useEffect } from "react";
import { Brain, Check, Compass, Heart, Sparkles, Target, ShieldAlert, ArrowRight } from "lucide-react";
import { behavioralConcepts, personalValues, type BehavioralConcept } from "@/lib/behaviorMap";

export function BehaviorSection() {
  const [activeConcept, setActiveConcept] = useState<BehavioralConcept>(behavioralConcepts[0]);
  const [tracker, setTracker] = useState<Record<string, number[]>>(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(window.localStorage.getItem("atlas-experiment-trackers") || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem("atlas-experiment-trackers", JSON.stringify(tracker));
    } catch {}
  }, [tracker]);

  const conceptDays = tracker[activeConcept.id] || [];

  const toggleDay = (dayIndex: number) => {
    setTracker((prev) => {
      const currentDays = prev[activeConcept.id] || [];
      const nextDays = currentDays.includes(dayIndex)
        ? currentDays.filter((d) => d !== dayIndex)
        : [...currentDays, dayIndex].sort((a, b) => a - b);
      return { ...prev, [activeConcept.id]: nextDays };
    });
  };

  return (
    <section className="behavior-section" id="comportamento">
      <div className="behavior-container">
        <div className="behavior-header">
          <p className="overline"><span className="overline-dot" /> Psicologia e Vieses</p>
          <h2>Por que gastamos como gastamos?</h2>
          <p className="behavior-lead">
            O controle financeiro falha quando ignora a mente humana. Conhecer nossos vieses cognitivos e aplicar o essencialismo nos liberta da culpa e do esforço inútil.
          </p>
        </div>

        <div className="behavior-grid">
          <div className="concept-list">
            {behavioralConcepts.map((concept) => (
              <button
                type="button"
                key={concept.id}
                className={`concept-tab ${activeConcept.id === concept.id ? "is-active" : ""}`}
                onClick={() => setActiveConcept(concept)}
              >
                <Brain size={16} />
                <div className="concept-tab-info">
                  <strong>{concept.title}</strong>
                  <span>{concept.tag}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="concept-card-detail">
            <span className="concept-badge">{activeConcept.tag}</span>
            <h3>{activeConcept.title}</h3>
            <p className="concept-summary">{activeConcept.summary}</p>
            
            <div className="concept-block">
              <strong><ShieldAlert size={15} /> Como aparece no dia a dia:</strong>
              <p>{activeConcept.dailyImpact}</p>
            </div>

            <div className="concept-block">
              <strong><Sparkles size={15} /> Antidoto prático:</strong>
              <p>{activeConcept.antidote}</p>
            </div>

            <div className="experiment-box">
              <strong><Target size={15} /> Experimento de 7 dias (Rastreador visual):</strong>
              <p>{activeConcept.experiment}</p>
              <div className="experiment-days-row">
                {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                  const isDone = conceptDays.includes(day);
                  return (
                    <button
                      type="button"
                      key={day}
                      className={`experiment-day-chip ${isDone ? "completed" : ""}`}
                      onClick={() => toggleDay(day)}
                      title={`Marcar dia ${day} como concluído`}
                    >
                      <span>Dia {day}</span>
                      {isDone && <Check size={12} />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type PeaceScenario = {
  id: string;
  name: string;
  values: string[];
  goal: string;
};

const defaultScenarios: PeaceScenario[] = [
  {
    id: "default-1",
    name: "Trimestre 1: Tranquilidade & Reserva",
    values: ["tranquility", "family"],
    goal: "Criar reserva de 6 meses e eliminar gastos impulsivos com delivery."
  },
  {
    id: "default-2",
    name: "Trimestre 2: Liberdade & Autonomia",
    values: ["freedom"],
    goal: "Aumentar a taxa de poupança para 30% da renda líquida."
  }
];

export function PeaceMapSection() {
  const [scenarios, setScenarios] = useState<PeaceScenario[]>(() => {
    if (typeof window === "undefined") return defaultScenarios;
    try {
      const saved = window.localStorage.getItem("atlas-peace-scenarios");
      return saved ? JSON.parse(saved) : defaultScenarios;
    } catch {
      return defaultScenarios;
    }
  });

  const [activeScenarioId, setActiveScenarioId] = useState<string>(() => {
    if (typeof window === "undefined") return "default-1";
    return window.localStorage.getItem("atlas-peace-active-id") || "default-1";
  });

  const activeScenario = scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];

  useEffect(() => {
    try {
      window.localStorage.setItem("atlas-peace-scenarios", JSON.stringify(scenarios));
    } catch {}
  }, [scenarios]);

  useEffect(() => {
    try {
      window.localStorage.setItem("atlas-peace-active-id", activeScenarioId);
      // Sincronizar com chaves legadas para o PDF exportado
      window.localStorage.setItem("atlas-peace-values", JSON.stringify(activeScenario.values));
      window.localStorage.setItem("atlas-peace-goal", activeScenario.goal);
    } catch {}
  }, [activeScenarioId, activeScenario]);

  const updateActiveScenario = (updater: Partial<PeaceScenario>) => {
    setScenarios((prev) =>
      prev.map((sc) => (sc.id === activeScenarioId ? { ...sc, ...updater } : sc))
    );
  };

  const createNewScenario = () => {
    const newId = `scenario-${Date.now()}`;
    const newSc: PeaceScenario = {
      id: newId,
      name: `Novo Trimestre (${scenarios.length + 1})`,
      values: ["tranquility"],
      goal: "Defina sua meta para este novo ciclo..."
    };
    setScenarios([...scenarios, newSc]);
    setActiveScenarioId(newId);
  };

  const deleteScenario = (id: string) => {
    if (scenarios.length <= 1) return;
    const nextScenarios = scenarios.filter((s) => s.id !== id);
    setScenarios(nextScenarios);
    setActiveScenarioId(nextScenarios[0].id);
  };

  const toggleValue = (valueId: string) => {
    const current = activeScenario.values;
    const nextValues = current.includes(valueId)
      ? current.length > 1
        ? current.filter((v) => v !== valueId)
        : current
      : [...current, valueId];
    updateActiveScenario({ values: nextValues });
  };

  const activeValuesList = personalValues.filter((v) => activeScenario.values.includes(v.id));

  return (
    <section className="peace-map-section" id="mapa-paz">
      <div className="peace-container">
        <div className="peace-header">
          <div className="peace-header-topline">
            <p className="overline"><span className="overline-dot" /> Alinhamento de Vida</p>
            <div className="scenario-switcher">
              <select
                value={activeScenarioId}
                onChange={(e) => setActiveScenarioId(e.target.value)}
                aria-label="Selecionar cenário trimestral"
              >
                {scenarios.map((sc) => (
                  <option key={sc.id} value={sc.id}>{sc.name}</option>
                ))}
              </select>
              <button type="button" className="outline-button-small" onClick={createNewScenario}>
                + Novo Cenário
              </button>
            </div>
          </div>
          <h2>Mapa de Paz Financeira</h2>
          <p className="peace-lead">
            O dinheiro não é o fim, mas o meio. Conecte suas escolhas orçamentárias aos seus valores fundamentais para eliminar o esforço com o que não importa.
          </p>
        </div>

        <div className="peace-builder-grid">
          <div className="builder-col">
            <div className="scenario-name-row">
              <label htmlFor="scenario-name-input">Nome do Ciclo / Cenário:</label>
              <input
                id="scenario-name-input"
                type="text"
                value={activeScenario.name}
                onChange={(e) => updateActiveScenario({ name: e.target.value })}
              />
              {scenarios.length > 1 && (
                <button type="button" className="text-button-danger" onClick={() => deleteScenario(activeScenario.id)}>
                  Excluir ciclo
                </button>
              )}
            </div>

            <h3>1. Escolha seus valores principais (até 3):</h3>
            <div className="values-selection-grid">
              {personalValues.map((val) => {
                const isSelected = activeScenario.values.includes(val.id);
                return (
                  <button
                    type="button"
                    key={val.id}
                    className={`value-option-card ${isSelected ? "is-selected" : ""}`}
                    onClick={() => toggleValue(val.id)}
                  >
                    <div className="value-option-top">
                      <Heart size={16} />
                      <div className={`checkbox-mark ${isSelected ? "checked" : ""}`}>
                        {isSelected && <Check size={12} />}
                      </div>
                    </div>
                    <strong>{val.name}</strong>
                    <p>{val.description}</p>
                  </button>
                );
              })}
            </div>

            <div className="goal-input-wrap">
              <label htmlFor="custom-goal-input">2. Qual é a sua prioridade prática para este trimestre?</label>
              <input
                id="custom-goal-input"
                type="text"
                value={activeScenario.goal}
                onChange={(e) => updateActiveScenario({ goal: e.target.value })}
                placeholder="Ex: Quitar cartão e iniciar reserva..."
              />
            </div>
          </div>

          <div className="summary-col">
            <div className="peace-summary-card">
              <div className="summary-card-header">
                <Compass size={20} />
                <span>Sua bússola financeira ({activeScenario.name})</span>
              </div>
              
              <div className="summary-block">
                <strong>Valores guiando suas decisões:</strong>
                <ul>
                  {activeValuesList.map((v) => (
                    <li key={v.id}>
                      <strong>{v.name}:</strong> {v.suggestedFocus}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="summary-block">
                <strong>Prioridade trimestre:</strong>
                <p className="target-goal-text">“{activeScenario.goal || "Defina sua prioridade ao lado..."}”</p>
              </div>

              <div className="summary-footer-note">
                <Sparkles size={15} />
                <span>Este mapa é salvo automaticamente no seu navegador e incluído no relatório PDF.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
