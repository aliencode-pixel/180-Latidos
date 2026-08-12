import React, { useState, useRef } from "react";
import "./PuzzleSemanas.css";

/* ============================================================
   PÁGINAS DEL DOSSIER (EXPORTS DE CANVA)
   Reemplaza estas rutas placeholder por las páginas finales.
============================================================ */
const PAGINAS_CANVA = ['/puzzle/pag1.jpg', '/puzzle/pag2.jpg', '/puzzle/pag3.jpg'];

export default function PuzzleSemanas({ diaActual, totalSemanas, imagenFinal }) {
  const [mostrarPuzzle, setMostrarPuzzle] = useState(false);
  const [dossierAbierto, setDossierAbierto] = useState(false);
  const [paginaActual, setPaginaActual] = useState(0);
  const [pausado, setPausado] = useState(false);

  const semanaActual = Math.min(totalSemanas, Math.ceil(diaActual / 7));
  const puzzleCompleto = semanaActual >= totalSemanas;
  const porcentajeProgreso = Math.min(100, (semanaActual / totalSemanas) * 100);

  const togglePausa = () => setPausado((p) => !p);

  const irPaginaAnterior = () => {
    setPausado(false);
    setPaginaActual((p) => (p === 0 ? PAGINAS_CANVA.length - 1 : p - 1));
  };

  const irPaginaSiguiente = () => {
    setPausado(false);
    setPaginaActual((p) => (p === PAGINAS_CANVA.length - 1 ? 0 : p + 1));
  };

  return (
    <div className="puzzle-semanas-wrapper w-full">

      {/* CAJA DEL ZOMBIE + BARRA DE PROGRESO */}
      <div className="zombie-panel bg-surface-container/70 backdrop-blur-md border border-outline-variant/30 rounded-2xl">
        <div className="zombie-stage">
          <div
            className="zombie-walker-progreso"
            style={{ left: `calc(${porcentajeProgreso}% - 22px)` }}
          >
            <img
              src="/zombie-pollo.png"
              alt="Zombie constructor sobre la gallina"
              className="zombie-animado"
            />
          </div>

          <div className="zombie-barra-track">
            <div
              className="zombie-barra-fill"
              style={{ width: `${porcentajeProgreso}%` }}
            />
          </div>
        </div>

        <div className="zombie-info">
          <span className="zombie-semana-texto font-label-md">SEMANA {semanaActual}</span>
          <p className="zombie-mensaje font-body-md">
            🏕️ Hay luces cálidas apareciendo en esta foto...
          </p>

          {puzzleCompleto ? (
            <button
              className="zombie-btn-dossier"
              onClick={() => setDossierAbierto(true)}
            >
              Ver Archivos Vol. II 📜
            </button>
          ) : null}

          <button
            className="zombie-btn-toggle font-label-md"
            onClick={() => setMostrarPuzzle(!mostrarPuzzle)}
          >
            {mostrarPuzzle ? "Ocultar progreso ▲" : "Ver progreso del puzzle 🧩"}
          </button>
        </div>
      </div>

      {/* GRILLA 3x3 DEL PUZZLE (Oculta por defecto) */}
      {mostrarPuzzle && (
        <div className="puzzle-grid-card bg-surface-container/70 backdrop-blur-md border border-outline-variant/30 rounded-2xl">
          <div className="puzzle-icon-top">🧩</div>

          <div className="puzzle-grid grid grid-cols-3 gap-2">
            {Array.from({ length: totalSemanas }).map((_, i) => {
              const desbloqueado = i < semanaActual;
              return (
                <div
                  key={i}
                  className={`puzzle-piece rounded-xl ${desbloqueado ? "unlocked" : "locked bg-white/5 backdrop-blur-md border border-[#aa8982]/20"}`}
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
                    <div className="piece-locked-content font-headline-sm">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* LECTOR DE DOSSIER — ARCHIVOS VOL. II */}
      {dossierAbierto && (
        <div className="dossier-overlay" onClick={() => setDossierAbierto(false)}>
          <div className="dossier-frame" onClick={(e) => e.stopPropagation()}>

            <button
              className="dossier-btn-cerrar"
              onClick={() => setDossierAbierto(false)}
              aria-label="Cerrar dossier"
            >
              ✕
            </button>

            <h3 className="dossier-titulo font-headline-md">Archivos Vol. II</h3>

            <div
              className="dossier-visor"
              onClick={togglePausa}
              key={paginaActual}
            >
              <img
                src={PAGINAS_CANVA[paginaActual]}
                alt={`Página ${paginaActual + 1} del dossier`}
                className={`dossier-pagina ${pausado ? "pausado" : ""}`}
              />
            </div>

            <div className="dossier-controles">
              <button className="dossier-nav" onClick={irPaginaAnterior} aria-label="Página anterior">←</button>
              <span className="dossier-contador font-label-md">
                Página {paginaActual + 1} de {PAGINAS_CANVA.length}
              </span>
              <button className="dossier-nav" onClick={irPaginaSiguiente} aria-label="Página siguiente">→</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}