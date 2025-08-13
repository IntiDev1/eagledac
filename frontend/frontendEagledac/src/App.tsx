// frontendEagledac/src/App.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { DeployButton } from "./components/DeployButton";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import AlithAssistant from "./components/AlithAssistant";

import Dashboard from "./pages/Dashboard";
import AuditPanelPage from "./pages/AuditPanelPage";
import DacCreatorPage from "./pages/DacCreatorPage";
import DacPanelPage from "./pages/DacPanelPage";

import "./styles/main.scss";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      <div
        className="sidebar-overlay"
        onClick={toggleSidebar}
        style={{ display: sidebarOpen ? "block" : "none" }}
      />

      <button className="mobile-menu-button" onClick={toggleSidebar}>
        <FiMenu size={24} />
      </button>

      <Sidebar open={sidebarOpen} />
      <Header />

      <main className="main-content">
        <AlithAssistant />
        <DeployButton />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/audit" element={<AuditPanelPage />} />
            <Route path="/creator" element={<DacCreatorPage />} />
            <Route path="/deploy" element={<DacPanelPage />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
