// frontendEagledac/src/hooks/useContracts.ts
import { useContext } from "react";
import { ContractsContext } from "../context/ContractsContext";

export const useContracts = () => {
  const ctx = useContext(ContractsContext);
  if (!ctx) throw new Error("useContracts must be used within ContractsProvider");
  return ctx;
};
