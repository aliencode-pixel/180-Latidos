import React, { useState } from "react";
import "./ModalMural.css";

export default function ModalMural({ isOpen, onClose, coleccionImagenes = [], onAbrirEspecial }) {
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  if (!isOpen) return null;

  return (
    <div className="mural-overlay" onClick={onClose}>
      <div className="mural-modal" onClick={(e) => e.stopPropagation()}>
        {/* Botón de Cierre */}
        <button className="mural-btn-cerrar" onClick={onClose}>
          ✕
        </button>

        <div className="mural-header">
          <h2 className="mural-titulo">🏛️ Mural de Recuerdos</h2>
          <p className="mural-subtitulo">
            Colección de piezas unlocked y secretos por revelar
          </p>
        </div>

        {/* Cuadrícula de la Colección */}
        <div className="mural-grid">
          {coleccionImagenes.map((item, index) => {
            const esDesbloqueada = item.desbloqueada;
            const esEspecial = item.tipo && item.tipo !== "semana";

            const handleClick = () => {
              if (!esDesbloqueada) return;
              if (esEspecial && onAbrirEspecial) {
                onAbrirEspecial(item);
              } else if (!esEspecial) {
                setImagenSeleccionada(item);
              }
            };

            return (
              <div
                key={index}
                className={`mural-card ${esDesbloqueada ? "desbloqueada" : "bloqueada"} ${esEspecial ? "mural-card-especial" : ""}`}
                onClick={handleClick}
              >
                {esEspecial ? (
                  <div
                    className="mural-card-especial-icono flex items-center justify-center w-full h-full"
                    style={{
                      background: "linear-gradient(135deg, #4b2d5c, #2b0d3c)"
                    }}
                  >
                    <span className="material-symbols-outlined text-4xl text-[#ffb4a2]">
                      {item.icono || "auto_awesome"}
                    </span>
                  </div>
                ) : (
                  <div
                    className="mural-card-bg"
                    style={{
                      backgroundImage: esDesbloqueada ? `url(${item.url})` : "none"
                    }}
                  />
                )}

                {!esDesbloqueada ? (
                  <div className="mural-candado-box">
                    <span className="mural-candado-icono">🔒</span>
                    <span className="mural-semana-tag">Semana {item.semana}</span>
                  </div>
                ) : (
                  <div className="mural-card-info">
                    <span className="mural-card-titulo">{item.titulo || `Pieza #${item.semana}`}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Vista previa ampliada al hacer clic en una foto desbloqueada */}
        {imagenSeleccionada && (
          <div className="mural-preview-overlay" onClick={() => setImagenSeleccionada(null)}>
            <div className="mural-preview-content" onClick={(e) => e.stopPropagation()}>
              <button 
                className="mural-btn-cerrar-preview" 
                onClick={() => setImagenSeleccionada(null)}
              >
                ✕
              </button>
              <img src={imagenSeleccionada.url} alt={imagenSeleccionada.titulo} />
              <h4>{imagenSeleccionada.titulo}</h4>
              <p>{imagenSeleccionada.descripcion}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}