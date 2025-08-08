// frontendEagledac/src/components/Header.tsx
import { Link } from "react-router-dom";
import { useTheme } from "../context/useTheme";
import logo from "../assets/eagleDAC-1.png";
import { FiSun, FiMoon } from "react-icons/fi";

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="branding">
          <img src={logo} alt="EagleDAC Logo" className="logo" />
          <span className="title">EagleDAC</span>
        </Link>

        <button
          className="theme-switcher"
          onClick={toggleTheme}
          aria-label={`Cambiar a modo ${theme === "dark" ? "claro" : "oscuro"}`}
        >
          {theme === "dark" ? (
            <>
              <FiSun size={18} /> Light Mode
            </>
          ) : (
            <>
              <FiMoon size={18} /> Dark Mode
            </>
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
