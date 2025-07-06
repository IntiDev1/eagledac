// backend/server.js
require("dotenv").config();

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

// Rutas de la API
const generateRoute = require("./routes/api/ai/generate");
app.use("/api/ai/generate", generateRoute);

// Ruta de deploy
const deployRoute = require("./routes/api/deploy");
app.use("/api/deploy", deployRoute);


