import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Revelacion() {
  const BASE = import.meta.env.BASE_URL;

  // Fotografías oficiales temáticas de XV Años (guardadas en public/galeria/)
  const fotos = [
    `${BASE}galeria/foto2_vestido.jpg`,
    `${BASE}galeria/foto5_retrato.jpg`,
    `${BASE}galeria/foto4_vals.jpg`,
    `${BASE}galeria/foto3_pastel.jpg`,
    `${BASE}galeria/foto1_zapatillas.jpg`
  ];

  const [current, setCurrent] = useState(0);

  // Precargar todas las fotos en cache desde el arranque
  useEffect(() => {
    fotos.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Timer continuo y constante cada 5 segundos
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % fotos.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [fotos.length]);

  return (
    <section className="h-screen w-screen snap-start relative flex flex-col justify-end items-center pb-20 overflow-hidden bg-black">
      
      {/* Carrusel circular continuo: cada imagen se desvanece y respira con aceleración por GPU */}
      {fotos.map((foto, index) => {
        const isCurrent = index === current;
        const isPrev = index === (current === 0 ? fotos.length - 1 : current - 1);
        
        let zIndex = 0;
        if (isCurrent) zIndex = 2;
        else if (isPrev) zIndex = 1;

        return (
          <div
            key={foto}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${foto}')`,
              zIndex: zIndex,
              opacity: isCurrent ? 1 : 0,
              transform: isCurrent ? 'scale(1.08)' : 'scale(1)',
              transition: isCurrent
                ? 'opacity 1.5s ease-in-out, transform 5.5s ease-out'
                : 'opacity 1.5s ease-in-out, transform 0s linear 1.5s',
            }}
          />
        );
      })}

      {/* Gradiente sutil para oscurecer la base y resaltar el nombre */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none"></div>

      {/* Nombre flotante sobre la imagen */}
      <motion.h2
        className="text-7xl md:text-8xl font-serif text-white font-semibold z-20 drop-shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        Yoselin
      </motion.h2>

    </section>
  );
}

