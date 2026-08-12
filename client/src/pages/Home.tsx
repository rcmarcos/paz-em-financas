/* Atlas Editorial: entrada assimétrica, busca como ferramenta de orientação e conteúdo em português. */
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Compass, Download, ExternalLink, Filter, Menu, Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import BudgetCalculator from "@/components/BudgetCalculator";
import { AssistantPanel, ComparisonPanel, DetailDialog, EntryCard, PracticalGuidesSection } from "@/components/CatalogUI";
import { BehaviorSection, PeaceMapSection } from "@/components/BehaviorAndMapUI";
import { categoryLabels, entries, getAutomationLevel, getEffortLevel, type Entry, type EntryKind } from "@/lib/catalog";
import { exportPersonalReport } from "@/lib/pdfExport";

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeKind, setActiveKind] = useState<"Todas" | EntryKind>("Todas");
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [activeEffort, setActiveEffort] = useState("Todos");
  const [activeAutomation, setActiveAutomation] = useState("Todas");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(window.localStorage.getItem("atlas-favorites") || "[]") as string[]; } catch { return []; }
  });
  const [detailEntry, setDetailEntry] = useState<Entry | null>(null);
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredEntries = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    return entries.filter((entry) => {
      const matchesKind = activeKind === "Todas" || entry.kind === activeKind;
      const matchesCategory = activeCategory === "Todas" || entry.category === activeCategory;
      const matchesEffort = activeEffort === "Todos" || getEffortLevel(entry.effort) === activeEffort;
      const matchesAutomation = activeAutomation === "Todas" || getAutomationLevel(entry.automation) === activeAutomation;
      const searchable = [entry.name, entry.eyebrow, entry.summary, entry.category, entry.bestFor, ...entry.tags].join(" ").toLocaleLowerCase("pt-BR");
      return matchesKind && matchesCategory && matchesEffort && matchesAutomation && (!normalized || searchable.includes(normalized));
    });
  }, [activeAutomation, activeCategory, activeEffort, activeKind, query]);

  useEffect(() => { window.localStorage.setItem("atlas-favorites", JSON.stringify(favoriteIds)); }, [favoriteIds]);

  const selectedEntries = selectedIds.map((id) => entries.find((entry) => entry.id === id)).filter(Boolean) as Entry[];
  const toggleFavorite = (id: string) => setFavoriteIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const toggleCompare = (id: string) => setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : current.length < 3 ? [...current, id] : current);
  const clearFilters = () => { setQuery(""); setActiveKind("Todas"); setActiveCategory("Todas"); setActiveEffort("Todos"); setActiveAutomation("Todas"); };
  const scrollToCatalog = () => document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });

  return <div className="site-shell">
    <header className="site-header"><a className="brand" href="#top" aria-label="Paz em Finanças"><span className="brand-mark offline-brand-mark" aria-hidden="true"><Compass size={18} /></span><span><strong>paz em</strong><em>finanças</em></span></a><button type="button" className="mobile-menu-button icon-button" onClick={() => setMobileMenuOpen((open) => !open)} aria-label="Abrir menu"><Menu size={20} /></button><nav className={`site-nav ${mobileMenuOpen ? "nav-open" : ""}`} aria-label="Navegação principal"><a href="#conceito" onClick={() => setMobileMenuOpen(false)}>O Conceito</a><a href="#catalogo" onClick={() => setMobileMenuOpen(false)}>Acervo</a><a href="#calculadora" onClick={() => setMobileMenuOpen(false)}>Calculadora</a><a href="#assistente" onClick={() => setMobileMenuOpen(false)}>Assistente</a><a href="#guias-praticos" onClick={() => setMobileMenuOpen(false)}>Guias práticos</a><button type="button" className="header-compare" onClick={() => setComparisonOpen(true)} disabled={selectedEntries.length < 2}><span>{selectedEntries.length}</span> Comparar</button></nav></header>

    <main id="top">
      <section className="hero-section"><div className="hero-copy"><p className="overline"><span className="overline-dot" /> Acervo em português · edição 01</p><h1>Encontre um método que <em>caiba</em> na sua vida.</h1><p className="hero-lead">Uma curadoria de metodologias, modelos e ferramentas para organizar o dinheiro com mais clareza — sem jargão e sem promessa fácil.</p><div className="hero-actions"><button type="button" className="primary-button" onClick={scrollToCatalog}>Explorar o acervo <ArrowRight size={17} /></button><button type="button" className="assistant-trigger" onClick={() => setAssistantOpen(true)}><Sparkles size={16} /> Encontrar meu método</button><button type="button" className="assistant-trigger" onClick={exportPersonalReport}><Download size={16} /> Exportar meu plano</button><a href="#como-funciona" className="quiet-link">Entenda a lógica <ChevronDown size={15} /></a></div><div className="hero-note"><Compass size={17} /><span><strong>{entries.length} fichas comparáveis</strong> entre métodos e plataformas. Comece por uma pergunta, não por uma planilha.</span></div></div><div className="hero-art" aria-hidden="true"><div className="hero-image" /><div className="hero-stamp"><span className="hero-stamp-mark" aria-hidden="true"><Compass size={25} /></span><span>mapa<br />de escolhas</span></div><div className="hero-caption">01 / pesquisa aplicada</div></div></section>

      <section className="intro-strip" id="conceito"><div className="intro-label"><span className="section-number">01</span><span>O Conceito</span></div><div className="intro-text"><h2>Ajustar a vela, aceitar o vento.</h2><p>Inspirado na <strong>filosofia estoica</strong>, no minimalismo e no essencialismo, o <em>Paz em Finanças</em> parte de uma premissa simples: não controlamos o vento (mercado, imprevistos), mas controlamos a vela (orçamento, hábitos, decisões). O objetivo é a tranquilidade, não a acumulação vazia.</p></div><div className="intro-steps"><div><span>1</span><p>Controle o que depende de você</p></div><div><span>2</span><p>Elimine o supérfluo sem culpa</p></div><div><span>3</span><p>Decida no seu ritmo e clareza</p></div></div></section>

      <BehaviorSection />

      <PeaceMapSection />

      <section className="assistant-teaser" id="assistente"><div><p className="overline"><span className="overline-dot" /> Um ponto de partida guiado</p><h2>Não sabe por onde começar?</h2><p>Responda três perguntas rápidas sobre seu momento, objetivo e disponibilidade. O assistente cruza suas respostas com o acervo e sugere caminhos para investigar.</p></div><button type="button" className="primary-button" onClick={() => setAssistantOpen(true)}>Abrir assistente <Sparkles size={16} /></button></section>

      <BudgetCalculator />

      <section className="catalog-section">
        <PracticalGuidesSection />
      </section>

      <section className="catalog-section" id="catalogo"><div className="catalog-heading"><div><p className="overline"><span className="overline-dot" /> O acervo</p><h2>Comece por onde a dúvida aparece.</h2></div><p className="catalog-description">Pesquise por uma ideia, uma necessidade ou uma ferramenta. Cada ficha resume pontos fortes, pontos de atenção e a fonte direta para você aprofundar.</p></div><div className="catalog-layout">
        <aside className="filter-rail" id="criterios"><div className="filter-title"><SlidersHorizontal size={16} /><span>Refinar pesquisa</span></div><label className="search-field"><Search size={17} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar no acervo" aria-label="Buscar no acervo" /></label><div className="filter-group"><p className="filter-label">O que você procura?</p><div className="segmented-control">{(["Todas", "Metodologia", "Plataforma"] as const).map((kind) => <button type="button" key={kind} className={activeKind === kind ? "is-active" : ""} onClick={() => setActiveKind(kind)}>{kind === "Todas" ? "Tudo" : kind}</button>)}</div></div><div className="filter-group"><p className="filter-label">Categoria</p><div className="category-select-wrap"><select value={activeCategory} onChange={(event) => setActiveCategory(event.target.value)} aria-label="Filtrar por categoria">{categoryLabels.map((category) => <option key={category} value={category}>{category}</option>)}</select><ChevronDown size={15} /></div></div><div className="filter-group"><p className="filter-label">Esforço exigido</p><div className="category-select-wrap"><select value={activeEffort} onChange={(event) => setActiveEffort(event.target.value)} aria-label="Filtrar por nível de esforço"><option value="Todos">Todos</option><option value="Baixo">Baixo</option><option value="Médio">Médio</option><option value="Alto">Alto</option></select><ChevronDown size={15} /></div></div><div className="filter-group"><p className="filter-label">Grau de automação</p><div className="category-select-wrap"><select value={activeAutomation} onChange={(event) => setActiveAutomation(event.target.value)} aria-label="Filtrar por grau de automação"><option value="Todas">Todas</option><option value="Baixa">Baixa</option><option value="Assistida">Assistida</option><option value="Alta">Alta</option></select><ChevronDown size={15} /></div></div><div className="filter-divider" /><div className="filter-reading"><Sparkles size={17} /><p><strong>Nota de leitura</strong> Os critérios são descritivos, não uma nota de desempenho. Uma opção pode ser excelente para um cenário e inadequada para outro.</p></div><button type="button" className="clear-button" onClick={clearFilters}><X size={14} /> Limpar filtros</button></aside>
        <div className="results-area"><div className="results-toolbar"><p><strong>{filteredEntries.length} de {entries.length}</strong> fichas encontradas {query && <>para “{query}”</>}</p><div className="results-key"><span><i className="key-dot key-green" /> metodologia</span><span><i className="key-dot key-ochre" /> plataforma</span></div></div>{filteredEntries.length > 0 ? <div className="entry-grid">{filteredEntries.map((entry) => <EntryCard key={entry.id} entry={entry} selected={selectedIds.includes(entry.id)} isFavorite={favoriteIds.includes(entry.id)} onFavorite={() => toggleFavorite(entry.id)} onCompare={() => toggleCompare(entry.id)} onOpen={() => setDetailEntry(entry)} />)}</div> : <div className="empty-state"><Filter size={24} /><h3>Nenhuma ficha com esse recorte.</h3><p>Tente outra palavra ou volte a abrir todas as categorias.</p><button type="button" className="text-button" onClick={clearFilters}>Limpar pesquisa <ArrowRight size={15} /></button></div>}</div>
      </div></section>

      <section className="comparison-teaser"><div className="comparison-art"><div className="offline-comparison-art" role="img" aria-label="Bússola sobre cartões de planejamento financeiro"><Compass size={68} /></div></div><div className="comparison-copy"><p className="overline"><span className="overline-dot" /> A lógica da comparação</p><h2>Não existe método campeão. Existe método <em>compatível</em>.</h2><p>Controle, esforço e automação formam um triângulo de escolhas. Compare as fichas para visualizar os compromissos de cada caminho antes de abrir uma conta ou assinar uma ferramenta.</p><button type="button" className="outline-button" onClick={scrollToCatalog}>Voltar ao acervo <ArrowUpRight size={16} /></button></div></section>
      <section className="closing-section"><div className="closing-mark"><span className="offline-mark" aria-hidden="true"><Compass size={34} /></span></div><p className="overline"><span className="overline-dot" /> Em construção contínua</p><h2>Uma boa decisão começa com uma boa pergunta.</h2><p>O acervo cresce com novas fichas, fontes e critérios. Use-o como ponto de partida para investigar — e confirme sempre os detalhes diretamente na fonte.</p><a className="source-link" href="https://www.bcb.gov.br/cidadaniafinanceira" target="_blank" rel="noreferrer">Conheça também a educação financeira do Banco Central <ExternalLink size={14} /></a></section>
    </main>

    <footer className="site-footer"><div className="footer-brand"><span className="offline-mark" aria-hidden="true"><Compass size={22} /></span><span><strong>guia</strong><em>comparativo</em></span></div><p>Pesquisa clara para decisões financeiras mais conscientes.</p><span className="footer-meta">Edição 01 · conteúdo em português</span></footer>
    {selectedEntries.length > 0 && <div className="compare-dock"><div className="dock-copy"><span className="dock-count">{selectedEntries.length}</span><div><strong>{selectedEntries.length === 1 ? "1 ficha selecionada" : `${selectedEntries.length} fichas selecionadas`}</strong><span>{selectedEntries.length < 2 ? "Adicione mais uma para comparar" : "Prontas para leitura lado a lado"}</span></div></div><div className="dock-actions">{selectedEntries.map((entry) => <button type="button" key={entry.id} className="dock-chip" onClick={() => toggleCompare(entry.id)}>{entry.name}<X size={13} /></button>)}{selectedEntries.length >= 2 && <button type="button" className="primary-button dock-button" onClick={() => setComparisonOpen(true)}>Abrir comparação <ArrowRight size={15} /></button>}</div></div>}
    {detailEntry && <DetailDialog entry={detailEntry} selected={selectedIds.includes(detailEntry.id)} onClose={() => setDetailEntry(null)} onCompare={() => toggleCompare(detailEntry.id)} />}
    {comparisonOpen && selectedEntries.length >= 2 && <ComparisonPanel selected={selectedEntries} onClose={() => setComparisonOpen(false)} onRemove={toggleCompare} />}
    {assistantOpen && <AssistantPanel onClose={() => setAssistantOpen(false)} onSelect={(id) => { setAssistantOpen(false); setDetailEntry(entries.find((entry) => entry.id === id) || null); }} />}
  </div>;
}
