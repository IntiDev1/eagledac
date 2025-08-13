// frontend/frontendEagledac/src/pages/DacCreatorPage.tsx
import { useState } from "react";
import "../styles/creator.scss";

function DacCreatorPage() {
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Generar con Alith vía tu backend
  const handleGenerate = async () => {
    setLoading(true);
    setError("");

    try {
      const prompt = `
Generate a Solidity contract for a DAC (Decentralized Autonomous Company).
Name: ${name}
Purpose: ${purpose}
Requirements:
- SPDX-License-Identifier: MIT
- Solidity ^0.8.20
- Owner state, constructor, simple update function, and one event
- Clean, readable, safe
`;
      const res = await fetch("http://localhost:3001/api/alith/generate-dac", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to generate contract");
      }

      const data = await res.json();
      // tu backend responde { code: "..." }
      if (data.code) {
        setCode(data.code);
      } else {
        setError("No code returned from Alith.");
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Network or server error";
      setError(`❌ ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contract-form">
      <h1> DAC Creator</h1>
      <p>Create your smart contract using natural language (Alith-powered).</p>

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
        />

        <button type="submit" disabled={loading}>
          {loading ? "Generating with Alith..." : "⚙️ Generate Contract"}
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
