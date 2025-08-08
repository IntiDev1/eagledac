// frontendEagledac/src/components/Footer.tsx

import { useTheme } from "../context/useTheme";
import { FiGithub, FiTwitter, FiDisc, FiBook, FiMail } from "react-icons/fi";

function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          {/* Logo y nombre */}
          <div className="footer-brand">
            <div className="footer-logo">EagleDAC</div>
            <p className="footer-tagline">AI-powered decentralized tools</p>
          </div>

          {/* Redes sociales */}
          <div className="footer-social">
            <a
              href="https://github.com/eagledac"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub className="social-icon" />
            </a>
            <a
              href="https://twitter.com/eagledac"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiTwitter className="social-icon" />
            </a>
            <a
              href="https://discord.gg/eagledac"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiDisc className="social-icon" />
            </a>
          </div>

          {/* Enlaces rápidos */}
          <div className="footer-links">
            <a href="/docs">
              <FiBook className="link-icon" /> Docs
            </a>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="mailto:contact@eagledac.com">
              <FiMail className="link-icon" /> Contact
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} EagleDAC. All rights reserved.</p>
          <div className="footer-meta">
            <span>v1.2.0</span>
            <span className="theme-indicator">
              {theme === "dark" ? "🌙" : "☀️"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
