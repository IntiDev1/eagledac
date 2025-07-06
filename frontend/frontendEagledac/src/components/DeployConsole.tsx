// frontend/src/components/DeployConsole.tsx

import { useState } from "react";
import "../styles/deploy.scss"; // Make sure to style as a terminal

function DeployConsole() {
  const [logs, setLogs] = useState<string[]>([]);
  const [deploying, setDeploying] = useState(false);
  const [error, setError] = useState("");

  const handleDeploy = async () => {
    setDeploying(true);
    setError("");
    setLogs(["🛠 Starting deployment..."]);

    try {
      const res = await fetch("http://localhost:3001/api/deploy", {
        method: "POST",
      });

      const data = await res.json();

      if (data.success) {
        const outputLines = data.logs
          .split("\n")
          .filter((line: string) => line.trim() !== "");
        setLogs((prev) => [
          ...prev,
          ...outputLines,
          "✅ Deployment successful!",
        ]);
      } else {
        setError("❌ Deployment failed: " + data.error);
        setLogs((prev) => [...prev, "❌ Deployment failed."]);
      }
    } catch (err: unknown) {
      console.error(err);
      setError("❌ Unexpected error during deployment.");
    } finally {
      setDeploying(false);
    }
  };

  return (
    <div className="deploy-console">
      <h2>🚀 Deploy Smart Contract</h2>

      <button
        onClick={handleDeploy}
        disabled={deploying}
        className={deploying ? "deploying" : ""}
      >
        {deploying ? "Deploying..." : "Deploy Contract"}
      </button>

      {error && <p className="error">{error}</p>}

      <div className="console-output">
        {logs.map((line, idx) => (
          <pre key={idx}>{line}</pre>
        ))}
      </div>
    </div>
  );
}

export default DeployConsole;
