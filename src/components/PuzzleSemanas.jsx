import React, { useState } from "react";
import "./PuzzleSemanas.css";

export default function PuzzleSemanas({ diaActual, totalSemanas, imagenFinal }) {
  const [mostrarPuzzle, setMostrarPuzzle] = useState(false);
  const semanaActual = Math.min(totalSemanas, Math.ceil(diaActual / 7));

  // Calculamos qué pedazo de la foto corresponde a la semana actual
  const indexPieza = semanaActual - 1;
  const posicionFondo = `${(indexPieza % 4) * 33.33}% ${Math.floor(indexPieza / 4) * 100}%`;

  return (
    <div className="puzzle-semanas-wrapper">
      
      {/* CAJA OSCURA DEL ZOMBIE */}
      <div 
        className="zombie-panel" 
        onClick={() => setMostrarPuzzle(!mostrarPuzzle)}
      >
        {/* ⭐ EL MINI ESCENARIO DE CONSTRUCCIÓN ⭐ */}
        <div className="zombie-stage">
          
          {/* El zombie que camina de un lado a otro */}
          <div className="zombie-walker">
            
            {/* El bloque chiquito que el zombie "carga" y luego suelta */}
            <div 
              className="carried-block" 
              style={{
                backgroundImage: `url(${imagenFinal})`,
                backgroundPosition: posicionFondo
              }}
            />

            {/* La imagen del zombie y el pollo dando saltitos */}
            <img 
              src="/zombie-pollo.png" 
              alt="Zombie constructor" 
              className="zombie-animado" 
            />
          </div>

          {/* El bloque fijo en el piso que "está construyendo" */}
          <div 
            className="building-block" 
            style={{
              backgroundImage: `url(${imagenFinal})`,
              backgroundPosition: posicionFondo
            }}
          />
        </div>

        {/* INFO Y TEXTOS */}
        <div className="zombie-info">
          <span className="zombie-semana-texto">SEMANA {semanaActual}</span>
          <p className="zombie-mensaje">
            🏕️ Hay luces cálidas apareciendo en esta foto...
          </p>
          <button className="zombie-btn-toggle">
            {mostrarPuzzle ? "Ocultar progreso 🔼" : "Ver progreso del puzzle 🧩"}
          </button>
        </div>
      </div>

      {/* GRID DEL PUZZLE (Oculto por defecto) */}
      {mostrarPuzzle && (
        <div className="puzzle-grid-card">
          <div className="puzzle-icon-top">🧩</div>
          
          <div className="puzzle-grid">
            {Array.from({ length: totalSemanas }).map((_, i) => {
              const desbloqueado = i < semanaActual;
              return (
                <div 
                  key={i} 
                  className={`puzzle-piece ${desbloqueado ? "unlocked" : "locked"}`}
                >
                  {desbloqueado ? (
                    <div
                      className="piece-image"
                      style={{
                        backgroundImage: `url(${imagenFinal})`,
                        backgroundPosition: `${(i % 4) * 33.33}% ${Math.floor(i / 4) * 100}%`
                      }}
                    />
                  ) : (
                    <div className="piece-locked-content">
                      🔒 <span>SEM {i + 1}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}