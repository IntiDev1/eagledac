// frontend/src/pages/DacPanelPage.tsx

import DeployConsole from "../components/DeployConsole";
import ContractPreview from "../components/ContractPreview";

function DacPanelPage() {
  return (
    <div className="dac-panel">
      <h1>🎯 DAC Deployment Panel</h1>
      <ContractPreview />
      <DeployConsole />
    </div>
  );
}

export default DacPanelPage;
