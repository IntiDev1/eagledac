//  backend/routes/api/alith/generate-dac.ts
import express from "express";
import axios from "axios";

const router = express.Router();

const ALITH_API_URL = "https://api.alith.metis.io";
const API_KEY = process.env.ALITH_API_KEY || "TU_API_KEY";

router.post("/generate-dac", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const response = await axios.post(
      `${ALITH_API_URL}/generate`,
      {
        prompt,
        framework: "foundry",
        language: "solidity",
      },
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
      }
    );

    // asumiendo que el campo llega como response.data.code
    return res.status(200).json({ code: response.data.code });
  } catch (err) {
    console.error("Alith generate error:", err?.response?.data || err.message);
    return res.status(500).json({ error: "Failed to generate contract" });
  }
});

export default router;
