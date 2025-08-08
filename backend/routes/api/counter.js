// backend/routes/api/counter.js
import fs from "fs";
import path from "path";
import express from "express";
import { sendEventToClients } from "./events.js"; // importar función SSE

const router = express.Router();
const filePath = path.join(process.cwd(), "backend", "data", "dacCount.json");

router.post("/dac-counter", (req, res) => {
    try {
        let count = 0;
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, "utf8");
            count = JSON.parse(data).count || 0;
        }

        count += 1;
        fs.writeFileSync(filePath, JSON.stringify({ count }));

        // ✅ Emitir evento real-time usando SSE
        sendEventToClients({ type: "dacDeploy", count });

        res.json({ count });
    } catch (err) {
        res.status(500).json({ error: "Error updating counter" });
    }
});

export default router;
