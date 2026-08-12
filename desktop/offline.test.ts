import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");

function read(relativePath: string) {
  return fs.readFileSync(path.join(projectRoot, relativePath), "utf8");
}

describe("desktop offline packaging", () => {
  it("loads the renderer from a local file", () => {
    const main = read("desktop/main.mjs");
    expect(main).toContain("window.loadFile");
    expect(main).toContain("dist");
    expect(main).toContain("public");
    expect(main).toContain("index.html");
  });

  it("keeps Electron renderer isolation enabled", () => {
    const main = read("desktop/main.mjs");
    expect(main).toContain("contextIsolation: true");
    expect(main).toContain("nodeIntegration: false");
    expect(main).toContain("sandbox: true");
  });

  it("does not inject the web analytics script", () => {
    const html = read("client/index.html");
    expect(html).not.toContain("VITE_ANALYTICS_ENDPOINT");
    expect(html).not.toContain("umami");
  });

  it("does not depend on remote fonts in the main stylesheet", () => {
    const css = read("client/src/index.css");
    expect(css).not.toContain("fonts.googleapis.com");
    expect(css).not.toContain("manus-storage");
  });
});
