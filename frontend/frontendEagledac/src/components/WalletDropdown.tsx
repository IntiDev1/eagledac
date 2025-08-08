// frontend/frontendEagledac/src/components/WalletDropdown.tsx

import { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import "../styles/wallet.scss";

function WalletDropdown() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);

  const handleConnectClick = () => {
    const button = document.querySelector(
      "button[data-testid='rk-connect-button']"
    ) as HTMLElement | null;

    if (button) {
      button.click(); // ✅ ahora está permitido por TypeScript
    } else {
      console.warn("Connect button not found");
    }
  };

  return (
    <div className="wallet-dropdown">
      <button onClick={toggleDropdown}>
        {typeof address === "string"
          ? `${address.slice(0, 6)}...${address.slice(-4)}`
          : "Connect Wallet"}
      </button>

      {open && (
        <div className="dropdown-menu">
          {isConnected ? (
            <button onClick={() => disconnect()}>Log out</button>
          ) : (
            <button onClick={handleConnectClick}>Connect</button>
          )}
        </div>
      )}
    </div>
  );
}

export default WalletDropdown;
