"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Lampada() {
  const [ligada, setLigada] = useState(false);

  const [imgLampada, setImgLampada] = useState(
    "https://cdn-icons-png.flaticon.com/512/702/702797.png"
  );
  const [imgSwitch, setImgSwitch] = useState(
    "https://cdn-icons-png.flaticon.com/512/3256/3256194.png"
  );

  useEffect(() => {
    document.title = ligada ? "🌙" : "☀️";

    if (ligada) {
      setImgLampada("https://cdn-icons-png.flaticon.com/512/702/702814.png");
      setImgSwitch("https://cdn-icons-png.flaticon.com/512/3256/3256132.png");
    } else {
      setImgLampada("https://cdn-icons-png.flaticon.com/512/702/702797.png");
      setImgSwitch("https://cdn-icons-png.flaticon.com/512/3256/3256194.png");
    }
  }, [ligada]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b">

      <Image src={imgLampada} alt="Lâmpada" width={150} height={150} className="mb-4 drop-shadow-lg" />

      <div
        className="cursor-pointer transition-transform duration-300 hover:scale-110"
        onClick={() => setLigada(!ligada)}
      >
        <Image src={imgSwitch} alt="Interruptor" width={80} height={80} />
      </div>

      <p className="mt-4 text-lg font-semibold">
        {ligada ? "Lâmpada ligada" : "Lâmpada desligada"}
      </p>
    </div>
  );
}
