# Projeto TODO

- [x] Adicionar dez metodologias e plataformas internacionais ao catálogo.
- [x] Ampliar o modelo de dados com nível de esforço e grau de automação.
- [x] Exibir automação nas fichas e implementar filtros de esforço e automação.
- [x] Criar assistente interativo por perfil, objetivo, disponibilidade e automação.
- [x] Atualizar contagem dinâmica, navegação e textos de orientação.
- [x] Executar testes unitários, checagem TypeScript e build de produção.
- [x] Revisar a interface em desktop e móvel.
- [x] Salvar o checkpoint final da expansão.

## Critérios implementados no assistente

- Perfil: iniciante, detalhista ou renda variável.
- Objetivo: quitar dívidas, poupar/investir ou acompanhar patrimônio.
- Rotina: pouco esforço, esforço médio ou controle total.
- Automação: alta, assistida ou baixa, derivada da rotina escolhida.
- Saída: até três recomendações ordenadas por compatibilidade, com acesso à ficha completa.

## Fontes internacionais catalogadas

- Conscious Spending Plan — https://www.iwillteachyoutoberich.com/conscious-spending-basics/
- EveryDollar — https://www.ramseysolutions.com/money/everydollar
- Copilot Money — https://www.copilot.money/
- Quicken Simplifi — https://simplifi.quicken.com/
- Tiller Money — https://tiller.com/how-tiller-works/
- Empower Personal Dashboard — https://www.empower.com/tools
- PocketGuard — https://pocketguard.com/
- Buckets — https://www.budgetwithbuckets.com/
- Lunch Money — https://lunchmoney.app/
- Actual Budget — https://actualbudget.org/


- [x] Criar o módulo de dados para os guias práticos de cada metodologia.
- [x] Implementar a seção visual de guias no frontend com abas e passo a passo.
- [x] Validar a leitura e a responsividade da nova seção.
- [x] Salvar o checkpoint final com os guias práticos incorporados.


- [x] Implementar calculadora interativa de divisão de orçamento baseada na renda.
- [x] Adicionar prévia visual das planilhas antes do download.
- [x] Persistir checklists e metodologias favoritas usando localStorage.
- [x] Criar e validar a habilidade reutilizável do processo com skill-creator.
- [x] Validar testes, build e responsividade dos novos recursos.
- [x] Salvar o checkpoint publicado da atualização.


- [x] Adicionar gráfico interativo à calculadora de orçamento.
- [x] Implementar exportação em PDF de checklists, favoritos e resultados da calculadora.
- [x] Validar PDF, gráfico e responsividade em desktop e móvel.
- [x] Salvar o checkpoint publicado da atualização.


- [x] Adicionar campos de meta, reserva atual e aporte mensal à calculadora.
- [x] Exibir progresso percentual e prazo estimado para atingir a reserva.
- [x] Incluir os dados da reserva no relatório PDF exportado.
- [x] Validar a nova funcionalidade em desktop e móvel e salvar checkpoint.


- [x] Criar shell desktop multiplataforma com carregamento local do portal.
- [x] Garantir funcionamento offline do catálogo, assistente, calculadora, guias, mapa, favoritos, checklists e exportação.
- [x] Configurar armazenamento local e permissões seguras para o app.
- [x] Configurar empacotamento para macOS e Windows.
- [x] Validar build e fluxos principais em modo offline.
- [x] Entregar o código e os artefatos disponíveis do aplicativo.


- [x] Ajustar o base do Vite para carregamento via file:// no Electron.
- [x] Executar e validar o app empacotado em modo offline com fluxos principais.
- [x] Salvar checkpoint final da versão desktop offline.
- [x] Documentar que instaladores nativos de macOS e Windows precisam ser gerados em hosts apropriados.
- [x] Corrigir o roteamento do Electron para abrir a Home quando o app usa file://.
- [x] Corrigir o preload do Electron para carregar corretamente com sandbox habilitado.
- [x] Validar o AppImage final em execução isolada com estado local limpo.
- [x] Executar o AppImage com perfil Electron novo e limpar todas as chaves de localStorage antes do smoke test.
- [x] Confirmar transições de primeiro uso: checklist 0→1, calculadora grava nova renda e mapa grava cenário atualizado.
- [x] Gerar e validar o artefato Windows NSIS em host Windows ou CI Windows.
- [x] Gerar e validar artefatos macOS DMG e ZIP em host macOS ou CI macOS.
- [x] Prioridade atual: executar a geração nativa macOS DMG e ZIP primeiro.
- [x] Configurar pipeline CI multiplataforma para gerar NSIS, Portable, DMG e ZIP.
- [x] Usar nomes de artefato distintos para Windows NSIS e Portable.
- [x] Gerar e validar o artefato Windows Portable x64 no sandbox Linux.
- [ ] Executar o artefato Windows Portable x64 em host ou CI Windows e validar abertura offline.
- [ ] Executar o instalador NSIS no CI Windows e validar instalação e abertura offline.
- [ ] Registrar evidências da validação funcional do NSIS.
- [ ] Validar DMG e ZIP no CI macOS, confirmando abertura offline do bundle.
- [ ] Registrar evidências da validação funcional dos artefatos macOS.
- [ ] Registrar evidências da execução Windows Portable e dos fluxos principais.
- [x] Corrigir a instalação do pnpm no workflow CI para os runners macOS e Windows.
- [ ] Diagnosticar e corrigir o smoke test Windows no runner nativo.
