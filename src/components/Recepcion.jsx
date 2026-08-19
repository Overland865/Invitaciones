import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

// Chispas festivas para el Estilo 7 (Recepción)
const chispasFiesta = [
  { top: '12%', left: '10%', delay: 0, dur: 4 },
  { top: '20%', right: '14%', delay: 1, dur: 3.5 },
  { top: '65%', left: '8%', delay: 1.8, dur: 4.5 },
  { top: '75%', right: '10%', delay: 0.5, dur: 3.8 },
  { bottom: '10%', left: '25%', delay: 2.2, dur: 4.2 },
];

export default function Recepcion() {
  const BASE = import.meta.env.BASE_URL;

  // Fotos desde la carpeta public/fotos_local/
  const fotos = [
    `${BASE}fotos_local/foto-1-local.jpeg`,
    `${BASE}fotos_local/foto-2-local.jpeg`
  ];

  const [index, setIndex] = useState(0);

  // Precargar las fotos del local para evitar parpadeos
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
      
      {/* FONDO ANIMADO ESTILO 7: Chispas Festivas y Resplandor de Fiesta */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Resplandor cálido de fondo */}
        <motion.div
          className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-rosa-principal/15 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Destellos festivos */}
        {chispasFiesta.map((c, i) => (
          <motion.span
            key={i}
            className="absolute text-dorado-principal text-lg sm:text-xl"
            style={{
              top: c.top,
              bottom: c.bottom,
              left: c.left,
              right: c.right,
            }}
            animate={{
              scale: [0.6, 1.4, 0.6],
              opacity: [0.2, 0.9, 0.2],
              rotate: [0, 90, 180, 0],
            }}
            transition={{
              duration: c.dur,
              delay: c.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ✦
          </motion.span>
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
          La Recepción
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
            alt={`Local ${i + 1}`}
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
            Local Castulo
          </h3>
          <p className="text-dorado-principal font-bold text-xl tracking-wider">
            8:00 PM
          </p>
          
          <a 
            href="https://maps.app.goo.gl/LyULR4P38L129Sde9" 
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