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
import AdminPanel from './components/AdminPanel';

function obtenerParametrosURL() {
  const url = window.location.href;
  const searchIndex = url.indexOf('?');
  
  if (searchIndex === -1) {
    return { esAdmin: false, nombre: 'Invitado Especial', pases: 2 };
  }

  const queryString = url.slice(searchIndex);
  const params = new URLSearchParams(queryString);

  const esAdmin = params.get('admin') === 'true';
  const nombreRaw = params.get('invitado');
  const pasesRaw = params.get('pases');

  return {
    esAdmin,
    nombre: nombreRaw ? decodeURIComponent(nombreRaw) : 'Invitado Especial',
    pases: pasesRaw ? Math.max(1, parseInt(pasesRaw)) : 2
  };
}

function App() {
  const [ingresado, setIngresado] = useState(false);
  const [config] = useState(() => obtenerParametrosURL());

  // Si entra el organizador
  if (config.esAdmin) {
    return <AdminPanel />;
  }

  // Si entra el invitado
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
            <Revelacion />
            <Mensaje />
            <Recordatorio />
            <Familia />
            <Vestimenta />
            <Ceremonia />
            <Recepcion />
            <Galeria />
            <Rsvp invitado={{ nombre: config.nombre, pases: config.pases }} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;