// frontendEagledac/src/context/ContractsProvider.tsx
import { useEffect, useState } from "react";
import { ContractsContext } from "./ContractsContext";
import type { Contract } from "./ContractsContext";

export const ContractsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [contracts, setContracts] = useState<Contract[]>([]);

  const refreshContracts = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/contracts");
      const data = await res.json();
      if (data.success) setContracts(data.contracts.reverse());
    } catch (err) {
      console.error("Error loading contracts:", err);
    }
  };

  useEffect(() => {
    refreshContracts();
  }, []);

  return (
    <ContractsContext.Provider value={{ contracts, refreshContracts }}>
      {children}
    </ContractsContext.Provider>
  );
};
