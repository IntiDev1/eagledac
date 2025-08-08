// backend/routes/api/wallets.js
import express from "express";
import fs from "fs";
import path from "path";
import { emitEvent } from "../api/events.js"; //  Importa SSE emitter

const router = express.Router();

// Ruta absoluta al archivo de wallets.json
const walletsFile = path.resolve("data", "wallets.json");


// POST: registrar wallet
router.post("/register-wallet", (req, res) => {
    const { address } = req.body;
    if (!address) return res.status(400).json({ error: "Wallet address is required" });

    try {
        const data = fs.readFileSync(walletsFile, "utf-8");
        const wallets = JSON.parse(data);

        if (!wallets.includes(address)) {
            wallets.push(address);
            fs.writeFileSync(walletsFile, JSON.stringify(wallets, null, 2));

            emitEvent({
                type: "walletRegistered",
                count: wallets.length,
            });
            console.log(`👛 Wallet registrada: ${address}`);
        }

        res.status(200).json({ success: true });
    } catch (err) {
        console.error("Error writing wallet:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET: total de wallets registradas
router.get("/wallet-counter", (req, res) => {
    try {
        const data = fs.readFileSync(walletsFile, "utf-8");
        const wallets = JSON.parse(data);
        res.json({ count: wallets.length });
    } catch (err) {
        console.error("Error reading wallet file:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ Exporta el router correctamente
export default router;
