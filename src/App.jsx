import React, { useState, useEffect, useRef } from "react";

/* ============================================================
   COMPONENTES
============================================================ */
import Bienvenida from "./Bienvenida";
import Paso2 from "./steps/Paso2";
import Paso3 from "./steps/Paso3";
import Paso4 from "./steps/Paso4";
import Paso5 from "./steps/Paso5";
import Paso5_5 from "./steps/Paso5_5";
import Paso6 from "./steps/Paso6";
import Paso7 from "./steps/Paso7";
import InicioDia from "./steps/InicioDia";
import UltimoDia from "./steps/UltimoDia";
import UltimoDiaCine from "./steps/UltimoDiaCine";
import WrappedFinal from "./steps/WrappedFinal";
import FallingHearts from "./components/FallingHearts";

// ⭐ COMPONENTE DE CUMPLEAÑOS
import BirthdaySurprise from "./components/BirthdaySurprise";
import { TRACKS } from "./data/tracks";

// 🧩 COMPONENTE DE PUZZLE (VOL. II)
import PuzzleSemanas from "./components/PuzzleSemanas";

// 🏛️ MURAL DE RECUERDOS
import ModalMural from "./components/ModalMural";

// 🎵 HISTORIAL DE CANCIONES (Archivo I / Archivo II)
import HistorialCanciones from "./components/HistorialCanciones";

// 🌌 TRANSICIÓN CINEMÁTICA A VOL. II
import MultiverseTransition from "./components/MultiverseTransition";

// 🗺️ FEATURE TOUR DE NOVEDADES (VOL. II)
import FeatureTourVol2 from "./components/FeatureTourVol2";

/* ============================================================
   CONFIGURACIÓN VOL. II (PUZZLE)
============================================================ */
const TOTAL_SEMANAS_PUZZLE = 8;
const MODO_PRUEBA_PUZZLE = true;

/* ============================================================
   CSS
============================================================ */
import "./App.css";
import "./Bienvenida.css";
import "./steps/Paso2.css";
import "./steps/Paso3.css";
import "./steps/Paso4.css";
import "./steps/Paso5.css";
import "./steps/PasoCancion.css";
import "./steps/Paso6.css";
import "./steps/Paso7.css";
import "./steps/InicioDia.css";
import "./steps/UltimoDia.css";
import "./steps/WrappedFinal.css";
import "./steps/UltimoDiaCine.css";

