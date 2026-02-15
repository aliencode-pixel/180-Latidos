import React from "react";

export default function Paso4({ onNext }) {

  const elegirTema = (tema) => {
    localStorage.setItem("temaElegido", tema);
    onNext(tema);
  };

  return (
    <div className="paso4 paso-dia1-fondo">

      <h2 className="titulo">Elige la atmósfera de tu viaje</h2>
      <p className="sub">
        Este será el cielo que te acompañará en este viaje
      </p>

      <div className="contenedor-temas">

        {/* 1. Horizonte Estelar */}
        <div
          className="tema-card tema-horizonte"
          onClick={() => elegirTema("horizonte")}
        >
          <div className="preview tema-horizonte"></div>
          <p>Horizonte Estelar</p>
        </div>

        {/* 2. Fuego del Ocaso */}
        <div
          className="tema-card tema-ocaso"
          onClick={() => elegirTema("ocaso")}
        >
          <div className="preview tema-ocaso"></div>
          <p>Fuego del Ocaso</p>
        </div>

        {/* 3. Alba Serena */}
        <div
          className="tema-card tema-alba"
          onClick={() => elegirTema("alba")}
        >
          <div className="preview tema-alba"></div>
          <p>Alba Serena</p>
        </div>

        {/* 4. Cielo Acuarela */}
        <div
          className="tema-card tema-acuarela"
          onClick={() => elegirTema("acuarela")}
        >
          <div className="preview tema-acuarela"></div>
          <p>Cielo Acuarela</p>
        </div>

        {/* 5. Etéreo Lumínico */}
        <div
          className="tema-card tema-etereo"
          onClick={() => elegirTema("etereo")}
        >
          <div className="preview tema-etereo"></div>
          <p>Etéreo Lumínico</p>
        </div>

      </div>
    </div>
  );
}
