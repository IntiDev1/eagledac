// frontendEagledac/src/context/ContractsContext.ts
import { createContext } from "react";

export type Contract = {
  address: string;
  name: string;
  block: number;
};

export type ContractsContextType = {
  contracts: Contract[];
  refreshContracts: () => void;
};

export const ContractsContext = createContext<ContractsContextType | null>(
  null
);
