import { app, BrowserWindow, Menu, shell } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const window = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1100,
    minHeight: 720,
    backgroundColor: "#FAEED8",
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  window.once("ready-to-show", () => window.show());

  window.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//i.test(url)) {
      void shell.openExternal(url);
    }
    return { action: "deny" };
  });

  window.webContents.on("will-navigate", (event, url) => {
    if (!url.startsWith("file://")) {
      event.preventDefault();
      if (/^https?:\/\//i.test(url)) {
        void shell.openExternal(url);
      }
    }
  });

  window.webContents.once("did-finish-load", async () => {
    if (process.env.PAZ_SMOKE_TEST !== "true") return;
    try {
      const result = await window.webContents.executeJavaScript(`
        (async () => {
          const wait = (ms = 80) => new Promise(resolve => setTimeout(resolve, ms));
          await wait(1000);
          const localKeys = ["atlas-favorites", "atlas-checklists", "atlas-calculator-result", "atlas-peace-scenarios", "atlas-peace-active-id", "atlas-peace-values", "atlas-peace-goal", "atlas-experiment-trackers"];
          localKeys.forEach(key => localStorage.removeItem(key));
          const requiredSections = ["#catalogo", "#assistente", "#calculadora", "#guias-praticos", "#comportamento", "#mapa-paz"];
          const missing = requiredSections.filter(selector => !document.querySelector(selector));
          if (missing.length) return { ok: false, reason: "seções ausentes: " + missing.join(", ") };
          if (document.querySelectorAll(".entry-card").length < 23) return { ok: false, reason: "catálogo incompleto" };

          const favorite = document.querySelector(".favorite-button");
          if (!favorite) return { ok: false, reason: "favoritos indisponíveis" };
          favorite.click();
          await wait(500);
          if (!favorite.classList.contains("is-favorite") || !JSON.parse(localStorage.getItem("atlas-favorites") || "[]").length) return { ok: false, reason: "favorito não persistiu" };

          const setReactInput = (element, value) => {
            const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
            setter?.call(element, value);
            element.dispatchEvent(new Event("input", { bubbles: true }));
            element.dispatchEvent(new Event("change", { bubbles: true }));
          };
          const income = document.querySelector("#income-input");
          if (!income) return { ok: false, reason: "calculadora indisponível" };
          setReactInput(income, "7200");
          await wait(150);
          const calc = JSON.parse(localStorage.getItem("atlas-calculator-result") || "null");
          if (!calc || calc.income !== 7200) return { ok: false, reason: "calculadora não persistiu a simulação" };

          const guideCheck = document.querySelector(".guide-checkbox-btn");
          if (!guideCheck) return { ok: false, reason: "checklist indisponível" };
          guideCheck.click();
          await wait();
          const checklistState = JSON.parse(localStorage.getItem("atlas-checklists") || "{}");
          if (Object.keys(checklistState).length !== 1) return { ok: false, reason: "checklist não iniciou do zero" };

          const scenarioName = document.querySelector("#scenario-name-input");
          if (!scenarioName || !document.querySelector("#custom-goal-input")) return { ok: false, reason: "Mapa de Paz incompleto" };
          setReactInput(scenarioName, "Smoke test offline");
          await wait();
          const scenarios = JSON.parse(localStorage.getItem("atlas-peace-scenarios") || "[]");
          if (!scenarios.length || !scenarios.some(scenario => scenario.name === "Smoke test offline")) return { ok: false, reason: "Mapa de Paz não iniciou/atualizou cenário" };

          const assistantTrigger = Array.from(document.querySelectorAll("button")).find(button => button.textContent?.includes("Abrir assistente"));
          if (!assistantTrigger) return { ok: false, reason: "gatilho do assistente indisponível" };
          assistantTrigger.click();
          await wait();
          const assistantOptions = document.querySelectorAll(".assistant-option");
          if (assistantOptions.length < 3) return { ok: false, reason: "assistente não abriu" };
          assistantOptions[0].click();
          await wait();
          document.querySelector(".assistant-option")?.click();
          await wait();
          document.querySelector(".assistant-option")?.click();
          await wait();
          if (!document.querySelector(".assistant-results")) return { ok: false, reason: "assistente não concluiu" };

          const preview = document.querySelector(".preview-sheet-button");
          if (!preview) return { ok: false, reason: "prévia de planilha indisponível" };
          preview.click();
          await wait();
          if (!document.querySelector(".sheet-preview-panel")) return { ok: false, reason: "prévia de planilha não abriu" };

          return { ok: true, checks: ["catálogo", "favoritos", "calculadora", "checklists", "mapa", "assistente", "prévia"] };
        })()
      `);
      console.log(`[PAZ_SMOKE_TEST] ${JSON.stringify(result)}`);
      app.exit(result?.ok ? 0 : 1);
    } catch (error) {
      console.error("[PAZ_SMOKE_TEST] erro", error);
      app.exit(1);
    }
  });

  const devServerUrl = process.env.PAZ_DEV_SERVER_URL;
  if (devServerUrl) {
    void window.loadURL(devServerUrl);
  } else {
    void window.loadFile(path.join(__dirname, "..", "dist", "public", "index.html"));
  }
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
