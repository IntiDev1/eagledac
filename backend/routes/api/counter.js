// backend/routes/api/counter.js
import fs from "fs";
import path from "path";
import express from "express";
import { broadcastEvent } from "./events.js"; // importar función SSE

const router = express.Router();
const counterFile = path.resolve("data", "dacCount.json");

if (!fs.existsSync(counterFile)) {
    fs.writeFileSync(counterFile, JSON.stringify({ count: 0 }, null, 2));
}

// GET: contador
router.get("/dac-counter", (req, res) => {
    try {
        const raw = fs.readFileSync(counterFile, "utf-8");
        const { count } = JSON.parse(raw);
        res.json({ count });
    } catch {
        res.json({ count: 0 });
    }
});

// POST: incrementar contador + emitir SSE
router.post("/dac-counter/increment", (req, res) => {
    try {
        const raw = fs.readFileSync(counterFile, "utf-8");
        let { count } = JSON.parse(raw);
        count += 1;
        fs.writeFileSync(counterFile, JSON.stringify({ count }, null, 2));

        // 🔊 Emite evento SSE para los clientes conectados
        broadcastEvent("dacDeploy", { type: "dacDeploy", count });

        res.json({ success: true, count });
    } catch (e) {
        console.error("Counter increment error:", e);
        res.status(500).json({ success: false });
    }
});

export default router;