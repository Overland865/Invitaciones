import { motion } from 'framer-motion';

export default function Familia() {
  return (
    <section className="h-screen w-screen flex flex-col justify-evenly items-center snap-start px-6 py-8 sm:py-12 md:py-16 bg-rosa-fondo text-center select-none relative overflow-hidden">
      
      {/* Resplandor sutil dorado de fondo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-dorado-principal/10 blur-3xl pointer-events-none" />

      {/* Bloque de los Padres */}
      <motion.div
        className="flex flex-col justify-center items-center w-full max-w-2xl z-10 px-2"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-xs sm:text-sm md:text-base text-dorado-oscuro font-semibold uppercase tracking-[0.3em] mb-3">
          Con la bendición de Dios y mis padres
        </p>
        
        <div className="flex flex-col items-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-rosa-principal leading-snug">
            Juan Ariel García Magaña
          </h3>
          <span className="text-xl sm:text-2xl font-serif text-dorado-principal my-1">
            &
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-rosa-principal leading-snug">
            Gicelly del Carmen Paredes López
          </h3>
        </div>
      </motion.div>

      {/* Divisor Central Elegante */}
      <motion.div 
        className="flex items-center gap-4 my-2 opacity-85 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.85, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <span className="w-16 sm:w-24 h-px bg-dorado-principal/60" />
        <span className="text-dorado-principal text-base sm:text-lg">✦</span>
        <span className="w-16 sm:w-24 h-px bg-dorado-principal/60" />
      </motion.div>

      {/* Bloque de los Padrinos */}
      <motion.div
        className="flex flex-col justify-center items-center w-full max-w-2xl z-10 px-2"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <p className="text-xs sm:text-sm md:text-base text-dorado-oscuro font-semibold uppercase tracking-[0.3em] mb-4">
          Mis padrinos
        </p>
        
        <div className="flex flex-col gap-3.5 sm:gap-5 w-full">
          {/* Padrinos 1 */}
          <div className="flex flex-col sm:flex-row items-center justify-center text-xl sm:text-2xl md:text-3xl font-serif text-rosa-principal leading-snug">
            <span>Maria Abigail Paredes Lope</span>
            <span className="text-lg sm:text-xl font-serif text-dorado-principal my-0.5 sm:my-0 sm:mx-2.5">&</span>
            <span>José Alejandro Hernández Ortiz</span>
          </div>

          {/* Padrinos 2 */}
          <div className="flex flex-col sm:flex-row items-center justify-center text-xl sm:text-2xl md:text-3xl font-serif text-rosa-principal leading-snug">
            <span>Joel Alberto Paredes Lope</span>
            <span className="text-lg sm:text-xl font-serif text-dorado-principal my-0.5 sm:my-0 sm:mx-2.5">&</span>
            <span>Lilia Myledy Che Barrera</span>
          </div>

          {/* Padrino 3 */}
          <p className="text-xl sm:text-2xl md:text-3xl font-serif text-rosa-principal leading-snug">
            Wilma del Rosario Magaña Martín
          </p>
        </div>
      </motion.div>

    </section>
  );
}