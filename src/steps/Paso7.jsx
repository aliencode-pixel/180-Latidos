import React, { useEffect, useState } from "react";
import "../steps/Paso7.css";

export default function Paso7({ onVolver }) {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("historial") || "[]");
    setHistorial(data);
  }, []);

  const borrarLatido = (index) => {
    const nuevoHistorial = historial.filter((_, i) => i !== index);
    setHistorial(nuevoHistorial);
    localStorage.setItem("historial", JSON.stringify(nuevoHistorial));
  };

  return (
    <div className="paso7-wrapper">
      <div className="paso7">

        <h2 className="titulo-historial">Tu historial de latidos</h2>

        <div className="contenido-historial">
          {historial.length === 0 && (
            <p style={{ color: "#666", fontSize: "1rem" }}>
              Aún no has escrito ningún latido.
            </p>
          )}

          {historial.map((item, index) => (
            <div key={index} className="latido-item">
              <p className="latido-fecha">{item.fecha}</p>
              <p className="latido-texto">{item.texto}</p>

              {item.cancion && (
                <p className="latido-cancion">
                  <strong>Canción:</strong> {item.cancion.nombre} — {item.cancion.artista}
                </p>
              )}

              {/* Botón para borrar */}
              <button
                className="borrar-latido-btn"
                onClick={() => borrarLatido(index)}
              >
                Borrar latido
              </button>

              <div className="latido-divider"></div>
            </div>
          ))}
        </div>

        <button className="volver-btn" onClick={onVolver}>
          Volver
        </button>

      </div>
    </div>
  );
}
