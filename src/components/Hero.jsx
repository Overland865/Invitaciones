import { motion } from 'framer-motion';
import Contador from './Contador';

export default function Hero({ onEntrar }) {
  const BASE = import.meta.env.BASE_URL;

  return (
    <section 
      onClick={onEntrar}
      className="h-[100dvh] w-screen flex flex-col justify-between items-center relative overflow-hidden px-4 pt-8 pb-10 sm:pb-12 select-none bg-[#f7ebe8] cursor-pointer"
    >
      
      {/* IMAGEN DE FONDO */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${BASE}fondos/fondo-hero.jpeg')`,
        }}
      />

      {/* Gradiente de luz muy suave */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-black/10 pointer-events-none" />

      {/* 1. SECCIÓN SUPERIOR: Nombre de la Quinceañera ubicado BIEN ABAJO de 'Mis 15 Años' */}
      <div className="w-full pt-[36vh] sm:pt-[38vh] z-10 flex flex-col items-center justify-center text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-rosa-principal font-bold tracking-wide drop-shadow-[0_2px_12px_rgba(255,255,255,0.98)] text-center px-4">
            Rosario Yoselin
          </h1>
          <div className="flex items-center gap-2.5 mt-2 opacity-85">
            <span className="w-10 sm:w-16 h-px bg-dorado-principal/70" />
            <span className="text-dorado-principal text-sm">✦</span>
            <span className="w-10 sm:w-16 h-px bg-dorado-principal/70" />
          </div>
        </motion.div>
      </div>

      {/* 2. SECCIÓN INFERIOR: Botón cápsula resaltado 'Toca para abrir' + Contador elevado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="w-full max-w-xs sm:max-w-sm z-10 flex flex-col items-center gap-3 pb-4 sm:pb-6"
      >
        {/* Cápsula elegante y visible que invita a interactuar */}
        <motion.div
          animate={{ 
            scale: [1, 1.03, 1],
            boxShadow: [
              '0 4px 14px rgba(197, 160, 89, 0.2)',
              '0 6px 20px rgba(197, 160, 89, 0.45)',
              '0 4px 14px rgba(197, 160, 89, 0.2)'
            ]
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="bg-white/90 backdrop-blur-md px-5 py-2 rounded-full border border-dorado-claro/90 shadow-md flex items-center gap-2 cursor-pointer"
        >
          <span className="text-dorado-principal text-xs">✦</span>
          <span className="text-xs sm:text-sm font-sans tracking-[0.25em] text-rosa-principal font-bold uppercase drop-shadow-xs">
            Toca para abrir
          </span>
          <span className="text-dorado-principal text-xs">✦</span>
        </motion.div>

        {/* Contador */}
        <Contador />
      </motion.div>

    </section>
  );
}