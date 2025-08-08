// frontendEagledac/src/pages/Dashboard.tsx

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/dashboard.scss";
import MyContractsPanel from "../components/MyContractsPanel";
import { useContracts } from "../hooks/useContracts";
import MetricsPanel from "../components/MetricsPanel";
import { registerWallet } from "../utils/api";
import { useAccount } from "wagmi";
import MainLayout from "../layouts/MainLayout";
//import { ConnectButton } from "@rainbow-me/rainbowkit"; // Si usas RainbowKit, puedes cambiar esto según tu lib de conexión

function Dashboard() {
  const { contracts } = useContracts();
  const [deployedCount, setDeployedCount] = useState(0);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    setDeployedCount(contracts.length);
  }, [contracts]);

  // 🔁 Registrar wallet al conectar
  useEffect(() => {
    if (isConnected && address) {
      registerWallet(address).then((success) => {
        if (success) {
          console.log("✅ Wallet registered:", address);
        } else {
          console.warn("⚠️ Wallet already registered or failed.");
        }
      });
    }
  }, [isConnected, address]);

  return (
    <MainLayout>
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>🦅 EagleDAC Dashboard</h1>
        </div>
        <p className="subtitle">
          Select a module to begin working with your DAC
        </p>

        <div className="card-grid">
          <Link to="/creator" className="card">
            <h2>🧠 DAC Creator</h2>
            <p>Create smart contracts using natural language and AI.</p>
          </Link>

          <Link to="/audit" className="card">
            <h2>🔍 EagleAudit</h2>
            <p>
              Run automatic audits on your contracts using LLMs and Slither.
            </p>
          </Link>

          <Link to="/deploy" className="card">
            <h2>🚀 Deploy & Panel</h2>
            <p>Preview, deploy and interact with your DAC smart contracts.</p>
          </Link>

          <div className="card card-stats">
            <h2>📈 Deployed DACs</h2>
            <p>Total: {deployedCount}</p>
          </div>
        </div>

        <MyContractsPanel />
        <MetricsPanel />
      </div>
    </MainLayout>
  );
}

export default Dashboard;
