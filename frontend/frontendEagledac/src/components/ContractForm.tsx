// src/components/ContractForm.tsx
import { useState } from "react"; // 👈 Importar hooks de React
import "../styles/creator.scss"; // 👈 Estilos personalizados opcionales

function ContractForm() {
  // 👇 Estados para campos del formulario
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  // 👇 Enviar datos al backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 👈 Prevenir recarga
    try {
      const res = await fetch("http://localhost:5000/generate", {
        // 👈 Ruta de backend
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, purpose }), // 👈 Enviamos nombre y propósito
      });
      const data = await res.json(); // 👈 Parsear respuesta
      setGeneratedCode(data.code); // 👈 Guardar código generado
    } catch (error) {
      console.error("Error generating contract:", error); // 👈 Manejo de errores
    }
  };

  return (
    <div className="contract-form">
      <form onSubmit={handleSubmit}>
        {" "}
        {/* // 👈 Formulario de envío */}
        <label>
          Contract Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // 👈 Actualizar estado
            required
          />
        </label>
        <label>
          Purpose:
          <textarea
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)} // 👈 Actualizar propósito
            required
          />
        </label>
        <button type="submit">Generate Contract</button>{" "}
        {/* // 👈 Botón de envío */}
      </form>

      {generatedCode && (
        <div className="generated-code">
          <h3>Generated Smart Contract</h3>
          <pre>{generatedCode}</pre> {/* // 👈 Mostrar código generado */}
        </div>
      )}
    </div>
  );
}

export default ContractForm;
