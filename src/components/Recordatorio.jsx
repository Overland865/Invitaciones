import { motion } from 'framer-motion';
import Contador from './Contador';

// Coordenadas de estrellas fijas para el fondo
const estrellas = [
  { top: '12%', left: '14%', size: 'text-lg', delay: 0 },
  { top: '20%', right: '16%', size: 'text-sm', delay: 1.5 },
  { top: '42%', left: '10%', size: 'text-base', delay: 0.8 },
  { top: '58%', right: '10%', size: 'text-lg', delay: 2.2 },
  { bottom: '18%', left: '16%', size: 'text-sm', delay: 1.1 },
  { bottom: '12%', right: '18%', size: 'text-base', delay: 2.8 },
];

export default function Recordatorio() {
  return (
    <section className="h-screen w-screen flex flex-col justify-between items-center snap-start px-6 py-10 sm:py-12 bg-rosa-fondo relative overflow-hidden select-none">
      
      {/* FONDO ANIMADO: Halo Dorado & Constelación de Destellos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.div
          className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[radial-gradient(circle,rgba(197,160,89,0.25)_0%,transparent_70%)] pointer-events-none"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.35, 0.75, 0.35],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {estrellas.map((est, i) => (
          <motion.span
            key={i}
            className={`absolute text-dorado-principal ${est.size}`}
            style={{
              top: est.top,
              bottom: est.bottom,
              left: est.left,
              right: est.right,
            }}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.75, 1.3, 0.75],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 3.5 + (i % 2),
              delay: est.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ✦
          </motion.span>
        ))}
      </div>

      {/* 1. SECCIÓN SUPERIOR: Reloj de Arena Animado (Más Grande y Destacado) */}
      <motion.div 
        className="flex-1 flex flex-col justify-center items-center text-center z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        {/* Contenedor del Reloj con halo luminoso y giro fluido */}
        <div className="relative flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36">
          {/* Halo brillante detrás del reloj */}
          <div className="absolute inset-0 bg-dorado-principal/25 rounded-full blur-2xl animate-pulse" />

          <motion.div
            className="w-20 h-20 sm:w-28 sm:h-28 text-dorado-principal drop-shadow-[0_6px_18px_rgba(197,160,89,0.55)] flex items-center justify-center"
            animate={{
              rotate: [0, 0, 180, 180, 360],
            }}
            transition={{
              duration: 6,
              times: [0, 0.35, 0.5, 0.85, 1],
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* SVG Artesanal de Reloj de Arena Dorado con Detalles */}
            <svg
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Bases superior e inferior de oro */}
              <rect x="10" y="5" width="44" height="6" rx="3" fill="currentColor" />
              <rect x="10" y="53" width="44" height="6" rx="3" fill="currentColor" />

              {/* Columnas decorativas */}
              <line x1="15" y1="11" x2="15" y2="53" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="49" y1="11" x2="49" y2="53" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

              {/* Vidrio de la ampolla */}
              <path
                d="M18 12C18 25 29 29 32 32C29 35 18 39 18 52H46C46 39 35 35 32 32C35 29 46 25 46 12H18Z"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinejoin="round"
                fill="rgba(255,255,255,0.45)"
              />

              {/* Arena superior cayendo */}
              <path
                d="M22 17C22 25 29 28 32 30C35 28 42 25 42 17H22Z"
                fill="#C47B89"
                opacity="0.9"
              />

              {/* Hilo de arena que gotea */}
              <line
                x1="32"
                y1="31"
                x2="32"
                y2="47"
                stroke="#C47B89"
                strokeWidth="2"
                strokeDasharray="2.5 2.5"
                strokeLinecap="round"
              />

              {/* Montículo de arena inferior */}
              <path
                d="M23 51C24 45 30 43 32 43C34 43 40 45 41 51H23Z"
                fill="#C5A059"
                opacity="0.95"
              />

              {/* Destello de luz en el cristal */}
              <path
                d="M23 15C22 20 24 23 26 25"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                opacity="0.85"
              />
            </svg>
          </motion.div>
        </div>

        {/* Línea decorativa con estrella central */}
        <div className="flex items-center gap-3 mt-2 opacity-80">
          <span className="w-10 h-px bg-dorado-principal/50" />
          <span className="text-dorado-principal text-xs">✦</span>
          <span className="w-10 h-px bg-dorado-principal/50" />
        </div>
      </motion.div>

      {/* 2. SECCIÓN MEDIA: Título y Reloj Contador */}
      <motion.div
        className="flex-1 flex flex-col justify-center items-center text-center z-10 w-full max-w-sm"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="font-serif text-4xl md:text-5xl text-rosa-principal mb-3 tracking-wide font-semibold text-center">
          Faltan
        </h2>

        {/* Componente del Contador Estilizado */}
        <Contador />
      </motion.div>

      {/* 3. SECCIÓN INFERIOR: Fecha Oficial con Tipografía Editorial y Colores Integrados (Sin marco de tarjeta) */}
      <motion.div
        className="flex-1 flex flex-col justify-center items-center w-full max-w-xs sm:max-w-sm text-center z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="flex flex-col items-center">
          <span className="font-serif text-sm sm:text-base text-rosa-principal uppercase tracking-[0.3em] font-light mb-1">
            El Gran Día
          </span>
          
          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-dorado-oscuro font-bold tracking-wide">
            Sábado, 03 de Octubre de 2026
          </p>

          <div className="flex items-center gap-2 mt-2 opacity-70">
            <span className="w-6 h-px bg-dorado-principal/40" />
            <span className="text-dorado-principal text-[10px]">✦</span>
            <span className="w-6 h-px bg-dorado-principal/40" />
          </div>
        </div>
      </motion.div>

    </section>
  );
}