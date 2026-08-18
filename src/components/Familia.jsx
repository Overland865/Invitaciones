import { motion } from 'framer-motion';

export default function Familia() {
  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center snap-start p-8 bg-lila-fondo text-center">

      {/* Bloque de los Padres */}
      <motion.div
        className="mb-16 w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1 }}
      >
        <p className="text-xs md:text-sm text-slate-500 uppercase tracking-[0.3em] mb-6">
          Con la bendición de Dios y mis padres
        </p>
        <h3 className="text-4xl md:text-5xl font-serif text-lila-principal leading-relaxed">
          Luis Alberto Zamarripa Hernandez <br /> <span className="text-2xl text-lila-claro">&</span> <br /> Maria Teresa Hernandez Lopez
        </h3>
      </motion.div>

      {/* Bloque de los Padrinos */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <p className="text-xs md:text-sm text-slate-500 uppercase tracking-[0.3em] mb-6">
          Mis padrinos
        </p>
        <h3 className="text-4xl md:text-5xl font-serif text-lila-principal leading-relaxed">
          Jose Alfredo <br /> <span className="text-2xl text-lila-claro">&</span> <br /> Maria Guadalupe 
        </h3>
      </motion.div>

    </section>
  );
}