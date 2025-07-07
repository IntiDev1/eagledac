// frontend/src/context/ThemeContext.tsx

import { createContext } from "react";

// Define el tipo de contexto
export type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

// Crea el contexto con valor inicial undefined
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
