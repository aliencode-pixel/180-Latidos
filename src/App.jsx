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

  const instrumentalUltimoDiaRef = useRef(null);

  /* ============================================================
     1. Cargar tema
  ============================================================ */
  useEffect(() => {
    const tema = localStorage.getItem("temaElegido");
    if (tema) setTemaElegido(tema);
  }, []);

  /* ============================================================
     2. Lógica diaria — AHORA PERFECTA
  ============================================================ */
  useEffect(() => {
    const calcularDia = () => {
      /* ⭐ Cálculo estable sin errores de zona horaria */
      const fechaInicio = new Date("2026-02-14T00:00:00");
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      const msPorDia = 1000 * 60 * 60 * 24;
      const diferencia = Math.floor((hoy - fechaInicio) / msPorDia);
      const dia = diferencia + 1;

      setDiaActual(dia);

      /* ⭐ Reset diario automático */
      const ultimaCancion = Number(localStorage.getItem("ultimaCancionDia"));
      const ultimoLatido = Number(localStorage.getItem("ultimoLatidoDia"));

      if (ultimaCancion !== dia) localStorage.removeItem("ultimaCancionDia");
      if (ultimoLatido !== dia) localStorage.removeItem("ultimoLatidoDia");

      const yaEscucho = ultimaCancion === dia;
      const yaEscribio = ultimoLatido === dia;

      /* ⭐ BLOQUEO TOTAL durante flujo diario */
      if (
        pantallaDia === "wrapped-final" ||
        paso === 5 ||
        paso === 5.5 ||
        paso === 6 ||
        paso === 7
      ) return;

      /* ⭐ Día 1 → flujo completo */
      if (dia === 1) {
        if (paso < 7) {
          setPantallaDia(null);
          return;
        }
      }

      /* ⭐ Día 2 en adelante → NO mostrar Paso2,3,4 */
      if (dia > 1 && paso < 5) {
        setPaso(5);
      }

      /* ⭐ Día 180 */
      if (dia >= 180) {
        setPantallaDia("final");
        return;
      }

      /* ⭐ Regla B aplicada */
      if (!yaEscucho) {
        setPantallaDia("inicio-dia");
      } else if (yaEscucho && !yaEscribio) {
        setPantallaDia("escribir-latido");
      } else {
        setPantallaDia("completado");
      }
    };

    calcularDia();
    const interval = setInterval(calcularDia, 60000);
    return () => clearInterval(interval);
  }, [paso, pantallaDia]);

  /* ============================================================
     3. Intro del último día
  ============================================================ */
  useEffect(() => {
    const yaVioIntro = localStorage.getItem("introUltimoDiaVisto");
    if (yaVioIntro) setMostrarIntroUltimoDia(false);
  }, []);

  const handleFinishIntro = () => {
    localStorage.setItem("introUltimoDiaVisto", "true");
    setMostrarIntroUltimoDia(false);
  };

  /* ============================================================
     4. Navegación
  ============================================================ */
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

  const esUltimoDia = diaActual === 180;

  /* ============================================================
     5. Render
  ============================================================ */

  /* ⭐ Bienvenida SOLO si es Día 1 */
  if (diaActual === 1 && paso === 1) {
    return <Bienvenida onComenzar={() => setPaso(2)} />;
  }

  return (
    <div className={`app-contenedor ${temaElegido ? `tema-${temaElegido}` : ""}`}>
      <div className={`fade-container ${transicionando ? "fade-out" : "fade-in"}`}>

        {(paso === 2 || paso === 3) && diaActual === 1 && <FallingHearts />}

        {/* Intro cinematográfica SOLO en día 180 */}
        {esUltimoDia && mostrarIntroUltimoDia && (
          <UltimoDiaCine onFinish={handleFinishIntro} />
        )}

        {/* Wrapped Final */}
        {pantallaDia === "wrapped-final" && (
          <WrappedFinal onVolver={() => setPantallaDia("final")} />
        )}

        {/* Último Día */}
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

        {/* Inicio del día */}
        {["inicio-dia", "escribir-latido", "completado"].includes(pantallaDia) && (
          <div className={`inicio-dia-wrapper tema-${temaElegido}`}>
            <InicioDia
              diaActual={diaActual}
              pantallaDia={pantallaDia}
              onIrRuleta={() => {
                const ultimaCancion = Number(localStorage.getItem("ultimaCancionDia"));
                if (ultimaCancion === diaActual) {
                  setPantallaDia(null);
                  setPaso(6); // ⭐ Regla B
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

        {/* Día 1 */}
        {diaActual === 1 && paso === 2 && <Paso2 onNext={avanzar} />}
        {diaActual === 1 && paso === 3 && <Paso3 onNext={avanzar} />}
        {diaActual === 1 && paso === 4 && <Paso4 onNext={avanzar} />}

        {/* Ruleta */}
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

        {/* Canción seleccionada */}
        {paso === 5.5 && (
          <Paso5_5
            cancion={cancionSeleccionada}
            onContinuar={() => setPaso(6)}
          />
        )}

        {/* Latido */}
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

        {/* Historial */}
        {paso === 7 && (
          <Paso7
            onVolver={() => setPaso(6)}
          />
        )}
      </div>
    </div>
  );
}
