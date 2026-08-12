import { useState, useEffect } from "react";
import { Brain, Check, Compass, Heart, Sparkles, Target, ShieldAlert, ArrowRight } from "lucide-react";
import { behavioralConcepts, personalValues, type BehavioralConcept } from "@/lib/behaviorMap";

export function BehaviorSection() {
  const [activeConcept, setActiveConcept] = useState<BehavioralConcept>(behavioralConcepts[0]);

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
              <strong><Target size={15} /> Experimento de 7 dias:</strong>
              <p>{activeConcept.experiment}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PeaceMapSection() {
  const [selectedValues, setSelectedValues] = useState<string[]>(() => {
    if (typeof window === "undefined") return ["tranquility"];
    try {
      return JSON.parse(window.localStorage.getItem("atlas-peace-values") || '["tranquility"]');
    } catch {
      return ["tranquility"];
    }
  });

  const [customGoal, setCustomGoal] = useState(() => {
    if (typeof window === "undefined") return "Criar reserva de 6 meses e eliminar gastos impulsivos com delivery.";
    return window.localStorage.getItem("atlas-peace-goal") || "Criar reserva de 6 meses e eliminar gastos impulsivos com delivery.";
  });

  useEffect(() => {
    window.localStorage.setItem("atlas-peace-values", JSON.stringify(selectedValues));
  }, [selectedValues]);

  useEffect(() => {
    window.localStorage.setItem("atlas-peace-goal", customGoal);
  }, [customGoal]);

  const toggleValue = (id: string) => {
    setSelectedValues((current) =>
      current.includes(id) ? (current.length > 1 ? current.filter((v) => v !== id) : current) : [...current, id]
    );
  };

  const activeValuesList = personalValues.filter((v) => selectedValues.includes(v.id));

  return (
    <section className="peace-map-section" id="mapa-paz">
      <div className="peace-container">
        <div className="peace-header">
          <p className="overline"><span className="overline-dot" /> Alinhamento de Vida</p>
          <h2>Mapa de Paz Financeira</h2>
          <p className="peace-lead">
            O dinheiro não é o fim, mas o meio. Conecte suas escolhas orçamentárias aos seus valores fundamentais para eliminar o esforço com o que não importa.
          </p>
        </div>

        <div className="peace-builder-grid">
          <div className="builder-col">
            <h3>1. Escolha seus valores principais (até 3):</h3>
            <div className="values-selection-grid">
              {personalValues.map((val) => {
                const isSelected = selectedValues.includes(val.id);
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
                value={customGoal}
                onChange={(e) => setCustomGoal(e.target.value)}
                placeholder="Ex: Quitar cartão e iniciar reserva..."
              />
            </div>
          </div>

          <div className="summary-col">
            <div className="peace-summary-card">
              <div className="summary-card-header">
                <Compass size={20} />
                <span>Sua bússola financeira pessoal</span>
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
                <p className="target-goal-text">“{customGoal || "Defina sua prioridade ao lado..."}”</p>
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
