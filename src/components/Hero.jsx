import { motion } from 'framer-motion';
import Contador from './Contador';

// Coordenadas de estrellas fijas para el fondo de destellos
const destellosHero = [
  { top: '12%', left: '14%', size: 'text-lg', delay: 0 },
  { top: '20%', right: '16%', size: 'text-sm', delay: 1.5 },
  { top: '42%', left: '10%', size: 'text-base', delay: 0.8 },
  { top: '58%', right: '10%', size: 'text-lg', delay: 2.2 },
  { bottom: '18%', left: '16%', size: 'text-sm', delay: 1.1 },
  { bottom: '12%', right: '18%', size: 'text-base', delay: 2.8 },
];

export default function Hero({ onEntrar }) {
  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center relative overflow-hidden p-5 bg-rosa-fondo select-none">
      
      {/* FONDO ANIMADO: Halo Dorado Suave & Destellos ✦ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Resplandor central pulsante (acelerado por GPU) */}
        <motion.div 
          className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[radial-gradient(circle,rgba(197,160,89,0.25)_0%,transparent_70%)] pointer-events-none"
          animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {destellosHero.map((d, i) => (
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

      <motion.div
        className="flex flex-col items-center justify-center text-center mb-4 sm:mb-6 z-10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <span className="font-serif text-lg sm:text-xl md:text-2xl text-dorado-oscuro tracking-[0.35em] uppercase font-light mb-1">
          Mis
        </span>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-rosa-principal font-semibold tracking-wide drop-shadow-sm">
          XV Años
        </h1>
      </motion.div>

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

      {/* Indicador de entrada */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="text-xs sm:text-sm font-sans tracking-[0.25em] text-rosa-oscuro uppercase cursor-pointer mb-3 z-10 select-none"
        onClick={onEntrar}
      >
        ✦ Toca para abrir ✦
      </motion.p>

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