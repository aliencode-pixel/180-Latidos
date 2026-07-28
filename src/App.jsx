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

  const [mostrarIntroUltimoDia, setMostrarIntroUltimoDia] = useState(true);
  const [transicionAWrapped, setTransicionAWrapped] = useState(false);

  /* ⭐ ESTADOS PARA CUMPLEAÑOS */
  const [mostrarCumple, setMostrarCumple] = useState(false);
  const [cumpleFinalizado, setCumpleFinalizado] = useState(false);

  const instrumentalUltimoDiaRef = useRef(null);

  /* ============================================================
     ⭐ TÍTULO DINÁMICO (VOL. II)
  ============================================================ */
  const tituloPagina = diaActual >= 180 ? "180 latidos: Vol. II" : "180 latidos";

  // Cambia el título de la pestaña del navegador automáticamente
  useEffect(() => {
    document.title = tituloPagina;
  }, [tituloPagina]);

  /* ============================================================
     1. Cargar tema inicial
  ============================================================ */
  useEffect(() => {
    const tema = localStorage.getItem("temaElegido");
    if (tema) setTemaElegido(tema);
  }, []);

  /* ============================================================
     2. INTERCEPTOR DE CUMPLEAÑOS (Prioridad Máxima)
  ============================================================ */
  useEffect(() => {
    const chequearCumple = () => {
      const hoy = new Date();
      // getMonth() es 0-indexed (3 es Abril)
      const es18Abril = hoy.getMonth() === 3 && hoy.getDate() === 18; 
      const yaVioCumple = localStorage.getItem("cumple2026Visto") === "true";

      console.log("Birthday Check:", { es18Abril, yaVioCumple, cumpleFinalizado });

      if (es18Abril && !yaVioCumple && !cumpleFinalizado) { 
        setMostrarCumple(true);
      }
    };

    chequearCumple();
    const timer = setInterval(chequearCumple, 60000);
    return () => clearInterval(timer);
  }, [cumpleFinalizado]);

  /* ============================================================
     3. Lógica diaria normal
  ============================================================ */
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

      // Limpieza de datos si cambió el día
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

      /* ⚠️ NOTA: Como ahora la app continúa en "Vol. II", 
         desactivamos el corte automático del día 180 para que no la envíe a la pantalla final. */
      /*
      if (dia >= 180) {
        setPantallaDia("final");
        return;
      }
      */

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

  const esUltimoDia = false; // Se activará cuando llegue el nuevo día de la propuesta

  /* ============================================================
     4. Renderizado Condicional
  ============================================================ */

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

  return (
    <div className={`app-contenedor ${temaElegido ? `tema-${temaElegido}` : ""}`}>
      <div className={`fade-container ${transicionando ? "fade-out" : "fade-in"}`}>

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
              setTransicionAWrapped(true);
              setPantallaDia("wrapped-final");
            }}
          />
        )}

        {["inicio-dia", "escribir-latido", "completado"].includes(pantallaDia) && (
          <div className={`inicio-dia-wrapper tema-${temaElegido}`}>
            <InicioDia
              diaActual={diaActual}
              pantallaDia={pantallaDia}
              titulo={tituloPagina} // Le pasamos el título a la cabecera
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
      </div>
    </div>
  );
}