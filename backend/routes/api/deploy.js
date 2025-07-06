const express = require("express");
const path = require("path");
const { exec } = require("child_process");

const router = express.Router();

router.post("/", (req, res) => {
  const contractPath = path.join(__dirname, "../../../contracts/src/GeneratedDAC.sol");

  if (!contractPath || !contractPath.endsWith(".sol")) {
    return res.status(400).json({ error: "Invalid contract path." });
  }

  // IMPORTANTE: Asegúrate de haber configurado las variables privadas de deploy antes (priv key, RPC)
  const command = `forge create ./contracts/src/GeneratedDAC.sol:GeneratedDAC --rpc-url $RPC_URL --private-key $PRIVATE_KEY`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Deploy error:", error);
      return res.status(500).json({ error: "Deploy failed", details: stderr });
    }

    res.json({ message: "✅ Contract deployed!", output: stdout });
  });
});

module.exports = router;
