// frontendEagledac/src/components/ContractPreview.tsx

import { useEffect, useState } from "react";
import "../styles/preview.scss";

function ContractPreview() {
  const [contractCode, setContractCode] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // ⏳ loading state

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/ai/contract");
        const data = await res.json();
        if (data.code) {
          setContractCode(data.code);
        } else {
          setError("Error loading contract.");
        }
      } catch {
        setError("Error fetching contract from server.");
      } finally {
        setLoading(false); // ✅ stop loading
      }
    };

    fetchContract();
  }, []);

  return (
    <div className="contract-preview">
      <h3>📄 Generated Contract</h3>

      {loading && <div className="spinner" />}
      {error && !loading && <p className="error">{error}</p>}
      {contractCode && !loading && (
        <pre className="contract-content">{contractCode}</pre>
      )}
    </div>
  );
}

export default ContractPreview;
