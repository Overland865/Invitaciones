import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Partículas para la galería (Estilo 8)
const particulasGaleria = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  size: Math.random() * 5 + 3,
  x: Math.random() * 90 + 5,
  y: Math.random() * 85 + 10,
  duration: Math.random() * 4 + 4,
  delay: Math.random() * 3,
}));

export default function Galeria() {
  const BASE = import.meta.env.BASE_URL;

  // Fotografías de la galería (guardadas en public/fotos_galeria/)
  const fotos = [
    `${BASE}fotos_galeria/foto-1-galeria.jpeg`,
    `${BASE}fotos_galeria/foto-2-galeria.jpeg`,
    `${BASE}fotos_galeria/foto-3-galeria.jpeg`
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Precarga de imágenes en caché para evitar tarjetas en blanco
  useEffect(() => {
    fotos.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [fotos]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % fotos.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + fotos.length) % fotos.length);

  // Calcula posición relativa y estilos 3D para el carrusel circular infinito
  const getCardStyle = (index) => {
    const total = fotos.length;
    let diff = (index - currentIndex) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (diff === 0) {
      // Tarjeta activa central (destacada y notablemente más grande que las laterales)
      return {
        x: '0%',
        scale: 1.16,
        rotateY: 0,
        opacity: 1,
        zIndex: 10,
        filter: 'brightness(1)',
        pointerEvents: 'auto',
      };
    } else if (diff === 1) {
      // Tarjeta derecha contigua (más pequeña y sutil)
      return {
        x: '58%',
        scale: 0.76,
        rotateY: -16,
        opacity: 0.55,
        zIndex: 5,
        filter: 'brightness(0.85)',
        pointerEvents: 'auto',
      };
    } else if (diff === -1) {
      // Tarjeta izquierda contigua (más pequeña y sutil)
      return {
        x: '-58%',
        scale: 0.76,
        rotateY: 16,
        opacity: 0.55,
        zIndex: 5,
        filter: 'brightness(0.85)',
        pointerEvents: 'auto',
      };
    } else {
      // Tarjetas restantes en cola oculta
      return {
        x: diff > 0 ? '115%' : '-115%',
        scale: 0.55,
        rotateY: diff > 0 ? -30 : 30,
        opacity: 0,
        zIndex: 1,
        filter: 'brightness(0.7)',
        pointerEvents: 'none',
      };
    }
  };

  return (
    <section className="h-screen w-screen flex flex-col items-center snap-start bg-rosa-fondo relative overflow-hidden text-center px-4 py-4 select-none">

      {/* FONDO ANIMADO: Halo Dorado Suave & Destellos ✦ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Resplandor central suave */}
        <motion.div
          className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[radial-gradient(circle,rgba(197,160,89,0.25)_0%,transparent_70%)] pointer-events-none"
          animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {[
          { top: '12%', left: '8%', size: 'text-xl', delay: 0 },
          { top: '16%', right: '10%', size: 'text-base', delay: 1.2 },
          { bottom: '25%', left: '10%', size: 'text-base', delay: 2 },
          { bottom: '18%', right: '8%', size: 'text-xl', delay: 0.7 },
        ].map((d, i) => (
          <motion.span
            key={i}
            className={`absolute text-dorado-principal ${d.size}`}
            style={{ top: d.top, bottom: d.bottom, left: d.left, right: d.right }}
            animate={{
              opacity: [0.2, 0.95, 0.2],
              scale: [0.75, 1.3, 0.75],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 3.5 + (i % 2),
              delay: d.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ✦
          </motion.span>
        ))}
      </div>

      {/* Título Superior */}
      <div className="flex-1 flex items-center justify-center w-full min-h-[60px] z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-serif text-rosa-principal text-center tracking-wide font-semibold"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1 }}
        >
          Mis Momentos
        </motion.h2>
      </div>

      {/* Escenario 3D para el Carrusel Circular Infinito */}
      <motion.div
        className="relative w-full max-w-sm sm:max-w-md md:max-w-lg h-[23rem] sm:h-[25.5rem] md:h-[27.5rem] flex items-center justify-center cursor-grab active:cursor-grabbing shrink-0 z-10"
        style={{ perspective: 1000 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, { offset, velocity }) => {
          const swipe = offset.x;
          if (swipe < -40 || velocity.x < -350) {
            next();
          } else if (swipe > 40 || velocity.x > 350) {
            prev();
          }
        }}
      >
        {fotos.map((foto, index) => {
          const isCenter = index === currentIndex;
          const style = getCardStyle(index);

          return (
            <motion.div
              key={index}
              animate={style}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 25,
              }}
              onClick={() => setCurrentIndex(index)}
              className={`absolute top-0 bottom-0 m-auto w-[14.5rem] h-[19.5rem] sm:w-64 sm:h-[22rem] md:w-72 md:h-[24.5rem] bg-white p-3 sm:p-3.5 rounded-3xl shadow-2xl transition-shadow duration-300 ${
                isCenter
                  ? 'border-2 border-dorado-claro ring-2 ring-dorado-principal/60 shadow-dorado-principal/30 shadow-2xl'
                  : 'border border-dorado-claro/50 shadow-md cursor-pointer'
              }`}
            >
              <img
                src={foto}
                alt={`Momento ${index + 1}`}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover rounded-2xl pointer-events-none"
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Contenedor Inferior: Puntos y texto de guía */}
      <div className="flex-1 flex flex-col justify-center items-center py-2 z-10">
        {/* Puntos Indicadores de Navegación Circular */}
        <div className="flex justify-center items-center gap-2">
          {fotos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-6 h-2.5 bg-rosa-principal shadow-xs'
                  : 'w-2.5 h-2.5 bg-dorado-claro/80 hover:bg-rosa-principal/50'
              }`}
              aria-label={`Ir a foto ${index + 1}`}
            />
          ))}
        </div>

        {/* Indicador visual de gesto */}
        <motion.div
          className="text-xs text-dorado-oscuro font-medium uppercase tracking-widest mt-2.5 flex items-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className="animate-pulse text-dorado-principal">←</span>
          Desliza
          <span className="animate-pulse text-dorado-principal">→</span>
        </motion.div>
      </div>

    </section>
  );
}