import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

// Chispas doradas para el Estilo 6 (Ceremonia)
const chispasCeremonia = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: Math.random() * 90 + 5,
  y: Math.random() * 85 + 10,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 3 + 3.5,
  delay: Math.random() * 2,
}));

export default function Ceremonia() {
  const BASE = import.meta.env.BASE_URL;

  // Fotos locales desde la carpeta public/fotos_ceremonia/
  const fotos = [
    `${BASE}fotos_ceremonia/foto-1-iglesia.jpeg`,
    `${BASE}fotos_ceremonia/foto-2-iglesia.jpeg`
  ];

  const [index, setIndex] = useState(0);

  // Precargar las fotos de la ceremonia para evitar parpadeos
  useEffect(() => {
    fotos.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % fotos.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [fotos.length]);

  return (
    <section className="h-screen w-screen flex flex-col items-center snap-start px-5 py-4 bg-rosa-fondo relative overflow-hidden text-center select-none">

      {/* FONDO ANIMADO ESTILO 6: Aura Celestial y Chispas de Oro */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Halo celestial central */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-b from-dorado-claro/20 via-dorado-principal/10 to-transparent blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Chispas de oro ascendentes */}
        {chispasCeremonia.map((c) => (
          <motion.div
            key={c.id}
            className="absolute rounded-full bg-dorado-principal/70 shadow-[0_0_6px_rgba(197,160,89,0.9)]"
            style={{
              width: c.size,
              height: c.size,
              left: `${c.x}%`,
              top: `${c.y}%`,
            }}
            animate={{
              y: [-10, -50, -10],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: c.duration,
              delay: c.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Área Superior: Título */}
      <div className="flex-1 flex items-center justify-center w-full min-h-[70px] z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-serif text-rosa-principal text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1 }}
        >
          La Ceremonia
        </motion.h2>
      </div>

      {/* Carrusel de Fotos con Transición Crossfade Continua */}
      <motion.div
        className="w-full max-w-sm sm:max-w-md h-[18rem] sm:h-[20rem] md:h-[22rem] relative rounded-3xl overflow-hidden shadow-xl shrink-0 bg-rosa-fondo border border-dorado-claro/40 z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {fotos.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Ceremonia ${i + 1}`}
            loading="eager"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out select-none pointer-events-none"
            style={{
              opacity: i === index ? 1 : 0,
              zIndex: i === index ? 2 : 1,
            }}
          />
        ))}
      </motion.div>

      {/* Área Inferior: Información y Botón */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm py-2 z-10">
        <motion.div
          className="w-full flex flex-col items-center gap-1"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className="text-2xl md:text-3xl font-serif text-texto-principal">
            Parroquia de San Francisco de Asis
          </h3>
          <p className="text-dorado-principal font-bold text-xl tracking-wider">
            6:00 PM
          </p>

          <a
            href="https://maps.app.goo.gl/ABfHQaeDb62TE3Y39"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-xs bg-rosa-principal hover:bg-rosa-oscuro text-white font-medium py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg active:scale-98 mt-1"
          >
            <MapPin size={20} className="text-dorado-claro" />
            Ver en el mapa
          </a>
        </motion.div>
      </div>

    </section>
  );
}   