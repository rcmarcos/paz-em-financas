/* Atlas Editorial: entrada assimétrica, busca como ferramenta de orientação e conteúdo em português. */
import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Compass, ExternalLink, Filter, Menu, Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { ComparisonPanel, DetailDialog, EntryCard } from "@/components/CatalogUI";
import { categoryLabels, entries, type Entry, type EntryKind } from "@/lib/catalog";

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeKind, setActiveKind] = useState<"Todas" | EntryKind>("Todas");
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [detailEntry, setDetailEntry] = useState<Entry | null>(null);
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredEntries = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    return entries.filter((entry) => {
      const matchesKind = activeKind === "Todas" || entry.kind === activeKind;
      const matchesCategory = activeCategory === "Todas" || entry.category === activeCategory;
      const searchable = [entry.name, entry.eyebrow, entry.summary, entry.category, entry.bestFor, ...entry.tags].join(" ").toLocaleLowerCase("pt-BR");
      return matchesKind && matchesCategory && (!normalized || searchable.includes(normalized));
    });
  }, [activeCategory, activeKind, query]);

  const selectedEntries = selectedIds.map((id) => entries.find((entry) => entry.id === id)).filter(Boolean) as Entry[];
  const toggleCompare = (id: string) => setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : current.length < 3 ? [...current, id] : current);
  const clearFilters = () => { setQuery(""); setActiveKind("Todas"); setActiveCategory("Todas"); };
  const scrollToCatalog = () => document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });

  return <div className="site-shell">
    <header className="site-header"><a className="brand" href="#top" aria-label="Guia Comparativo de Finanças Pessoais"><img src="/manus-storage/atlas-financas-stamp_fa9a5e4d.png" alt="" className="brand-mark" /><span><strong>guia</strong><em>comparativo</em></span></a><button type="button" className="mobile-menu-button icon-button" onClick={() => setMobileMenuOpen((open) => !open)} aria-label="Abrir menu"><Menu size={20} /></button><nav className={`site-nav ${mobileMenuOpen ? "nav-open" : ""}`} aria-label="Navegação principal"><a href="#catalogo" onClick={() => setMobileMenuOpen(false)}>Explorar acervo</a><a href="#como-funciona" onClick={() => setMobileMenuOpen(false)}>Como funciona</a><a href="#criterios" onClick={() => setMobileMenuOpen(false)}>Critérios</a><button type="button" className="header-compare" onClick={() => setComparisonOpen(true)} disabled={selectedEntries.length < 2}><span>{selectedEntries.length}</span> Comparar</button></nav></header>

    <main id="top">
      <section className="hero-section"><div className="hero-copy"><p className="overline"><span className="overline-dot" /> Acervo em português · edição 01</p><h1>Encontre um método que <em>caiba</em> na sua vida.</h1><p className="hero-lead">Uma curadoria de metodologias, modelos e ferramentas para organizar o dinheiro com mais clareza — sem jargão e sem promessa fácil.</p><div className="hero-actions"><button type="button" className="primary-button" onClick={scrollToCatalog}>Explorar o acervo <ArrowRight size={17} /></button><a href="#como-funciona" className="quiet-link">Entenda a lógica <ChevronDown size={15} /></a></div><div className="hero-note"><Compass size={17} /><span><strong>13 fichas comparáveis</strong> entre métodos e plataformas. Comece por uma pergunta, não por uma planilha.</span></div></div><div className="hero-art" aria-hidden="true"><div className="hero-image" /><div className="hero-stamp"><img src="/manus-storage/atlas-financas-stamp_fa9a5e4d.png" alt="" /><span>mapa<br />de escolhas</span></div><div className="hero-caption">01 / pesquisa aplicada</div></div></section>

      <section className="intro-strip" id="como-funciona"><div className="intro-label"><span className="section-number">01</span><span>Como usar</span></div><div className="intro-text"><h2>Escolha pelo contexto, não pelo hype.</h2><p>O acervo separa o que é <strong>metodologia</strong> — uma forma de pensar e operar o orçamento — do que é <strong>plataforma</strong> — uma ferramenta que ajuda a colocar essa forma em prática.</p></div><div className="intro-steps"><div><span>1</span><p>Filtre por tipo e cenário</p></div><div><span>2</span><p>Abra as fichas completas</p></div><div><span>3</span><p>Compare até três opções</p></div></div></section>

      <section className="catalog-section" id="catalogo"><div className="catalog-heading"><div><p className="overline"><span className="overline-dot" /> O acervo</p><h2>Comece por onde a dúvida aparece.</h2></div><p className="catalog-description">Pesquise por uma ideia, uma necessidade ou uma ferramenta. Cada ficha resume pontos fortes, pontos de atenção e a fonte direta para você aprofundar.</p></div><div className="catalog-layout">
        <aside className="filter-rail" id="criterios"><div className="filter-title"><SlidersHorizontal size={16} /><span>Refinar pesquisa</span></div><label className="search-field"><Search size={17} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar no acervo" aria-label="Buscar no acervo" /></label><div className="filter-group"><p className="filter-label">O que você procura?</p><div className="segmented-control">{(["Todas", "Metodologia", "Plataforma"] as const).map((kind) => <button type="button" key={kind} className={activeKind === kind ? "is-active" : ""} onClick={() => setActiveKind(kind)}>{kind === "Todas" ? "Tudo" : kind}</button>)}</div></div><div className="filter-group"><p className="filter-label">Categoria</p><div className="category-select-wrap"><select value={activeCategory} onChange={(event) => setActiveCategory(event.target.value)} aria-label="Filtrar por categoria">{categoryLabels.map((category) => <option key={category} value={category}>{category}</option>)}</select><ChevronDown size={15} /></div></div><div className="filter-divider" /><div className="filter-reading"><Sparkles size={17} /><p><strong>Nota de leitura</strong> Os critérios são descritivos, não uma nota de desempenho. Uma opção pode ser excelente para um cenário e inadequada para outro.</p></div><button type="button" className="clear-button" onClick={clearFilters}><X size={14} /> Limpar filtros</button></aside>
        <div className="results-area"><div className="results-toolbar"><p><strong>{filteredEntries.length}</strong> fichas encontradas {query && <>para “{query}”</>}</p><div className="results-key"><span><i className="key-dot key-green" /> metodologia</span><span><i className="key-dot key-ochre" /> plataforma</span></div></div>{filteredEntries.length > 0 ? <div className="entry-grid">{filteredEntries.map((entry) => <EntryCard key={entry.id} entry={entry} selected={selectedIds.includes(entry.id)} onCompare={() => toggleCompare(entry.id)} onOpen={() => setDetailEntry(entry)} />)}</div> : <div className="empty-state"><Filter size={24} /><h3>Nenhuma ficha com esse recorte.</h3><p>Tente outra palavra ou volte a abrir todas as categorias.</p><button type="button" className="text-button" onClick={clearFilters}>Limpar pesquisa <ArrowRight size={15} /></button></div>}</div>
      </div></section>

      <section className="comparison-teaser"><div className="comparison-art"><img src="/manus-storage/atlas-financas-compare_a18b133b.jpg" alt="Cartões de papel conectados por linhas a uma bússola central" /></div><div className="comparison-copy"><p className="overline"><span className="overline-dot" /> A lógica da comparação</p><h2>Não existe método campeão. Existe método <em>compatível</em>.</h2><p>Controle, esforço e automação formam um triângulo de escolhas. Compare as fichas para visualizar os compromissos de cada caminho antes de abrir uma conta ou assinar uma ferramenta.</p><button type="button" className="outline-button" onClick={scrollToCatalog}>Voltar ao acervo <ArrowUpRight size={16} /></button></div></section>
      <section className="closing-section"><div className="closing-mark"><img src="/manus-storage/atlas-financas-stamp_fa9a5e4d.png" alt="" /></div><p className="overline"><span className="overline-dot" /> Em construção contínua</p><h2>Uma boa decisão começa com uma boa pergunta.</h2><p>O acervo cresce com novas fichas, fontes e critérios. Use-o como ponto de partida para investigar — e confirme sempre os detalhes diretamente na fonte.</p><a className="source-link" href="https://www.bcb.gov.br/cidadaniafinanceira" target="_blank" rel="noreferrer">Conheça também a educação financeira do Banco Central <ExternalLink size={14} /></a></section>
    </main>

    <footer className="site-footer"><div className="footer-brand"><img src="/manus-storage/atlas-financas-stamp_fa9a5e4d.png" alt="" /><span><strong>guia</strong><em>comparativo</em></span></div><p>Pesquisa clara para decisões financeiras mais conscientes.</p><span className="footer-meta">Edição 01 · conteúdo em português</span></footer>
    {selectedEntries.length > 0 && <div className="compare-dock"><div className="dock-copy"><span className="dock-count">{selectedEntries.length}</span><div><strong>{selectedEntries.length === 1 ? "1 ficha selecionada" : `${selectedEntries.length} fichas selecionadas`}</strong><span>{selectedEntries.length < 2 ? "Adicione mais uma para comparar" : "Prontas para leitura lado a lado"}</span></div></div><div className="dock-actions">{selectedEntries.map((entry) => <button type="button" key={entry.id} className="dock-chip" onClick={() => toggleCompare(entry.id)}>{entry.name}<X size={13} /></button>)}{selectedEntries.length >= 2 && <button type="button" className="primary-button dock-button" onClick={() => setComparisonOpen(true)}>Abrir comparação <ArrowRight size={15} /></button>}</div></div>}
    {detailEntry && <DetailDialog entry={detailEntry} selected={selectedIds.includes(detailEntry.id)} onClose={() => setDetailEntry(null)} onCompare={() => toggleCompare(detailEntry.id)} />}
    {comparisonOpen && selectedEntries.length >= 2 && <ComparisonPanel selected={selectedEntries} onClose={() => setComparisonOpen(false)} onRemove={toggleCompare} />}
  </div>;
}
