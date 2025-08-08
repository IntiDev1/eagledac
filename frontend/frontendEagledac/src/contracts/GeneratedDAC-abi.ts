// frontendEagledac/src/contracts/GeneratedDAC-abi.ts
export const abi = [
    {
      "inputs": [{ "internalType": "string", "name": "_purpose", "type": "string" }],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": false, "internalType": "string", "name": "oldPurpose", "type": "string" },
        { "indexed": false, "internalType": "string", "name": "newPurpose", "type": "string" }
      ],
      "name": "PurposeUpdated",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "purpose",
      "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{ "internalType": "string", "name": "_newPurpose", "type": "string" }],
      "name": "updatePurpose",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  