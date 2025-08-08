// frontendEagledac/src/hotfix.ts

declare global {
  interface Window {
    __react_19_hotfix: boolean;
  }
}

// src/hotfix.ts
export const applyReact19Hotfix = () => {
    if (!window.__react_19_hotfix) {
      const originalConsoleError = console.error;
      console.error = (...args: unknown[]) => {
        if (typeof args[0] === "string" && args[0].includes("No QueryClient set")) {
          return;
        }
        originalConsoleError(...args);
      };
      window.__react_19_hotfix = true;
    }
  };