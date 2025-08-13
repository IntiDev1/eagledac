// frontendEagledac/src/components/DeployButton.tsx
import { useDeployDAC } from "../hooks/useDeployDAC";

export function DeployButton() {
  const { deploy, isLoading } = useDeployDAC();

  const handleDeploy = async () => {
    try {
      await deploy("Mi DAC", "Propósito cool");
      // Éxito - puedes agregar notificación aquí si quieres
    } catch (error) {
      console.error("Error deploying:", error);
    }
  };

  return (
    <button onClick={handleDeploy} disabled={isLoading}>
      {isLoading ? "Deploying..." : " Deploy DAC"}
    </button>
  );
}
