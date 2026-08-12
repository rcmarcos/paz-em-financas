/* Atlas Editorial: fichas com marcadores terracota, selos de método e leitura comparável. */
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowDownToLine, ArrowUpRight, Check, CheckCircle2, ChevronDown, Clock3, ExternalLink, Gauge, HelpCircle, Laptop, Plus, Sparkles, Tag, X } from "lucide-react";
import { entries, recommendEntries, type Entry } from "@/lib/catalog";
import { kindIcon } from "@/lib/catalog";
import { practicalGuides, getPracticalGuide } from "@/lib/guides";

export function Metric({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return <div className="metric-row"><Icon aria-hidden="true" size={15} strokeWidth={1.8} /><span>{label}</span><strong>{value}</strong></div>;
}

export function EntryCard({ entry, selected, onCompare, onOpen }: { entry: Entry; selected: boolean; onCompare: () => void; onOpen: () => void }) {
  const Icon = entry.icon;
  const KindIcon = kindIcon(entry.kind);
  return <article className={`entry-card ${selected ? "entry-card-selected" : ""}`}>
    <div className="entry-card-topline"><span className={`kind-badge ${entry.kind === "Plataforma" ? "kind-platform" : "kind-method"}`}><KindIcon size={12} />{entry.kind}</span><span className="region-label">{entry.region}</span></div>
    <div className="entry-heading"><div className="icon-tile"><Icon size={23} strokeWidth={1.7} /></div><div><p className="eyebrow">{entry.eyebrow}</p><h3>{entry.name}</h3></div></div>
    <p className="entry-summary">{entry.summary}</p>
    <div className="tag-row">{entry.tags.map((tag) => <span key={tag} className="tag"><Tag size={11} />{tag}</span>)}</div>
    <div className="metrics-grid"><Metric icon={Gauge} label="Controle" value={entry.control} /><Metric icon={Clock3} label="Esforço" value={entry.effort} /><Metric icon={Sparkles} label="Automação" value={entry.automation} /></div>
    <div className="card-actions"><button type="button" className="text-button" onClick={onOpen}>Ver ficha <ArrowUpRight size={15} /></button><button type="button" className={`compare-button ${selected ? "is-selected" : ""}`} onClick={onCompare} aria-pressed={selected}>{selected ? <Check size={15} /> : <Plus size={15} />}{selected ? "Na comparação" : "Comparar"}</button></div>
  </article>;
}

export function DetailDialog({ entry, onClose, selected, onCompare }: { entry: Entry; onClose: () => void; selected: boolean; onCompare: () => void }) {
  const Icon = entry.icon;
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><div className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title" onMouseDown={(event) => event.stopPropagation()}>
    <button type="button" className="icon-button modal-close" onClick={onClose} aria-label="Fechar ficha"><X size={18} /></button>
    <div className="detail-header"><div className="icon-tile icon-tile-large"><Icon size={28} strokeWidth={1.5} /></div><div><span className={`kind-badge ${entry.kind === "Plataforma" ? "kind-platform" : "kind-method"}`}>{entry.kind}</span><p className="eyebrow">{entry.eyebrow}</p><h2 id="detail-title">{entry.name}</h2></div></div>
    <p className="detail-summary">{entry.summary}</p>
    <div className="detail-metrics"><Metric icon={Gauge} label="Nível de controle" value={entry.control} /><Metric icon={Clock3} label="Esforço de manutenção" value={entry.effort} /><Metric icon={Sparkles} label="Automação" value={entry.automation} /></div>
    <div className="detail-columns"><div><p className="section-kicker">Para quem faz sentido</p><p className="detail-copy">{entry.bestFor}</p></div><div><p className="section-kicker strength-kicker">Pontos fortes</p><ul className="detail-list">{entry.strengths.map((item) => <li key={item}><CheckCircle2 size={15} />{item}</li>)}</ul></div><div><p className="section-kicker attention-kicker">Pontos de atenção</p><ul className="detail-list">{entry.attention.map((item) => <li key={item}><span className="attention-dot" />{item}</li>)}</ul></div></div>
    <div className="detail-footer"><a className="source-link" href={entry.source.url} target="_blank" rel="noreferrer">Fonte direta: {entry.source.label}<ExternalLink size={14} /></a><button type="button" className={`primary-button ${selected ? "button-selected" : ""}`} onClick={onCompare}>{selected ? <><Check size={16} /> Remover da comparação</> : <><Plus size={16} /> Adicionar à comparação</>}</button></div>
  </div></div>;
}

export function AssistantPanel({ onClose, onSelect }: { onClose: () => void; onSelect: (id: string) => void }) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState("");
  const [goal, setGoal] = useState("");
  const [effort, setEffort] = useState("");
  const [automation, setAutomation] = useState("");

  const recommendations = recommendEntries({ profile, goal, effort, automation });

  return <div className="comparison-backdrop" role="presentation" onMouseDown={onClose}><aside className="comparison-panel" role="dialog" aria-modal="true" aria-labelledby="assistant-title" onMouseDown={(event) => event.stopPropagation()}>
    <div className="comparison-panel-header"><div><p className="eyebrow">Assistente de escolha</p><h2 id="assistant-title">Encontre seu método</h2></div><button type="button" className="icon-button" onClick={onClose} aria-label="Fechar assistente"><X size={18} /></button></div>
    
    {step === 1 && <div className="assistant-step">
      <h3>Qual é o seu perfil atual?</h3>
      <div className="assistant-options">
        <button type="button" className={`assistant-option ${profile === "iniciantes" ? "selected" : ""}`} onClick={() => { setProfile("iniciantes"); setStep(2); }}>Iniciante (nunca controlei)</button>
        <button type="button" className={`assistant-option ${profile === "detalhista" ? "selected" : ""}`} onClick={() => { setProfile("detalhista"); setStep(2); }}>Detalhista (gosto de planilhas)</button>
        <button type="button" className={`assistant-option ${profile === "renda-variavel" ? "selected" : ""}`} onClick={() => { setProfile("renda-variavel"); setStep(2); }}>Renda variável (freelancer)</button>
      </div>
    </div>}

    {step === 2 && <div className="assistant-step">
      <h3>Qual é o seu objetivo principal?</h3>
      <div className="assistant-options">
        <button type="button" className={`assistant-option ${goal === "quitar-dividas" ? "selected" : ""}`} onClick={() => { setGoal("quitar-dividas"); setStep(3); }}>Quitar dívidas</button>
        <button type="button" className={`assistant-option ${goal === "poupar" ? "selected" : ""}`} onClick={() => { setGoal("poupar"); setStep(3); }}>Poupar e investir</button>
        <button type="button" className={`assistant-option ${goal === "patrimonio" ? "selected" : ""}`} onClick={() => { setGoal("patrimonio"); setStep(3); }}>Acompanhar patrimônio</button>
      </div>
    </div>}

    {step === 3 && <div className="assistant-step">
      <h3>Como você prefere a manutenção?</h3>
      <div className="assistant-options">
        <button type="button" className={`assistant-option ${effort === "baixa-manutenção" ? "selected" : ""}`} onClick={() => { setEffort("baixa-manutenção"); setAutomation("alta-automacao"); setStep(4); }}>Pouco esforço (alta automação)</button>
        <button type="button" className={`assistant-option ${effort === "media-manutencao" ? "selected" : ""}`} onClick={() => { setEffort("media-manutencao"); setAutomation("assistida"); setStep(4); }}>Esforço médio (revisão semanal)</button>
        <button type="button" className={`assistant-option ${effort === "alta-manutencao" ? "selected" : ""}`} onClick={() => { setEffort("alta-manutencao"); setAutomation("baixa-automacao"); setStep(4); }}>Controle total (lançamento manual)</button>
      </div>
    </div>}

    {step === 4 && <div className="assistant-results">
      <h3>Nossas recomendações para você:</h3>
      {recommendations.length > 0 ? <div className="entry-grid">
        {recommendations.map(entry => <EntryCard key={entry.id} entry={entry} selected={false} onCompare={() => onSelect(entry.id)} onOpen={() => onSelect(entry.id)} />)}
      </div> : <p>Não encontramos uma combinação exata, tente ajustar os filtros no acervo.</p>}
      <button type="button" className="outline-button mt-6" onClick={() => setStep(1)}>Refazer escolhas</button>
    </div>}
  </aside></div>;
}

