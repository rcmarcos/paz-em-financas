# Direção de design — Guia Comparativo de Finanças Pessoais

## Três abordagens consideradas

### Abordagem 1 — Atlas Editorial
**Introdução breve:** Um atlas de pesquisa com linguagem editorial, respiro generoso e acentos de cor terrosos. A sensação é de clareza, confiança e descoberta — como uma biblioteca bem curada que torna um assunto complexo navegável.

**Probabilidade:** 0,07

### Abordagem 2 — Painel Cívico
**Introdução breve:** Uma interface de utilidade pública, com alto contraste, estrutura modular e linguagem direta. Prioriza escaneabilidade e velocidade para quem quer comparar muitas opções com pouca fricção.

**Probabilidade:** 0,04

### Abordagem 3 — Oficina Financeira
**Introdução breve:** Um ambiente mais caloroso e prático, com textura de papel, diagramas simples e pequenas provocações visuais. A intenção é fazer o usuário sentir que está montando seu próprio sistema de decisão.

**Probabilidade:** 0,09

## Abordagem escolhida: Atlas Editorial

### Design Movement
Editorial contemporâneo com referências de publicações de pesquisa, bibliotecas digitais e sistemas de sinalização de museus. A interface combina tipografia expressiva, camadas de papel e uma organização que privilegia relações e contexto em vez de uma grade genérica de cartões.

### Princípios centrais
1. **Clareza antes da abundância:** cada item deve responder rapidamente o que é, para quem serve e o que observar.
2. **Curadoria visível:** categorias, etiquetas e fontes expõem a lógica do acervo em vez de esconder a seleção.
3. **Contraste com propósito:** fundos suaves sustentam a leitura; a cor de assinatura aparece apenas onde ajuda a decidir.
4. **Comparação como narrativa:** a seleção e a comparação devem parecer uma sequência de descobertas, não uma planilha fria.

### Filosofia de cor
O fundo marfim remete a papel e reduz a sensação de “painel financeiro”. O verde pinheiro comunica estabilidade sem cair no azul corporativo; o terracota funciona como marcação editorial para oportunidades, atenção e movimento. O amarelo queimado aparece como sinal de curiosidade e ajuda a diferenciar o portal de dashboards bancários convencionais.

### Paradigma de layout
Uma navegação em duas camadas: uma faixa superior de orientação e um corpo assimétrico em que a coluna de contexto fica ancorada à esquerda enquanto o catálogo ocupa o eixo principal. A busca é tratada como ferramenta de entrada, não como um banner isolado. A comparação pode surgir como uma gaveta lateral persistente, mantendo o usuário no acervo.

### Elementos de assinatura
- Um **marcador vertical terracota** acompanha títulos de seção, como uma ficha de arquivo.
- Um **selo circular de método** identifica o tipo de abordagem com abreviações e pequenas linhas radiais.
- Uma textura sutil de **papel pontilhado** aparece em áreas de orientação, sem competir com o conteúdo.

### Filosofia de interação
Interações devem parecer manuseio de fichas: seleção imediata, estados ativos claros e comparação reversível. O usuário sempre sabe quantos itens selecionou, por que eles estão no conjunto e como retirar um item sem perder o restante da pesquisa.

### Animação
Entradas curtas e em cascata de 40–60 ms entre os resultados, com deslocamento vertical mínimo e opacidade. Hovers usam apenas mudança de cor, sombra e 2–3 px de elevação. A gaveta de comparação desliza em 220 ms com easing de saída; nenhuma animação deve bloquear a leitura ou esconder mudanças de estado. Respeitar `prefers-reduced-motion`.

### Sistema tipográfico
**Fraunces** para títulos, números de destaque e o nome do portal, usando itálico pontual para termos de orientação. **DM Sans** para corpo, filtros, tabelas e microcopy. Hierarquia: título de página 56/1,0 em desktop; chamadas 28–34/1,1; corpo 15–16/1,55; etiquetas em 11–12 px com espaçamento de letras levemente ampliado.

### Essência da marca
Um guia comparativo em português para quem quer escolher uma forma de cuidar do dinheiro sem depender de jargão ou de uma única escola. **Curioso, criterioso, acolhedor.**

### Voz da marca
Headlines soam como convites para investigar; CTAs são específicos e sem pressão; microcopy explica o critério de forma humana. Evitar promessas de enriquecimento e linguagem de urgência.

Exemplos:
- “Encontre um método que caiba na sua vida.”
- “Compare as regras antes de escolher a ferramenta.”

### Wordmark e logo
O símbolo é uma pequena rosa dos ventos construída com quatro abas de ficha, formando uma seta aberta para cima. O wordmark usa Fraunces em caixa baixa, com a palavra “guia” em peso regular e “comparativo” em itálico, sempre acompanhado do símbolo nas aplicações principais.

### Cor de assinatura
**Terracota de arquivo — `#C45A3B`**. É o sinal visual proprietário do portal: aparece nos marcadores, nos estados selecionados e em chamadas editoriais, nunca como preenchimento indiscriminado.

## Decisões de estilo

- O produto será uma interface clara, editorial e orientada à pesquisa, não um dashboard bancário.
- A busca e os filtros serão o centro da experiência; o hero terá função de orientação e não de decoração.
- O catálogo será rico em critérios: tipo, esforço, nível de automação, adequação e pontos de atenção.
- O conteúdo será em português, com nomes originais preservados quando forem parte do método ou da marca.
