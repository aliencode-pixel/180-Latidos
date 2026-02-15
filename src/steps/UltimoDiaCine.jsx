import React, { useEffect, useRef } from "react";

export default function UltimoDiaCine({ onFinish }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.25;

    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 15000); // 15 segundos

    return () => clearTimeout(timer);
  }, []);

  const versos = [
    { texto: "Llegamos al último latido.", delay: 2 },
    { texto: "Un viaje que se volvió universo.", delay: 6 },
    { texto: "Y este es nuestro cielo final.", delay: 10 }
  ];

  return (
    <div className="ultimo-cine-wrapper cinematic-enter">

      {/* Estrellas */}
      <div className="stars"></div>

      {/* Nebulosas */}
      <div className="nebula"></div>

      {/* Música */}
      <audio
        ref={audioRef}
        src="/audio/Agape.mp3"
        autoPlay
        loop
        hidden
      ></audio>

      <div className="ultimo-cine-content">
        {versos.map((v, i) => (
          <p
            key={i}
            className="ultimo-cine-line"
            style={{ animationDelay: `${v.delay}s` }}
          >
            {v.texto}
          </p>
        ))}
      </div>
    </div>
  );
}
