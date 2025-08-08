// 📁 backend/routes/api/events.js

import express from "express";

const router = express.Router();

// Almacenamos las conexiones SSE activas
const clients = [];

// Ruta de suscripción SSE
router.get("/events", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    clients.push(res);

    // Remover cliente cuando se desconecta
    req.on("close", () => {
        const index = clients.indexOf(res);
        if (index !== -1) clients.splice(index, 1);
    });
});

// Función para emitir eventos a todos los clientes conectados
export function broadcastEvent(eventName, data) {
    const payload = `event: ${eventName}\ndata: ${JSON.stringify(data)}\n\n`;
    clients.forEach((res) => res.write(payload));
}

// Exportar el router
export default router;
