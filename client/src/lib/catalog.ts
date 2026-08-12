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
];

export const categoryLabels = ["Todas", ...Array.from(new Set(entries.map((entry) => entry.category)))];

export const kindIcon = (kind: EntryKind) => kind === "Plataforma" ? Laptop : BookOpen;
