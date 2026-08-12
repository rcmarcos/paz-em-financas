/* Atlas Editorial: fichas estruturadas para pesquisa em português. */
import type { LucideIcon } from "lucide-react";
import { BarChart3, BookOpen, CircleDollarSign, Clock3, Compass, Heart, Landmark, Laptop, Layers3, ShieldCheck, Users, WalletCards } from "lucide-react";

export type EntryKind = "Metodologia" | "Plataforma";

export type Entry = {
  id: string;
  name: string;
  kind: EntryKind;
  eyebrow: string;
  summary: string;
  category: string;
  tags: string[];
  bestFor: string;
  control: string;
  effort: string;
  automation: string;
  region: string;
  icon: LucideIcon;
  strengths: string[];
  attention: string[];
  source: { label: string; url: string };
  recommendationTags?: string[];
};

export const entries: Entry[] = [
  {
    id: "503020", name: "Regra 50/30/20", kind: "Metodologia", eyebrow: "Distribuição percentual",
    summary: "Divide a renda líquida entre necessidades, desejos e prioridades financeiras.", category: "Percentual",
    tags: ["início simples", "baixa manutenção"], bestFor: "Quem quer um primeiro mapa de prioridades sem acompanhar cada lançamento.",
    control: "Panorama", effort: "Baixo", automation: "Manual", region: "Universal", icon: BarChart3,
    strengths: ["Fácil de explicar e aplicar", "Ajuda a criar uma meta de poupança", "Funciona como ponto de partida"],
    attention: ["Percentuais não cabem em toda renda ou cidade", "Não substitui categorias detalhadas", "Pode exigir adaptação para quitar dívidas"],
    source: { label: "U.S. Bank — tipos de orçamento", url: "https://www.usbank.com/financial-education/save/types-of-budgets.html" },
  },
  {
    id: "zero-based", name: "Orçamento base zero", kind: "Metodologia", eyebrow: "Cada unidade tem uma função",
    summary: "Planeja a renda antes do gasto e atribui uma função a cada valor disponível.", category: "Planejamento",
    tags: ["alto controle", "decisão antecipada"], bestFor: "Quem quer decidir com intenção para onde o dinheiro vai e revisar prioridades ao longo do mês.",
    control: "Detalhado", effort: "Médio", automation: "Manual ou assistida", region: "Universal", icon: Compass,
    strengths: ["Torna prioridades explícitas", "Dá visibilidade para o dinheiro disponível", "Pode reduzir decisões impulsivas"],
    attention: ["Requer revisão frequente", "Renda variável pede mais flexibilidade", "Uma categoria esquecida distorce o plano"],
    source: { label: "YNAB — proposta oficial", url: "https://www.ynab.com/" },
  },
  {
    id: "envelope", name: "Orçamento por envelopes", kind: "Metodologia", eyebrow: "Limites por categoria",
    summary: "Separa o dinheiro em envelopes físicos ou virtuais destinados a cada tipo de gasto.", category: "Categorias",
    tags: ["limites claros", "tátil"], bestFor: "Quem precisa enxergar o limite de cada categoria e aprender pelo saldo restante.",
    control: "Detalhado", effort: "Médio", automation: "Manual ou assistida", region: "Universal", icon: WalletCards,
    strengths: ["Limite de gasto é concreto", "Ajuda a controlar variáveis", "Pode ser compartilhado em casa"],
    attention: ["Exige realocação quando surgem imprevistos", "Muitas categorias viram burocracia", "Envelopes virtuais dependem da ferramenta"],
    source: { label: "Goodbudget — envelope budgeting", url: "https://goodbudget.com/envelope-budgeting/" },
  },
  {
    id: "pay-yourself", name: "Pague-se primeiro", kind: "Metodologia", eyebrow: "Prioridade para reservas",
    summary: "Separa uma quantia para reserva ou objetivos assim que a renda entra, antes dos demais gastos.", category: "Prioridades",
    tags: ["automatizável", "objetivos"], bestFor: "Quem tende a guardar apenas o que sobra e quer transformar a poupança em compromisso.",
    control: "Direcional", effort: "Baixo", automation: "Alta", region: "Universal", icon: ShieldCheck,
    strengths: ["Protege uma prioridade antes do consumo", "Combina bem com transferências automáticas", "É simples de acompanhar"],
    attention: ["Pode apertar o caixa se o valor for irreal", "Não organiza todas as despesas", "Precisa respeitar a liquidez da reserva"],
    source: { label: "Banco Central do Brasil — gestão financeira", url: "https://www.bcb.gov.br/content/cidadaniafinanceira/documentos_cidadania/Cuidando_do_seu_dinheiro_Gestao_de_Financas_Pessoais/caderno_cidadania_financeira.pdf" },
  },
  {
    id: "sinking-funds", name: "Fundos para despesas futuras", kind: "Metodologia", eyebrow: "Previsibilidade",
    summary: "Cria reservas separadas para despesas irregulares, como impostos, viagens ou manutenção.", category: "Reservas",
    tags: ["despesas anuais", "planejamento"], bestFor: "Quem se desorganiza quando chegam despesas previsíveis, mas não mensais.",
    control: "Detalhado", effort: "Médio", automation: "Assistida", region: "Universal", icon: Landmark,
    strengths: ["Transforma uma despesa grande em parcelas menores", "Evita surpresas artificiais", "Complementa outros métodos"],
    attention: ["Requer estimativas e datas", "Pode criar categorias demais", "Não substitui reserva de emergência"],
    source: { label: "NerdWallet — sinking funds", url: "https://www.nerdwallet.com/article/finance/sinking-funds" },
  },
  {
    id: "cash-flow", name: "Orçamento de fluxo de caixa", kind: "Metodologia", eyebrow: "Calendário financeiro",
    summary: "Organiza entradas e saídas pela data em que acontecem, destacando o saldo ao longo do mês.", category: "Fluxo de caixa",
    tags: ["renda variável", "datas"], bestFor: "Quem recebe em datas diferentes ou tem contas concentradas em determinados períodos.",
    control: "Temporal", effort: "Médio", automation: "Manual ou assistida", region: "Universal", icon: Clock3,
    strengths: ["Enxerga risco de saldo negativo", "Ajuda a planejar datas de pagamento", "Funciona bem com renda irregular"],
    attention: ["Pode acompanhar o caixa sem explicar prioridades", "Datas estimadas precisam ser atualizadas", "Exige atenção a contas anuais"],
    source: { label: "Oregon DFR — criar um orçamento", url: "https://dfr.oregon.gov/financial/manage/pages/budget.aspx" },
  },
  {
    id: "values-based", name: "Orçamento baseado em valores", kind: "Metodologia", eyebrow: "Intenção antes da categoria",
    summary: "Usa valores pessoais e objetivos de vida para decidir o que merece espaço no orçamento.", category: "Comportamento",
    tags: ["consciência", "prioridades"], bestFor: "Quem já controla despesas, mas quer alinhar o dinheiro à vida que pretende construir.",
    control: "Qualitativo", effort: "Médio", automation: "Manual", region: "Universal", icon: Heart,
    strengths: ["Conecta orçamento a decisões reais", "Ajuda a reduzir gastos sem sentido", "Pode conviver com qualquer método"],
    attention: ["É menos padronizado", "Prioridades mudam ao longo do tempo", "Pede reflexão além do registro"],
    source: { label: "CFPB — orçamento", url: "https://www.consumerfinance.gov/consumer-tools/budgeting/" },
  },
  {
    id: "ynab", name: "YNAB", kind: "Plataforma", eyebrow: "Planejamento digital",
    summary: "Aplicativo que transforma o orçamento base zero em uma rotina de planejamento e revisão.", category: "App internacional",
    tags: ["base zero", "objetivos"], bestFor: "Quem quer uma ferramenta guiada para planejar, acompanhar e ajustar o orçamento.",
    control: "Detalhado", effort: "Médio", automation: "Assistida", region: "Internacional", icon: Laptop,
    strengths: ["Método próprio muito claro", "Boa experiência para planejamento", "Conecta orçamento a metas"],
    attention: ["Idioma e disponibilidade bancária podem variar", "É uma assinatura", "Pede mudança de hábito no início"],
    source: { label: "Site oficial do YNAB", url: "https://www.ynab.com/" },
  },
  {
    id: "goodbudget", name: "Goodbudget", kind: "Plataforma", eyebrow: "Envelopes virtuais",
    summary: "Rastreador de orçamento para web, Android e iPhone baseado no sistema de envelopes.", category: "App internacional",
    tags: ["envelopes", "compartilhado"], bestFor: "Quem quer levar a lógica dos envelopes para uma rotina doméstica compartilhada.",
    control: "Detalhado", effort: "Médio", automation: "Manual ou assistida", region: "Internacional", icon: WalletCards,
    strengths: ["Método visual e concreto", "Disponível em várias plataformas", "Pensado para casa e família"],
    attention: ["Pode exigir lançamento manual", "Integrações variam por país", "A versão gratuita é limitada"],
    source: { label: "Site oficial do Goodbudget", url: "https://goodbudget.com/" },
  },
  {
    id: "organizze", name: "Organizze", kind: "Plataforma", eyebrow: "Gerenciador brasileiro",
    summary: "Centraliza contas e lançamentos, com conexão bancária, categorização e histórico recente.", category: "App brasileiro",
    tags: ["Open Finance", "automação"], bestFor: "Quem quer reduzir o trabalho de lançamento e acompanhar contas pessoais e do negócio.",
    control: "Detalhado", effort: "Baixo a médio", automation: "Alta", region: "Brasil", icon: CircleDollarSign,
    strengths: ["Interface e suporte em português", "Conexão bancária declarada no site", "Permite organizar contas PF e PJ"],
    attention: ["Conexões dependem de bancos e consentimento", "Planos e recursos podem mudar", "Automação não substitui revisão de categorias"],
    source: { label: "Site oficial do Organizze", url: "https://www.organizze.com.br/" },
  },
  {
    id: "minhas-economias", name: "Minhas Economias", kind: "Plataforma", eyebrow: "Visão consolidada",
    summary: "App brasileiro que centraliza contas e cartões, com orçamento, objetivos e educação financeira.", category: "App brasileiro",
    tags: ["objetivos", "Open Finance"], bestFor: "Quem quer enxergar a vida financeira em um lugar e acompanhar objetivos de médio prazo.",
    control: "Panorama detalhado", effort: "Baixo a médio", automation: "Alta", region: "Brasil", icon: Layers3,
    strengths: ["Centralização de contas e cartões", "Tem recursos de objetivos", "Conteúdo educativo em português"],
    attention: ["O método não é tão prescritivo", "Recursos dependem de conexão e plano", "Vale validar cobertura do próprio banco"],
    source: { label: "Site oficial do Minhas Economias", url: "https://minhaseconomias.com.br/" },
  },
  {
    id: "mobills", name: "Mobills", kind: "Plataforma", eyebrow: "Orçamento e objetivos",
    summary: "Gerenciador que reúne despesas, contas e cartões, com integração automática e orçamentos mensais.", category: "App brasileiro",
    tags: ["orçamentos", "cartões"], bestFor: "Quem quer acompanhar gastos, criar orçamentos mensais e organizar cartões em português.",
    control: "Detalhado", effort: "Baixo a médio", automation: "Assistida ou alta", region: "Brasil", icon: CircleDollarSign,
    strengths: ["Foco em despesas e cartões", "Oferece orçamentos mensais", "Tem recursos de objetivos"],
    attention: ["Disponibilidade de integração varia", "Parte dos recursos depende do plano", "Classificação automática precisa de conferência"],
    source: { label: "Site oficial da Mobills", url: "https://www.mobills.com.br/" },
  },
  {
    id: "monarch", name: "Monarch Money", kind: "Plataforma", eyebrow: "Agregação e planejamento",
    summary: "Plataforma internacional para acompanhar, orçar, planejar e definir objetivos em um só lugar.", category: "App internacional",
    tags: ["agregação", "casais"], bestFor: "Quem busca uma visão ampla de contas, orçamento e planejamento, inclusive em casal.",
    control: "Panorama detalhado", effort: "Baixo a médio", automation: "Alta", region: "Internacional", icon: Users,
    strengths: ["Reúne acompanhamento, orçamento e metas", "Tem proposta para uso compartilhado", "Inclui visão de investimentos"],
    attention: ["Pode não atender bancos brasileiros", "Idioma e preço são fatores de decisão", "Agregação depende de conexões externas"],
    source: { label: "Site oficial da Monarch", url: "https://www.monarch.com/" },
  },
  {
    id: "conscious-spending", name: "Conscious Spending Plan", kind: "Metodologia", eyebrow: "Prioridades sem microgestão",
    summary: "Organiza o dinheiro em custos fixos, investimentos, poupança e gasto sem culpa.", category: "Percentual",
    tags: ["valores", "automação"], bestFor: "Quem quer priorizar o que importa e automatizar o restante sem controlar cada compra.",
    control: "Panorama", effort: "Baixo", automation: "Alta", region: "Internacional", icon: Heart,
    recommendationTags: ["iniciantes", "poupar", "investir", "valores", "baixa-manutenção"],
    strengths: ["Conecta orçamento a valores pessoais", "Simplifica decisões recorrentes", "Funciona bem com automação"],
    attention: ["Percentuais são referências, não regras universais", "Não detalha cada categoria", "Pode exigir adaptação à renda local"],
    source: { label: "I Will Teach You To Be Rich — Conscious Spending", url: "https://www.iwillteachyoutoberich.com/conscious-spending-basics/" },
  },
  {
    id: "everydollar", name: "EveryDollar", kind: "Plataforma", eyebrow: "Base zero guiada",
    summary: "Aplicativo de orçamento base zero que ajuda a planejar e acompanhar o dinheiro de forma simples.", category: "App internacional",
    tags: ["base zero", "início guiado"], bestFor: "Quem quer começar com um orçamento detalhado, mas precisa de uma ferramenta que conduza o passo a passo.",
    control: "Detalhado", effort: "Médio", automation: "Assistida", region: "Internacional", icon: Compass,
    recommendationTags: ["iniciantes", "quitar-dividas", "detalhista", "planejamento"],
    strengths: ["Método explícito e fácil de entender", "Boa porta de entrada para planejamento", "Ajuda a dar função à renda"],
    attention: ["Disponibilidade regional pode variar", "Recursos dependem do plano", "Exige revisão frequente"],
    source: { label: "Ramsey — EveryDollar", url: "https://www.ramseysolutions.com/money/everydollar" },
  },
  {
    id: "copilot", name: "Copilot Money", kind: "Plataforma", eyebrow: "Visão inteligente",
    summary: "Acompanha gastos, orçamentos, investimentos e patrimônio em uma experiência digital integrada.", category: "App internacional",
    tags: ["patrimônio", "recomendações"], bestFor: "Quem valoriza uma visão consolidada e quer reduzir o trabalho manual de acompanhamento.",
    control: "Panorama detalhado", effort: "Baixo a médio", automation: "Alta", region: "Internacional", icon: Laptop,
    recommendationTags: ["iniciantes", "patrimonio", "poupar", "alta-automacao", "baixa-manutenção"],
    strengths: ["Reúne gastos, investimentos e patrimônio", "Tem proposta de recomendações", "Baixa manutenção no dia a dia"],
    attention: ["Pode não atender bancos brasileiros", "Modelo de assinatura", "Conexões externas precisam ser conferidas"],
    source: { label: "Site oficial do Copilot Money", url: "https://www.copilot.money/" },
  },
  {
    id: "simplifi", name: "Quicken Simplifi", kind: "Plataforma", eyebrow: "Orçamento preditivo",
    summary: "Centraliza contas e acompanha gastos, orçamento, contas recorrentes e investimentos.", category: "App internacional",
    tags: ["previsões", "contas"], bestFor: "Quem quer antecipar despesas e ter uma leitura simples do dinheiro que ainda está disponível.",
    control: "Panorama detalhado", effort: "Baixo a médio", automation: "Alta", region: "Internacional", icon: Layers3,
    recommendationTags: ["iniciantes", "renda-variavel", "alta-automacao", "baixa-manutenção", "contas"],
    strengths: ["Foco em antecipação e previsibilidade", "Combina orçamento e visão de contas", "Automação reduz lançamentos"],
    attention: ["Cobertura bancária varia por país", "Assinatura e idioma entram na decisão", "Menos adequado a quem quer envelopes rigorosos"],
    source: { label: "Quicken Simplifi — site oficial", url: "https://simplifi.quicken.com/" },
  },
  {
    id: "tiller", name: "Tiller Money", kind: "Plataforma", eyebrow: "Planilha automatizada",
    summary: "Conecta bancos a planilhas e automatiza gastos, receitas, saldos, categorias, dívidas e patrimônio.", category: "Planilha digital",
    tags: ["planilhas", "customização"], bestFor: "Quem gosta de planilhas e quer personalizar o nível de detalhe sem abrir mão de automação.",
    control: "Detalhado", effort: "Médio", automation: "Alta", region: "Internacional", icon: WalletCards,
    recommendationTags: ["detalhista", "renda-variavel", "patrimonio", "alta-automacao", "planilhas"],
    strengths: ["Flexibilidade de templates", "Automatiza a alimentação da planilha", "Pode acompanhar orçamento, dívidas e patrimônio"],
    attention: ["Exige conforto com planilhas", "Conexões dependem da região", "Personalização aumenta a responsabilidade de manutenção"],
    source: { label: "Tiller — como funciona", url: "https://tiller.com/how-tiller-works/" },
  },
  {
    id: "empower", name: "Empower Personal Dashboard", kind: "Plataforma", eyebrow: "Patrimônio e planejamento",
    summary: "Reúne orçamento, planejamento, carteira de investimentos, aposentadoria e patrimônio líquido.", category: "Patrimônio",
    tags: ["investimentos", "aposentadoria"], bestFor: "Quem quer acompanhar o patrimônio e tomar decisões de longo prazo além do orçamento mensal.",
    control: "Panorama", effort: "Baixo a médio", automation: "Alta", region: "Internacional", icon: Landmark,
    recommendationTags: ["patrimonio", "investir", "poupar", "alta-automacao", "baixa-manutenção"],
    strengths: ["Visão ampla de patrimônio", "Inclui planejamento de orçamento e aposentadoria", "Conexão de contas reduz trabalho manual"],
    attention: ["Não é a melhor escolha para orçamento granular", "Foco regional nos Estados Unidos", "Orientação não substitui aconselhamento individual"],
    source: { label: "Empower — ferramentas financeiras", url: "https://www.empower.com/tools" },
  },
  {
    id: "pocketguard", name: "PocketGuard", kind: "Plataforma", eyebrow: "Saldo disponível",
    summary: "Acompanha gastos, orçamentos, dívidas, metas e patrimônio líquido com sincronização automática.", category: "App internacional",
    tags: ["saldo disponível", "dívidas"], bestFor: "Quem quer saber quanto pode gastar e precisa de ajuda para controlar dívidas e recorrências.",
    control: "Panorama detalhado", effort: "Baixo", automation: "Alta", region: "Internacional", icon: CircleDollarSign,
    recommendationTags: ["iniciantes", "quitar-dividas", "alta-automacao", "baixa-manutenção", "renda-variavel"],
    strengths: ["Conecta gastos e saldo disponível", "Inclui metas e plano para dívidas", "Automatiza a sincronização"],
    attention: ["Disponibilidade concentrada em alguns países", "Assinatura/trial devem ser conferidos", "Pode oferecer menos granularidade que uma planilha"],
    source: { label: "Site oficial do PocketGuard", url: "https://pocketguard.com/" },
  },
  {
    id: "buckets", name: "Buckets", kind: "Plataforma", eyebrow: "Privacidade local",
    summary: "Aplicativo privado de orçamento, com envelopes, dados no computador e licença sem mensalidade.", category: "App internacional",
    tags: ["privacidade", "envelopes"], bestFor: "Quem quer um sistema de envelopes com controle sobre os próprios dados e baixo custo recorrente.",
    control: "Detalhado", effort: "Médio", automation: "Manual ou assistida", region: "Internacional", icon: ShieldCheck,
    recommendationTags: ["detalhista", "privacidade", "envelopes", "media-manutencao", "baixa-automacao"],
    strengths: ["Dados ficam no computador", "Pagamento único", "Permite envelopes ou estilo próprio"],
    attention: ["Sincronização bancária é opcional e depende de ponte externa", "Exige configuração inicial", "Pode não ter a conveniência de um agregador online"],
    source: { label: "Site oficial do Buckets", url: "https://www.budgetwithbuckets.com/" },
  },
  {
    id: "lunch-money", name: "Lunch Money", kind: "Plataforma", eyebrow: "Dados e personalização",
    summary: "Oferece importação bancária ou por CSV, orçamentos mensais, regras, múltiplas moedas e patrimônio.", category: "App internacional",
    tags: ["multimoeda", "regras"], bestFor: "Quem quer flexibilidade, dados detalhados e recursos avançados para personalizar a organização financeira.",
    control: "Detalhado", effort: "Médio", automation: "Assistida ou alta", region: "Internacional", icon: BarChart3,
    recommendationTags: ["detalhista", "renda-variavel", "patrimonio", "media-manutencao", "multimoeda"],
    strengths: ["Importação por diferentes caminhos", "Regras e filtros para usuários avançados", "Acompanha patrimônio e múltiplas moedas"],
    attention: ["Curva de aprendizado maior", "Integrações variam por localidade", "Mais recursos podem significar mais configuração"],
    source: { label: "Site oficial do Lunch Money", url: "https://lunchmoney.app/" },
  },
  {
    id: "actual-budget", name: "Actual Budget", kind: "Plataforma", eyebrow: "Open source e envelopes",
    summary: "Projeto open source de orçamento com foco em privacidade, personalização e lógica de envelopes.", category: "Open source",
    tags: ["privacidade", "open source"], bestFor: "Quem aceita configurar uma ferramenta mais técnica para ter flexibilidade e controle sobre os dados.",
    control: "Detalhado", effort: "Alto", automation: "Manual ou assistida", region: "Internacional", icon: ShieldCheck,
    recommendationTags: ["detalhista", "privacidade", "envelopes", "alta-manutencao", "baixa-automacao"],
    strengths: ["Código aberto e comunidade", "Boa aderência a envelopes", "Pode ser hospedado e adaptado"],
    attention: ["Instalação e manutenção podem ser técnicas", "Conexões dependem da configuração", "A documentação e a cobertura regional devem ser verificadas"],
    source: { label: "Actual Budget — site institucional", url: "https://actualbudget.org/" },
  },
];

export const categoryLabels = ["Todas", ...Array.from(new Set(entries.map((entry) => entry.category)))];

export type EffortFilter = "Todos" | "Baixo" | "Médio" | "Alto";
export type AutomationFilter = "Todas" | "Baixa" | "Assistida" | "Alta";

export const getEffortLevel = (effort: string): Exclude<EffortFilter, "Todos"> => effort.includes("Alto") ? "Alto" : effort.includes("Baixo") ? "Baixo" : "Médio";
export const getAutomationLevel = (automation: string): Exclude<AutomationFilter, "Todas"> => automation.toLowerCase().includes("alta") ? "Alta" : automation.toLowerCase().includes("assistida") ? "Assistida" : "Baixa";

export type RecommendationAnswers = { profile: string; goal: string; effort: string; automation: string };
export const recommendEntries = (answers: RecommendationAnswers) => {
  const tags = Object.values(answers).filter(Boolean);
  return entries.map(entry => ({ entry, score: (entry.recommendationTags || []).filter(tag => tags.includes(tag)).length }))
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(result => result.entry);
};

export const kindIcon = (kind: EntryKind) => kind === "Plataforma" ? Laptop : BookOpen;
