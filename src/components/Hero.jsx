import { motion } from 'framer-motion';
import Contador from './Contador';

export default function Hero({ onEntrar }) {
  const BASE = import.meta.env.BASE_URL;

  return (
    <section 
      onClick={onEntrar}
      className="h-screen w-screen flex flex-col justify-between items-center relative overflow-hidden px-4 pt-10 pb-6 select-none bg-[#f7ebe8] cursor-pointer"
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
      <div className="w-full pt-[38vh] sm:pt-[40vh] z-10 flex flex-col items-center justify-center text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-rosa-principal font-bold tracking-wide drop-shadow-[0_2px_12px_rgba(255,255,255,0.98)] text-center px-4">
            Yoselin García
          </h1>
          <div className="flex items-center gap-2.5 mt-2 opacity-85">
            <span className="w-10 sm:w-16 h-px bg-dorado-principal/70" />
            <span className="text-dorado-principal text-sm">✦</span>
            <span className="w-10 sm:w-16 h-px bg-dorado-principal/70" />
          </div>
        </motion.div>
      </div>

      {/* 2. SECCIÓN INFERIOR: Texto 'Toca para abrir' (SIN RESALTADO BLANCO) + Contador */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="w-full max-w-xs sm:max-w-sm z-10 flex flex-col items-center gap-2 pb-2 sm:pb-4"
      >
        {/* Texto de llamada a la acción limpio y elegante */}
        <motion.p
          animate={{ opacity: [0.75, 1, 0.75], scale: [0.98, 1.02, 0.98] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-xs sm:text-sm font-sans tracking-[0.3em] text-rosa-principal font-bold uppercase drop-shadow-[0_1px_6px_rgba(255,255,255,0.95)]"
        >
          ✦ Toca para abrir ✦
        </motion.p>

        {/* Contador sin recuadro contenedor */}
        <Contador />
      </motion.div>

    </section>
  );
}