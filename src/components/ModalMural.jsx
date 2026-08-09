import React, { useState } from "react";
import "./ModalMural.css";

export default function ModalMural({ isOpen, onClose, coleccionImagenes = [] }) {
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

            return (
              <div
                key={index}
                className={`mural-card ${esDesbloqueada ? "desbloqueada" : "bloqueada"}`}
                onClick={() => esDesbloqueada && setImagenSeleccionada(item)}
              >
                <div
                  className="mural-card-bg"
                  style={{
                    backgroundImage: esDesbloqueada ? `url(${item.url})` : "none"
                  }}
                />

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