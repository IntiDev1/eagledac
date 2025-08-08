// frontend/frontendEagledac/src/layouts/MainLayout.tsx
import type { ReactNode } from "react";
import WalletDropdown from "../components/WalletDropdown";
import "../styles/layout.scss";

interface Props {
  children: ReactNode;
}

function MainLayout({ children }: Props) {
  return (
    <div className="layout">
      <header className="layout-header">
        <h1 className="logo">🦅 EagleDAC</h1>
        <WalletDropdown />
      </header>

      <main className="layout-main">{children}</main>

      <footer className="layout-footer">
        <p>© {new Date().getFullYear()} EagleDAC. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default MainLayout;
