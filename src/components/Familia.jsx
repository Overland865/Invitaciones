import { motion } from 'framer-motion';

export default function Familia() {
  return (
    <section className="h-screen w-screen flex flex-col justify-between items-center snap-start px-6 py-10 sm:py-14 md:py-16 bg-rosa-fondo text-center select-none">

      {/* Bloque de los Padres */}
      <motion.div
        className="flex-1 flex flex-col justify-center items-center w-full max-w-xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-xs sm:text-sm text-dorado-oscuro font-medium uppercase tracking-[0.25em] mb-2.5">
          Con la bendición de Dios y mis padres
        </p>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-rosa-principal leading-relaxed">
          Juan Ariel García Magaña
          <br />
          <span className="text-lg sm:text-xl font-sans text-dorado-principal my-0.5 inline-block">&</span>
          <br />
          Gicelly del Carmen Paredes López
        </h3>
      </motion.div>

      {/* Divisor Central Elegante */}
      <motion.div 
        className="flex items-center gap-4 my-1 opacity-80"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.8, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <span className="w-12 sm:w-16 h-px bg-dorado-principal/50" />
        <span className="text-dorado-principal text-sm">✦</span>
        <span className="w-12 sm:w-16 h-px bg-dorado-principal/50" />
      </motion.div>

      {/* Bloque de los Padrinos (Mismo tamaño y peso visual que los padres) */}
      <motion.div
        className="flex-1 flex flex-col justify-center items-center w-full max-w-xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <p className="text-xs sm:text-sm text-dorado-oscuro font-medium uppercase tracking-[0.25em] mb-3">
          Mis padrinos
        </p>
        
        <div className="flex flex-col gap-3 sm:gap-4 w-full">
          {/* Padrinos 1 */}
          <p className="text-xl sm:text-2xl md:text-3xl font-serif text-rosa-principal leading-snug">
            Maria Abigail Paredes Lope 
            <br className="sm:hidden" />
            <span className="text-lg sm:text-xl font-sans text-dorado-principal mx-2">&</span>
            José Alejandro Hernández Ortiz
          </p>

          {/* Padrinos 2 */}
          <p className="text-xl sm:text-2xl md:text-3xl font-serif text-rosa-principal leading-snug">
            Joel Alberto Paredes Lope 
            <br className="sm:hidden" />
            <span className="text-lg sm:text-xl font-sans text-dorado-principal mx-2">&</span>
            Lilia Myledy Che Barrera
          </p>

          {/* Padrino 3 */}
          <p className="text-xl sm:text-2xl md:text-3xl font-serif text-rosa-principal leading-snug">
            Wilma del Rosario Magaña Martín
          </p>
        </div>
      </motion.div>

    </section>
  );
}