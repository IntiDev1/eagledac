// frontend/src/components/ContractForm.tsx
import { useState } from "react";
import "../styles/creator.scss";

function ContractForm() {
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3001/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, purpose }),
      });

      if (!res.ok) throw new Error("Failed to generate contract");

      const data = await res.json();
      setGeneratedCode(data.code || "No code returned.");
    } catch (err) {
      setError("Error generating contract.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contract-form">
      <form onSubmit={handleSubmit}>
        <label>
          Contract Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Purpose:
          <textarea
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Contract"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {generatedCode && (
        <div className="generated-code">
          <h3>Generated Smart Contract</h3>
          <pre>{generatedCode}</pre>
        </div>
      )}
    </div>
  );
}

export default ContractForm;
