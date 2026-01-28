import { useState } from "react";
import './App.css'

function App() {
  const fecha = new Date() .toLocaleDateString('es-VE' , { 
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const [emocion, setEmocion] = useState('')
  const [historial, setHistorial] = useState([])

  const guardarEmocion = () => {
    if (emocion.trim() === '') return
    const nuevoLatido = { texto: emocion, fecha }
    setHistorial([nuevoLatido, ...historial])
    setEmocion('')
    const borrarEmocion = (indice) => {
      const nuevoHistorial = historial.filter((_, i) => i !== indice)
      setHistorial(nuevoHistorial)
  }
  }

  return (
    <div className="contenedor">
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
              <buttom className="borrar" onClick={() => borrarEmocion(index)}>🗑️</buttom>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App  
