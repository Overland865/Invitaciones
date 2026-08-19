import { motion } from 'framer-motion';

export default function Mensaje() {
  return (
    <section className="h-screen w-screen flex flex-col justify-evenly items-center snap-start px-6 sm:px-10 md:px-16 py-10 sm:py-14 md:py-18 bg-rosa-fondo relative overflow-hidden select-none text-center">
      
      {/* FONDO ANIMADO ESTILO 2: Orbes de Luz Aurora Vívidos + Destellos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Orbe 1: Tono Dorado Intenso Flotante */}
        <motion.div
          className="absolute w-80 sm:w-[28rem] h-80 sm:h-[28rem] rounded-full bg-gradient-to-tr from-dorado-principal/35 via-dorado-claro/40 to-transparent blur-2xl"
          animate={{
            x: ['-25%', '35%', '-25%'],
            y: ['-15%', '30%', '-15%'],
            scale: [1, 1.35, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ top: '10%', left: '10%' }}
        />

        {/* Orbe 2: Tono Palo de Rosa Intenso Flotante */}
        <motion.div
          className="absolute w-96 sm:w-[32rem] h-96 sm:h-[32rem] rounded-full bg-gradient-to-br from-rosa-principal/40 via-rosa-oscuro/30 to-transparent blur-2xl"
          animate={{
            x: ['35%', '-25%', '35%'],
            y: ['25%', '-20%', '25%'],
            scale: [1.3, 0.9, 1.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ bottom: '5%', right: '10%' }}
        />

        {/* Chispas flotantes luminosas */}
        {[
          { top: '18%', left: '12%', size: 'text-2xl', delay: 0 },
          { top: '28%', right: '16%', size: 'text-lg', delay: 1 },
          { bottom: '22%', left: '18%', size: 'text-xl', delay: 2 },
          { bottom: '15%', right: '14%', size: 'text-2xl', delay: 0.5 },
        ].map((s, i) => (
          <motion.span
            key={i}
            className={`absolute text-dorado-principal drop-shadow-[0_0_8px_rgba(197,160,89,0.8)] ${s.size}`}
            style={{ top: s.top, bottom: s.bottom, left: s.left, right: s.right }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.7, 1.4, 0.7],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 4,
              delay: s.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ✦
          </motion.span>
        ))}
      </div>

      {/* Comillas decorativas gigantes de fondo */}
      <motion.span
        className="absolute top-10 sm:top-14 left-4 sm:left-12 md:left-24 text-[14rem] sm:text-[18rem] md:text-[22rem] text-dorado-claro/40 font-serif select-none pointer-events-none leading-none z-0"
        initial={{ opacity: 0, scale: 0.7, x: -30 }}
        whileInView={{ opacity: 0.45, scale: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        "
      </motion.span>

      {/* Título o distintivo superior sutil */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="z-10"
      >
        <span className="text-xs sm:text-sm md:text-base text-dorado-oscuro font-semibold uppercase tracking-[0.35em]">
        </span>
      </motion.div>

      {/* Texto principal ampliado con alta legibilidad y jerarquía */}
      <motion.div
        className="z-10 max-w-lg sm:max-w-2xl md:max-w-4xl px-2 my-2"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic text-texto-principal leading-[1.65] sm:leading-[1.7] text-center">
          Hay momentos en la vida que son especiales por sí solos, pero compartirlos con las personas que más quieres los hace inolvidables.
        </p>
      </motion.div>

      {/* Destello y divisor ornamental inferior */}
      <motion.div
        className="flex items-center justify-center gap-4 opacity-85 z-10 w-full"
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 0.85, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.35 }}
      >
        <motion.span 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="w-16 sm:w-24 h-px bg-dorado-principal/60 origin-right" 
        />
        <motion.span 
          initial={{ rotate: -90, opacity: 0 }}
          whileInView={{ rotate: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-dorado-principal text-base sm:text-lg inline-block"
        >
          ✦
        </motion.span>
        <motion.span 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="w-16 sm:w-24 h-px bg-dorado-principal/60 origin-left" 
        />
      </motion.div>

    </section>
  );
}