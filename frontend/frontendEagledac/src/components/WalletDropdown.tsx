// frontend/frontendEagledac/src/components/WalletDropdown.tsx

import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import "../styles/wallet.scss";

function WalletDropdown() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect, connectors, isPending } = useConnect();

  const [open, setOpen] = useState(false);
  const toggleDropdown = () => setOpen(!open);

  const injectedConnector = connectors.find((c) => c.id === "injected");

  const handleConnectClick = () => {
    if (injectedConnector) {
      connect({ connector: injectedConnector });
    } else {
      alert("No wallet found. Please install MetaMask or similar.");
    }
  };

  return (
    <div className="wallet-dropdown">
      <button onClick={toggleDropdown}>
        {isConnected && address
          ? `${address.slice(0, 6)}...${address.slice(-4)}`
          : "Connect Wallet"}
      </button>

      {open && (
        <div className="dropdown-menu">
          {isConnected ? (
            <button onClick={() => disconnect()}>Log out</button>
          ) : (
            <button onClick={handleConnectClick} disabled={isPending}>
              {isPending ? "Connecting..." : "Connect"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default WalletDropdown;
