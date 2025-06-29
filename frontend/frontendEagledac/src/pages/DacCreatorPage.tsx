// src/pages/DacCreatorPage.tsx
import ContractForm from "../components/ContractForm"; // 👈 Importamos nuevo componente

function DacCreatorPage() {
  return (
    <div className="dac-creator-page">
      <h2>🛠️ DAC Creator</h2>
      <ContractForm /> {/* 👈 Usamos el componente */}
    </div>
  );
}

export default DacCreatorPage;
