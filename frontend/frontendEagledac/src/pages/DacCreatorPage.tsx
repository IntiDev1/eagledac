import DacForm from "../components/DacForm";

function DacCreatorPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">🛠️ DAC Creator</h1>
      <p className="page-description">
        Start building your own DAC with AI assistance.
      </p>
      <DacForm />
    </div>
  );
}

export default DacCreatorPage;
