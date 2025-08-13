[![MVP Status](https://img.shields.io/badge/MVP-In--Progress-brightgreen)](https://github.com/IntiDev1/eagledac)

# 🦅 EagleDAC

> AI-Powered DAC Generator & Real-Time Smart Contract Auditor on Metis

**EagleDAC** is a modular Web3 platform that allows users to generate, audit, and deploy Decentralized Autonomous Companies (DACs) using AI. It combines Solidity contract generation, security auditing, and one-click deployment to the Metis blockchain.

---

## 🚀 Key Features

1. **AI DAC Generator**  
   Generate a complete Solidity smart contract based on your organization’s purpose using AI prompts.

2. **Real-Time Smart Contract Audit**  
   Perform static security analysis of contracts using [Slither](https://github.com/crytic/slither), with instant results.

3. **One-Click Deploy**  
   Deploy your DAC contract directly to the Metis Andromeda chain using wallet connection via `wagmi` and `viem`.

4. **Gamified Experience (Coming Soon)**  
   Track audit scores, fix vulnerabilities, and level up in the EagleDAC developer ecosystem.

---

## 🧱 Tech Stack

| Layer       | Technology                                        |
| ----------- | ------------------------------------------------- |
| Frontend    | React, Vite, TypeScript, Sass, Wagmi, Viem        |
| Backend     | Node.js, Express, Python, Slither                 |
| Contracts   | Solidity, Foundry                                 |
| Blockchain  | Metis Andromeda                                   |
| AI Auditing | Slither, future integration with Alith (Hyperion) |

---

## 📦 Local Setup

```bash
# Clone repository
git clone https://github.com/IntiDev1/eagledac
cd eagledac

🖼️ Frontend Setup

cd frontend/frontendEagledac
npm install
npm run dev

App will run at http://localhost:5173/

🧠 Backend Setup

cd ../../backend
npm install
cp .env.example .env  # Add your RPC URL and PRIVATE_KEY
node server.js        # Or use nodemon

🔍 Run Slither Audit

cd scripts
./run_audit.sh  # Outputs audit results in JSON

| Feature                             | Status      |
| ----------------------------------- | ----------- |
| ✅ AI DAC Contract Generator         | Completed   |
| ✅ Slither Integration (Audit)       | Completed   |
| ✅ Wallet Deployment (Metis)         | Completed   |
| ⚙️ Real-time events via Hyperion    | In Progress |
| 🚧 AI Assistant (LazAI / Alith)     | Coming Soon |
| 🚧 Governance Modules (voting, etc) | Coming Soon |
| 🎨 UI Polish and Sidebar            | Iterating   |

🧪 Backend Foundry Usage

# Compile contracts
forge build

# Run tests
forge test

# Format Solidity
forge fmt

# Launch local testnet
anvil

# Deploy contract via script
forge script script/Counter.s.sol:CounterScript --rpc-url <RPC_URL> --private-key <PRIVATE_KEY>

📂 API Endpoints (Express)

POST /api/generate           → Generate contract via AI
POST /api/audit/upload       → Audit uploaded contract code
GET  /api/audit/:address     → Audit contract by address
POST /api/deploy             → Deploy contract to Metis
GET  /api/wallets/count      → Get registered wallet count
GET  /api/deploys/count      → Get deployed DACs count


🤝 Contributing

We welcome contributions! Fork the repo, create a branch, and submit a PR. For suggestions or issues, open a GitHub Issue.

📜 License
MIT License © 2025 – EagleDAC Contributors
```
