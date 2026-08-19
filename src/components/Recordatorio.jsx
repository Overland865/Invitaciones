import { motion } from 'framer-motion';
import Contador from './Contador';

export default function Recordatorio() {
  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center snap-start p-5 bg-white relative">
      
      <motion.h2
        className="text-4xl md:text-5xl font-serif text-rosa-principal mb-10 text-center tracking-wide"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1 }}
      >
        Faltan:
      </motion.h2>

      {/* Reutilizamos el componente del contador y lo animamos con un ligero zoom */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <Contador />
      </motion.div>

    </section>
  );
}