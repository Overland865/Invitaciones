import { motion } from 'framer-motion';
import Contador from './Contador';

// Coordenadas de estrellas fijas para el Estilo 3 (Constelación)
const estrellas = [
  { top: '15%', left: '15%', size: 'text-xl', delay: 0 },
  { top: '22%', right: '18%', size: 'text-sm', delay: 1.5 },
  { top: '45%', left: '8%', size: 'text-lg', delay: 0.8 },
  { top: '60%', right: '12%', size: 'text-xl', delay: 2.2 },
  { bottom: '20%', left: '20%', size: 'text-sm', delay: 1.1 },
  { bottom: '15%', right: '22%', size: 'text-base', delay: 2.8 },
  { top: '80%', left: '48%', size: 'text-xs', delay: 0.5 },
];

export default function Recordatorio() {
  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center snap-start p-5 bg-white relative overflow-hidden select-none">
      
      {/* FONDO ANIMADO ESTILO 3: Constelación de Destellos Parpadeantes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Resplandor central suave */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-rosa-principal/10 blur-3xl" />

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
              opacity: [0.15, 0.9, 0.15],
              scale: [0.7, 1.3, 0.7],
              rotate: [0, 45, 0],
            }}
            transition={{
              duration: 3 + (i % 3),
              delay: est.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ✦
          </motion.span>
        ))}
      </div>

      <motion.h2
        className="text-4xl md:text-5xl font-serif text-rosa-principal mb-10 text-center tracking-wide z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1 }}
      >
        Faltan:
      </motion.h2>

      {/* Reutilizamos el componente del contador */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="z-10"
      >
        <Contador />
      </motion.div>

    </section>
  );
}