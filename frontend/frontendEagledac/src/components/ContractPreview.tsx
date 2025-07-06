// src/components/ContractPreview.tsx
import { useEffect, useState } from "react";
import "../styles/preview.scss";

function ContractPreview() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/ai/contract");
        const data = await res.json();
        if (data.code) setCode(data.code);
        else throw new Error("No contract code found.");
      } catch (err) {
        setError("❌ Error loading contract.");
      } finally {
        setLoading(false);
      }
    };

    fetchContract();
  }, []);

  return (
    <div className="contract-preview">
      <h3>📄 Generated Contract Preview</h3>
      {loading && <p>Loading contract...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && <pre className="contract-content">{code}</pre>}
    </div>
  );
}

export default ContractPreview;
