// frontend/frontendEagledac/src/utils/api.ts

export async function registerWallet(address: string): Promise<boolean> {
    try {
      const res = await fetch("http://localhost:3001/api/register-wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }),
      });
  
      const data = await res.json();
      return data.success === true;
    } catch (err) {
      console.error("❌ Failed to register wallet:", err);
      return false;
    }
  }
  