// frontendEagledac/src/hooks/useDeployedContracts.ts
import { useAccount, usePublicClient } from "wagmi";
import { useEffect, useState } from "react";
import { parseAbi } from "viem";

const CONTRACT_FACTORY_ADDRESS = "0xYourFactoryAddress";

// ABI corregida
const CONTRACT_DEPLOYED_ABI = parseAbi([
  "event ContractDeployed(address indexed creator, address indexed contractAddress, string name)"
]);

interface DeployedContract {
  address: string;
  name: string;
  block: bigint;
}

export function useDeployedContracts() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const [contracts, setContracts] = useState<DeployedContract[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address || !publicClient) {
      setIsLoading(false);
      return;
    }

    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const logs = await publicClient.getLogs({
          address: CONTRACT_FACTORY_ADDRESS,
          event: CONTRACT_DEPLOYED_ABI[0],
          args: { creator: address as `0x${string}` },  // Tipado temporal
          fromBlock: 0n,
          toBlock: "latest"
        });

        const mapped = logs
          .filter(log => log.args.contractAddress && log.args.name)
          .map(log => ({
            address: log.args.contractAddress as string,
            name: log.args.name as string,
            block: log.blockNumber || 0n
          }));

        setContracts(mapped.reverse());
      } catch (err) {
        setError((err as Error).message || "Error al obtener contratos");
        console.error("Error fetching logs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [address, publicClient]);

  return { contracts, isLoading, error };
}