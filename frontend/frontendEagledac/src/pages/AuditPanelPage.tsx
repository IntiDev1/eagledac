// frontend/src/pages/AuditPanelPage.tsx

import { useEffect, useState } from "react";
import "../styles/audit.scss";

// Tipado para los resultados de Slither
interface AuditIssue {
  id: number;
  check: string;
  impact: string;
  confidence: string;
  description: string;
  location: string[];
}

interface AuditReport {
  summary: string;
  count: number;
  issues: AuditIssue[];
}

function AuditPanelPage() {
  const [report, setReport] = useState<AuditReport | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAudit = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/ai/audit");
        const data = await res.json();
        setReport(data);
      } catch {
        setError("❌ Error loading audit report.");
      } finally {
        setLoading(false);
      }
    };

    fetchAudit();
  }, []);

  return (
    <div className="audit-panel">
      <h1>🔍 Audit Smart Contracts</h1>

      {loading && <p>Loading audit report...</p>}
      {error && <p className="error">{error}</p>}

      {report && report.issues && Array.isArray(report.issues) && (
        <div className="audit-results">
          <h2>{report.summary}</h2>
          {report.issues.length === 0 ? (
            <p>No issues found! ✅</p>
          ) : (
            <ul>
              {report.issues.map((issue, index) => (
                <li key={index}>
                  <strong>{issue.check}</strong> ({issue.impact},{" "}
                  {issue.confidence})<br />
                  {issue.description}
                  <br />
                  <em>Location: {issue.location.join(", ")}</em>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default AuditPanelPage;
