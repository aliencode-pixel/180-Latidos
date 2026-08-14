import React from "react";

export default function InicioDia({
  diaActual,
  pantallaDia,
  temaActual,
  onIrRuleta,
  onIrLatido,
  onIrHistorial,
  onIrWrappedFinal
}) {
  return (
    <div className="inicio-dia">

      {/* CONTENIDO SEGÚN ESTADO */}
      {pantallaDia === "inicio-dia" && (
        <div className="inicio-dia-tarjeta">
          <h2 className="inicio-dia-titulo">Vol. II</h2>
          <p className="inicio-dia-subtexto">Descubre la canción del día</p>

          <button className="inicio-dia-btn inicio-dia-btn-gradiente" onClick={onIrRuleta}>
            Ir a la ruleta
          </button>
        </div>
      )}

      {pantallaDia === "escribir-latido" && (
        <div className="inicio-dia-tarjeta">
          <h3>Tu latido de hoy</h3>
          <p>Ya escuchaste tu canción. Ahora escribe tu latido.</p>

          <button className="inicio-dia-btn inicio-dia-btn-gradiente" onClick={onIrLatido}>
            Escribir mi latido
          </button>
        </div>
      )}

      {pantallaDia === "completado" && (
        <div className="inicio-dia-tarjeta">
          <h3>Día completado</h3>
          <p>¿Qué quieres hacer ahora?</p>

          <button className="inicio-dia-btn" onClick={onIrHistorial}>
            Ver historial
          </button>

          <button className="inicio-dia-btn inicio-dia-btn-gradiente" onClick={onIrLatido}>
            Escribir otro latido
          </button>

        </div>
      )}
    </div>
  );
}