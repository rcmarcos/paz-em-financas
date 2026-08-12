# Paz em Finanças — aplicativo desktop offline

O aplicativo usa Electron para empacotar a interface React existente como um aplicativo nativo para macOS e Windows. No modo distribuído, o processo principal carrega `dist/public/index.html` diretamente do disco, sem depender de servidor web, banco remoto, OAuth, analytics ou conexão com a internet.

## Funcionalidades disponíveis offline

O catálogo comparativo, filtros, assistente, calculadora de orçamento, gráfico de distribuição, metas de reserva de emergência, guias práticos, prévias e downloads CSV, FAQs, reflexões pessoais, checklists, experimentos comportamentais, Mapa de Paz Financeira, cenários trimestrais, favoritos e exportação de relatório em PDF permanecem no renderer e usam dados locais ou `localStorage`.

Links externos para fontes oficiais continuam visíveis para consulta quando houver conexão, mas não são necessários para navegar, pesquisar, comparar ou usar as ferramentas locais.

## Desenvolvimento

Na raiz do projeto, instale as dependências com `pnpm install`. Para abrir o modo de desenvolvimento com hot reload, execute `pnpm desktop:dev`. Para produzir a build web local usada pelo Electron, execute `pnpm desktop:build`.

## Guia de Empacotamento Nativo por Sistema Operacional

Como o **Paz em Finanças** utiliza o Electron, a compilação de instaladores nativos binários requer que o comando seja executado no sistema operacional de destino (ou através de pipelines CI/CD configuradas para cada plataforma). Abaixo estão os procedimentos detalhados para cada ambiente:

### 1. macOS (Geração de .dmg e .zip)
* **Requisitos:** Um computador rodando macOS com Node.js, pnpm e Xcode Command Line Tools instalados (`xcode-select --install`).
* **Passos no terminal:**
  ```bash
  git clone <seu-repositorio>
  cd portal-financas-pessoais
  pnpm install
  pnpm desktop:build
  pnpm exec electron-builder --mac --config desktop/electron-builder.yml
  ```
* **Artefatos gerados:** `release/Paz em Finanças-1.0.0-mac-x64.dmg` (ou `arm64` para chips Apple Silicon M1/M2/M3).

### 2. Windows (Geração de instalador NSIS .exe e versão Portable)
* **Requisitos:** Um computador rodando Windows (ou ambiente CI Windows) com Node.js e pnpm instalados.
* **Passos no Prompt de Comando / PowerShell:**
  ```cmd
  git clone <seu-repositorio>
  cd portal-financas-pessoais
  pnpm install
  pnpm desktop:build
  pnpm exec electron-builder --win --config desktop/electron-builder.yml
  ```
* **Artefatos gerados:**
  * `release/Paz em Finanças-Setup-1.0.0-x64.exe` (instalador assistido com atalhos e desinstalador).
  * `release/Paz em Finanças-Portable-1.0.0-x64.exe` (versão executável portátil sem instalação).

### 3. Linux (Geração de AppImage)
* **Requisitos:** Ambiente Linux (como o sandbox atual).
* **Passos no terminal:**
  ```bash
  pnpm desktop:package
  ```
* **Artefato gerado:** `release/Paz em Finanças-1.0.0-linux-x86_64.AppImage`.

### 4. Pipeline CI nativo

O arquivo `.github/workflows/desktop-build.yml` gera os quatro alvos em runners nativos: macOS produz DMG e ZIP; Windows produz NSIS e Portable. O workflow também executa um smoke test do Portable no runner Windows antes de publicar os artefatos como uma ação do GitHub. Para utilizá-lo, envie o projeto a um repositório GitHub e execute **Actions → Desktop installers → Run workflow**, ou crie uma tag no formato `v1.0.0`.

No sandbox Linux, o artefato Portable x64 foi gerado com sucesso. A tentativa de NSIS foi bloqueada pela execução Wine do bootstrap Windows; os instaladores macOS não podem ser produzidos nativamente neste host Linux. Por isso, o workflow CI é o caminho recomendado para obter validação funcional Windows e os artefatos macOS.

## Privacidade

O app não envia os dados do usuário para um servidor no modo offline. Favoritos, checklists, reflexões, cenários e a última simulação ficam no armazenamento local do perfil do aplicativo. A limpeza dos dados pode ser feita nas ferramentas do sistema operacional ou por uma futura ação explícita de reset.
