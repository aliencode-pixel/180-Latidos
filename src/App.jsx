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

/* ============================================================
   CONFIGURACIÓN VOL. II (PUZZLE)
============================================================ */
const TOTAL_SEMANAS_PUZZLE = 8; 
const MODO_PRUEBA_PUZZLE = false; 

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

  const handleMenuCumple = () => {
    setMenuAbierto(false);
    setMostrarCumple(true);
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

  const diaEnVol2 = diaActual ? Math.max(1, diaActual - 179) : 1;

  return (
    <div className={`app-contenedor min-h-screen bg-background font-body-md text-on-surface relative overflow-x-hidden ${temaElegido ? `tema-${temaElegido}` : ""}`}>
      
      {!mostrarIntroUltimoDia && pantallaDia !== "wrapped-final" && (
        <>
          {/* HEADER CON ESTILO NOCTURNE CRIMSON */}
          <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 px-8 pointer-events-none">
            <div className="pointer-events-auto w-full max-w-[1200px] flex items-center justify-between">
              
              {/* Etiqueta 180 Latidos */}
              <div className="bg-[#5c163b] text-primary px-5 py-2 rounded-full text-xs font-label-md font-bold tracking-widest shadow-[0_0_15px_rgba(226,24,101,0.3)]">
                {tituloPagina}
              </div>

              {/* Links Centrales Decorativos */}
              <div className="hidden md:flex gap-8 text-primary font-label-md text-xs font-bold tracking-widest uppercase">
                <span className="hover:text-white cursor-pointer transition-colors">Experience</span>
                <span className="hover:text-white cursor-pointer transition-colors">Manifesto</span>
                <span className="hover:text-white cursor-pointer transition-colors">Vault</span>
              </div>

              {/* Iconos de la derecha */}
              <div className="flex items-center gap-6">
                <span className="material-symbols-outlined text-primary text-xl cursor-pointer hover:text-white transition-colors">search</span>
                <button 
                  onClick={() => setMenuAbierto(!menuAbierto)}
                  className="bg-[#5c163b] text-primary w-9 h-9 rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-colors z-50 relative shadow-[0_0_10px_rgba(226,24,101,0.2)]"
                >
                  <span className="material-symbols-outlined text-lg">
                    {menuAbierto ? 'close' : 'person'}
                  </span>
                </button>
              </div>
            </div>
          </header>

          {/* MENÚ LATERAL DESPLEGABLE */}
          <div className={`fixed inset-y-0 right-0 w-80 bg-surface-container border-l border-outline-variant shadow-2xl transform transition-transform duration-500 z-50 ${menuAbierto ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-8 pt-32 flex flex-col gap-4 h-full overflow-y-auto">
              <h3 className="font-headline-lg text-2xl text-primary mb-4 border-b border-outline-variant pb-4">Memorias</h3>
              
              <button onClick={handleMenuBienvenida} className="flex items-center gap-3 text-left w-full p-3 rounded-xl hover:bg-surface-container-high transition-colors text-on-surface font-label-md group">
                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">auto_awesome</span>
                Pantalla de Bienvenida
              </button>
              
              <button onClick={handleMenuHistorial} className="flex items-center gap-3 text-left w-full p-3 rounded-xl hover:bg-surface-container-high transition-colors text-on-surface font-label-md group">
                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">queue_music</span>
                Historial de Canciones
              </button>
              
              <button onClick={handleMenuCumple} className="flex items-center gap-3 text-left w-full p-3 rounded-xl hover:bg-surface-container-high transition-colors text-on-surface font-label-md group">
                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">cake</span>
                Especial de Cumpleaños
              </button>
            </div>
          </div>
          
          {menuAbierto && (
            <div 
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={() => setMenuAbierto(false)}
            />
          )}
        </>
      )}

      {/* ================= CUERPO PRINCIPAL ================= */}
      <main className={`relative z-10 pt-32 flex flex-col items-center pb-20 fade-container w-full ${transicionando ? "fade-out" : "fade-in"}`}>

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
          <div className="inicio-dia-wrapper w-full max-w-[1200px] px-5 flex flex-col gap-12">
            
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
              <PuzzleSemanas
                diaActual={MODO_PRUEBA_PUZZLE ? 15 : diaEnVol2}
                totalSemanas={TOTAL_SEMANAS_PUZZLE}
                imagenFinal="https://picsum.photos/600/400"
              />
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
            onContinuar={() => setPaso(6)}
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
    </div>
  );
}