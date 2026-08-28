import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

// Coordenadas de estrellas fijas para el fondo de destellos
const destellosCeremonia = [
  { top: '10%', left: '12%', size: 'text-lg', delay: 0 },
  { top: '18%', right: '14%', size: 'text-sm', delay: 1.5 },
  { top: '65%', left: '8%', size: 'text-base', delay: 0.8 },
  { top: '75%', right: '10%', size: 'text-lg', delay: 2.2 },
  { bottom: '8%', left: '20%', size: 'text-sm', delay: 1.1 },
];

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
    <section className="h-screen w-screen flex flex-col items-center snap-start px-5 py-4 bg-[#f7ebe8] relative overflow-hidden text-center select-none">

      {/* IMAGEN DE FONDO (Marco rococó y rosas en las esquinas) */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${BASE}fondos/fondo-general.jpeg')`,
        }}
      />

      {/* FONDO ANIMADO: Halo Dorado Suave & Destellos ✦ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Resplandor central suave */}
        <motion.div
          className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[radial-gradient(circle,rgba(197,160,89,0.25)_0%,transparent_70%)] pointer-events-none"
          animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {destellosCeremonia.map((d, i) => (
          <motion.span
            key={i}
            className={`absolute text-dorado-principal ${d.size}`}
            style={{
              top: d.top,
              bottom: d.bottom,
              left: d.left,
              right: d.right,
            }}
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

      {/* Área Superior: Título */}
      <div className="flex-1 flex items-center justify-center w-full min-h-[70px] z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-serif text-rosa-principal text-center tracking-wide font-semibold"
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
            className="group relative w-full max-w-xs bg-gradient-to-r from-rosa-principal via-[#d08292] to-rosa-principal hover:from-rosa-oscuro hover:to-rosa-oscuro text-white font-medium py-3.5 px-5 rounded-2xl flex items-center justify-between transition-all duration-300 shadow-lg shadow-rosa-principal/25 hover:shadow-xl hover:shadow-rosa-principal/35 border border-dorado-claro/80 active:scale-95 cursor-pointer overflow-hidden mt-2"
          >
            {/* Destello de luz suave al pasar el cursor */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

            {/* Icono izquierdo en cápsula de cristal */}
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-xs border border-white/30 flex items-center justify-center text-dorado-claro group-hover:scale-110 transition-transform duration-300 shrink-0 shadow-xs">
              <MapPin size={18} />
            </div>

            {/* Texto central elegante */}
            <span className="font-sans font-medium text-sm sm:text-base tracking-wide px-2">
              Ver Ubicación en Mapa
            </span>

            {/* Destello dorado indicador */}
            <div className="w-7 h-7 rounded-xl bg-black/10 flex items-center justify-center text-dorado-claro text-xs group-hover:translate-x-1 transition-transform duration-300 shrink-0">
              ➔
            </div>
          </a>
        </motion.div>
      </div>

    </section>
  );
}   