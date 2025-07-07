// frontendEagledac/src/pages/DacPanelPage.tsx
import DeployConsole from "../components/DeployConsole";
import ContractPreview from "../components/ContractPreview";
import "../styles/deploy.scss";

function DacPanelPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">🚀 DAC Deployment Panel</h1>
      <p className="page-description">
        Deploy your generated DAC smart contract to the blockchain.
      </p>

      <ContractPreview />

      <DeployConsole />
    </div>
  );
}

export default DacPanelPage;
