/* Atlas Editorial: fichas com marcadores terracota, selos de método e leitura comparável. */
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Check, CheckCircle2, Clock3, ExternalLink, Gauge, Laptop, Plus, Sparkles, Tag, X } from "lucide-react";
import type { Entry } from "@/lib/catalog";
import { kindIcon } from "@/lib/catalog";

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
    <div className="metrics-grid"><Metric icon={Gauge} label="Controle" value={entry.control} /><Metric icon={Clock3} label="Esforço" value={entry.effort} /></div>
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

export function ComparisonPanel({ selected, onClose, onRemove }: { selected: Entry[]; onClose: () => void; onRemove: (id: string) => void }) {
  return <div className="comparison-backdrop" role="presentation" onMouseDown={onClose}><aside className="comparison-panel" role="dialog" aria-modal="true" aria-labelledby="comparison-title" onMouseDown={(event) => event.stopPropagation()}>
    <div className="comparison-panel-header"><div><p className="eyebrow">Leitura lado a lado</p><h2 id="comparison-title">Compare as fichas</h2></div><button type="button" className="icon-button" onClick={onClose} aria-label="Fechar comparação"><X size={18} /></button></div>
    <p className="comparison-intro">Use os mesmos critérios para perceber onde cada opção se encaixa. O portal não define uma vencedora: a melhor escolha depende do seu contexto.</p>
    <div className="comparison-table-wrap"><table className="comparison-table"><thead><tr><th>Critério</th>{selected.map((entry) => <th key={entry.id}><span>{entry.name}</span><button type="button" onClick={() => onRemove(entry.id)} aria-label={`Remover ${entry.name}`}><X size={13} /></button></th>)}</tr></thead><tbody>
      <tr><th>Tipo</th>{selected.map((entry) => <td key={entry.id}>{entry.kind}</td>)}</tr><tr><th>Controle</th>{selected.map((entry) => <td key={entry.id}>{entry.control}</td>)}</tr><tr><th>Esforço</th>{selected.map((entry) => <td key={entry.id}>{entry.effort}</td>)}</tr><tr><th>Automação</th>{selected.map((entry) => <td key={entry.id}>{entry.automation}</td>)}</tr><tr><th>Indicado para</th>{selected.map((entry) => <td key={entry.id}>{entry.bestFor}</td>)}</tr><tr><th>Fonte</th>{selected.map((entry) => <td key={entry.id}><a href={entry.source.url} target="_blank" rel="noreferrer">Abrir fonte <ExternalLink size={13} /></a></td>)}</tr>
    </tbody></table></div>
  </aside></div>;
}
