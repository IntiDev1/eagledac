// frontendEagledac/src/components/WalletConnector.tsx
import { useAccount, useConnect } from "wagmi";

function WalletConnector() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();

  const injectedConnector = connectors.find((c) => c.id === "injected");

  const handleConnect = () => {
    if (injectedConnector) {
      connect({ connector: injectedConnector });
    } else {
      alert("No injected wallet found. Please install MetaMask or similar.");
    }
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      {isConnected ? (
        <span>
          🔗 Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
      ) : (
        <button onClick={handleConnect} disabled={isPending}>
          {isPending ? "Connecting..." : "🔌 Connect Wallet"}
        </button>
      )}
    </div>
  );
}

export default WalletConnector;
