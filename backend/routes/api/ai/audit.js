
const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Helper: Clean up Slither JSON into a readable summary
function formatSlitherReport(slitherJson) {
  const issues = slitherJson.results.detectors;

  if (!issues || issues.length === 0) {
    return {
      summary: "✅ No vulnerabilities detected by Slither.",
      count: 0,
      issues: [],
    };
  }

  const cleaned = issues.map((issue, idx) => {
    return {
      id: idx + 1,
      check: issue.check,
      impact: issue.impact,
      confidence: issue.confidence,
      description: issue.description,
      location: issue.elements.map((el) => el.source_mapping?.filename || "N/A"),
    };
  });

  return {
    summary: `⚠️ ${cleaned.length} issues found by Slither.`,
    count: cleaned.length,
    issues: cleaned,
  };
}

// GET /api/ai/audit
router.get("/", (req, res) => {
  const auditPath = path.join(__dirname, "../../../scripts/slither_output.json");

  if (!fs.existsSync(auditPath)) {
    return res.status(404).json({ error: "Audit report not found. Run run_audit.sh first." });
  }

  try {
    const raw = fs.readFileSync(auditPath);
    const slitherJson = JSON.parse(raw);
    const formatted = formatSlitherReport(slitherJson);
    res.json(formatted);
  } catch (err) {
    console.error("Failed to load audit report:", err);
    res.status(500).json({ error: "Failed to load or parse audit report." });
  }
});

module.exports = router;
