import React, { useState, useMemo } from "react";
import FallingHearts from "../components/FallingHearts";

// Credenciales de tu base de datos Supabase
const SUPABASE_REST_URL = "https://tzzqeokktvtvknsidiev.supabase.co/rest/v1/latidos";
const SUPABASE_ANON_KEY = "sb_publishable_jo4UDshpx-apmFm__j83nA_0GFt1iNL";

export default function Paso6({ cancion, diaActual, onSave, onHistorial }) {
  const [emocion, setEmocion] = useState("");
  const [enviando, setEnviando] = useState(false); // 👈 Bloqueo de seguridad

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

  const handleGuardar = async () => {
    // Si ya se está procesando o el campo está vacío, se ignora cualquier clic extra
    if (enviando || !emocion.trim()) return;

    setEnviando(true); // 👈 Se bloquea el proceso en el primer toque

    // 1. Estructura y guardado local original
    const latido = {
      texto: emocion,
      fecha,
      cancion,
      dia: diaActual ? Number(diaActual) : null
    };

    const historial = JSON.parse(localStorage.getItem("historial") || "[]");
    const nuevo = [latido, ...historial];

    localStorage.setItem("historial", JSON.stringify(nuevo));

    if (diaActual) {
      localStorage.setItem("ultimoLatidoDia", diaActual);
    }

    // 2. Respaldo silencioso en tu base de datos Supabase
    try {
      await fetch(SUPABASE_REST_URL, {
        method: "POST",
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({
          dia: diaActual ? Number(diaActual) : null,
          texto: emocion
        })
      });
    } catch (error) {
      console.log("Error al conectar con Supabase, guardado solo en el teléfono.");
    }

    // 3. Continuar el flujo de la app
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

        <button 
          className="btn-guardar" 
          onClick={handleGuardar}
          disabled={enviando || !emocion.trim()} // 👈 Deshabilita el botón si 'enviando' es true
        >
          Guardar mi latido
        </button>

        <div className="flecha-historial" onClick={onHistorial}>
          Ver mis latidos ↓
        </div>
      </div>
    </div>
  );
}