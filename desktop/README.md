# Paz em Finanças — aplicativo desktop offline

O aplicativo usa Electron para empacotar a interface React existente como um aplicativo nativo para macOS e Windows. No modo distribuído, o processo principal carrega `dist/public/index.html` diretamente do disco, sem depender de servidor web, banco remoto, OAuth, analytics ou conexão com a internet.

## Funcionalidades disponíveis offline

O catálogo comparativo, filtros, assistente, calculadora de orçamento, gráfico de distribuição, metas de reserva de emergência, guias práticos, prévias e downloads CSV, FAQs, reflexões pessoais, checklists, experimentos comportamentais, Mapa de Paz Financeira, cenários trimestrais, favoritos e exportação de relatório em PDF permanecem no renderer e usam dados locais ou `localStorage`.

Links externos para fontes oficiais continuam visíveis para consulta quando houver conexão, mas não são necessários para navegar, pesquisar, comparar ou usar as ferramentas locais.

## Desenvolvimento

Na raiz do projeto, instale as dependências com `pnpm install`. Para abrir o modo de desenvolvimento com hot reload, execute `pnpm desktop:dev`. Para produzir a build web local usada pelo Electron, execute `pnpm desktop:build`.

## Empacotamento

`pnpm desktop:package` executa o build e chama o Electron Builder. Em um host macOS, gera DMG e ZIP; em um host Windows, gera instalador NSIS e executável portátil; em Linux, gera AppImage para validação local. A assinatura de código e o notarization devem ser configurados pelo distribuidor com certificados próprios antes da publicação pública.

## Privacidade

O app não envia os dados do usuário para um servidor no modo offline. Favoritos, checklists, reflexões, cenários e a última simulação ficam no armazenamento local do perfil do aplicativo. A limpeza dos dados pode ser feita nas ferramentas do sistema operacional ou por uma futura ação explícita de reset.
