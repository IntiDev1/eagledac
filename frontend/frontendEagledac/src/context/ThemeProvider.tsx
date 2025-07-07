// frontend/src/context/ThemeProvider.tsx

import { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import type { ThemeContextType } from "./ThemeContext";
import type { ReactNode } from "react";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value: ThemeContextType = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
