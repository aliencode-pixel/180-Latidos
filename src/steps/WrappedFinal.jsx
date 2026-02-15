import React, { useEffect, useRef, useState } from "react";
import { TRACKS } from "../data/tracks";
import CollageExplosion from "./CollageExplosion";

export default function WrappedFinal({ onVolver }) {
  const audioRef = useRef(null);

  const [showCollage, setShowCollage] = useState(true);
  const [showCredits, setShowCredits] = useState(false);
  const [fadeToBlack, setFadeToBlack] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const [fullscreenFailed, setFullscreenFailed] = useState(false);

  /* ============================================================
     FULLSCREEN AUTOMÁTICO + FALLBACK
  ============================================================ */
  useEffect(() => {
    const el = document.documentElement;

    const tryFullscreen = async () => {
      try {
        if (el.requestFullscreen) await el.requestFullscreen();
        else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
        else throw new Error("Fullscreen not supported");
      } catch {
        setFullscreenFailed(true);
      }
    };

    tryFullscreen();
  }, []);

  const enterFullscreenManually = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    setFullscreenFailed(false);
  };

  /* ============================================================
     ⭐ CONTROL DE MÚSICA — FADE IN PROFESIONAL
  ============================================================ */
  useEffect(() => {
    if (!showContent) return; // música solo cuando aparece el contenido real

    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0;
    audio.play();

    let vol = 0;
    const fadeIn = setInterval(() => {
      vol += 0.02;
      if (vol >= 0.25) {
        vol = 0.25;
        clearInterval(fadeIn);
      }
      audio.volume = vol;
    }, 120);

    return () => clearInterval(fadeIn);
  }, [showContent]);

  /* ============================================================
     ⭐ SECUENCIA DEL COLLAGE → NEGRO → CRÉDITOS → CONTENIDO
  ============================================================ */
  const handleCollageFinish = () => {
    setShowCollage(false);

    // Fade a negro
    setFadeToBlack(true);

    setTimeout(() => {
      setShowCredits(true);

      setTimeout(() => {
        setFadeToBlack(false);
        setShowCredits(false);
        setShowContent(true); // ahora sí aparece el Wrapped Final real
      }, 4000);

    }, 2000);
  };

  /* ============================================================
     ESTADÍSTICAS
  ============================================================ */
  const vibesCount = TRACKS.reduce(
    (acc, t) => {
      acc[t.vibe] = (acc[t.vibe] || 0) + 1;
      return acc;
    },
    { soft: 0, pop: 0, dark: 0 }
  );

  const artistasCount = TRACKS.reduce((acc, t) => {
    acc[t.artista] = (acc[t.artista] || 0) + 1;
    return acc;
  }, {});

  const artistasTop = Object.entries(artistasCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const versos = [
    { texto: "180 días.", delay: 1 },
    { texto: "180 canciones.", delay: 4 },
    { texto: "180 emociones.", delay: 7 },
    { texto: "Y aunque este viaje termina aquí…", delay: 11 },
    { texto: "…lo de nosotros apenas comienza.", delay: 15 }
  ];

  /* ============================================================
     RENDER
  ============================================================ */
  return (
    <div className="wrapped-final-wrapper cinematic-enter">

      {/* ⭐ COLLAGE EXPLOSIVO */}
      {showCollage && (
        <CollageExplosion
          covers={TRACKS.map(t => t.portada)}
          onFinish={handleCollageFinish}
        />
      )}

      {/* ⭐ FADE A NEGRO */}
      {fadeToBlack && <div className="fade-black"></div>}

      {/* ⭐ CRÉDITOS */}
      {showCredits && (
        <div className="credits">
          <p>Gracias por vivir este viaje.</p>
          <p>— Con amor, tu 180 Latidos 💛</p>
        </div>
      )}

      {/* ⭐ CONTENIDO REAL DEL WRAPPED FINAL */}
      {showContent && (
        <>
          {/* Partículas doradas */}
          <div className="particles"></div>

          {/* Bokeh */}
          <div className="bokeh-layer"></div>

          {/* Film grain */}
          <div className="film-grain"></div>

          {/* Portadas fantasma flotando */}
          <div className="ghost-images">
            {TRACKS.slice(0, 12).map((t, i) => (
              <img
                key={i}
                src={t.portada}
                className={`ghost ghost-${i}`}
                alt=""
              />
            ))}
          </div>

          {/* ⭐ MÚSICA */}
          <audio
            ref={audioRef}
            src="/audio/Coldplay-MOON-MUSiC-_Official-Lyric-Visualiser_.mp3"
            autoPlay
            loop
            hidden
          ></audio>

          {/* BOTÓN FALLBACK PARA FULLSCREEN */}
          {fullscreenFailed && (
            <button className="fullscreen-btn" onClick={enterFullscreenManually}>
              Entrar al modo cine
            </button>
          )}

          <div className="wrapped-final">

            {/* INTRO */}
            <div className="intro">
              {versos.map((v, i) => (
                <p
                  key={i}
                  className="intro-line"
                  style={{ animationDelay: `${v.delay}s` }}
                >
                  {v.texto}
                </p>
              ))}
            </div>

            {/* ESTADÍSTICAS */}
            <div className="stats-section section-fade">
              <h2 className="section-title">Tus estadísticas</h2>

              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Vibes</h3>
                  <p>Soft: {vibesCount.soft}</p>
                  <p>Pop: {vibesCount.pop}</p>
                  <p>Dark: {vibesCount.dark}</p>
                </div>

                <div className="stat-card">
                  <h3>Artistas más repetidos</h3>
                  {artistasTop.map(([artista, count], i) => (
                    <p key={i}>
                      {i + 1}. {artista} — {count} canciones
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* LISTA COMPLETA */}
            <div className="songs-section section-fade">
              <h2 className="section-title">Las 180 canciones</h2>

              <div className="songs-grid">
                {TRACKS.map((t, i) => (
                  <div key={i} className="song-card parallax-card">
                    <img src={t.portada} alt={t.nombre} className="song-cover" />
                    <p className="song-title">{t.nombre}</p>
                    <p className="song-artist">{t.artista}</p>

                    <a
                      href={t.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="song-link"
                    >
                      Escuchar
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* BOTÓN VOLVER */}
            <button className="volver-btn section-fade" onClick={onVolver}>
              Volver
            </button>
          </div>
        </>
      )}
    </div>
  );
}
