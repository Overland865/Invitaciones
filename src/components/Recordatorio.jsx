import { motion } from 'framer-motion';
import Contador from './Contador';

export default function Recordatorio() {
  const BASE = import.meta.env.BASE_URL;

  return (
    <section className="h-screen w-screen flex flex-col justify-between items-center snap-start px-6 pt-24 sm:pt-28 pb-10 sm:pb-14 bg-[#f7ebe8] relative overflow-hidden select-none text-center">
      
      {/* IMAGEN DE FONDO (Corona arriba, Quinceañera abajo a la izquierda) */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${BASE}fondos/fondo-recordatorio.jpeg')`,
        }}
      />

      {/* Gradiente sutil para enriquecer el ambiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-black/5 pointer-events-none" />

      {/* 1. SECCIÓN SUPERIOR: Margen respetando la Corona */}
      <div className="w-full pt-10 sm:pt-14 z-10">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <span className="text-xs sm:text-sm text-dorado-oscuro font-bold uppercase tracking-[0.35em] drop-shadow-sm">
            ✦ Cuenta Regresiva ✦
          </span>
        </motion.div>
      </div>

      {/* 2. SECCIÓN MEDIA: Faltan + Contador (SIN RECUADRO BLANCO) */}
      <motion.div
        className="flex flex-col justify-center items-center text-center z-10 w-full max-w-sm my-auto px-2"
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-rosa-principal mb-4 tracking-wide font-bold drop-shadow-[0_2px_8px_rgba(255,255,255,0.95)]">
          Faltan
        </h2>

        {/* Contador directamente integrado sin contenedor blanco */}
        <Contador />
      </motion.div>

      {/* 3. SECCIÓN INFERIOR: Fecha Oficial (SIN RECUADRO BLANCO) */}
      <motion.div
        className="w-full max-w-xs sm:max-w-sm text-center z-10 pb-2 sm:pb-4 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="flex flex-col items-center drop-shadow-[0_2px_8px_rgba(255,255,255,0.95)]">
          <span className="font-serif text-xs sm:text-sm text-rosa-principal uppercase tracking-[0.35em] font-bold block mb-1">
            El Gran Día
          </span>
          
          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-dorado-oscuro font-bold tracking-wide">
            Sábado, 03 de Octubre de 2026
          </p>

          <div className="flex items-center gap-2 mt-1.5 opacity-80">
            <span className="w-8 h-px bg-dorado-principal/60" />
            <span className="text-dorado-principal text-xs">✦</span>
            <span className="w-8 h-px bg-dorado-principal/60" />
          </div>
        </div>
      </motion.div>

    </section>
  );
}