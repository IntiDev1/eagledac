// backend/routes/api/ai/generate.js

const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// POST /api/ai/generate
router.post("/", (req, res) => {
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
}
  `.trim();

  const outputPath = path.join(__dirname, "../../../contracts/src/GeneratedDAC.sol");
  fs.writeFileSync(outputPath, contractCode);

  res.json({ message: "✅ Contract generated and saved!", code: contractCode });
});

module.exports = router;
