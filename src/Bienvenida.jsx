import React, { useEffect, useState, useRef } from "react";
import "./Bienvenida.css";

export default function Bienvenida({ onComenzar }) {
  const versos = [
    "Un lugar donde cada emoción encuentra su forma.",
    "donde lo que sientes puede quedarse, sin prisa, sin juicio.",
    "Aquí, cada palabra que dejes será un latido guardado con cuidado.",
    "Este regalo no busca respuestas, solo presencia."
  ];

  const [linea, setLinea] = useState(0);
  const [botonVisible, setBotonVisible] = useState(false);

  const intervaloRef = useRef(null);

  useEffect(() => {
    intervaloRef.current = setInterval(() => {
      setLinea((prev) => {
        if (prev < versos.length - 1) return prev + 1;

        clearInterval(intervaloRef.current);
        return prev;
      });
    }, 3000);

    return () => clearInterval(intervaloRef.current);
  }, []);

  useEffect(() => {
    if (linea === versos.length - 1) {
      const timer = setTimeout(() => setBotonVisible(true), 4200);
      return () => clearTimeout(timer);
    }
  }, [linea]);

  return (
    <div className="bienvenida">
      <div className="contenedor">

        <h1 className="titulo">Un espacio que late contigo.</h1>

        <div className="versos">
          {versos.slice(0, linea + 1).map((v, i) => (
            <p key={i}>{v}</p>
          ))}
        </div>

        <button
          className={`boton-comenzar ${botonVisible ? "visible" : ""}`}
          onClick={onComenzar}
        >
          ¿Lista para comenzar?
        </button>

      </div>
    </div>
  );
}
