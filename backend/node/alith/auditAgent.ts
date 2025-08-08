// backend/node/alith/auditAgent.ts
import fetch from "node-fetch";

export async function auditContractWithAlith(contractCode: string) {
  const prompt = `Analiza el siguiente contrato Solidity:\n\n${contractCode}\n\nIndica vulnerabilidades y cómo solucionarlas.`;

  const response = await fetch("https://api.alith.lazai.network/api/agent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.ALITH_API_KEY}`,
    },
    body: JSON.stringify({
      prompt,
      temperature: 0.5,
    }),
  });

  const data = await response.json();
  return data.output;
}
