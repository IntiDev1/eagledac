#!/bin/bash

# 🧪 Ejecuta auditoría con Slither y guarda el output en formato JSON
echo "📊 Running Slither audit on GeneratedDAC.sol..."

slither ./contracts/src/GeneratedDAC.sol --json ./scripts/slither_output.json

if [ $? -eq 0 ]; then
  echo "✅ Slither audit completed successfully."
else
  echo "❌ Slither audit failed. Please check contract or Slither installation."
fi
