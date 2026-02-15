import React, { useEffect } from "react";

export default function TestImages() {
  const assets = [
    { key: "heart", src: "/assets/slot-heart.png" },
    { key: "star", src: "/assets/slot-star.webp" },
    { key: "music", src: "/assets/slot-music.webp" }
  ];

  useEffect(() => {
    assets.forEach(a => console.log(`${a.key} ->`, a.src));
  }, []);

  const handleError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.style.opacity = "0.45";
    e.currentTarget.alt = "imagen no disponible";
    console.error("Fallo al cargar:", e.currentTarget.src);
  };

  return (
    <div style={{ padding: 20, fontFamily: "system-ui, sans-serif" }}>
      <h3 style={{ margin: "0 0 12px 0" }}>Prueba de imágenes</h3>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {assets.map((a) => (
          <div key={a.key} style={{ textAlign: "center" }}>
            <div
              style={{
                width: 120,
                height: 120,
                border: "2px solid #e44",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                background: "#fff"
              }}
            >
              <img
                src={a.src}
                alt={a.key}
                style={{ maxWidth: "100%", maxHeight: "100%", display: "block" }}
                onError={handleError}
                draggable="false"
              />
            </div>
            <div style={{ marginTop: 8, fontSize: 13 }}>{a.key}</div>
            <div style={{ marginTop: 6 }}>
              <a href={a.src} target="_blank" rel="noreferrer" style={{ fontSize: 12 }}>
                Abrir en nueva pestaña
              </a>
            </div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 14, color: "#666", fontSize: 13 }}>
        Observa la consola del navegador para ver las rutas generadas y errores.
      </p>
    </div>
  );
}
