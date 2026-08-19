import { motion } from 'framer-motion';

// Pétalos de rosa flotantes para la sección Familia (Estilo 4 - Realzado)
const petalos = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: Math.random() * 16 + 14,
  left: `${Math.random() * 92 + 4}%`,
  topInit: `${Math.random() * 85}%`,
  duration: Math.random() * 5 + 5,
  delay: Math.random() * 3,
}));

export default function Familia() {
  return (
    <section className="h-screen w-screen flex flex-col justify-evenly items-center snap-start px-6 py-8 sm:py-12 md:py-16 bg-rosa-fondo text-center select-none relative overflow-hidden">
      
      {/* FONDO ANIMADO ESTILO 4: Pétalos de Rosa Flotantes (Visibles y Vívidos) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Resplandor dorado de fondo */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-dorado-principal/20 blur-3xl" />

        {petalos.map((pet) => (
          <motion.div
            key={pet.id}
            className="absolute bg-gradient-to-br from-rosa-principal/80 via-rosa-oscuro/70 to-dorado-principal/50 rounded-[75%_10%_75%_10%] border border-white/40 shadow-[0_4px_10px_rgba(196,123,137,0.35)]"
            style={{
              width: pet.size,
              height: pet.size * 1.35,
              left: pet.left,
              top: pet.topInit,
            }}
            animate={{
              y: [-20, 80, -20],
              x: [-20, 25, -20],
              rotate: [0, 60, 130, 0],
              opacity: [0.4, 0.95, 0.4],
              scale: [0.85, 1.15, 0.85],
            }}
            transition={{
              duration: pet.duration,
              delay: pet.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Bloque de los Padres */}
      <motion.div
        className="flex flex-col justify-center items-center w-full max-w-2xl z-10 px-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs sm:text-sm md:text-base text-dorado-oscuro font-semibold uppercase tracking-[0.3em] mb-3"
        >
          Con la bendición de Dios y mis padres
        </motion.p>
        
        <div className="flex flex-col items-center justify-center w-full text-center">
          <motion.h3 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl font-serif text-rosa-principal leading-relaxed text-center w-full"
          >
            Juan Ariel García Magaña
          </motion.h3>

          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="w-full flex justify-center items-center my-2 sm:my-2.5"
          >
            <span className="text-2xl sm:text-3xl font-serif text-dorado-principal leading-none inline-block">
              &
            </span>
          </motion.div>

          <motion.h3 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="text-2xl sm:text-3xl md:text-4xl font-serif text-rosa-principal leading-relaxed text-center w-full"
          >
            Gicelly del Carmen Paredes López
          </motion.h3>
        </div>
      </motion.div>

      {/* Divisor Central Elegante que se expande */}
      <motion.div 
        className="flex items-center justify-center gap-4 my-2 opacity-85 z-10 w-full"
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 0.85, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <motion.span 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="w-16 sm:w-24 h-px bg-dorado-principal/60 origin-right" 
        />
        <motion.span 
          initial={{ rotate: -90, opacity: 0 }}
          whileInView={{ rotate: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-dorado-principal text-base sm:text-lg inline-block"
        >
          ✦
        </motion.span>
        <motion.span 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="w-16 sm:w-24 h-px bg-dorado-principal/60 origin-left" 
        />
      </motion.div>

      {/* Bloque de los Padrinos */}
      <motion.div
        className="flex flex-col justify-center items-center w-full max-w-2xl z-10 px-2 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="text-xs sm:text-sm md:text-base text-dorado-oscuro font-semibold uppercase tracking-[0.3em] mb-4 text-center w-full"
        >
          Mis padrinos
        </motion.p>
        
        <div className="flex flex-col gap-3.5 sm:gap-5 w-full text-center items-center">
          {/* Padrinos 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="flex flex-col sm:flex-row items-center justify-center text-center text-xl sm:text-2xl md:text-3xl font-serif text-rosa-principal leading-relaxed w-full"
          >
            <span>Maria Abigail Paredes Lope</span>
            <span className="text-lg sm:text-xl font-serif text-dorado-principal my-1 sm:my-0 sm:mx-3 leading-none">&</span>
            <span>José Alejandro Hernández Ortiz</span>
          </motion.div>

          {/* Padrinos 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="flex flex-col sm:flex-row items-center justify-center text-center text-xl sm:text-2xl md:text-3xl font-serif text-rosa-principal leading-relaxed w-full"
          >
            <span>Joel Alberto Paredes Lope</span>
            <span className="text-lg sm:text-xl font-serif text-dorado-principal my-1 sm:my-0 sm:mx-3 leading-none">&</span>
            <span>Lilia Myledy Che Barrera</span>
          </motion.div>

          {/* Padrino 3 */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.95 }}
            className="text-xl sm:text-2xl md:text-3xl font-serif text-rosa-principal leading-relaxed text-center w-full"
          >
            Wilma del Rosario Magaña Martín
          </motion.p>
        </div>
      </motion.div>

    </section>
  );
}