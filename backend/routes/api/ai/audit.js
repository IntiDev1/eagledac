// backend/routes/api/ai/audit.js

const express = require("express");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const router = express.Router();

// Helper: Clean up Slither JSON into a readable summary
function formatSlitherReport(slitherJson) {
  const issues = slitherJson.results.detectors;

  if (!issues || issues.length === 0) {
    return {
      summary: "✅ No vulnerabilities detected by Slither.",
      count: 0,
      issues: [],
    };
  }

  const cleaned = issues.map((issue, idx) => {
    return {
      id: idx + 1,
      check: issue.check,
      impact: issue.impact,
      confidence: issue.confidence,
      description: issue.description,
      location: issue.elements.map((el) => el.source_mapping?.filename || "N/A"),
    };
  });

  return {
    summary: `⚠️ ${cleaned.length} issues found by Slither.`,
    count: cleaned.length,
    issues: cleaned,
  };
}

// GET /api/ai/audit
router.get("/", (req, res) => {
  const auditPath = path.join(__dirname, "../../../scripts/slither_output.json");

  if (!fs.existsSync(auditPath)) {
    return res.status(404).json({ error: "Audit report not found. Run run_audit.sh first." });
  }

  try {
    const raw = fs.readFileSync(auditPath);
    const slitherJson = JSON.parse(raw);
    const formatted = formatSlitherReport(slitherJson);
    res.json(formatted);
  } catch (err) {
    console.error("Failed to load audit report:", err);
    res.status(500).json({ error: "Failed to load or parse audit report." });
  }
});

// POST /api/ai/generate
router.post("/generate", (req, res) => {
  const { name, purpose } = req.body;

  if (!name || !purpose) {
    return res.status(400).json({ error: "Missing 'name' or 'purpose'" });
  }

  const contractCode = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title ${name}
/// @notice Auto-generated DAC smart contract
/// @dev Purpose: ${purpose}

contract ${name.replace(/\s/g, "")} {
    string public purpose = "${purpose}";
}`.trim();

  const outputPath = path.join(__dirname, "../../../contracts/src/GeneratedDAC.sol");
  fs.writeFileSync(outputPath, contractCode);

  res.json({ message: "✅ Contract generated and saved!", code: contractCode });
});

// POST /api/deploy
router.post("/deploy", (req, res) => {
  const contractPath = path.join(__dirname, "../../../contracts/src/GeneratedDAC.sol");

  if (!fs.existsSync(contractPath)) {
    return res.status(404).json({ error: "Generated contract not found." });
  }

  try {
    const output = execSync(`forge create ./contracts/src/GeneratedDAC.sol:GeneratedDAC --rpc-url ${process.env.SEPOLIA_RPC_URL} --private-key ${process.env.PRIVATE_KEY}`, {
      encoding: "utf-8",
    });
    res.json({ success: true, message: "✅ Contract deployed successfully", logs: output });
  } catch (err) {
    console.error("Deployment failed:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/ai/contract
router.get("/contract", (req, res) => {
  const contractPath = path.join(__dirname, "../../../contracts/src/GeneratedDAC.sol");

  if (!fs.existsSync(contractPath)) {
    return res.status(404).json({ error: "Generated contract not found." });
  }

  try {
    const raw = fs.readFileSync(contractPath, "utf8");
    res.json({ code: raw });
  } catch (err) {
    res.status(500).json({ error: "Failed to load contract file." });
  }
});

// POST /api/ai/run-audit
router.post("/run-audit", (req, res) => {
  const scriptPath = path.join(__dirname, "../../../scripts/run_audit.sh");

  if (!fs.existsSync(scriptPath)) {
    return res.status(404).json({ error: "run_audit.sh script not found." });
  }

  try {
    const output = execSync(`bash ${scriptPath}`, { encoding: "utf-8" });
    res.json({ success: true, message: "✅ Audit executed", output });
  } catch (err) {
    console.error("Audit script failed:", err);
    res.status(500).json({ success: false, error: "Audit script execution failed" });
  }
});


module.exports = router;
