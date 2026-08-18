import { motion } from 'framer-motion';
import Contador from './Contador';

export default function Hero({ onEntrar }) {
  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center relative overflow-hidden p-5">
      
      <motion.h1 
        className="text-5xl md:text-6xl font-serif text-lila-principal font-semibold mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Mis XV Años
      </motion.h1>

      <motion.div 
        className="flex justify-center items-center h-48 mb-6 cursor-pointer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onEntrar}
      >
        {/* Placeholder del 3D */}
        <div className="font-serif text-[8rem] font-semibold text-lila-principal drop-shadow-brillo animate-[bounce_4s_infinite]">
          15
        </div>
      </motion.div>

      {/* Aquí entra el Contador con su propia animación */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <Contador />
      </motion.div>


    </section>
  );
}