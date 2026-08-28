import { motion } from 'framer-motion';

export default function Familia() {
  const BASE = import.meta.env.BASE_URL;

  return (
    <section className="h-screen w-screen flex flex-col items-center snap-start px-4 bg-[#f7ebe8] text-center select-none relative overflow-hidden">
      
      {/* IMAGEN DE FONDO: Escalada 135% para recortar los bordes grises y llenar la pantalla */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('${BASE}fondos/fondo-familia.jpeg')`,
            transform: 'scale(1.35)',
            transformOrigin: 'center 40%',
          }}
        />
      </div>

      {/* Halo de luz central sutil para lectura nítida */}
      <div className="absolute inset-0 bg-radial from-white/50 via-white/10 to-transparent pointer-events-none" />

      {/* CONTENEDOR PRINCIPAL: Ocupa exactamente el área iluminada del pergamino (debajo de la corona y arriba de las flores/tintero) */}
      <div className="w-full max-w-md h-full z-10 px-2 pt-[30vh] sm:pt-[32vh] pb-16 sm:pb-20 flex flex-col justify-evenly items-center">
        
        {/* 1. Bloque de los Padres */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center w-full"
        >
          <p className="text-sm sm:text-base text-[#8c6224] font-bold uppercase tracking-[0.25em] mb-2.5 drop-shadow-sm">
            Con la bendición de Dios y mis padres
          </p>
          
          <div className="flex flex-col items-center justify-center w-full text-center">
            <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-[#6b1e32] font-extrabold leading-snug drop-shadow-[0_1px_5px_rgba(255,255,255,0.95)]">
              Juan Ariel García Magaña  
            </h3>

            <span className="text-base sm:text-lg font-serif text-[#b3832d] font-bold leading-none my-1">
              &
            </span>

            <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-[#6b1e32] font-extrabold leading-snug drop-shadow-[0_1px_5px_rgba(255,255,255,0.95)]">
              Gicelly del Carmen Paredes Lope
            </h3>
          </div>
        </motion.div>

        {/* Divisor Ornamental Central */}
        <motion.div 
          className="flex items-center justify-center gap-3.5 opacity-90 z-10 w-full my-1.5"
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 0.9, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <span className="w-16 sm:w-24 h-px bg-[#b3832d]/70" />
          <span className="text-[#b3832d] text-sm">✦</span>
          <span className="w-16 sm:w-24 h-px bg-[#b3832d]/70" />
        </motion.div>

        {/* 2. Bloque de los Padrinos (Centrado con holgura para no chocar con las flores inferiores) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex flex-col items-center w-full"
        >
          <p className="text-sm sm:text-base text-[#8c6224] font-bold uppercase tracking-[0.25em] mb-2.5 drop-shadow-sm">
            Mis padrinos
          </p>
          
          <div className="flex flex-col gap-2.5 sm:gap-3 w-full text-center items-center">
            {/* Padrinos 1 */}
            <div className="flex flex-col sm:flex-row items-center justify-center text-center text-lg sm:text-xl md:text-2xl font-serif text-[#6b1e32] font-extrabold leading-snug drop-shadow-[0_1px_5px_rgba(255,255,255,0.95)]">
              <span>José Alejandro Hernández Ortiz</span>
              <span className="text-base sm:text-lg font-serif text-[#b3832d] my-0.5 sm:my-0 sm:mx-2 leading-none">&</span>
              <span>Maria Abigail Paredes Lope</span>
            </div>

            {/* Padrinos 2 */}
            <div className="flex flex-col sm:flex-row items-center justify-center text-center text-lg sm:text-xl md:text-2xl font-serif text-[#6b1e32] font-extrabold leading-snug drop-shadow-[0_1px_5px_rgba(255,255,255,0.95)]">
              <span>Joel Alberto Paredes Lope</span>
              <span className="text-base sm:text-lg font-serif text-[#b3832d] my-0.5 sm:my-0 sm:mx-2 leading-none">&</span>
              <span>Lilia Myledy Che Barrera</span>
            </div>

            {/* Madrina 3 */}
            <p className="text-lg sm:text-xl md:text-2xl font-serif text-[#6b1e32] font-extrabold leading-snug drop-shadow-[0_1px_5px_rgba(255,255,255,0.95)]">
              Wilma del Rosario Magaña Martín
            </p>
          </div>
        </motion.div>

      </div>

    </section>
  );
}