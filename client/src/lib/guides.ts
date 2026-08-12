export type GuideStep = {
  title: string;
  description: string;
  action: string;
};

export type GuideFaq = {
  question: string;
  answer: string;
};

export type SpreadsheetRow = string[];

export type PracticalGuide = {
  id: string;
  title: string;
  subtitle: string;
  difficulty: "Baixa" | "Média" | "Alta";
  timeframe: string;
  steps: GuideStep[];
  toolTip: string;
  spreadsheetTitle: string;
  spreadsheetFilename: string;
  spreadsheetHeaders: string[];
  spreadsheetRows: SpreadsheetRow[];
  faqs: GuideFaq[];
};

export const practicalGuides: PracticalGuide[] = [
  {
    id: "503020",
    title: "Como implementar a Regra 50/30/20",
    subtitle: "Um guia prático para dividir sua renda líquida em três grandes blocos sem precisar categorizar cada compra diária.",
    difficulty: "Baixa",
    timeframe: "30 minutos de organização inicial",
    steps: [
      {
        title: "Passo 1: Apure sua renda líquida real",
        description: "Some todos os ganhos líquidos recebidos no mês (salário líquido após impostos, rendimentos e freelas fixos). Este é o teto base para seus cálculos.",
        action: "Abra o extrato bancário dos últimos 30 dias e anote o total exato que caiu na conta."
      },
      {
        title: "Passo 2: Defina o teto de 50% para as necessidades",
        description: "Aluguel, contas de consumo (água, luz, internet), mercado básico, saúde e transporte essencial devem caber nesta metade. Se ultrapassar, identifique o que pode ser renegociado.",
        action: "Liste obrigações fixas e verifique se somam até 50% da sua renda."
      },
      {
        title: "Passo 3: Separe 30% para os desejos e estilo de vida",
        description: "Este bloco cobre lazer, restaurantes, assinaturas de streaming e compras pessoais. O objetivo não é eliminar o prazer, mas dar a ele um limite claro.",
        action: "Defina quanto você pode gastar com lazer semanalmente sem comprometer as contas."
      },
      {
        title: "Passo 4: Automatize 20% para o futuro",
        description: "Assim que a renda entrar, transfira imediatamente 20% para sua reserva de emergência ou investimentos de longo prazo antes de iniciar os gastos do mês.",
        action: "Programe uma transferência automática no dia útil seguinte ao recebimento."
      }
    ],
    toolTip: "Ideal para quem quer tranquilidade sem o peso de registrar cada centavo em uma planilha.",
    spreadsheetTitle: "Template Regra 50-30-20.csv",
    spreadsheetFilename: "regra-50-30-20-template.csv",
    spreadsheetHeaders: ["Bloco Orçamentário", "Percentual Meta", "Valor Calculado (R$)", "Exemplos de Gastos", "Status Atual"],
    spreadsheetRows: [
      ["Necessidades", "50%", "R$ 2.500,00", "Aluguel, Mercado e Contas", "Em andamento"],
      ["Desejos", "30%", "R$ 1.500,00", "Lazer, Restaurantes e Streaming", "Em andamento"],
      ["Prioridades e Futuro", "20%", "R$ 1.000,00", "Investimentos e Reserva", "Planejado"]
    ],
    faqs: [
      {
        question: "E se minhas necessidades ultrapassarem 50% da renda?",
        answer: "Isso é muito comum em grandes cidades ou em momentos de transição. O segredo é tratar o 50% como uma meta de longo prazo e buscar renegociar custos fixos gradualmente."
      },
      {
        question: "Devo usar a renda bruta ou a líquida para o cálculo?",
        answer: "Sempre utilize a renda líquida (o dinheiro que efetivamente cai na sua conta após impostos e descontos obrigatórios)."
      }
    ]
  },
  {
    id: "zero-based",
    title: "Como aplicar o Orçamento Base Zero",
    subtitle: "Dê uma função exata a cada unidade de renda antes que o mês comece, eliminando o dinheiro sem destino.",
    difficulty: "Média",
    timeframe: "1 hora no final de cada mês",
    steps: [
      {
        title: "Passo 1: Liste toda a renda esperada para o próximo mês",
        description: "Projete seus ganhos com cautela. Se houver renda variável, baseie-se no mês anterior mais conservador.",
        action: "Escreva o valor total disponível no topo da sua ferramenta de orçamento."
      },
      {
        title: "Passo 2: Atribua cada valor até que o saldo chegue a zero",
        description: "Distribua os reais disponíveis entre contas fixas, alimentação, metas e lazer até que a conta da receita menos os gastos resulte exatamente em zero.",
        action: "Garante que nenhum dinheiro fique solto sem destino planejado."
      },
      {
        title: "Passo 3: Registre cada gasto ao longo do mês",
        description: "À medida que comprar, debite do envelope ou categoria correspondente. Se uma categoria esvaziar, você precisará decidir conscientemente qual outra categoria financiará o ajuste.",
        action: "Adquira o hábito de lançar os recibos logo após a compra."
      },
      {
        title: "Passo 4: Faça uma revisão semanal de 15 minutos",
        description: "Ajuste desvios antes que o mês termine e celebre o progresso das metas cumpridas.",
        action: "Reserve a sexta-feira ou o domingo para olhar o painel de controle."
      }
    ],
    toolTip: "Perfeito para quem quer assumir o comando absoluto de cada centavo e evitar surpresas.",
    spreadsheetTitle: "Template Base Zero.csv",
    spreadsheetFilename: "orcamento-base-zero-template.csv",
    spreadsheetHeaders: ["Categoria", "Planejado (R$)", "Realizado (R$)", "Diferença (R$)", "Observações"],
    spreadsheetRows: [
      ["Receita Total", "5000.00", "5000.00", "0.00", "Renda líquida esperada"],
      ["Moradia e Contas", "2000.00", "1950.00", "+50.00", "Aluguel e luz"],
      ["Alimentação e Mercado", "900.00", "920.00", "-20.00", "Compras do mês"],
      ["Transporte", "400.00", "380.00", "+20.00", "Combustível"],
      ["Reserva", "1000.00", "1000.00", "0.00", "Aporte automático"],
      ["Lazer", "700.00", "750.00", "-50.00", "Passeios"]
    ],
    faqs: [
      {
        question: "O que significa 'base zero' na prática?",
        answer: "Significa que a conta final (Receitas menos Despesas e Investimentos) deve dar exatamente zero. Cada real tem um trabalho atribuído."
      }
    ]
  },
  {
    id: "envelope",
    title: "Como dominar o Orçamento por Envelopes",
    subtitle: "Controle gastos variáveis tangibilizando limites por categoria com dinheiro em espécie ou envelopes virtuais.",
    difficulty: "Média",
    timeframe: "45 minutos mensais",
    steps: [
      {
        title: "Passo 1: Identifique os pontos críticos de vazamento",
        description: "Geralmente, categorias como alimentação fora de casa, vestuário e lazer são os maiores ralos de orçamento.",
        action: "Escolha de 3 a 5 categorias para receberem envelopes dedicados."
      },
      {
        title: "Passo 2: Defina o teto mensal de cada envelope",
        description: "Estabeleça um valor realista baseado no seu histórico recente e na sua meta de economia.",
        action: "Separe o dinheiro em espécie ou crie carteiras virtuais em um app."
      },
      {
        title: "Passo 3: Regra do zero-transbordo",
        description: "Quando o dinheiro do envelope acabar, os gastos daquela categoria param até o próximo mês. Não retire de outras caixinhas sem planejamento.",
        action: "Deixe cartões de crédito guardados para evitar compras impulsivas nas categorias críticas."
      }
    ],
    toolTip: "Excelente para quem aprende mais rápido com limites visuais e concretos.",
    spreadsheetTitle: "Template Envelopes Virtuais.csv",
    spreadsheetFilename: "orcamento-envelopes-template.csv",
    spreadsheetHeaders: ["Envelope", "Orçamento Inicial (R$)", "Gasto Atual (R$)", "Saldo Restante (R$)", "Status"],
    spreadsheetRows: [
      ["Supermercado", "800.00", "520.00", "280.00", "Disponível"],
      ["Restaurantes", "300.00", "290.00", "10.00", "Atenção"],
      ["Farmácia", "200.00", "80.00", "120.00", "Disponível"],
      ["Lazer", "300.00", "300.00", "0.00", "Esgotado"]
    ],
    faqs: [
      {
        question: "Preciso usar dinheiro em espécie obrigatoriamente?",
        answer: "Não. Você pode usar subcontas bancárias ou aplicativos que criam envelopes virtuais."
      }
    ]
  },
  {
    id: "pay-yourself",
    title: "Como aplicar o método 'Pague-se Primeiro'",
    subtitle: "Inverta a lógica do consumo guardando o essencial antes de pagar as contas e os desejos.",
    difficulty: "Baixa",
    timeframe: "15 minutos de configuração única",
    steps: [
      {
        title: "Passo 1: Defina um percentual ou valor fixo viável",
        description: "Comece com 5%, 10% ou o valor que couber no seu momento atual, sem sufocar o orçamento imediato.",
        action: "Estabeleça uma meta inicial de acúmulo para a reserva de emergência."
      },
      {
        title: "Passo 2: Automatize a transferência de saída",
        description: "Configure sua conta bancária para mover automaticamente o dinheiro para uma aplicação de alta liquidez logo após o recebimento.",
        action: "Vincule a aplicação ao dia seguinte ao pagamento do salário."
      },
      {
        title: "Passo 3: Viva com o que sobrou",
        description: "Ajuste seu padrão de vida ao montante remanescente na conta corrente, tratando o valor investido como uma conta inegociável.",
        action: "Monitore o saldo restante sem culpa, sabendo que sua prioridade já foi protegida."
      }
    ],
    toolTip: "A escolha definitiva para quem costuma gastar tudo o que sobra na conta.",
    spreadsheetTitle: "Template Pague-se Primeiro.csv",
    spreadsheetFilename: "pague-se-primeiro-template.csv",
    spreadsheetHeaders: ["Meta de Poupança", "Valor Alvo (R$)", "Aporte Mensal (R$)", "Data", "Status"],
    spreadsheetRows: [
      ["Reserva de Emergência", "15000.00", "500.00", "Todo dia 6", "Ativo"],
      ["Longo Prazo", "50000.00", "300.00", "Todo dia 6", "Ativo"]
    ],
    faqs: [
      {
        question: "O que fazer se o valor poupado faltar no final do mês?",
        answer: "Reduza o valor da transferência automática no mês seguinte para um patamar sustentável."
      }
    ]
  },
  {
    id: "sinking-funds",
    title: "Como planejar Fundos para Despesas Futuras",
    subtitle: "Transforme despesas anuais e sazonais imprevistas em pequenas parcelas mensais previsíveis.",
    difficulty: "Média",
    timeframe: "30 minutos de mapeamento anual",
    steps: [
      {
        title: "Passo 1: Liste todas as despesas não mensais do ano",
        description: "IPVA, IPTU, material escolar, seguros, presentes de fim de ano e viagens programadas.",
        action: "Some o valor total anual esperado para essas despesas."
      },
      {
        title: "Passo 2: Divida o total por 12 meses",
        description: "Encontre a parcela mensal necessária para cobrir todas essas contas sem recorrer ao crédito ou desfalcar a reserva de emergência.",
        action: "Crie subcontas ou caixinhas separadas para cada fundo."
      },
      {
        title: "Passo 3: Deposite a parcela todo mês",
        description: "Trate essa parcela como um boleto obrigatório. Quando a conta do IPTU chegar, o dinheiro já estará totalmente provisionado.",
        action: "Acompanhe o crescimento dos fundos no seu painel de controle."
      }
    ],
    toolTip: "Elimina o estresse das faturas de início de ano e de grandes manutenções.",
    spreadsheetTitle: "Template Fundos Futuros.csv",
    spreadsheetFilename: "fundos-futuros-template.csv",
    spreadsheetHeaders: ["Despesa Sazonal", "Valor Total (R$)", "Vencimento", "Reserva Mensal (R$)", "Acumulado (R$)"],
    spreadsheetRows: [
      ["IPVA", "2400.00", "Janeiro", "200.00", "1200.00"],
      ["IPTU", "1800.00", "Fevereiro", "150.00", "900.00"],
      ["Férias", "3600.00", "Julho", "300.00", "1800.00"]
    ],
    faqs: [
      {
        question: "Qual a diferença entre fundo futuro e reserva de emergência?",
        answer: "A reserva é para imprevistos absolutos. Os fundos futuros são para gastos já previstos, mas de periodicidade anual."
      }
    ]
  },
  {
    id: "cash-flow",
    title: "Como estruturar um Orçamento de Fluxo de Caixa",
    subtitle: "Mapeie entradas e saídas por datas para antecipar períodos de aperto e organizar contas de renda variável.",
    difficulty: "Média",
    timeframe: "45 minutos de montagem do calendário",
    steps: [
      {
        title: "Passo 1: Construa um calendário financeiro mensal",
        description: "Liste os dias em que você recebe e os dias exatos em que cada boleto ou fatura vence.",
        action: "Visualize o fluxo dia a dia em uma planilha ou aplicativo."
      },
      {
        title: "Passo 2: Identifique os vales de liquidez",
        description: "Descubra se há dias no mês em que o saldo fica perigosamente baixo antes da próxima entrada de recursos.",
        action: "Reorganize datas de vencimento de contas se necessário junto aos fornecedores."
      },
      {
        title: "Passo 3: Mantenha um colchão de segurança",
        description: "Para quem tem renda variável, o fluxo de caixa exige um saldo mínimo na conta corrente para absorver atrasos de clientes.",
        action: "Defina um piso intocável na conta corrente para amortecer oscilações."
      }
    ],
    toolTip: "Indispensável para freelancers, autônomos e quem lida com recebimentos irregulares.",
    spreadsheetTitle: "Template Fluxo de Caixa.csv",
    spreadsheetFilename: "fluxo-de-caixa-template.csv",
    spreadsheetHeaders: ["Data", "Descrição", "Tipo", "Valor (R$)", "Saldo (R$)"],
    spreadsheetRows: [
      ["05/08", "Honorários", "Entrada", "5000.00", "5000.00"],
      ["06/08", "Aluguel", "Saída", "1500.00", "3500.00"],
      ["10/08", "Supermercado", "Saída", "400.00", "3100.00"]
    ],
    faqs: [
      {
        question: "Como gerenciar o fluxo de caixa com renda incerta?",
        answer: "Projete seus gastos essenciais com base no seu pior mês histórico."
      }
    ]
  },
  {
    id: "values-based",
    title: "Como aplicar o Orçamento Baseado em Valores",
    subtitle: "Corte sem remorso o que não importa e abra espaço financeiro para o que realmente traz significado à sua vida.",
    difficulty: "Baixa",
    timeframe: "40 minutos de reflexão pessoal",
    steps: [
      {
        title: "Passo 1: Liste seus três grandes valores de vida",
        description: "O que realmente importa para você hoje? (Ex: segurança familiar, experiências de viagem, autonomia profissional, tempo livre).",
        action: "Escreva em um papel o que traz satisfação real e duradoura."
      },
      {
        title: "Passo 2: Audite seus gastos sob a ótica dos valores",
        description: "Analise o extrato recente e marque o que está alinhado aos seus valores e o que é puro piloto automático ou pressão social.",
        action: "Identifique gastos automáticos que podem ser cortados sem perda de bem-estar."
      },
      {
        title: "Passo 3: Redirecione os recursos",
        description: "Envie o dinheiro economizado nos gastos irrelevantes diretamente para financiar seus valores centrais.",
        action: "Crie uma caixinha específica para o valor que você decidiu priorizar."
      }
    ],
    toolTip: "Transforma o orçamento de uma ferramenta restritiva em um instrumento de realização pessoal.",
    spreadsheetTitle: "Template Valores de Vida.csv",
    spreadsheetFilename: "orcamento-valores-template.csv",
    spreadsheetHeaders: ["Valor Prioritário", "Gasto Alinhado", "Valor (R$)", "Impacto", "Ação"],
    spreadsheetRows: [
      ["Família", "Passeios", "400.00", "Alto", "Manter"],
      ["Autonomia", "Cursos", "300.00", "Alto", "Expandir"],
      ["Status", "Grifes", "500.00", "Baixo", "Cortar"]
    ],
    faqs: [
      {
        question: "Cortar gastos com base em valores significa virar minimalista radical?",
        answer: "Não. Significa apenas eliminar o desperdício em coisas que você não valoriza."
      }
    ]
  },
  {
    id: "conscious-spending",
    title: "Como estruturar seu Conscious Spending Plan",
    subtitle: "A metodologia de Ramit Sethi para gastar sem culpa naquilo que ama e automatizar o resto.",
    difficulty: "Baixa",
    timeframe: "45 minutos de reflexão e ajustes",
    steps: [
      {
        title: "Passo 1: Aloque de 50% a 60% para custos fixos",
        description: "Moradia, contas essenciais, transporte e dívidas básicas.",
        action: "Garanta que suas obrigações fiquem dentro deste patamar."
      },
      {
        title: "Passo 2: Destine 10% para investimentos de longo prazo",
        description: "Aposentadoria, previdência e construção de patrimônio.",
        action: "Programe aportes automáticos mensais."
      },
      {
        title: "Passo 3: Separe 5% a 10% para economias de curto prazo",
        description: "Viagens, trocas de eletrônicos e emergências.",
        action: "Guarde em aplicações com resgate rápido."
      },
      {
        title: "Passo 4: Reserve 20% a 35% para gastos sem culpa",
        description: "Jantares, hobbies, presentes e tudo o que trouxer alegria sem remorso.",
        action: "Gaste esse bloco com total tranquilidade, pois os demais pilares já estão blindados."
      }
    ],
    toolTip: "O guia perfeito para quem quer prosperar sem restrições sufocantes.",
    spreadsheetTitle: "Template Conscious Spending.csv",
    spreadsheetFilename: "conscious-spending-template.csv",
    spreadsheetHeaders: ["Pilar", "Meta (%)", "Valor (R$)", "O que compõe"],
    spreadsheetRows: [
      ["Custos Fixos", "55%", "2750.00", "Moradia, contas e mercado"],
      ["Investimentos", "10%", "500.00", "Aposentadoria"],
      ["Curto Prazo", "10%", "500.00", "Viagens e reservas"],
      ["Gastos Sem Culpa", "25%", "1250.00", "Lazer e prazeres"]
    ],
    faqs: [
      {
        question: "Como gastar sem culpa sem me endividar?",
        answer: "Você só gasta sem culpa após automatizar os investimentos e garantir os custos fixos."
      }
    ]
  }
];

