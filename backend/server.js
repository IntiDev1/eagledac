// backend/server.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

//  crear alias
import fs from "fs";
import path from "path";



// Import routers
import eventsRouter from "./routes/api/events.js";
import dacCounterRouter from "./routes/api/counter.js";
import walletRouter from "./routes/api/wallets.js";
import alithGenerateRouter from "./routes/api/alith/generate-dac.js";
import alithAuditRouter from "./routes/api/alith/audit-dac.js";

// Init app
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// 🔌 SSE en /events (recuerda que el router usa "/")
app.use("/events", eventsRouter);

// Routes
app.use("/api", walletRouter);       //  /api/wallets y POST
app.use("/api", dacCounterRouter);   //  /api/dac-counter
app.use("/api/events", eventsRouter);
app.use("/api/alith", alithGenerateRouter);
app.use("/api/alith", alithAuditRouter);

// Alias para que el frontend pueda leer el contrato generado
app.get("/api/contract/generated", (req, res) => {
  try {
    const filePath = path.resolve("contracts/src/GeneratedDAC.sol");
    const code = fs.readFileSync(filePath, "utf-8");
    return res.json({ success: true, contractCode: code });
  } catch (err) {
    console.error("Contract fetch error:", err?.message);
    return res.status(404).json({ success: false, error: "Contract not found" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(` Backend running at http://localhost:${PORT}`);
});


/*require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
const auditRoute = require("./routes/api/ai/audit");
app.use("/api/ai/audit", auditRoute);

// Test route (opcional)
app.get("/api/ping", (req, res) => {
  res.json({ msg: "EagleDAC backend is alive 🦅" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
*/
// Rutas de la API
//const generateRoute = require("./routes/api/ai/generate");
//app.use("/api/ai/generate", generateRoute);

// Ruta de deploy
//const deployRoute = require("./routes/api/deploy");
//app.use("/api/deploy", deployRoute);


