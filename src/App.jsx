// ...existing code...
import { useState, useEffect } from "react";
import FallingHearts from "./FallingHearts";
import './App.css'

function App() {
  const fecha = new Date().toLocaleDateString('es-VE', { 
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const [emocion, setEmocion] = useState('');
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const datosGuardados = localStorage.getItem('historial');
    if (datosGuardados) {
      setHistorial(JSON.parse(datosGuardados));
    }
  }, []);

  const guardarEmocion = () => {
    if (emocion.trim() === '') return;
    const nuevoLatido = { texto: emocion, fecha };
    const nuevoHistorial = [nuevoLatido, ...historial];
    setHistorial(nuevoHistorial);
    setEmocion('');
    localStorage.setItem('historial', JSON.stringify(nuevoHistorial));
  }

  const borrarEmocion = (indice) => {
    const nuevoHistorial = historial.filter((_, i) => i !== indice);
    setHistorial(nuevoHistorial);
    localStorage.setItem('historial', JSON.stringify(nuevoHistorial));
  };
  
  return (
    <div className="contenedor">
      <FallingHearts />
      
      <h1>180 Latidos</h1>
      <p className="fecha">{fecha}</p>

      <div className="latido">
        <h2>¿Cómo te sientes hoy?</h2>
        <textarea
          value={emocion}
          onChange={(e) => setEmocion(e.target.value)}
          placeholder="Escribe tu emoción del día..."
        />
        <button onClick={guardarEmocion}>Guardar emoción</button>
      </div>

      <div className="historial">
        <h3>Latidos anteriores</h3>
        <ul>
          {historial.map((item, index) => (
            <li key={index}>
              <strong>{item.fecha}</strong>: {item.texto}
              <button className="borrar" onClick={() => borrarEmocion(index)}>🗑️</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
// ...existing code...
