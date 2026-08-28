import { motion } from 'framer-motion';

export default function Mensaje() {
  const BASE = import.meta.env.BASE_URL;

  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center snap-start px-6 sm:px-10 md:px-16 py-12 bg-rosa-fondo relative overflow-hidden select-none text-center">
      
      {/* IMAGEN DE FONDO (Flores y mariposas de acuarela) */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${BASE}fondos/fondo-mensaje.jpeg')`,
        }}
      />

      {/* Halo de luz central sutil para garantizar contraste y legibilidad prístina */}
      <div className="absolute inset-0 bg-radial from-white/60 via-white/20 to-transparent pointer-events-none" />

      {/* Contenedor central del mensaje con protección de márgenes para no solapar las flores */}
      <div className="relative z-10 max-w-lg sm:max-w-xl md:max-w-2xl px-4 py-8 flex flex-col items-center justify-center">
        
        {/* Comilla ornamental superior */}
        <motion.span
          className="text-4xl sm:text-5xl text-dorado-principal font-serif leading-none mb-3 opacity-90"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.9, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          “
        </motion.span>

        {/* Texto principal poético */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="my-2"
        >
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic text-texto-principal leading-[1.6] sm:leading-[1.65] text-center drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">
            Hay momentos en la vida que son especiales por sí solos, pero compartirlos con las personas que más quieres los hace inolvidables.
          </p>
        </motion.div>

        {/* Comilla ornamental inferior */}
        <motion.span
          className="text-4xl sm:text-5xl text-dorado-principal font-serif leading-none mt-2 opacity-90"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.9, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          ”
        </motion.span>

        {/* Divisor ornamental sutil */}
        <motion.div
          className="flex items-center justify-center gap-3 mt-4 opacity-85 w-full"
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 0.85, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <span className="w-12 sm:w-20 h-px bg-dorado-principal/60" />
          <span className="text-dorado-principal text-sm sm:text-base">✦</span>
          <span className="w-12 sm:w-20 h-px bg-dorado-principal/60" />
        </motion.div>

      </div>

    </section>
  );
}