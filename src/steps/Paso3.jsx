import React, { useEffect, useState } from "react";
import FallingHearts from "../components/FallingHearts";

export default function Paso3({ onNext }) {
  const [mostrar1, setMostrar1] = useState(false);
  const [mostrar2, setMostrar2] = useState(false);
  const [mostrar3, setMostrar3] = useState(false);
  const [mostrar4, setMostrar4] = useState(false);

  useEffect(() => {
    setTimeout(() => setMostrar1(true), 800);
    setTimeout(() => setMostrar2(true), 2200);
    setTimeout(() => setMostrar3(true), 3600);
    setTimeout(() => setMostrar4(true), 5000);
  }, []);

  return (
    <div className="paso3 paso-dia1-fondo">

      {/* ❤️ CORAZONES ANIMADOS */}
      <FallingHearts />

      <div className="tarjeta">

        <h2 className="titulo">Cómo funciona este espacio</h2>

        <div className="contenido">

          {mostrar1 && (
            <>
              <p className="linea linea1">Cada día vas a dejar un latido.</p>
              <div className="flecha">↓</div>
            </>
          )}

          {mostrar2 && (
            <>
              <p className="linea linea2">
                La app te regalará una canción que acompañe lo que estás viviendo.
              </p>
              <div className="flecha">↓</div>
            </>
          )}

          {mostrar3 && (
            <>
              <p className="linea linea3">
                Todo lo que escribas se irá guardando como un diario secreto solo tuyo.
              </p>
              <div className="flecha">↓</div>
            </>
          )}

          {mostrar4 && (
            <p className="linea linea4">
              Y si algún día quieres borrar lo que escribiste, también podrás hacerlo.
            </p>
          )}

        </div>

        {mostrar4 && (
          <button className="paso3-btn" onClick={onNext}>
            Elegir mi camino
          </button>
        )}

      </div>
    </div>
  );
}
