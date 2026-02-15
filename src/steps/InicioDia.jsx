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
    <div className={`inicio-dia`}>

      {/* TÍTULO */}
      <h2 className="inicio-dia-titulo">
        Día {diaActual}
      </h2>

      {/* CONTENIDO SEGÚN ESTADO */}
      {pantallaDia === "inicio-dia" && (
        <div className="inicio-dia-tarjeta">
          <h3>Tu canción de hoy</h3>
          <p>Hoy tienes una nueva canción esperándote.</p>

          <button className="inicio-dia-btn" onClick={onIrRuleta}>
            Ir a la ruleta
          </button>
        </div>
      )}

      {pantallaDia === "escribir-latido" && (
        <div className="inicio-dia-tarjeta">
          <h3>Tu latido de hoy</h3>
          <p>Ya escuchaste tu canción. Ahora escribe tu latido.</p>

          <button className="inicio-dia-btn" onClick={onIrLatido}>
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

          <button className="inicio-dia-btn" onClick={onIrLatido}>
            Escribir otro latido
          </button>

        </div>
      )}
    </div>
  );
}
