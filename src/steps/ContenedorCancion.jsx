import React, { useState } from "react";
import Paso5 from "./Paso5";
import PasoCancion from "./PasoCancion";

export default function ContenedorCancion() {
  const [cancionSeleccionada, setCancionSeleccionada] = useState(null);
  const [mostrarPasoCancion, setMostrarPasoCancion] = useState(false);

  const handleWrite = (track) => {
    const cancionFormateada = {
      nombre: track.title,
      artista: track.artist,
      imagen: track.spotify.cover,
      spotify: track.spotify.url
    };

    setCancionSeleccionada(cancionFormateada);
    setMostrarPasoCancion(true);
  };

  const handleContinuar = () => {
    console.log("Continuar presionado");
  };

  return (
    <>
      {!mostrarPasoCancion && (
        <Paso5 onWrite={handleWrite} />
      )}

      {mostrarPasoCancion && (
        <PasoCancion
          cancion={cancionSeleccionada}
          onContinuar={handleContinuar}
        />
      )}
    </>
  );
}
