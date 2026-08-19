import { motion } from 'framer-motion';

// Círculos de Bokeh y Aros de Luz para el Estilo 5 (Vestimenta - Realzado)
const bokehs = [
  { size: 160, top: '8%', left: '8%', delay: 0, dur: 6 },
  { size: 110, top: '22%', right: '12%', delay: 1.8, dur: 5.5 },
  { size: 200, bottom: '12%', left: '14%', delay: 0.8, dur: 7 },
  { size: 130, bottom: '22%', right: '10%', delay: 2.5, dur: 6.5 },
  { size: 90, top: '50%', left: '48%', delay: 1.2, dur: 5 },
];

const chispasVestimenta = [
  { top: '15%', left: '30%', delay: 0 },
  { top: '35%', right: '20%', delay: 1.2 },
  { bottom: '30%', left: '18%', delay: 2.4 },
  { bottom: '15%', right: '35%', delay: 0.6 },
];

export default function Vestimenta() {
  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center snap-start p-8 bg-rosa-fondo text-center relative overflow-hidden select-none">
      
      {/* FONDO ANIMADO ESTILO 5: Luces Bokeh y Shimmer (Vívido) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {bokehs.map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-tr from-dorado-claro/50 via-dorado-principal/30 to-rosa-principal/30 border border-dorado-principal/40 shadow-[0_0_25px_rgba(197,160,89,0.35)] blur-md"
            style={{
              width: b.size,
              height: b.size,
              top: b.top,
              bottom: b.bottom,
              left: b.left,
              right: b.right,
            }}
            animate={{
              scale: [0.9, 1.3, 0.9],
              opacity: [0.35, 0.8, 0.35],
              y: [-15, 20, -15],
            }}
            transition={{
              duration: b.dur,
              delay: b.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Chispas flotantes complementarias */}
        {chispasVestimenta.map((c, i) => (
          <motion.span
            key={i}
            className="absolute text-dorado-principal text-lg drop-shadow-[0_0_6px_rgba(197,160,89,0.8)]"
            style={{ top: c.top, bottom: c.bottom, left: c.left, right: c.right }}
            animate={{
              opacity: [0.2, 0.95, 0.2],
              scale: [0.6, 1.3, 0.6],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 3.5,
              delay: c.delay,
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
        className="text-4xl md:text-5xl font-serif text-rosa-principal mb-8 z-10"
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