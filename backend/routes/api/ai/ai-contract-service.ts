// backend/routes/api/ai/ai-contract-service.ts
import axios from 'axios';

const ALITH_API_URL = "https://api.alith.metis.io";
const API_KEY = "TU_API_KEY";

export class ContractGenerator {
  async generateContract(prompt: string): Promise<string> {
    const response = await axios.post(`${ALITH_API_URL}/generate`, {
      prompt,
      framework: "foundry",
      language: "solidity"
    }, {
      headers: { Authorization: `Bearer ${API_KEY}` }
    });
    return response.data.code;
  }

  async auditContract(code: string): Promise<AuditReport> {
    const response = await axios.post(`${ALITH_API_URL}/audit`, {
      code,
      severity_level: "high"
    }, {
      headers: { Authorization: `Bearer ${API_KEY}` }
    });
    return response.data.report;
  }
}

interface AuditReport {
  vulnerabilities: Vulnerability[];
  score: number;
  suggestions: string[];
}

interface Vulnerability {
  description: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
  line: number;
}