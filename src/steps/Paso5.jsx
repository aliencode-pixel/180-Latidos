import React, { useState } from "react";
import { TRACKS } from "../data/tracks";

const IMAGES = [
  { src: "/assets/slot-heart.png", alt: "corazón" },
  { src: "/assets/slot-star.png", alt: "estrella" },
  { src: "/assets/slot-music.png", alt: "nota musical" }
];

export default function Paso5({ diaActual, onWrite }) {
  const [spinning, setSpinning] = useState(false);
  const [mostrarCancion, setMostrarCancion] = useState(false);

  const [results, setResults] = useState([IMAGES[0], IMAGES[0], IMAGES[0]]);

  const iniciarRuleta = () => {
    if (spinning || mostrarCancion) return;

    setSpinning(true);

    const durations = [1200, 1700, 2200];
    const newResults = Array.from(
      { length: 3 },
      () => IMAGES[Math.floor(Math.random() * IMAGES.length)]
    );

    durations.forEach((d, i) => {
      setTimeout(() => {
        setResults((prev) => {
          const copy = [...prev];
          copy[i] = newResults[i];
          return copy;
        });

        if (i === durations.length - 1) {
          setSpinning(false);

          /* ⭐ Canción del día basada en el día actual */
          const index = Math.max(0, Math.min(diaActual - 1, TRACKS.length - 1));
          const siguiente = TRACKS[index];

          /* ⭐ Guardar progreso diario */
          localStorage.setItem("ultimaCancionDia", diaActual);

          setTimeout(() => {
            setMostrarCancion(true);
            onWrite(siguiente);
          }, 600);
        }
      }, d);
    });
  };

  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.style.opacity = "0.5";
    e.currentTarget.alt = "imagen no disponible";
  };

  if (mostrarCancion) return null;

  return (
    <div className="paso5">
      <div className="tarjeta">
        <h2 className="titulo">Tu vibra del día</h2>
        <p className="sub">Toca la ruleta para descubrirla</p>

        <div
          className={`slot-machine ${spinning ? "girando" : ""}`}
          onClick={iniciarRuleta}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter") iniciarRuleta(); }}
          aria-pressed={spinning}
        >
          {results.map((imgObj, i) => (
            <div className="reel-frame" key={i}>
              <div className={`reel-item ${spinning ? "animando" : "detenido"}`}>
                <img
                  src={imgObj.src}
                  alt={imgObj.alt}
                  draggable="false"
                  onError={handleImgError}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="controls">
          <button className="btn-spin" onClick={iniciarRuleta} disabled={spinning}>
            {spinning ? "Girando…" : "Girar"}
          </button>
        </div>
      </div>
    </div>
  );
}
