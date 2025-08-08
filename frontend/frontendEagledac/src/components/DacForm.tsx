//frontendEagledac/src/components/DacForm.tsx
import { useState } from "react";

function DacForm() {
  const [dacName, setDacName] = useState("");
  const [description, setDescription] = useState("");
  const [contractCode, setContractCode] = useState("");

  const handleGenerate = () => {
    const template = `
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.20;

    contract ${dacName.replace(/\s+/g, "")}DAC {
        string public name = "${dacName}";
        string public description = "${description}";

        constructor() {}

        function getInfo() public view returns (string memory, string memory) {
            return (name, description);
        }
    }
    `;
    setContractCode(template.trim());
  };

  return (
    <div className="dac-form">
      <h2>Create your DAC</h2>
      <input
        type="text"
        placeholder="DAC Name"
        value={dacName}
        onChange={(e) => setDacName(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleGenerate}>Generate Contract</button>

      {contractCode && (
        <>
          <h3>🧾 Preview Solidity Contract</h3>
          <pre className="contract-preview">
            <code>{contractCode}</code>
          </pre>
        </>
      )}
    </div>
  );
}

export default DacForm;
