// frontendEagledac/src/components/MetricsPanel.tsx

import { useEffect, useState } from "react";
import "../styles/metrics.scss";

function MetricsPanel() {
  const [dacCount, setDacCount] = useState<number | null>(null);
  const [walletCount, setWalletCount] = useState<number | null>(null);

  // Cargar DAC count inicial
  useEffect(() => {
    fetch("http://localhost:3001/api/dac-counter")
      .then((res) => res.json())
      .then((data) => setDacCount(data.count))
      .catch((err) => console.error("Error fetching DAC count:", err));
  }, []);

  // Cargar wallets inicial
  useEffect(() => {
    fetch("http://localhost:3001/api/wallets")
      .then((res) => res.json())
      .then((data) => setWalletCount(data.wallets?.length || 0))
      .catch((err) => console.error("Error fetching wallets:", err));
  }, []);

  //  SSE tiempo real
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3001/api/events");

    //  Evento DAC desplegado
    eventSource.addEventListener("dacDeploy", (event) => {
      try {
        const data = JSON.parse((event as MessageEvent).data);
        setDacCount(data.count);
        console.log("🎯 Evento dacDeploy recibido:", data);
      } catch (err) {
        console.error("Error parsing dacDeploy event:", err);
      }
    });

    //  Evento wallet registrada
    eventSource.addEventListener("walletRegistered", (event) => {
      try {
        const data = JSON.parse((event as MessageEvent).data);
        setWalletCount(data.count);
        console.log("🎯 Evento walletRegistered recibido:", data);
      } catch (err) {
        console.error("Error parsing walletRegistered event:", err);
      }
    });

    eventSource.onerror = (err) => {
      console.error("SSE connection error:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="metrics-panel">
      <h3>📊 EagleDAC Metrics</h3>
      <ul>
        <li>
          🛠️ DACs Deployed:{" "}
          <strong>{dacCount !== null ? dacCount : "Loading..."}</strong>
        </li>
        <li>
          Wallets Registered:{" "}
          <strong>{walletCount !== null ? walletCount : "Loading..."}</strong>
        </li>
      </ul>
    </div>
  );
}

export default MetricsPanel;
