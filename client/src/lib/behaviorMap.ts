export type BehavioralConcept = {
  id: string;
  title: string;
  tag: string;
  summary: string;
  dailyImpact: string;
  antidote: string;
  experiment: string;
};

export const behavioralConcepts: BehavioralConcept[] = [
  {
    id: "present-bias",
    title: "Viés do Presente",
    tag: "Finanças Comportamentais",
    summary: "Nossa mente superestima o prazer imediato e subestima as consequências no futuro distante.",
    dailyImpact: "Compras por impulso e adiamento de aportes para a reserva de emergência sob a justificativa de que 'amanhã eu começo'.",
    antidote: "Aumentar a fricção para gastos impulsivos (exigir 48h de espera) e automatizar o que importa.",
    experiment: "Adicione qualquer compra não essencial a uma 'lista de espera de 3 dias' antes de passar o cartão."
  },
  {
    id: "mental-accounting",
    title: "Contabilidade Mental",
    tag: "Finanças Comportamentais",
    summary: "Tratamos o dinheiro de forma diferente dependendo de sua origem ou de onde está guardado.",
    dailyImpact: "Gastar um dinheiro extra (restituição, 13º ou bônus) mais facilmente do que o salário suado de todo mês.",
    antidote: "Unificar a visão do dinheiro e definir o destino de qualquer recurso extraordinário antes de recebê-lo.",
    experiment: "Defina antecipadamente que 70% de qualquer ganho extra vai direto para a sua prioridade principal."
  },
  {
    id: "loss-aversion",
    title: "Aversão à Perda",
    tag: "Finanças Comportamentais",
    summary: "A dor emocional de perder R$ 100 é duas vezes maior do que a alegria de ganhar R$ 100.",
    dailyImpact: "Medo paralisante de investir ou apego excessivo a assinaturas e serviços que não são mais úteis.",
    antidote: "Focar no que o dinheiro está protegendo (paz, tranquilidade) em vez de focar em restrições e cortes dolorosos.",
    experiment: "Faça uma auditoria de assinaturas mensais e cancele apenas uma que você não usou nos últimos 30 dias."
  },
  {
    id: "essentialism",
    title: "Essencialismo Financeiro",
    tag: "Essencialismo",
    summary: "Menos, porém melhor. Fazer menos coisas para investir mais energia no que realmente transforma sua vida.",
    dailyImpact: "Tentar controlar centenas de categorias de gastos miúdos e desistir do orçamento por exaustão.",
    antidote: "Focar em 3 grandes blocos (essenciais, futuro/reserva, liberdade) em vez de micromanagement.",
    experiment: "Substitua o controle de 20 categorias por apenas 3 pilares essenciais no seu mês."
  },
  {
    id: "minimalism",
    title: "Minimalismo Prático",
    tag: "Minimalismo",
    summary: "Desapegar do excesso material para reduzir custos fixos e recuperar tempo e atenção.",
    dailyImpact: "Acúmulo de bens que exigem manutenção, espaço e geram ansiedade financeira constante.",
    antidote: "Questionar o custo real (em horas de trabalho) de cada aquisição antes de trazer para casa.",
    experiment: "Pratique a regra 'entra um, sai dois': para cada item novo comprado, doe ou descarte dois."
  }
];

export type PersonalValueOption = {
  id: string;
  name: string;
  description: string;
  suggestedFocus: string;
};

export const personalValues: PersonalValueOption[] = [
  {
    id: "tranquility",
    name: "Tranquilidade e Paz Mental",
    description: "Dormir sem o peso de dívidas ou imprevistos financeiros batendo à porta.",
    suggestedFocus: "Foco total na Reserva de Emergência e métodos de baixo esforço como Pague-se Primeiro."
  },
  {
    id: "family",
    name: "Segurança e Cuidado com a Família",
    description: "Garantir estabilidade, educação e conforto para quem amamos.",
    suggestedFocus: "Orçamento Base Zero ou Envelope Digital para blindar o essencial da casa."
  },
  {
    id: "freedom",
    name: "Liberdade e Autonomia de Tempo",
    description: "Ter poder de escolha sobre o próprio tempo e não depender de amarras profissionais.",
    suggestedFocus: "Regra 50/30/20 com foco rigoroso em expandir a taxa de poupança."
  },
  {
    id: "purpose",
    name: "Propósito e Experiências Alinhadas",
    description: "Gastar com o que realmente importa e eliminar o desperdício com o supérfluo automático.",
    suggestedFocus: "Conscious Spending Plan (Ramit Sethi) para gastar sem culpa no que traz alegria."
  }
];
