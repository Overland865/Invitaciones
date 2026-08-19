import { motion } from 'framer-motion';
import Contador from './Contador';

// Partículas doradas flotantes para el Hero (Estilo 1)
const particulasHero = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: Math.random() * 6 + 3,
  x: Math.random() * 100,
  yInit: Math.random() * 100,
  duration: Math.random() * 4 + 4,
  delay: Math.random() * 3,
}));

export default function Hero({ onEntrar }) {
  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center relative overflow-hidden p-5 bg-rosa-fondo select-none">
      
      {/* FONDO ANIMADO ESTILO 1: Partículas y Destellos Dorados */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Resplandor central pulsante */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-dorado-principal/15 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Partículas flotantes doradas */}
        {particulasHero.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-dorado-principal/60 shadow-[0_0_8px_rgba(197,160,89,0.8)]"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.yInit}%`,
            }}
            animate={{
              y: [-20, -120, -20],
              x: [0, (p.id % 2 === 0 ? 15 : -15), 0],
              opacity: [0, 0.9, 0],
              scale: [0.6, 1.3, 0.6],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Destellos ✦ parpadeantes */}
        <motion.span
          className="absolute top-16 left-10 text-dorado-principal text-xl"
          animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.3, 0.8], rotate: [0, 90, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          ✦
        </motion.span>
        <motion.span
          className="absolute bottom-24 right-12 text-dorado-principal text-lg"
          animate={{ opacity: [0.2, 0.85, 0.2], scale: [0.7, 1.2, 0.7], rotate: [0, -90, 0] }}
          transition={{ duration: 5, delay: 1, repeat: Infinity, ease: "easeInOut" }}
        >
          ✦
        </motion.span>
        <motion.span
          className="absolute top-1/3 right-8 text-dorado-oscuro text-sm"
          animate={{ opacity: [0.1, 0.7, 0.1], scale: [0.6, 1.1, 0.6] }}
          transition={{ duration: 3.5, delay: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          ✦
        </motion.span>
      </div>

      <motion.h1 
        className="text-5xl md:text-6xl font-serif text-rosa-principal font-semibold mb-6 tracking-wide z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Mis XV Años
      </motion.h1>

      <motion.div 
        className="flex justify-center items-center h-48 mb-6 cursor-pointer z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onEntrar}
      >
        {/* Número 15 en Dorado con Brillo */}
        <div className="font-serif text-[8rem] font-semibold text-dorado-principal drop-shadow-brillo animate-[bounce_4s_infinite]">
          15
        </div>
      </motion.div>

      {/* Contador */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="z-10"
      >
        <Contador />
      </motion.div>

    </section>
  );
}