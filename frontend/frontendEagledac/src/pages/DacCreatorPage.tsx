// frontendEagledac/src/pages/DacCreatorPage.tsx

import { useState } from "react";
import "../styles/creator.scss";
import { Agent } from "alith";

function DacCreatorPage() {
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3001/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, purpose }),
      });

      const data = await res.json();

      if (data.contractCode) {
        setCode(data.contractCode);
      } else {
        setError("Error generating contract");
      }
    } catch {
      setError("❌ Network error.");
    } finally {
      setLoading(false);
    }
  };

  const agent = new Agent({
    model: "gpt-4",
    preamble: "Generate a Solidity contract based on the user's description",
  });

  const contract = await agent.prompt("Create a voting DAO with 3 proposals");

  return (
    <div className="contract-form">
      <h1>🧠 DAC Creator</h1>
      <p>Create your smart contract using natural language.</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGenerate();
        }}
        className="dac-form"
      >
        <input
          type="text"
          placeholder="Contract Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Purpose of the DAC"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          rows={4}
          required
        ></textarea>
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "⚙️ Generate Contract"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {code && (
        <div className="contract-preview">
          <h3>📝 Preview</h3>
          <pre className="contract-content">{code}</pre>
        </div>
      )}
    </div>
  );
}

export default DacCreatorPage;
