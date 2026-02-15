import React from "react";
import FallingHearts from "../components/FallingHearts";

export default function Paso2({ onNext }) {
  return (
    <div className="paso2 paso-dia1-fondo">

      {/* ❤️ CORAZONES ANIMADOS */}
      <FallingHearts />

      <div className="tarjeta">

        <p className="frase-inicio">
          Gracias por llegar hasta aquí.<br />
          Este espacio te acompaña, a tu ritmo.
        </p>

        <p className="frase-suave">
          Cuando quieras, puedes elegir el tono de tu día.
        </p>

        <button className="flecha" onClick={onNext}>
          ➔
        </button>

      </div>
    </div>
  );
}
