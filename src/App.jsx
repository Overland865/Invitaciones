import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import Revelacion from './components/Revelacion';
import Mensaje from './components/Mensaje';
import Recordatorio from './components/Recordatorio';
import Familia from './components/Familia';
import Vestimenta from './components/Vestimenta';
import Ceremonia from './components/Ceremonia';
import Recepcion from './components/Recepcion';
import Galeria from './components/Galeria';
import Rsvp from './components/Rsvp';

function App() {
  const [ingresado, setIngresado] = useState(false);

  return (
    <main className="relative bg-rosa-fondo min-h-screen w-full">
      <AnimatePresence>
        {!ingresado ? (
          <motion.div
            key="portada"
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-rosa-fondo overflow-y-auto"
          >
            <Hero onEntrar={() => setIngresado(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="contenido"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full"
          >
            {/* VISTA 2 */}
            <Revelacion />
            
            {/* VISTA 3 */}
            <Mensaje />

            {/* VISTA 4 */}
            <Recordatorio />

            {/* VISTA 5 */}
            <Familia />

            {/* VISTA 6 */}
            <Vestimenta />

            {/* VISTA 7 */}
            <Ceremonia />

            {/* VISTA 8 */}
            <Recepcion />

            {/* VISTA 9 */}
            <Galeria />
            
            {/* VISTA 10 */}
            <Rsvp />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;