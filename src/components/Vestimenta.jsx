import { motion } from 'framer-motion';

// Coordenadas de estrellas fijas para el fondo de destellos
const destellosVestimenta = [
  { top: '12%', left: '15%', size: 'text-lg', delay: 0 },
  { top: '22%', right: '14%', size: 'text-sm', delay: 1.5 },
  { top: '46%', left: '10%', size: 'text-base', delay: 0.8 },
  { top: '60%', right: '12%', size: 'text-lg', delay: 2.2 },
  { bottom: '18%', left: '16%', size: 'text-sm', delay: 1.1 },
  { bottom: '12%', right: '18%', size: 'text-base', delay: 2.8 },
];

export default function Vestimenta() {
  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center snap-start p-8 bg-rosa-fondo text-center relative overflow-hidden select-none">
      
      {/* FONDO ANIMADO: Halo Dorado Suave & Destellos ✦ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Resplandor central suave */}
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

        {destellosVestimenta.map((d, i) => (
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

      {/* Icono de gancho de ropa */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1 }}
        className="mb-8 text-dorado-principal opacity-90 z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a2 2 0 0 0-2 2c0 1 1 1.5 1 2.5 0 1-1 1.5-1 2.5a2 2 0 0 0 4 0c0-1-1-1.5-1-2.5 0-1 1-1.5 1-2.5a2 2 0 0 0-2-2Z" />
          <path d="M12 9L2.3 18.2a1 1 0 0 0 .7 1.8h18a1 1 0 0 0 .7-1.8L12 9Z" />
        </svg>
      </motion.div>

      <motion.h2
        className="text-4xl md:text-5xl font-serif text-rosa-principal mb-8 z-10 tracking-wide font-semibold text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Código de Vestimenta
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="border-y border-dorado-claro/80 py-4 px-12 z-10"
      >
        <p className="text-2xl text-texto-principal font-light tracking-[0.4em] uppercase">
          Formal
        </p>
      </motion.div>

    </section>
  );
}