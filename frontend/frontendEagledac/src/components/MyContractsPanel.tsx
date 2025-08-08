// frontendEagledac/src/components/MyContractsPanel.tsx
import { useContracts } from "../hooks/useContracts";
import "../styles/contracts.scss";

function MyContractsPanel() {
  const { contracts } = useContracts(); // ✅ ya tenés los contratos desde context

  return (
    <div className="contracts-panel">
      <h2>📜 Your Deployed Contracts</h2>

      {contracts.length === 0 ? (
        <p>No contracts deployed yet.</p>
      ) : (
        <ul>
          {contracts.map((c, idx: number) => (
            <li key={idx}>
              <strong>{c.name}</strong> –{" "}
              <a
                href={`https://andromeda-explorer.metis.io/address/${c.address}`}
                target="_blank"
                rel="noreferrer"
              >
                {c.address.slice(0, 6)}...{c.address.slice(-4)}
              </a>{" "}
              (block: {c.block})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyContractsPanel;
