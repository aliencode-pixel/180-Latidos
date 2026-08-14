import React, { useEffect, useMemo, useState } from "react";
import "./HistorialCanciones.css";

const LIMITE_VOLUMEN_1 = 180;

export default function HistorialCanciones({ onVolver }) {
  const [historial, setHistorial] = useState([]);
  const [pestañaActiva, setPestañaActiva] = useState("vol1");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("historial") || "[]");
    setHistorial(data);
  }, []);

  // Solo canciones (portada, título, artista, enlace) — nunca los textos de latidos.
  // Si cada entrada trae `dia`, se usa para ubicarla en Vol. I / Vol. II con
  // precisión; si no, se asume el orden cronológico del propio arreglo.
  const { volumen1, volumen2 } = useMemo(() => {
    const conDia = historial
      .map((item, indice) => ({
        ...item,
        __dia: typeof item.dia === "number" ? item.dia : indice + 1
      }))
      .filter((item) => item.cancion && (item.cancion.nombre || item.cancion.titulo));

    return {
      volumen1: conDia.filter((item) => item.__dia <= LIMITE_VOLUMEN_1),
      volumen2: conDia.filter((item) => item.__dia > LIMITE_VOLUMEN_1)
    };
  }, [historial]);

  const listaActiva = pestañaActiva === "vol1" ? volumen1 : volumen2;

  return (
    <div className="hc-wrapper">
      <div className="hc-panel">
        <h2 className="hc-titulo">Historial de Canciones</h2>
        <p className="hc-subtitulo">Cada canción que marcó un día</p>

        {/* PESTAÑAS */}
        <div className="hc-tabs">
          <button
            className={`hc-tab ${pestañaActiva === "vol1" ? "hc-tab-activa" : ""}`}
            onClick={() => setPestañaActiva("vol1")}
          >
            📁 ARCHIVO I: VOLUMEN I
          </button>
          <button
            className={`hc-tab ${pestañaActiva === "vol2" ? "hc-tab-activa" : ""}`}
            onClick={() => setPestañaActiva("vol2")}
          >
            📁 ARCHIVO II: VOLUMEN II
          </button>
        </div>

        {/* LISTA */}
        <div className="hc-lista">
          {listaActiva.length === 0 && (
            <p className="hc-vacio">
              {pestañaActiva === "vol1"
                ? "Aún no hay canciones registradas en el Volumen I."
                : "Todavía no hay canciones nuevas en el Volumen II."}
            </p>
          )}

          {listaActiva.map((item, index) => {
            const cancion = item.cancion;
            const titulo = cancion.nombre || cancion.titulo;
            return (
              <div key={index} className="hc-card">
                <div
                  className="hc-portada"
                  style={{
                    backgroundImage: cancion.portada
                      ? `url(${cancion.portada})`
                      : "none"
                  }}
                >
                  {!cancion.portada && (
                    <span className="material-symbols-outlined">music_note</span>
                  )}
                </div>
                <div className="hc-info">
                  <p className="hc-cancion-titulo">{titulo}</p>
                  <p className="hc-cancion-artista">{cancion.artista}</p>
                </div>
                {cancion.link && (
                  <a
                    href={cancion.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hc-abrir-link"
                  >
                    <span className="material-symbols-outlined">open_in_new</span>
                  </a>
                )}
              </div>
            );
          })}
        </div>

        <button className="hc-volver-btn" onClick={onVolver}>
          Volver
        </button>
      </div>
    </div>
  );
}
