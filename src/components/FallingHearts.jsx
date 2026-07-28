import React, { useEffect, useState } from "react";
import "./FallingHearts.css";

export default function FallingHearts({ isBirthday = false }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const shapes = ["❤", "♥", "✿", "❀"];

      const shape = shapes[Math.floor(Math.random() * shapes.length)];

      const newItem = {
        id: Date.now(),
        left: Math.random() * 100,
        size: Math.random() * 18 + 14,
        shape
      };

      setItems((prev) => [...prev, newItem]);

      setTimeout(() => {
        setItems((prev) => prev.filter((i) => i.id !== newItem.id));
      }, 12000);
    }, 450);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`falling-hearts-container ${isBirthday ? "fase-cumple" : ""}`}>
      {items.map((item) => (
        <span
          key={item.id}
          className="item"
          style={{
            left: `${item.left}%`,
            fontSize: `${item.size}px`
          }}
        >
          {item.shape}
        </span>
      ))}
    </div>
  );
}