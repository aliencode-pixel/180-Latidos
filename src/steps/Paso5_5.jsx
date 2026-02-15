import React from "react";

export default function Paso5_5({ cancion, onContinuar }) {
  if (!cancion) return null;

  const { nombre, artista, portada, link, vibe } = cancion;

  const softThemes = [
    "tema-pastel-bloom",
    "tema-blue-serenity",
    "tema-aurora-bloom",
    "tema-heartwave",
    "tema-dreamlight"
  ];

  const popThemes = [
    "tema-golden-drift",
    "tema-stardust-pop",
    "tema-neon-pastel"
  ];

  const darkThemes = [
    "tema-midnight-glow",
    "tema-violet-pulse"
  ];

  const elegirTema = () => {
    if (vibe === "soft") return softThemes[Math.floor(Math.random() * softThemes.length)];
    if (vibe === "pop") return popThemes[Math.floor(Math.random() * popThemes.length)];
    if (vibe === "dark") return darkThemes[Math.floor(Math.random() * darkThemes.length)];
    return "tema-pastel-bloom";
  };

  const tema = elegirTema();

  return (
    <div className={`paso-cancion ${tema}`}>
      <div className="tarjeta-cancion anim-entrada">

        <h2 className="titulo-cancion">{nombre}</h2>

        <img
          src={portada}
          alt={nombre}
          className="portada-cancion anim-portada"
        />

        <p className="nombre">{nombre}</p>
        <p className="artista">{artista}</p>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-link"
        >
          Abrir link
        </a>

        <button
          className="btn-continuar"
          onClick={() => onContinuar(cancion)}
        >
          Continuar
        </button>

      </div>
    </div>
  );
}
