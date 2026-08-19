import { motion } from 'framer-motion';

export default function Mensaje() {
  return (
    <section className="h-screen w-screen flex justify-center items-center snap-start p-8 md:p-16 bg-rosa-fondo relative overflow-hidden">

      {/* Comillas decorativas gigantes en el fondo con tono dorado suave */}
      <motion.span
        className="absolute top-10 left-4 md:left-20 text-[12rem] text-dorado-claro opacity-40 font-serif select-none pointer-events-none"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 0.4, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        "
      </motion.span>

      {/* Texto principal */}
      <motion.p
        className="text-3xl md:text-5xl font-serif italic text-texto-principal leading-relaxed text-center z-10 max-w-4xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2 }}
      >
        Hay momentos en la vida que son especiales por si solos, pero compartirlos con las personas que más quieres los hace inolvidables
      </motion.p>

    </section>
  );
}