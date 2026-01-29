import React, { useState } from 'react';
import Bienvenida from './Bienvenida';
import FallingHearts from './FallingHearts';
import './App.css';

function App() {
  const [mostrarBienvenida, setMostrarBienvenida] = useState(true);
  const [mostrarMensajeBienvenida, setMostrarMensajeBienvenida] = useState(false);
  const [latido, setLatido] = useState('');
  const [historial, setHistorial] = useState([]);

  const manejarComienzo = () => {
    setMostrarBienvenida(false);
    setMostrarMensajeBienvenida(true);

    setTimeout(() => {
      setMostrarMensajeBienvenida(false);
    }, 3000);
  };

  const guardarLatido = () => {
    if (latido.trim() !== '') {
      setHistorial([...historial, latido]);
      setLatido('');
    }
  };

  const borrarLatido = (index) => {
    const nuevoHistorial = [...historial];
    nuevoHistorial.splice(index, 1);
    setHistorial(nuevoHistorial);
  };

  return (
    <div className="contenedor-app">
      <FallingHearts />

      {mostrarBienvenida && (
        <Bienvenida onComenzar={manejarComienzo} />
      )}

      {mostrarMensajeBienvenida && (
        <div className="mensaje-bienvenida">
          <h2>Bienvenida a <span>180 Latidos</span></h2>
        </div>
      )}

      {!mostrarBienvenida && !mostrarMensajeBienvenida && (
        <div className="contenido-principal">
          <h1>¿Cómo te sientes hoy?</h1>
          <p className="fecha">{new Date().toLocaleDateString()}</p>

          <div className="latido">
            <h2>Escribe tu emoción, pensamiento o palabra de hoy:</h2>
            <textarea
              rows="4"
              placeholder="Deja aquí tu latido de hoy..."
              value={latido}
              onChange={(e) => setLatido(e.target.value)}
            />
            <button onClick={guardarLatido}>Guardar emoción</button>
          </div>

          <div className="historial">
            <h3>Latidos anteriores</h3>
            <ul>
              {historial.map((item, index) => (
                <li key={index}>
                  {item}
                  <button className="borrar" onClick={() => borrarLatido(index)}>🗑</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
