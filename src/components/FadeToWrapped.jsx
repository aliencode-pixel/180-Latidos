import React, { useEffect } from "react";


export default function FadeToWrapped({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 3000); // duración del fade

    return () => clearTimeout(timer);
  }, []);

  return <div className="fade-to-wrapped"></div>;
}
