//  backend/routes/api/alith/generate-dac.ts
import express from "express";
import axios from "axios";
import fs from "fs";
import path from "path";

const router = express.Router();

//  Config
const ALITH_API_URL = "https://api.alith.metis.io";
const API_KEY = process.env.ALITH_API_KEY || "TU_API_KEY";

//  Archivo donde persistimos el último contrato generado
// (ruta absoluta, segura para procesos lanzados desde la raíz del repo)
const lastContractFile = path.resolve("data/lastContract.json");

// Utilidad segura de escritura
function writeLastContract(code) {
  try {
    fs.writeFileSync(lastContractFile, JSON.stringify({ code }, null, 2));
  } catch (e) {
    console.error("❌ Cannot write lastContract.json:", e.message);
  }
}


/**
 * POST /api/alith/generate-dac
 * Body: { prompt: string }
 * Respuesta: { code: string }
 */
router.post("/generate-dac", async (req, res) => {
  const { prompt } = req.body || {};
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const { data } = await axios.post(
      `${ALITH_API_URL}/generate`,
      { prompt, framework: "foundry", language: "solidity" },
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );

    const code = data?.code || "";
    if (!code) {
      return res.status(502).json({ error: "No code returned by Alith" });
    }

    //  persistimos para ContractPreview / Deploy
    writeLastContract(code);

    return res.status(200).json({ code });
  } catch (err) {
    console.error("Alith generate error:", err?.response?.data || err.message);

    //  Fallback demo-friendly para no romper la UI
    const fallback = `// Fallback: demo contract
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract DemoDAC {
  address public owner;
  event Ping(address indexed from);
  constructor() { owner = msg.sender; }
  function ping() external { emit Ping(msg.sender); }
}`;

    // Persistimos el fallback para que el preview funcione
    writeLastContract(fallback);

    //IMPORTANTE: devolvemos 200 con el fallback para que el frontend no muestre error
    return res.status(200).json({ code: fallback });
  }
});

/**
 * GET /api/alith/contract
 * Devuelve el último contrato persistido (o vacío)
 */
router.get("/contract", (req, res) => {
  try {
    if (!fs.existsSync(lastContractFile)) {
      // crea el archivo vacío si no existe, así todo es predecible
      writeLastContract("");
      return res.json({ code: "" });
    }
    const json = JSON.parse(fs.readFileSync(lastContractFile, "utf-8"));
    return res.json(json);
  } catch (e) {
    console.error("❌ Cannot read lastContract.json:", e.message);
    return res.status(500).json({ error: "Cannot read last contract" });
  }
});

export default router;
