import React, { useEffect, useRef } from "react";

export default function UltimoDia({ ultimaCancion, onIrWrappedFinal, instrumentalRef }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    // ⭐ Safari móvil NO permite autoplay sin interacción
    // Por eso esperamos a que el usuario toque la pantalla
    const enableAudio = () => {
      if (instrumentalRef?.current) {
        instrumentalRef.current.volume = 0.25;
        instrumentalRef.current.play().catch(() => {});
      }
      window.removeEventListener("touchstart", enableAudio);
      window.removeEventListener("click", enableAudio);
    };

    window.addEventListener("touchstart", enableAudio);
    window.addEventListener("click", enableAudio);

    // ⭐ Activación automática del fade-out + collage
    const timer = setTimeout(() => {
      iniciarTransicion();
    }, 18000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("touchstart", enableAudio);
      window.removeEventListener("click", enableAudio);
    };
  }, []);

  const iniciarTransicion = () => {
    // ⭐ Fade-out visual
    if (wrapperRef.current) {
      wrapperRef.current.classList.add("ultimo-dia-fadeout");
    }

    // ⭐ Fade-out musical
    if (instrumentalRef?.current) {
      const audio = instrumentalRef.current;
      const fade = setInterval(() => {
        if (audio.volume > 0.02) {
          audio.volume -= 0.02;
        } else {
          audio.volume = 0;
          clearInterval(fade);
        }
      }, 80);
    }

    // ⭐ Aquí NO vamos directo al Wrapped Final
    // Ahora vamos al COLLAGE EXPLOSIVO
    setTimeout(() => {
      if (onIrWrappedFinal) onIrWrappedFinal("collage");
    }, 1500);
  };

  const versos = [
    { texto: "Durante 180 días, esta app latió por ti.", delay: 2 },
    { texto: "180 canciones, 180 emociones. 180 formas de decirte que te quiero.", delay: 6 },
    { texto: "Y aunque este viaje termina aquí...", delay: 10 },
    { texto: "...lo de nosotras apenas comienza.", delay: 14 }
  ];

  return (
    <div className="ultimo-dia-wrapper" ref={wrapperRef}>
      <div className="ultimo-dia">

        {/* Versos poéticos */}
        <div className="versos-finales">
          {versos.map((v, i) => (
            <p
              key={i}
              className="verso"
              style={{ animationDelay: `${v.delay}s` }}
            >
              {v.texto}
            </p>
          ))}
        </div>

        {/* Instrumental */}
        <audio
          ref={instrumentalRef}
          src="/audio/LANY-So-Soo-Pretty-_Official-Audio_.mp3"
          autoPlay
          loop
          hidden
        ></audio>

        {/* Última canción */}
        <div className="cancion-final">
          <img
            src={ultimaCancion.portada}
            alt={ultimaCancion.titulo}
            className="portada-final"
          />
          <p className="nombre-cancion">{ultimaCancion.titulo}</p>
          <audio src={ultimaCancion.url} autoPlay controls />
        </div>

        {/* ❌ Botón eliminado — ya no debe existir */}
      </div>
    </div>
  );
}
