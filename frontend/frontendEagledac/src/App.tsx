// frontend/src/App.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeProvider";
import Dashboard from "./pages/Dashboard";

import Sidebar from "./components/Sidebar";
import AuditPanelPage from "./pages/AuditPanelPage";
import DacCreatorPage from "./pages/DacCreatorPage";
import DacPanelPage from "./pages/DacPanelPage";
import ThemeToggle from "./components/ThemeToggle";

import "./styles/main.scss";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ThemeToggle />
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<AuditPanelPage />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/audit" element={<AuditPanelPage />} />
            <Route path="/creator" element={<DacCreatorPage />} />
            <Route path="/deploy" element={<DacPanelPage />} />
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
}

export default App;
