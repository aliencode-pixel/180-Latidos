import React from "react";
import './Bienvenida.css';

const Bienvenida = ({ onComenzar }) => {
  return (
    <div className="bienvenida">
        <div className="contenido">
            <h1>Un espacio que late contigo.</h1>
            <p> 
              Un lugar donde cada emoción encuentra su forma.<br />
              donde lo que sientes puede quedarse, sin prisa, sin juicio.<br /><br />
              Aquí, cada palabra que dejes será un latido guardado con cuidado.<br />
              Este regalo no busca respuestas, solo presencia.<br /><br />
              ¿Lista para comenzar?
            </p>
            <button onClick={onComenzar}>Comenzar</button>
        </div>
    </div>
  );
};      