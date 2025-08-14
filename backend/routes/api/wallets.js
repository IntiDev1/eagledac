// backend/routes/api/wallets.js
// backend/routes/api/wallets.js
import express from "express";
import fs from "fs";
import path from "path";
import { broadcastEvent } from "./events.js"; //  importar del mismo folder y nombre correcto

const router = express.Router();

// Archivo JSON donde persistimos wallets
const walletsFile = path.resolve("data", "wallets.json");

// Asegurar archivo inicial
if (!fs.existsSync(walletsFile)) {
    fs.writeFileSync(walletsFile, JSON.stringify([], null, 2));
}

// POST /api/register-wallet  -> registra una wallet (idempotente) y emite SSE si es nueva
router.post("/register-wallet", (req, res) => {
    const { address } = req.body;
    if (!address) return res.status(400).json({ error: "Wallet address is required" });

    try {
        const raw = fs.readFileSync(walletsFile, "utf-8");
        const wallets = JSON.parse(raw);

        // Si es nueva, guardamos y emitimos evento SSE
        if (!wallets.includes(address)) {
            wallets.push(address);
            fs.writeFileSync(walletsFile, JSON.stringify(wallets, null, 2));

            // 🔊 Emitimos evento SSE para que el frontend actualice en tiempo real
            broadcastEvent("walletRegistered", {
                type: "walletRegistered",
                count: wallets.length,
                address
            });
        }

        return res.status(200).json({ success: true, count: wallets.length });
    } catch (err) {
        console.error("Error writing wallet:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// GET /api/wallet-counter  -> total de wallets registradas
router.get("/wallet-counter", (req, res) => {
    try {
        const raw = fs.readFileSync(walletsFile, "utf-8");
        const wallets = JSON.parse(raw);
        return res.json({ count: wallets.length });
    } catch (err) {
        console.error("Error reading wallets:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// (opcional) GET /api/wallets -> lista completa
router.get("/wallets", (req, res) => {
    try {
        const raw = fs.readFileSync(walletsFile, "utf-8");
        const wallets = JSON.parse(raw);
        return res.json({ wallets });
    } catch (err) {
        console.error("Error reading wallets:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
