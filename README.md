[![MVP Status](https://img.shields.io/badge/MVP-In--Progress-brightgreen)](https://github.com/IntiDev1/eagledac)

# 🦅 EagleDAC

> AI-Powered DAC Generator & Real-Time Smart Contract Auditor on Metis

EagleDAC es una plataforma modular que permite crear DACs (Decentralized Autonomous Companies) inteligentes, seguras y auditadas, utilizando IA para generación automática de contratos en Solidity y auditoría en tiempo real.

## 🚀 ¿Qué hace?

1. **Generación AI de contratos:** escribe el propósito de tu organización y EagleDAC genera un contrato personalizado en Solidity.
2. **Auditoría en tiempo real:** el contrato generado se audita con IA + Slither, mostrando vulnerabilidades y recomendaciones.
3. **Despliegue directo a blockchain:** desplega tu DAC en Metis desde el frontend usando wallet.
4. **Gamificación:** valida auditorías, corrige vulnerabilidades y sube de nivel en la comunidad.

## 🧱 Stack Tecnológico

- Frontend: React + Sass + Vite + wagmi + viem
- Backend: Node.js + Express + Python + Foundry + Slither
- Smart Contracts: Solidity
- Chain: Metis Andromeda
- LLMs: integración futura con Alith (Hyperion AI agents)

## 🔥 MVP Status (Julio 2025)

✅ DAC Generator funcionando  
✅ AI audit con Slither  
✅ UI con modo oscuro/claro  
✅ Deploy interactivo con wallet (en progreso)  
✅ Estructura backend conectada  
🚧 Alith + módulos de gobernanza en desarrollo

## 🧪 Cómo correr localmente

```bash
# Clona el repo
git clone https://github.com/IntiDev1/eagledac
cd eagledac

# Instalación FRONTEND
cd frontend
npm install
npm run dev

# Instalación BACKEND
cd ../backend
npm install
cp .env.example .env   # Añade tus claves RPC y PRIVATE_KEY
node server.js         # O usa nodemon

# Audit Slither
cd scripts
./run_audit.sh         # Genera output JSON desde Slither
```