export default function App() {
  const [paso, setPaso] = useState(1);
  const [cancionSeleccionada, setCancionSeleccionada] = useState(null);
  const [temaElegido, setTemaElegido] = useState(null);
  const [transicionando, setTransicionando] = useState(false);

  const [pantallaDia, setPantallaDia] = useState(null);
  const [diaActual, setDiaActual] = useState(null);

  const [mostrarIntroUltimoDia, setMostrarIntroUltimoDia] = useState(false);
  const [transicionAWrapped, setTransicionAWrapped] = useState(false);

  const [mostrarCumple, setMostrarCumple] = useState(false);
  const [cumpleFinalizado, setCumpleFinalizado] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mostrarMural, setMostrarMural] = useState(false);
  const [mostrarBienvenidaOriginal, setMostrarBienvenidaOriginal] = useState(false);
  const [vol2TransicionCompletada, setVol2TransicionCompletada] = useState(
    () => localStorage.getItem("vol2_transicion_completada") === "true"
  );
  const [mostrarTransicionVol2, setMostrarTransicionVol2] = useState(false);
  const [mostrarHistorialCanciones, setMostrarHistorialCanciones] = useState(false);
  const [mostrarTourVol2, setMostrarTourVol2] = useState(false);
  const [tourVol2Pendiente, setTourVol2Pendiente] = useState(false);
  const instrumentalUltimoDiaRef = useRef(null);

  const tituloPagina = (MODO_PRUEBA_PUZZLE || diaActual >= 180) ? "180 latidos: Vol. II" : "180 latidos";

  useEffect(() => {
    document.title = tituloPagina;
  }, [tituloPagina]);

  useEffect(() => {
    const tema = localStorage.getItem("temaElegido");
    if (tema) setTemaElegido(tema);
  }, []);

  useEffect(() => {
    const chequearCumple = () => {
      const hoy = new Date();
      const es18Abril = hoy.getMonth() === 3 && hoy.getDate() === 18;
      const yaVioCumple = localStorage.getItem("cumple2026Visto") === "true";

      if (es18Abril && !yaVioCumple && !cumpleFinalizado) {
        setMostrarCumple(true);
      }
    };
    chequearCumple();
    const timer = setInterval(chequearCumple, 60000);
    return () => clearInterval(timer);
  }, [cumpleFinalizado]);

  useEffect(() => {
    const calcularDia = () => {
      const fechaInicio = new Date("2026-02-16T00:00:00");
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      const msPorDia = 1000 * 60 * 60 * 24;
      const diferencia = Math.floor((hoy - fechaInicio) / msPorDia);
      const dia = diferencia + 1;

      setDiaActual(dia);

      const ultimaCancion = Number(localStorage.getItem("ultimaCancionDia"));
      const ultimoLatido = Number(localStorage.getItem("ultimoLatidoDia"));

      if (ultimaCancion !== dia) localStorage.removeItem("ultimaCancionDia");
      if (ultimoLatido !== dia) localStorage.removeItem("ultimoLatidoDia");

      const yaEscucho = ultimaCancion === dia;
      const yaEscribio = ultimoLatido === dia;

      if (["wrapped-final", "final"].includes(pantallaDia) || paso >= 5) return;

      if (dia === 1) {
        if (paso < 7) {
          setPantallaDia(null);
          return;
        }
      }

      if (dia > 1 && paso < 5) {
        setPaso(5);
      }

      if (!yaEscucho) {
        setPantallaDia("inicio-dia");
      } else if (yaEscucho && !yaEscribio) {
        setPantallaDia("escribir-latido");
      } else {
        setPantallaDia("completado");
      }
    };
    calcularDia();
  }, [paso, pantallaDia]);

  // Dispara el Feature Tour en cuanto el tablero principal (donde vive
  // el widget semanal) esté realmente montado en pantalla.
  useEffect(() => {
    if (
      tourVol2Pendiente &&
      ["inicio-dia", "escribir-latido", "completado"].includes(pantallaDia)
    ) {
      setMostrarTourVol2(true);
      setTourVol2Pendiente(false);
    }
  }, [tourVol2Pendiente, pantallaDia]);

  const avanzar = () => {
    setTransicionando(true);
    setTimeout(() => {
      setPaso((p) => p + 1);
      setTransicionando(false);
    }, 350);
  };

  const irHistorial = () => {
    setTransicionando(true);
    setTimeout(() => {
      setPaso(7);
      setTransicionando(false);
    }, 350);
  };

  const esUltimoDia = false;

  const handleMenuBienvenida = () => {
    setMenuAbierto(false);
    setTransicionando(true);
    setTimeout(() => {
      setDiaActual(1);
      setPaso(1);
      setPantallaDia(null);
      setTransicionando(false);
    }, 350);
  };

  const handleMenuHistorial = () => {
    setMenuAbierto(false);
    irHistorial();
  };

  const handleMenuHistorialCanciones = () => {
    setMenuAbierto(false);
    setMostrarHistorialCanciones(true);
  };

  const handleMenuCumple = () => {
    setMenuAbierto(false);
    setMostrarCumple(true);
  };

  const handleMenuMural = () => {
    setMenuAbierto(false);
    setMostrarMural(true);
  };

  // Abre las experiencias agrupadas dentro del Mural de Recuerdos
  // (Especial de Cumpleaños / Bienvenida Original)
  const handleAbrirEspecialMural = (item) => {
    setMostrarMural(false);
    if (item.tipo === "cumpleanos") {
      setMostrarCumple(true);
    } else if (item.tipo === "bienvenida") {
      setMostrarBienvenidaOriginal(true);
    }
  };

  if (mostrarCumple) {
    return (
      <BirthdaySurprise
        onFinish={() => {
          const cancionHoy = {
            nombre: "ONE IN A MILLION",
            artista: "TWICE",
            portada: "https://i.scdn.co/image/ab67616d0000b2739dae955bf89905477e113971",
            link: "https://open.spotify.com/intl-es/track/6MzuFfdG0zpPOrTXtmtLhF?si=a1dd2abbd7344629",
            vibe: "soft"
          };
          setCancionSeleccionada(cancionHoy);
          setPantallaDia(null);
          setPaso(5.5);
          setMostrarCumple(false);
          setCumpleFinalizado(true);
          localStorage.setItem("cumple2026Visto", "true");
          localStorage.setItem("ultimaCancionDia", diaActual);
        }}
      />
    );
  }

  if (diaActual === 1 && paso === 1) {
    return <Bienvenida onComenzar={() => setPaso(2)} />;
  }

  // "Bienvenida Original" agrupada dentro del Mural de Recuerdos:
  // la misma vista del primer día, ahora accesible como recuerdo.
  if (mostrarBienvenidaOriginal) {
    return (
      <Bienvenida onComenzar={() => setMostrarBienvenidaOriginal(false)} />
    );
  }

  // Transición cinemática hacia "180 latidos: Vol. II".
  // Se dispara EXCLUSIVAMENTE desde el botón "Continuar" del Paso 5_5
  // (ver más abajo) — nunca automáticamente al cargar la app.
  if (mostrarTransicionVol2) {
    return (
      <MultiverseTransition
        onFinalizar={() => {
          localStorage.setItem("vol2_transicion_completada", "true");
          setVol2TransicionCompletada(true);
          setMostrarTransicionVol2(false);

          // Continúa el flujo normal del día (escribir el latido)
          setPaso(6);

          // Deja pendiente el Feature Tour: se activará en cuanto el
          // tablero principal (con el widget semanal) esté realmente
          // en pantalla, para que el spotlight tenga dónde apuntar.
          if (localStorage.getItem("vol2_tour_completado") !== "true") {
            setTourVol2Pendiente(true);
          }
        }}
      />
    );
  }

  const diaEnVol2 = diaActual ? Math.max(1, diaActual - 179) : 1;

  // Colección para el Mural de Recuerdos, derivada del progreso real del puzzle
  const semanaActualMural = Math.min(TOTAL_SEMANAS_PUZZLE, Math.ceil((MODO_PRUEBA_PUZZLE ? 15 : diaEnVol2) / 7));
  const coleccionMural = [
    {
      tipo: "cumpleanos",
      titulo: "Especial de Cumpleaños",
      desbloqueada: true,
      icono: "cake"
    },
    {
      tipo: "bienvenida",
      titulo: "Bienvenida Original",
      desbloqueada: true,
      icono: "auto_awesome"
    },
    ...Array.from({ length: TOTAL_SEMANAS_PUZZLE }).map((_, i) => ({
      tipo: "semana",
      semana: i + 1,
      desbloqueada: i < semanaActualMural,
      url: "https://picsum.photos/600/400",
      titulo: `Semana ${i + 1}`
    }))
  ];

  return (
    <div className="min-h-screen w-full bg-[#1c002e] bg-[radial-gradient(ellipse_at_center,_rgba(75,45,92,0.45)_0%,_#1c002e_70%)] flex justify-center items-start sm:items-center py-0 sm:py-10">

      {/* ================= MARCO ESTILO SMARTPHONE ================= */}
      <div
        className={`app-contenedor relative w-full sm:max-w-[430px] sm:h-[880px] sm:rounded-[2.5rem] sm:border sm:border-[#aa8982]/25 sm:shadow-[0_25px_80px_rgba(0,0,0,0.55)] min-h-screen sm:min-h-0 overflow-y-auto overflow-x-hidden bg-background font-body-md text-on-surface ${temaElegido ? `tema-${temaElegido}` : ""}`}
      >

        {!mostrarIntroUltimoDia && pantallaDia !== "wrapped-final" && (
          <>
            {/* HEADER MINIMALISTA */}
            <header className="sticky top-0 left-0 right-0 z-50 flex justify-center pt-5 pb-3 px-5 pointer-events-none bg-gradient-to-b from-background via-background/90 to-transparent">
              <div className="pointer-events-auto w-full flex items-center justify-between">

                {/* Wordmark */}
                <span className="font-headline-md text-lg text-primary tracking-wide">
                  {tituloPagina}
                </span>

                {/* Botón hamburguesa */}
                <button
                  onClick={() => setMenuAbierto(!menuAbierto)}
                  aria-label="Abrir menú"
                  data-tour="menu-memorias"
                  className="bg-surface-container-high/80 text-primary w-10 h-10 rounded-full flex items-center justify-center hover:bg-secondary-container hover:text-on-primary transition-colors z-50 relative border border-outline-variant/40"
                >
                  <span className="material-symbols-outlined text-xl">
                    {menuAbierto ? 'close' : 'menu'}
                  </span>
                </button>
              </div>
            </header>

            {/* MENÚ LATERAL "MEMORIAS" */}
            <div className={`fixed inset-y-0 right-0 w-72 max-w-[85%] bg-surface-container/95 backdrop-blur-xl border-l border-outline-variant/40 shadow-2xl transform transition-transform duration-500 z-50 ${menuAbierto ? 'translate-x-0' : 'translate-x-full'}`}>
              <div className="p-6 pt-24 flex flex-col gap-3 h-full overflow-y-auto">
                <h3 className="font-headline-lg text-2xl text-primary mb-2 border-b border-outline-variant/40 pb-4">Memorias</h3>

                <button onClick={handleMenuBienvenida} className="flex items-center gap-3 text-left w-full p-3 rounded-xl hover:bg-surface-container-high transition-colors text-on-surface font-label-md group">
                  <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">home</span>
                  Inicio
                </button>

                <button onClick={handleMenuHistorialCanciones} className="flex items-center gap-3 text-left w-full p-3 rounded-xl hover:bg-surface-container-high transition-colors text-on-surface font-label-md group">
                  <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">queue_music</span>
                  Historial de Canciones
                </button>

                <button onClick={handleMenuHistorial} className="flex items-center gap-3 text-left w-full p-3 rounded-xl hover:bg-surface-container-high transition-colors text-on-surface font-label-md group">
                  <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">favorite</span>
                  Historial de Latidos
                </button>

                <button onClick={handleMenuMural} className="flex items-center gap-3 text-left w-full p-3 rounded-xl hover:bg-surface-container-high transition-colors text-on-surface font-label-md group">
                  <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">grid_view</span>
                  Mural de Recuerdos
                </button>
              </div>
            </div>

            {menuAbierto && (
              <div
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
                onClick={() => setMenuAbierto(false)}
              />
            )}

            {/* MURAL DE RECUERDOS */}
            <ModalMural
              isOpen={mostrarMural}
              onClose={() => setMostrarMural(false)}
              coleccionImagenes={coleccionMural}
              onAbrirEspecial={handleAbrirEspecialMural}
            />

            {/* HISTORIAL DE CANCIONES (solo canciones — Archivo I / Archivo II) */}
            {mostrarHistorialCanciones && (
              <HistorialCanciones
                onVolver={() => setMostrarHistorialCanciones(false)}
              />
            )}
          </>
        )}

        {/* ================= CUERPO PRINCIPAL ================= */}
        <main className={`relative z-10 px-4 pb-16 flex flex-col items-center fade-container w-full ${transicionando ? "fade-out" : "fade-in"}`}>

          {(paso === 2 || paso === 3) && diaActual === 1 && <FallingHearts />}

          {esUltimoDia && mostrarIntroUltimoDia && (
            <UltimoDiaCine onFinish={() => setMostrarIntroUltimoDia(false)} />
          )}

          {pantallaDia === "wrapped-final" && (
            <WrappedFinal onVolver={() => setPantallaDia("final")} />
          )}

          {pantallaDia === "final" && !mostrarIntroUltimoDia && (
            <UltimoDia
              ultimaCancion={{
                titulo: "I'm in Love With You — The 1975",
                portada: "/covers/im-in-love-with-you.jpg",
                url: "/audio/The-1975-Im-In-Love-With-You-_Official-Video_.mp3"
              }}
              instrumentalRef={instrumentalUltimoDiaRef}
              onIrWrappedFinal={() => {
                setTransicionAWrapped(false);
                setPantallaDia("wrapped-final");
              }}
            />
          )}

          {/* CONTENEDOR PRINCIPAL DIARIO Y PUZZLE */}
          {["inicio-dia", "escribir-latido", "completado"].includes(pantallaDia) && (
            <div className="inicio-dia-wrapper w-full flex flex-col gap-8">

              <InicioDia
                diaActual={diaActual}
                pantallaDia={pantallaDia}
                titulo={tituloPagina}
                onIrRuleta={() => {
                  const ultimaCancion = Number(localStorage.getItem("ultimaCancionDia"));
                  if (ultimaCancion === diaActual) {
                    setPantallaDia(null);
                    setPaso(6);
                  } else {
                    setPantallaDia(null);
                    setPaso(5);
                  }
                }}
                onIrLatido={() => {
                  setPantallaDia(null);
                  setPaso(6);
                }}
                onIrHistorial={() => {
                  setPantallaDia(null);
                  setPaso(7);
                }}
              />

              {(MODO_PRUEBA_PUZZLE || diaActual >= 180) && (
                <div data-tour="zombie-constructor" className="w-full">
                  <PuzzleSemanas
                    diaActual={MODO_PRUEBA_PUZZLE ? 15 : diaEnVol2}
                    totalSemanas={TOTAL_SEMANAS_PUZZLE}
                    imagenFinal="https://picsum.photos/600/400"
                  />
                </div>
              )}

            </div>
          )}

          {diaActual === 1 && paso === 2 && <Paso2 onNext={avanzar} />}
          {diaActual === 1 && paso === 3 && <Paso3 onNext={avanzar} />}
          {diaActual === 1 && paso === 4 && <Paso4 onNext={avanzar} />}

          {paso === 5 && (
            <Paso5
              diaActual={diaActual}
              onWrite={(track) => {
                setCancionSeleccionada(track);
                localStorage.setItem("ultimaCancionDia", diaActual);
                setPaso(5.5);
              }}
            />
          )}

          {paso === 5.5 && (
            <Paso5_5
              cancion={cancionSeleccionada}
              onContinuar={() => {
                // La transición a Vol. II se dispara únicamente desde aquí:
                // al terminar de ver la canción del día, si aún no se
                // completó (o si el modo de prueba está activo).
                const debeTransicionarAVol2 =
                  (MODO_PRUEBA_PUZZLE || (diaActual && diaActual >= 180)) &&
                  !vol2TransicionCompletada;

                if (debeTransicionarAVol2) {
                  setMostrarTransicionVol2(true);
                } else {
                  setPaso(6);
                }
              }}
            />
          )}

          {paso === 6 && (
            <Paso6
              cancion={cancionSeleccionada}
              diaActual={diaActual}
              onSave={() => {
                localStorage.setItem("ultimoLatidoDia", diaActual);
                avanzar();
              }}
              onHistorial={irHistorial}
            />
          )}

          {paso === 7 && (
            <Paso7
              onVolver={() => setPaso(6)}
            />
          )}
        </main>

        {/* FEATURE TOUR — novedades de Vol. II (única vez, tras la transición) */}
        <FeatureTourVol2
          activo={mostrarTourVol2}
          onFinalizar={() => setMostrarTourVol2(false)}
        />
      </div>
    </div>
  );
}