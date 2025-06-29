// File: backend/node/app.js

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios"; // for calling FastAPI
import fs from "fs";
import path from "path";
import { exec } from "child_process";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// Route: Generate contract via AI (calls FastAPI)
app.post("/api/ai/generate", async (req, res) => {
  try {
    const { name, purpose } = req.body;
    const response = await axios.post("http://localhost:8000/generate", {
      name,
      purpose,
    });

    const { contractCode } = response.data;

    // Optional: Save contract to contracts/src/
    const contractPath = path.resolve("../../contracts/src/GeneratedDAC.sol");
    fs.writeFileSync(contractPath, contractCode);

    return res.json({ success: true, message: "Contract generated", contractCode });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "AI generation failed" });
  }
});

// Route: Run Foundry audit script (includes Slither)
app.get("/api/audit/run", async (req, res) => {
  try {
    exec("bash scripts/run_audit.sh", (error, stdout, stderr) => {
      if (error) return res.status(500).json({ success: false, error: stderr });
      return res.json({ success: true, output: stdout });
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: "Audit failed" });
  }
});

app.listen(PORT, () => console.log(`🚀 EagleDAC Node API running on port ${PORT}`));
