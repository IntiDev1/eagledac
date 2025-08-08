// frontendEagledac/src/hooks/useDeployDAC.ts
import { useState } from "react";
import { useWriteContract } from "wagmi";

const DAC_FACTORY_ADDRESS = "0xTU_FACTORY_ADDRESS_AQUI";

const abi = [
  {
    name: "deployDAC",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "name", type: "string" },
      { name: "purpose", type: "string" },
    ],
    outputs: [],
  },
] as const;

export const useDeployDAC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { writeContractAsync } = useWriteContract();

  const deploy = async (name: string, purpose: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      return await writeContractAsync({
        address: DAC_FACTORY_ADDRESS,
        abi,
        functionName: "deployDAC",
        args: [name, purpose],
        chainId: 1088,  // Especificar chainId de Metis
      });
    } catch (err) {
      setError((err as Error).message || "Error desconocido");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { deploy, isLoading, error };
};