export function PracticalGuidesSection() {
  const [activeGuideId, setActiveGuideId] = useState("503020");
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const currentGuide = getPracticalGuide(activeGuideId);

  const toggleStep = (stepKey: string) => {
    setCompletedSteps(prev => ({ ...prev, [stepKey]: !prev[stepKey] }));
  };

  const handleDownloadCsv = () => {
    const blob = new Blob([currentGuide.spreadsheetCsv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", currentGuide.spreadsheetFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="guides-section" id="guias-praticos">
      <div className="catalog-heading">
        <div>
          <p className="overline"><span className="overline-dot" /> Passo a passo diário</p>
          <h2>Como colocar em prática.</h2>
        </div>
        <p className="catalog-description">Escolha uma metodologia para ver o passo a passo detalhado de implementação na sua rotina, baixar templates e tirar dúvidas frequentes.</p>
      </div>

      <div className="guides-layout">
        <div className="guides-tabs">
          {practicalGuides.map(guide => (
            <button
              key={guide.id}
              type="button"
              className={`guide-tab-button ${guide.id === activeGuideId ? "active" : ""}`}
              onClick={() => { setActiveGuideId(guide.id); setOpenFaq(null); }}
            >
              <span>{guide.title.replace("Como implementar a ", "").replace("Como aplicar o ", "").replace("Como dominar o ", "").replace("Como estruturar seu ", "").replace("Como planejar ", "").replace("Como estruturar um ", "")}</span>
              <span className="guide-tab-meta">{guide.difficulty} · {guide.timeframe}</span>
            </button>
          ))}
        </div>

        <div className="guide-card-panel">
          <div className="guide-card-header">
            <div>
              <span className="guide-difficulty-badge">Esforço: {currentGuide.difficulty}</span>
              <h3>{currentGuide.title}</h3>
              <p>{currentGuide.subtitle}</p>
            </div>
            <div className="guide-header-actions">
              <div className="guide-timeframe-box">
                <Clock3 size={15} />
                <span>{currentGuide.timeframe}</span>
              </div>
              <button type="button" className="download-sheet-button" onClick={handleDownloadCsv}>
                <ArrowDownToLine size={15} /> Baixar planilha ({currentGuide.spreadsheetTitle})
              </button>
            </div>
          </div>

          <div className="guide-steps-list">
            <p className="guide-checklist-intro">Marque os passos conforme avançar na sua rotina:</p>
            {currentGuide.steps.map((step, index) => {
              const stepKey = `${activeGuideId}-${index}`;
              const isChecked = !!completedSteps[stepKey];
              return (
                <div key={index} className={`guide-step-item ${isChecked ? "step-completed" : ""}`}>
                  <button
                    type="button"
                    className={`guide-checkbox-btn ${isChecked ? "checked" : ""}`}
                    onClick={() => toggleStep(stepKey)}
                    aria-label={`Marcar passo ${index + 1} como concluído`}
                  >
                    {isChecked && <Check size={14} />}
                  </button>
                  <div className="guide-step-body">
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                    <div className="guide-step-action">
                      <strong>Ação prática:</strong> {step.action}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {currentGuide.faqs && currentGuide.faqs.length > 0 && (
            <div className="guide-faq-section">
              <h4 className="guide-faq-heading"><HelpCircle size={16} /> Perguntas frequentes sobre este método</h4>
              <div className="guide-faq-list">
                {currentGuide.faqs.map((faq, fIndex) => {
                  const isOpen = openFaq === fIndex;
                  return (
                    <div key={fIndex} className={`guide-faq-item ${isOpen ? "open" : ""}`}>
                      <button
                        type="button"
                        className="guide-faq-question"
                        onClick={() => setOpenFaq(isOpen ? null : fIndex)}
                      >
                        <span>{faq.question}</span>
                        <ChevronDown size={16} className={`faq-chevron ${isOpen ? "rotated" : ""}`} />
                      </button>
                      {isOpen && <div className="guide-faq-answer"><p>{faq.answer}</p></div>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="guide-card-footer">
            <Sparkles size={16} />
            <span><strong>Dica editorial:</strong> {currentGuide.toolTip}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ComparisonPanel({ selected, onClose, onRemove }: { selected: Entry[]; onClose: () => void; onRemove: (id: string) => void }) {
  return <div className="comparison-backdrop" role="presentation" onMouseDown={onClose}><aside className="comparison-panel" role="dialog" aria-modal="true" aria-labelledby="comparison-title" onMouseDown={(event) => event.stopPropagation()}>
    <div className="comparison-panel-header"><div><p className="eyebrow">Leitura lado a lado</p><h2 id="comparison-title">Compare as fichas</h2></div><button type="button" className="icon-button" onClick={onClose} aria-label="Fechar comparação"><X size={18} /></button></div>
    <p className="comparison-intro">Use os mesmos critérios para perceber onde cada opção se encaixa. O portal não define uma vencedora: a melhor escolha depende do seu contexto.</p>
    <div className="comparison-table-wrap"><table className="comparison-table"><thead><tr><th>Critério</th>{selected.map((entry) => <th key={entry.id}><span>{entry.name}</span><button type="button" onClick={() => onRemove(entry.id)} aria-label={`Remover ${entry.name}`}><X size={13} /></button></th>)}</tr></thead><tbody>
      <tr><th>Tipo</th>{selected.map((entry) => <td key={entry.id}>{entry.kind}</td>)}</tr><tr><th>Controle</th>{selected.map((entry) => <td key={entry.id}>{entry.control}</td>)}</tr><tr><th>Esforço</th>{selected.map((entry) => <td key={entry.id}>{entry.effort}</td>)}</tr><tr><th>Automação</th>{selected.map((entry) => <td key={entry.id}>{entry.automation}</td>)}</tr><tr><th>Indicado para</th>{selected.map((entry) => <td key={entry.id}>{entry.bestFor}</td>)}</tr><tr><th>Fonte</th>{selected.map((entry) => <td key={entry.id}><a href={entry.source.url} target="_blank" rel="noreferrer">Abrir fonte <ExternalLink size={13} /></a></td>)}</tr>
    </tbody></table></div>
  </aside></div>;
}
