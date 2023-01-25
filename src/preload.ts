// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";
contextBridge.exposeInMainWorld("_api", {
  increment: () => ipcRenderer.invoke("increment"),
  decrement: () => ipcRenderer.invoke("decrement"),
  reset: () => ipcRenderer.invoke("reset"),
  currentCount: () => ipcRenderer.invoke("currentCount"),
});