export const getPracticalGuide = (id: string) => practicalGuides.find(guide => guide.id === id) || {
  id,
  title: "Como implementar esta ferramenta",
  subtitle: "Passo a passo geral para configurar e extrair o melhor proveito da plataforma.",
  difficulty: "Média" as const,
  timeframe: "30 a 45 minutos",
  steps: [
    {
      title: "Passo 1: Acesse a fonte oficial e crie sua conta",
      description: "Visite o site verificado da ferramenta, avalie os termos de privacidade e inicie o período de teste ou plano gratuito.",
      action: "Abra o link direto fornecido na ficha do portal."
    },
    {
      title: "Passo 2: Conecte contas ou importe o histórico",
      description: "Configure a sincronização bancária automatizada ou importe seus arquivos CSV de transações recentes.",
      action: "Verifique se as contas principais foram sincronizadas corretamente."
    },
    {
      title: "Passo 3: Defina categorias e regras iniciais",
      description: "Personalize as categorias de gastos conforme sua realidade e crie regras automáticas para facilitar a rotina.",
      action: "Faça uma varredura nas transações dos últimos 30 dias."
    },
    {
      title: "Passo 4: Estabeleça um ritual semanal de acompanhamento",
      description: "Reserve 15 minutos por semana para revisar lançamentos, confirmar categorias e ajustar desvios.",
      action: "Coloque um lembrete recorrente no calendário."
    }
  ],
  toolTip: "Use as orientações da fonte oficial para adaptar esta plataforma ao seu modelo de orçamento.",
  spreadsheetTitle: "Template de Acompanhamento Geral.csv",
  spreadsheetFilename: "template-geral-financas.csv",
  spreadsheetHeaders: ["Data", "Categoria", "Descrição", "Valor (R$)", "Status"],
  spreadsheetRows: [
    ["01/08", "Receita", "Salário Mensal", "5000.00", "Confirmado"],
    ["05/08", "Moradia", "Aluguel", "1500.00", "Pago"],
    ["10/08", "Alimentação", "Supermercado", "450.00", "Pago"]
  ],
  faqs: [
    {
      question: "Como escolher entre uma planilha e um aplicativo automático?",
      answer: "Se você gosta de personalizar e ter controle total dos dados, use planilhas. Se prefere praticidade e sincronização bancária em tempo real, escolha uma plataforma automatizada."
    }
  ]
};
