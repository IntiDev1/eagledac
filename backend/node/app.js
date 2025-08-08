// File: backend/node/app.js

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import dotenv from "dotenv";
dotenv.config();

import { ContractGenerator } from "./ai-contract-service.js";

const app = express();
const PORT = process.env.PORT || 4000;
const contractsFile = path.resolve("deployed_contracts.json");

if (!fs.existsSync(contractsFile)) {
  fs.writeFileSync(contractsFile, "[]");
}

app.use(cors());
app.use(bodyParser.json());

app.get("/api/ping", (req, res) => {
  res.json({ msg: "EagleDAC backend is alive 🦅" });
});

app.post("/api/ai/generate", async (req, res) => {
  try {
    const { name, purpose } = req.body;
    const response = await axios.post("http://localhost:8000/generate", { name, purpose });
    const { contractCode } = response.data;
    const contractPath = path.resolve("../../contracts/src/GeneratedDAC.sol");
    fs.writeFileSync(contractPath, contractCode);
    return res.json({ success: true, message: "Contract generated", contractCode });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "AI generation failed" });
  }
});

app.post("/api/ai/generate-alith", async (req, res) => {
  try {
    const { name, purpose } = req.body;
    const prompt = `Generate a DAC smart contract named ${name}, for: ${purpose}`;
    const generator = new ContractGenerator();
    const contractCode = await generator.generateContract(prompt);
    const contractPath = path.resolve("../../contracts/src/GeneratedDAC.sol");
    fs.writeFileSync(contractPath, contractCode);
    return res.json({ success: true, contractCode });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Alith AI generation failed" });
  }
});

app.get("/api/contract/generated", (req, res) => {
  const filePath = path.resolve("../../contracts/src/GeneratedDAC.sol");
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return res.json({ success: true, contractCode: content });
  } catch {
    return res.status(404).json({ success: false, error: "Contract not found" });
  }
});

app.get("/api/audit/run", (req, res) => {
  exec("bash scripts/run_audit.sh", (error, stdout, stderr) => {
    if (error) return res.status(500).json({ success: false, error: stderr });
    return res.json({ success: true, output: stdout });
  });
});

app.get("/api/audit/report", (req, res) => {
  const filePath = path.resolve("scripts/slither_output.json");
  try {
    const report = fs.readFileSync(filePath, "utf-8");
    return res.json({ success: true, report: JSON.parse(report) });
  } catch {
    return res.status(404).json({ success: false, error: "Audit report not found" });
  }
});

app.post("/api/deploy", (req, res) => {
  const deployScript = path.resolve("script/DeployDAC.s.sol");
  exec(
    `forge script ${deployScript} --rpc-url ${process.env.METIS_RPC_URL} --broadcast --private-key ${process.env.PRIVATE_KEY} --slow`,
    (error, stdout, stderr) => {
      if (error) return res.status(500).json({ success: false, error: stderr });
      const match = stdout.match(/Deployed to: (0x[a-fA-F0-9]{40})/);
      const address = match?.[1] || null;
      return res.json({ success: true, address, log: stdout });
    }
  );
});

app.post("/api/contracts", (req, res) => {
  const { name, address, block } = req.body;
  if (!name || !address) return res.status(400).json({ success: false, error: "Missing fields" });
  const contracts = JSON.parse(fs.readFileSync(contractsFile, "utf-8"));
  contracts.push({ name, address, block });
  fs.writeFileSync(contractsFile, JSON.stringify(contracts, null, 2));
  return res.json({ success: true, message: "Contract saved" });
});

app.get("/api/contracts", (req, res) => {
  try {
    const contracts = JSON.parse(fs.readFileSync(contractsFile, "utf-8"));
    return res.json({ success: true, contracts });
  } catch {
    return res.status(500).json({ success: false, error: "Failed to load" });
  }
});

app.listen(PORT, () => console.log(`🚀 EagleDAC Node API running on port ${PORT}`));