// backend/routes/api/alith/audit-dac.ts

import express from "express";
import axios from "axios";

const router = express.Router();

const ALITH_API_URL = "https://api.alith.metis.io";
const API_KEY = process.env.ALITH_API_KEY || "TU_API_KEY";

router.post("/audit-dac", async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: "Smart contract code is required" });

  try {
    const response = await axios.post(
      `${ALITH_API_URL}/audit`,
      { code, severity_level: "high" },
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );

    // asumiendo que el reporte llega como response.data.report
    return res.status(200).json({ report: response.data.report });
  } catch (err) {
    console.error("Alith audit error:", err?.response?.data || err.message);
    return res.status(500).json({ error: "Failed to audit the contract" });
  }
});

export default router;
