// frontendEagledac/src/context/ThemeProvider.tsx

import { useState, useEffect } from "react";
import { ThemeContext, type Theme } from "./ThemeContext";
import type { ThemeContextType } from "./ThemeContext";
import type { ReactNode } from "react";

type ThemeProviderProps = {
  children: ReactNode;
  initialTheme: Theme;
};

export const ThemeProvider = ({
  children,
  initialTheme,
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // Actualizar theme-color meta tag
    const metaTheme = document.querySelector("meta[name='theme-color']");
    if (metaTheme) {
      metaTheme.setAttribute(
        "content",
        theme === "dark" ? "#121826" : "#ffffff"
      );
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value: ThemeContextType = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
