import React, { useCallback, useEffect, useRef, useState } from "react";
import "./FeatureTourVol2.css";

/* ============================================================
   FEATURE TOUR — Novedades de "180 latidos: Vol. II"
   Spotlight de 3 pasos, guardado en localStorage para que
   solo aparezca en la primera experiencia.
============================================================ */

const PASOS_TOUR = [
  {
    // "Zombie Constructor": el widget de progreso semanal (PuzzleSemanas)
    selectores: ['[data-tour="zombie-constructor"]'],
    titulo: "¡El viaje sigue!",
    texto: "Ahora mediremos nuestro progreso semanal."
  },
  {
    // Botón de acción dentro del propio widget, si existe uno específico
    selectores: [
      '[data-tour="puzzle-boton"]',
      '[data-tour="zombie-constructor"] button',
      '[data-tour="zombie-constructor"]'
    ],
    titulo: "Junta las piezas",
    texto: "Junta las piezas semanales para revelar el expediente."
  },
  {
    selectores: ['[data-tour="menu-memorias"]'],
    titulo: "Tus recuerdos, siempre a mano",
    texto: "Tus 180 canciones y recuerdos anteriores están guardados aquí."
  }
];

const ESPERA_MAX_MS = 3000;
const INTERVALO_POLL_MS = 250;

export default function FeatureTourVol2({ activo, onFinalizar }) {
  const [pasoActual, setPasoActual] = useState(0);
  const [rect, setRect] = useState(null);

  // Ref para no depender de la identidad del callback del padre
  // (evita reiniciar el tour en cada re-render de App.jsx)
  const onFinalizarRef = useRef(onFinalizar);
  useEffect(() => {
    onFinalizarRef.current = onFinalizar;
  }, [onFinalizar]);

  const finalizarTour = useCallback(() => {
    localStorage.setItem("vol2_tour_completado", "true");
    onFinalizarRef.current && onFinalizarRef.current();
  }, []);

  const irASiguiente = useCallback(() => {
    setPasoActual((p) => {
      if (p + 1 >= PASOS_TOUR.length) {
        finalizarTour();
        return p;
      }
      return p + 1;
    });
  }, [finalizarTour]);

  useEffect(() => {
    if (activo) setPasoActual(0);
  }, [activo]);

  // Localiza el elemento del paso actual (con reintentos por si el
  // componente destino todavía no está montado) y mide su posición.
  useEffect(() => {
    if (!activo) return;

    let cancelado = false;
    let esperaAcumulada = 0;
    let intervalo;

    const buscarElemento = () => {
      const paso = PASOS_TOUR[pasoActual];
      return paso.selectores.map((sel) => document.querySelector(sel)).find(Boolean);
    };

    const localizar = () => {
      const el = buscarElemento();
      if (el) {
        if (!cancelado) setRect(el.getBoundingClientRect());
        clearInterval(intervalo);
      } else {
        esperaAcumulada += INTERVALO_POLL_MS;
        if (esperaAcumulada >= ESPERA_MAX_MS) {
          clearInterval(intervalo);
          if (!cancelado) irASiguiente(); // no apareció: se salta este paso
        }
      }
    };

    setRect(null);
    localizar();
    intervalo = setInterval(localizar, INTERVALO_POLL_MS);

    const recalcular = () => {
      const el = buscarElemento();
      if (el && !cancelado) setRect(el.getBoundingClientRect());
    };
    window.addEventListener("resize", recalcular);
    window.addEventListener("scroll", recalcular, true);

    return () => {
      cancelado = true;
      clearInterval(intervalo);
      window.removeEventListener("resize", recalcular);
      window.removeEventListener("scroll", recalcular, true);
    };
  }, [activo, pasoActual, irASiguiente]);

  if (!activo || !rect) return null;

  const paso = PASOS_TOUR[pasoActual];
  const relleno = 10;
  const cutout = {
    top: rect.top - relleno,
    left: rect.left - relleno,
    width: rect.width + relleno * 2,
    height: rect.height + relleno * 2
  };

  const anchoTooltip = 280;
  const espacioAbajo = window.innerHeight - (cutout.top + cutout.height);
  const tooltipArriba = espacioAbajo < 170 && cutout.top > 170;

  const leftTooltip = Math.min(
    Math.max(16, cutout.left + cutout.width / 2 - anchoTooltip / 2),
    window.innerWidth - anchoTooltip - 16
  );

  return (
    <div className="ft-overlay">
      <div
        className="ft-spotlight"
        style={{
          top: `${cutout.top}px`,
          left: `${cutout.left}px`,
          width: `${cutout.width}px`,
          height: `${cutout.height}px`
        }}
      />

      <div
        className="ft-tooltip"
        style={{
          top: tooltipArriba
            ? `${Math.max(16, cutout.top - 14)}px`
            : `${cutout.top + cutout.height + 14}px`,
          left: `${leftTooltip}px`,
          width: `${anchoTooltip}px`,
          transform: tooltipArriba ? "translateY(-100%)" : "none"
        }}
      >
        <p className="ft-progreso">
          {pasoActual + 1} / {PASOS_TOUR.length}
        </p>
        <h4 className="ft-titulo">{paso.titulo}</h4>
        <p className="ft-texto">{paso.texto}</p>
        <div className="ft-acciones">
          <button className="ft-saltar" onClick={finalizarTour}>
            Saltar
          </button>
          <button className="ft-siguiente" onClick={irASiguiente}>
            {pasoActual + 1 === PASOS_TOUR.length ? "Entendido" : "Siguiente"}
          </button>
        </div>
      </div>
    </div>
  );
}
