import { motion } from 'framer-motion';

// Coordenadas de estrellas fijas para el fondo de destellos
const destellosFamilia = [
  { top: '12%', left: '12%', size: 'text-lg', delay: 0 },
  { top: '22%', right: '14%', size: 'text-sm', delay: 1.5 },
  { top: '48%', left: '10%', size: 'text-base', delay: 0.8 },
  { top: '55%', right: '10%', size: 'text-lg', delay: 2.2 },
  { bottom: '15%', left: '14%', size: 'text-sm', delay: 1.1 },
  { bottom: '10%', right: '16%', size: 'text-base', delay: 2.8 },
];

export default function Familia() {
  return (
    <section className="h-screen w-screen flex flex-col justify-evenly items-center snap-start px-6 py-8 sm:py-12 md:py-16 bg-rosa-fondo text-center select-none relative overflow-hidden">
      
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

        {destellosFamilia.map((d, i) => (
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
          Gicelly del Carmen Paredes Lópe
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
            {/* padrino y luego madrina */}
            <span>José Alejandro Hernández Ortiz</span>
            <span className="text-lg sm:text-xl font-serif text-dorado-principal my-1 sm:my-0 sm:mx-3 leading-none">&</span>
            <span>Maria Abigail Paredes Lope</span>
          </motion.div>

          {/* Padrinos 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="flex flex-col sm:flex-row items-center justify-center text-center text-xl sm:text-2xl md:text-3xl font-serif text-rosa-principal leading-relaxed w-full"
          >
            {/* padrino y luego madrina */}
            <span>Joel Alberto Paredes Lope</span>
            <span className="text-lg sm:text-xl font-serif text-dorado-principal my-1 sm:my-0 sm:mx-3 leading-none">&</span>
            <span>Lilia Myledy Che Barrera</span>
          </motion.div>

          {/* madrina 3 */}
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