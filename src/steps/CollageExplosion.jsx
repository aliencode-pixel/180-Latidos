import React, { useEffect, useState } from "react";
import "./CollageExplosion.css";

export default function CollageExplosion({ covers, onFinish }) {
  const [fase, setFase] = useState(1);

  useEffect(() => {
    // Fase 1 → Fase 2 (explosión)
    const t1 = setTimeout(() => setFase(2), 5000);

    // Fase 2 → Fase 3 (fade a negro)
    const t2 = setTimeout(() => setFase(3), 9000);

    // Fase 3 → Fase 4 (créditos)
    const t3 = setTimeout(() => setFase(4), 11000);

    // Fase 4 → Finalizar
    const t4 = setTimeout(() => {
      if (onFinish) onFinish();
    }, 18000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="collage-wrapper">

      {/* Fase 1 y 2: portadas */}
      {(fase === 1 || fase === 2) && (
        <div className={`covers-layer ${fase === 2 ? "explode" : ""}`}>
          {covers.map((src, i) => (
            <img
              key={i}
              src={src}
              className="cover-img"
              style={{
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Fase 3: fade a negro */}
      {fase === 3 && <div className="fade-black"></div>}

      {/* Fase 4: créditos */}
      {fase === 4 && (
        <div className="creditos">
          <p>Gracias por vivir este viaje conmigo.</p>
          <p>180 días. 180 latidos. 1 historia.</p>
          <p>Hecho con amor para ti.</p>
        </div>
      )}
    </div>
  );
}
