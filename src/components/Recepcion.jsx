import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function Recepcion() {
  const BASE = import.meta.env.BASE_URL;

  // Fotos desde la carpeta public/fotos_local/
  const fotos = [
    `${BASE}fotos_local/foto-1-local.jpeg`,
    `${BASE}fotos_local/foto-2-local.jpeg`
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % fotos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [fotos.length]);

  return (
    <section className="h-screen w-screen flex flex-col items-center snap-start px-5 py-4 bg-white relative overflow-hidden text-center">
      
      {/* Área Superior: El título queda perfectamente centrado entre el borde superior y la imagen */}
      <div className="flex-1 flex items-center justify-center w-full min-h-[70px]">
        <motion.h2
          className="text-4xl md:text-5xl font-serif text-rosa-principal text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          La Recepción
        </motion.h2>
      </div>

      {/* Carrusel de Fotos */}
      <motion.div
        className="w-full max-w-sm sm:max-w-md h-[18rem] sm:h-[20rem] md:h-[22rem] relative rounded-3xl overflow-hidden shadow-xl shrink-0"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={fotos[index]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Local"
          />
        </AnimatePresence>
      </motion.div>

      {/* Área Inferior: Información y Botón centrados */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm py-2">
        <motion.div
          className="w-full flex flex-col items-center gap-1"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-2xl md:text-3xl font-serif text-texto-principal">
            Local Castulo
          </h3>
          <p className="text-dorado-principal font-bold text-xl tracking-wider">
            8:00 PM
          </p>
          
          <a 
            href="https://maps.app.goo.gl/LyULR4P38L129Sde9" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full max-w-xs bg-rosa-principal hover:bg-rosa-oscuro text-white font-medium py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg active:scale-98 mt-1"
          >
            <MapPin size={20} className="text-dorado-claro" />
            Ver en el mapa
          </a>
        </motion.div>
      </div>

    </section>
  );
}