import { motion } from 'framer-motion';

export default function Galeria() {
  // Fotografías oficiales temáticas de XV Años (guardadas en public/galeria/)
  const fotos = [
    // 1. Zapatillas de cristal, tiara y detalles
    "/galeria/foto1_zapatillas.jpg",
    
    // 2. Sesión en jardín con vestido lila de princesa
    "/galeria/foto2_vestido.jpg",
    
    // 3. Pastel monumental de XV Años con número 15
    "/galeria/foto3_pastel.jpg",
    
    // 4. El vals de quinceañera en la pista con humo y luces
    "/galeria/foto4_vals.jpg",
    
    // 5. Retrato formal con ramo y corona de quinceañera
    "/galeria/foto5_retrato.jpg"
  ];

  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center snap-start bg-lila-fondo relative">
      
      <motion.h2
        className="text-4xl md:text-5xl font-serif text-lila-principal mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        Nuestros Momentos
      </motion.h2>

      {/* Contenedor del Carrusel Horizontal */}
      <motion.div 
        className="w-full flex overflow-x-auto snap-x snap-mandatory gap-6 px-10 pb-8 pt-4 hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Oculta la barra en Firefox e IE
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {/* Estilo extra para ocultar la barra de scroll en Chrome/Safari y que se vea limpio */}
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>

        {/* Generamos una tarjeta por cada foto */}
        {fotos.map((foto, index) => (
          <div 
            key={index} 
            className="snap-center shrink-0 bg-white p-4 rounded-[2rem] shadow-2xl border border-lila-claro/40"
          >
            <img 
              src={foto} 
              alt={`Momento ${index + 1}`} 
              // AQUI ES EL CAMBIO PRINCIPAL: Aumentamos el ancho (w) y alto (h)
              className="w-72 h-[26rem] md:w-80 md:h-[30rem] object-cover rounded-2xl"
            />
          </div>
        ))}
      </motion.div>

      {/* Indicador visual para que sepan que pueden deslizar */}
      <motion.div
        className="text-sm text-lila-principal opacity-60 uppercase tracking-widest mt-2 flex items-center gap-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <span className="animate-pulse">←</span> 
        Desliza 
        <span className="animate-pulse">→</span>
      </motion.div>

    </section>
  );
}