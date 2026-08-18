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
    <section className="h-screen w-screen flex flex-col justify-center items-center snap-start p-5 bg-white relative">
      
      <motion.h2
        className="text-4xl md:text-5xl font-serif text-lila-principal mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        La Recepción
      </motion.h2>

      <motion.div 
        className="bg-white rounded-3xl shadow-xl overflow-hidden w-full max-w-sm border border-lila-claro/30"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="w-full h-56 relative bg-gray-100">
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
        </div>

        <div className="p-6 flex flex-col items-center text-center">
          <h3 className="text-2xl font-serif text-lila-texto mb-2">Local Castulo</h3>
          <p className="text-lila-principal font-semibold text-lg mb-6">7:30 PM</p>
          
          <a 
            // poner link del maps del local 
            href="https://maps.app.goo.gl/LyULR4P38L129Sde9" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full bg-lila-principal hover:bg-lila-texto text-white py-3 rounded-full flex items-center justify-center gap-2 transition-colors duration-300 shadow-md"
          >
            <MapPin size={20} />
            Ver en el mapa
          </a>
        </div>
      </motion.div>

    </section>
  );
}