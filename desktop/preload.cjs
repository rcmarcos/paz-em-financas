const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("pazEmFinancasDesktop", {
  platform: process.platform,
  isOffline: true,
  version: "1.0.0",
});
