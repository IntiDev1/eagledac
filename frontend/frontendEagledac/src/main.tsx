// frontendEagledac/src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

//wagmi setup
import { WagmiProvider, createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";

// TanStack Query (requerido por wagmi)
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//Estilos
import "./styles/main.scss";
import { ThemeProvider } from "./context/ThemeProvider";
import { ContractsProvider } from "./context/ContractsProvider";

// ✅ 1. Primero crea el QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// ✅ 2. Define la cadena Metis manualmente
const metis = {
  id: 1088,
  name: "Metis Andromeda",
  network: "metis",
  nativeCurrency: {
    name: "METIS",
    symbol: "METIS",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://andromeda.metis.io/?owner=1088"] },
  },
  blockExplorers: {
    default: {
      name: "Andromeda Explorer",
      url: "https://andromeda-explorer.metis.io",
    },
  },
};

// ✅ 3. Configuración de wagmi
const config = createConfig({
  chains: [metis],
  connectors: [injected()],
  transports: {
    [metis.id]: http("https://andromeda.metis.io/?owner=1088"),
  },
});

// Fuentes y configuración de tema (sin cambios)
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

const getInitialTheme = (): "light" | "dark" => {
  const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  return savedTheme || (systemPrefersDark ? "dark" : "light");
};

const initialTheme = getInitialTheme();
document.documentElement.setAttribute("data-theme", initialTheme);

const metaTheme = document.createElement("meta");
metaTheme.name = "theme-color";
metaTheme.content = initialTheme === "dark" ? "#121826" : "#ffffff";
document.head.appendChild(metaTheme);

// ✅ 4. Hotfix crítico para React 19
const applyReact19Hotfix = () => {
  const originalConsoleError = console.error;
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("No QueryClient set")) {
      return;
    }
    originalConsoleError(...args);
  };
};
applyReact19Hotfix();

const root = ReactDOM.createRoot(document.getElementById("root")!);

// ✅ 5. Estructura de proveedores corregida
root.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider initialTheme={initialTheme}>
          <ContractsProvider>
            <App />
          </ContractsProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
