// backend/node/alith/dacAgent.ts
import fetch from "node-fetch";

export async function generateContractWithAlith(prompt: string) {
  const response = await fetch("https://api.alith.lazai.network/api/agent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.ALITH_API_KEY}`, // si hay key
    },
    body: JSON.stringify({
      prompt,
      temperature: 0.6, // más bajo = más preciso
    }),
  });

  const data = await response.json();
  return data.output; // aquí viene el código generado
}
