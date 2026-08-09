import React from "react";
import "./ZombieConstructor.css";

export default function ZombieConstructor({ 
  semanaActual = 1, 
  pistaSemana = "🧱 El baby zombie encontró unos ladrillos viejos...",
  esCompleto = false 
}) {
  return (
    <div className="zombie-container">
      <div className="zombie-avatar-wrapper">
        <div className="bloque-mc"></div>
        <img 
          src="https://minecraft.wiki/images/Baby_Zombie_JE2_BE2.png" 
          alt="Baby Zombie Minecraft" 
          className="zombie-sprite"
        />
        <div className="pico-mc">⛏️</div>
      </div>

      <div className="zombie-dialogo">
        <span className="zombie-tag">Semana {semanaActual}</span>
        <p className="zombie-pista">
          {esCompleto 
            ? "¡GG! Misión cumplida, la imagen está completa. 🔥" 
            : pistaSemana}
        </p>
      </div>
    </div>
  );
}