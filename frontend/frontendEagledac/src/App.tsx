import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import AuditPanelPage from "./pages/AuditPanelPage";
import DacCreatorPage from "./pages/DacCreatorPage";
import DacPanelPage from "./pages/DacPanelPage";
import "./styles/app.scss";

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<AuditPanelPage />} />
          <Route path="/audit" element={<AuditPanelPage />} />
          <Route path="/creator" element={<DacCreatorPage />} />
          <Route path="/deploy" element={<DacPanelPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
