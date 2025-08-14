// frontend/src/pages/AuditPanelPage.tsx

// frontend/src/pages/AuditPanelPage.tsx
import { useState } from "react";
import "../styles/audit.scss";

function AuditPanelPage() {
  const [code, setCode] = useState(`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DemoDAC {
  address public owner;
  event Ping(address indexed from);
  constructor() { owner = msg.sender; }
  function ping() external { emit Ping(msg.sender); }
}`);
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAudit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3001/api/alith/audit-dac", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (data.report) {
        setReport(data.report);
      } else {
        setError("No report returned.");
      }
    } catch {
      setError("❌ Error loading audit report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="audit-panel">
      <h1>🔍 Audit Smart Contracts</h1>
      <textarea
        rows={10}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your Solidity code here..."
      />
      <br />
      <button onClick={handleAudit} disabled={loading}>
        {loading ? "Running..." : "🚀 Run Audit"}
      </button>
      <br />
      {error && <p className="error">{error}</p>}
      {report && (
        <div className="audit-results">
          <h2>🔎 Report</h2>
          <pre>{report}</pre>
        </div>
      )}
    </div>
  );
}

export default AuditPanelPage;
