import React, { useEffect, useMemo, useRef, useState } from "react";
import "./MultiverseTransition.css";

/* ============================================================
   TRANSICIÓN CINEMÁTICA — "180 latidos" → "180 latidos: Vol. II"
   Flujo de 10 steps con game feel (háptica + SFX + drone + control manual)
============================================================ */

const TARGET_DIAGNOSTICO = 14000605;

// Duraciones (ms) — fases 1-3 alargadas para generar suspenso real
const DURACION_FALSO_CIERRE = 4200; // Step 1
const DURACION_GLITCH = 3400; // Step 2
const DURACION_CONTADOR = 4200; // Step 3 (contador de diagnóstico)
const RETRASO_BOTON_DIAGNOSTICO = 4600; // Step 3 (el botón espera al contador)
const DURACION_WARP = 2400; // Step 7 (el clímax NO se ralentiza)

export default function MultiverseTransition({ onFinalizar }) {
  const [step, setStep] = useState(1);
  const [diagCount, setDiagCount] = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [botonDiagnosticoListo, setBotonDiagnosticoListo] = useState(false);

  const audioCtxRef = useRef(null);
  const droneRef = useRef({ osc: null, filtro: null, gain: null, lfo: null });

  /* ---------- HÁPTICA ---------- */
  const vibrar = (patron) => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate(patron);
      } catch (e) {
        /* dispositivo no compatible, se ignora */
      }
    }
  };

  /* ---------- SONIDO (Web Audio API, sin assets externos) ---------- */
  const obtenerAudioCtx = () => {
    if (typeof window === "undefined") return null;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!audioCtxRef.current) audioCtxRef.current = new AC();
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  };

  // Calienta/desbloquea el AudioContext apenas se monta (viene de un click real)
  useEffect(() => {
    obtenerAudioCtx();
    return () => {
      detenerDrone(0.05);
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch (e) {
          /* ignorar */
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reproducirSfx = (tipo) => {
    const ctx = obtenerAudioCtx();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;

      if (tipo === "click") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(660, now);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.12, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (tipo === "glitch") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(35, now + 0.45);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.18, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.55);
      } else if (tipo === "warp") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(110, now);
        osc.frequency.exponentialRampToValueAtTime(1500, now + 1.6);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.14, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
        osc.start(now);
        osc.stop(now + 1.9);
      } else if (tipo === "success") {
        [523.25, 659.25, 783.99].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = "sine";
          const t0 = now + i * 0.12;
          osc.frequency.setValueAtTime(freq, t0);
          gain.gain.setValueAtTime(0.0001, t0);
          gain.gain.exponentialRampToValueAtTime(0.12, t0 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.5);
          osc.start(t0);
          osc.stop(t0 + 0.55);
        });
      }
    } catch (e) {
      /* audio no disponible, la experiencia continúa en silencio */
    }
  };

  /* ---------- DRONE DE SUSPENSO (continuo, sin mp3) ----------
     Oscilador sawtooth grave -> filtro pasa-bajos con LFO
     modulando el corte (respiración tensa) -> ganancia suave. */
  const iniciarDrone = () => {
    const ctx = obtenerAudioCtx();
    if (!ctx || droneRef.current.osc) return;

    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(52, ctx.currentTime);

    const filtro = ctx.createBiquadFilter();
    filtro.type = "lowpass";
    filtro.frequency.setValueAtTime(260, ctx.currentTime);
    filtro.Q.setValueAtTime(5, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 1.6);

    // LFO: modula el corte del filtro para dar sensación de "respiración"
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(0.14, ctx.currentTime);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(110, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filtro.frequency);

    osc.connect(filtro);
    filtro.connect(gain);
    gain.connect(ctx.destination);

    try {
      osc.start();
      lfo.start();
    } catch (e) {
      /* ya iniciado o contexto no disponible */
    }

    droneRef.current = { osc, filtro, gain, lfo };
  };

  const detenerDrone = (fadeOutSeg = 1.2) => {
    const d = droneRef.current;
    if (!d.osc) return;
    const ctx = audioCtxRef.current;
    try {
      if (ctx) {
        const now = ctx.currentTime;
        d.gain.gain.cancelScheduledValues(now);
        d.gain.gain.setValueAtTime(d.gain.gain.value, now);
        d.gain.gain.linearRampToValueAtTime(0.0001, now + fadeOutSeg);
      }
      const oscAnterior = d.osc;
      const lfoAnterior = d.lfo;
      setTimeout(() => {
        try {
          oscAnterior.stop();
          lfoAnterior.stop();
        } catch (e) {
          /* ya detenido */
        }
      }, fadeOutSeg * 1000 + 80);
    } catch (e) {
      /* ignorar */
    }
    droneRef.current = { osc: null, filtro: null, gain: null, lfo: null };
  };

  /* ---------- FASE 1: FALSO CIERRE + GLITCH (automáticas) ---------- */
  useEffect(() => {
    let temporizador;
    if (step === 1) {
      temporizador = setTimeout(() => setStep(2), DURACION_FALSO_CIERRE);
    } else if (step === 2) {
      // Ráfaga de vibración intensa simulando el fallo del sistema
      vibrar([200, 100, 300, 100, 500]);
      reproducirSfx("glitch");
      iniciarDrone(); // el suspenso empieza aquí y acompaña todo el viaje
      temporizador = setTimeout(() => setStep(3), DURACION_GLITCH);
    } else if (step === 7) {
      vibrar([40, 20, 40, 20, 320]);
      reproducirSfx("warp");
      temporizador = setTimeout(() => setStep(8), DURACION_WARP);
    } else if (step === 8) {
      detenerDrone(1.0); // la tensión se disuelve al llegar a la nueva dimensión
    } else if (step === 10) {
      localStorage.setItem("vol2_transicion_completada", "true");
      temporizador = setTimeout(() => {
        onFinalizar && onFinalizar();
      }, 900);
    }
    return () => temporizador && clearTimeout(temporizador);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  /* ---------- STEP 3: contador de diagnóstico + botón diferido ---------- */
  useEffect(() => {
    if (step !== 3) return;
    setDiagCount(0);
    setBotonDiagnosticoListo(false);
    const inicio = performance.now();
    let raf;
    const tick = (ahora) => {
      const progreso = Math.min(1, (ahora - inicio) / DURACION_CONTADOR);
      const suavizado = 1 - Math.pow(1 - progreso, 3);
      setDiagCount(Math.floor(suavizado * TARGET_DIAGNOSTICO));
      if (progreso < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const temporizadorBoton = setTimeout(
      () => setBotonDiagnosticoListo(true),
      RETRASO_BOTON_DIAGNOSTICO
    );

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(temporizadorBoton);
    };
  }, [step]);

  /* ---------- STEP 5: barra de carga 0% → 100% ---------- */
  useEffect(() => {
    if (step !== 5) return;
    setLoadProgress(0);
    const duracion = 2800;
    const inicio = performance.now();
    let raf;
    let cerrado = false;
    const tick = (ahora) => {
      const progreso = Math.min(1, (ahora - inicio) / duracion);
      setLoadProgress(Math.floor(progreso * 100));
      if (progreso < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!cerrado) {
        cerrado = true;
        setTimeout(() => setStep(6), 500);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [step]);

  /* ---------- ESTRELLAS Y LÍNEAS DE WARP (memoizadas) ---------- */
  const estrellas = useMemo(
    () =>
      Array.from({ length: 90 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 0.6,
        delay: Math.random() * 4,
        duracion: 2 + Math.random() * 3
      })),
    []
  );

  const lineasWarp = useMemo(
    () =>
      Array.from({ length: 46 }).map((_, i) => ({
        id: i,
        angulo: (360 / 46) * i + (Math.random() * 4 - 2),
        delay: Math.random() * 0.25,
        largo: 45 + Math.random() * 35
      })),
    []
  );

  /* ---------- HANDLERS DE BOTONES (control manual) ---------- */
  const irADiagnostico = () => {
    if (!botonDiagnosticoListo) return;
    reproducirSfx("click");
    vibrar(15);
    setStep(4);
  };

  const recalibrarSenal = () => {
    reproducirSfx("click");
    vibrar(15);
    setStep(5);
  };

  const navegarNuevaDimension = () => {
    reproducirSfx("click");
    vibrar([20, 10, 60]);
    setStep(7);
  };

  const revelarCoordenadas = () => {
    reproducirSfx("click");
    vibrar(15);
    setStep(9);
  };

  const entrarAlTablero = () => {
    reproducirSfx("success");
    vibrar([15, 10, 15]);
    setStep(10);
  };

  const formatearContador = (n) => n.toLocaleString("es-ES");

  return (
    <div className="mv-root">
      {/* ================= FASE 1: FALSO CIERRE ================= */}
      {step === 1 && (
        <div className="mv-step mv-step-negro">
          <p className="mv-texto-tenue mv-fade-in-lento">
            Gracias por acompañarme en estos 180 días. El registro ha
            concluido...
          </p>
        </div>
      )}

      {/* ================= FASE 1: GLITCH DE RUPTURA ================= */}
      {step === 2 && (
        <div className="mv-step mv-step-negro mv-glitch-activo">
          <div className="mv-crt-noise" />
          <div className="mv-glitch-barra mv-glitch-barra-1" />
          <div className="mv-glitch-barra mv-glitch-barra-2" />
          <p
            className="mv-error-texto"
            data-text="[ ERROR: SOBRECARGA TEMPORAL EN LA LÍNEA SAGRADA ]"
          >
            [ ERROR: SOBRECARGA TEMPORAL EN LA LÍNEA SAGRADA ]
          </p>
        </div>
      )}

      {/* ================= FASES 3–9: MULTIVERSO ================= */}
      {step >= 3 && step <= 9 && (
        <div className="mv-espacio">
          <div className="mv-estrellas">
            {estrellas.map((e) => (
              <span
                key={e.id}
                className="mv-estrella"
                style={{
                  top: `${e.top}%`,
                  left: `${e.left}%`,
                  width: `${e.size}px`,
                  height: `${e.size}px`,
                  animationDelay: `${e.delay}s`,
                  animationDuration: `${e.duracion}s`
                }}
              />
            ))}
          </div>
          <div className="mv-polvo-cosmico" />

          {step >= 6 && (
            <div
              className={`mv-nebulosa ${
                step === 7 ? "mv-nebulosa-warp" : ""
              } ${step >= 8 ? "mv-nebulosa-lejana" : ""}`}
            />
          )}

          {step === 7 && (
            <div className="mv-lineas-warp">
              {lineasWarp.map((l) => (
                <span
                  key={l.id}
                  className="mv-linea-warp"
                  style={{
                    "--r": `${l.angulo}deg`,
                    animationDelay: `${l.delay}s`,
                    width: `${l.largo}%`
                  }}
                />
              ))}
            </div>
          )}

          {step === 7 && <div className="mv-flash-blanco" />}

          <div className="mv-contenido">
            {/* STEP 3: llegada al espacio + diagnóstico (lento, tenso) */}
            {step === 3 && (
              <div className="mv-hud mv-fade-in-lento">
                <p className="mv-hud-linea">Escaneando anomalía...</p>
                <p className="mv-hud-linea mv-hud-linea-b">
                  Analizando realidades alternativas...
                </p>
                <p className="mv-hud-contador">
                  {formatearContador(diagCount)}
                </p>
                <button
                  className={`mv-boton mv-boton-neon ${
                    botonDiagnosticoListo ? "mv-boton-revelado" : "mv-boton-oculto"
                  }`}
                  onClick={irADiagnostico}
                  disabled={!botonDiagnosticoListo}
                >
                  🔍 INICIAR DIAGNÓSTICO
                </button>
              </div>
            )}

            {/* STEP 4: desviación detectada */}
            {step === 4 && (
              <div className="mv-fade-in mv-centro">
                <div className="mv-alerta-neon">
                  Detectada una desviación en el viaje.
                </div>
                <button
                  className="mv-boton mv-boton-neon"
                  onClick={recalibrarSenal}
                >
                   RECALIBRAR SEÑAL
                </button>
              </div>
            )}

            {/* STEP 5: recalibración y carga */}
            {step === 5 && (
              <div className="mv-fade-in mv-centro">
                <p className="mv-texto-bodoni">
                  Creíste que 180 latidos eran la meta, pero en cada una de
                  las realidades analizadas en nuestro multiverso no existe
                  ninguna donde esto termine aquí.
                </p>
                <p className="mv-subtitulo-sistema">
                  Reprogramando interfaz para la siguiente dimensión...
                </p>
                <div className="mv-barra-carga">
                  <div
                    className="mv-barra-carga-fill"
                    style={{ width: `${loadProgress}%` }}
                  />
                </div>
                <p className="mv-barra-carga-pct">{loadProgress}%</p>
              </div>
            )}

            {/* STEP 6: nebulosa revelada */}
            {step === 6 && (
              <div className="mv-fade-in mv-centro mv-centro-abajo">
                <p className="mv-subtitulo-sistema">
                  Estructura cósmica detectada.
                </p>
                <button
                  className="mv-boton mv-boton-neon"
                  onClick={navegarNuevaDimension}
                >
                  🌌 NAVEGAR A LA NUEVA DIMENSIÓN
                </button>
              </div>
            )}

            {/* STEP 8: llegada, tras el destello */}
            {step === 8 && (
              <div className="mv-fade-in mv-centro">
                <p className="mv-texto-revelado">
                  Bienvenida a la nueva dimensión.
                </p>
                <button
                  className="mv-boton mv-boton-neon"
                  onClick={revelarCoordenadas}
                >
                  🪐 REVELAR COORDENADAS
                </button>
              </div>
            )}

            {/* STEP 9: apertura de Vol. II */}
            {step === 9 && (
              <div className="mv-fade-in mv-centro">
                <h1 className="mv-titulo-final">180 latidos: Vol. II</h1>
                <p className="mv-subtitulo-sistema">
                  Sincronización completada. Iniciando nuevos archivos.
                </p>
                <button
                  className="mv-boton mv-boton-final"
                  onClick={entrarAlTablero}
                >
                  ✨ ENTRAR AL TABLERO PRINCIPAL
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= STEP 10: CIERRE ================= */}
      {step === 10 && (
        <div className="mv-step mv-step-negro">
          <p className="mv-texto-tenue mv-fade-in">Sincronizando...</p>
        </div>
      )}
    </div>
  );
}
