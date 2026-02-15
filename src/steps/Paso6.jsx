import React, { useState, useMemo } from "react";
import FallingHearts from "../components/FallingHearts";

export default function Paso6({ cancion, diaActual, onSave, onHistorial }) {
  const [emocion, setEmocion] = useState("");

  const fecha = new Date().toLocaleDateString("es-VE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  // Determinar tema según emoción escrita
  const tema = useMemo(() => {
    const e = emocion.toLowerCase();

    if (
      e.includes("feliz") ||
      e.includes("content") ||
      e.includes("energ") ||
      e.includes("emocion") ||
      e.includes("alegr")
    ) return "tema-energia";

    if (
      e.includes("triste") ||
      e.includes("nostal") ||
      e.includes("solo") ||
      e.includes("mal") ||
      e.includes("bajon") ||
      e.includes("vacío") ||
      e.includes("cansad")
    ) return "tema-nostalgia";

    return "tema-calma";
  }, [emocion]);

  const handleGuardar = () => {
    if (!emocion.trim()) return; // evitar guardar vacío

    const latido = {
      texto: emocion,
      fecha,
      cancion
    };

    const historial = JSON.parse(localStorage.getItem("historial") || "[]");
    const nuevo = [latido, ...historial];

    localStorage.setItem("historial", JSON.stringify(nuevo));

    if (diaActual) {
      localStorage.setItem("ultimoLatidoDia", diaActual);
    }

    onSave();
  };

  return (
    <div className={`paso6 ${tema}`}>
      
      <FallingHearts />

      <div className="tarjeta-emocion">
        <h2 className="titulo">Tu latido de hoy</h2>
        <p className="fecha">{fecha}</p>

        <textarea
          className="textarea"
          value={emocion}
          onChange={(e) => setEmocion(e.target.value)}
          placeholder="Escribe aquí lo que estás sintiendo..."
        />

        <button className="btn-guardar" onClick={handleGuardar}>
          Guardar mi latido
        </button>

        <div className="flecha-historial" onClick={onHistorial}>
          Ver mis latidos ↓
        </div>
      </div>
    </div>
  );
}
