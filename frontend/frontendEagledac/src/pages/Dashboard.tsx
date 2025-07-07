// frontendEagledac/src/pages/Dashboard.tsx

import { Link } from "react-router-dom";
import "../styles/dashboard.scss";

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>🦅 EagleDAC Dashboard</h1>
      <p className="subtitle">Select a module to begin working with your DAC</p>

      <div className="card-grid">
        <Link to="/creator" className="card">
          <h2>🧠 DAC Creator</h2>
          <p>Create smart contracts using natural language and AI.</p>
        </Link>

        <Link to="/audit" className="card">
          <h2>🔍 EagleAudit</h2>
          <p>Run automatic audits on your contracts using LLMs and Slither.</p>
        </Link>

        <Link to="/deploy" className="card">
          <h2>🚀 Deploy & Panel</h2>
          <p>Preview, deploy and interact with your DAC smart contracts.</p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
