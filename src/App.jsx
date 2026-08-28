import { useState, useEffect } from 'react';
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
import ReproductorMusica from './components/ReproductorMusica';

// Lista de todas las imágenes para precarga inmediata en memoria
const TODAS_LAS_FOTOS = [
  'fondos/fondo-hero.jpeg',
  'fondos/fondo-mensaje.jpeg',
  'fondos/fondo-recordatorio.jpeg',
  'fondos/fondo-familia.jpeg',
  'fondos/fondo-general.jpeg',
  'fotos_principal/foto-1-principal.jpeg',
  'fotos_principal/foto-2-principal.jpeg',
  'fotos_principal/foto-3-principal.jpeg',
  'fotos_principal/foto-4-principal.jpeg',
  'fotos_principal/foto-5-principal.jpeg',
  'fotos_galeria/foto-1-galeria.jpeg',
  'fotos_galeria/foto-2-galeria.jpeg',
  'fotos_galeria/foto-3-galeria.jpeg',
  'fotos_ceremonia/foto-1-iglesia.jpeg',
  'fotos_ceremonia/foto-2-iglesia.jpeg',
  'fotos_local/foto-1-local.jpeg',
  'fotos_local/foto-2-local.jpeg'
];

function obtenerParametrosURL() {
  const url = window.location.href;
  const searchIndex = url.indexOf('?');
  
  if (searchIndex === -1) {
    // Sin parámetros en la URL -> Vista principal: Panel de Administración
    return { esInvitado: false, nombre: '', pases: 2 };
  }

  const queryString = url.slice(searchIndex);
  const params = new URLSearchParams(queryString);

  const invitadoParam = params.get('invitado');
  const pasesRaw = params.get('pases');

  // Si tiene parámetro 'invitado' válido, muestra la invitación
  if (invitadoParam && invitadoParam.trim() !== '') {
    return {
      esInvitado: true,
      nombre: decodeURIComponent(invitadoParam.trim()),
      pases: pasesRaw ? Math.max(1, parseInt(pasesRaw)) : 2
    };
  }

  // Si no hay parámetro de invitado (o está vacío), muestra el Panel de Administración
  return {
    esInvitado: false,
    nombre: '',
    pases: 2
  };
}

function App() {
  const [ingresado, setIngresado] = useState(false);
  const [config] = useState(() => obtenerParametrosURL());

  // Precargar todas las imágenes en segundo plano desde el primer instante
  useEffect(() => {
    const base = import.meta.env.BASE_URL;
    TODAS_LAS_FOTOS.forEach((rutaRelativa) => {
      const img = new Image();
      img.src = `${base}${rutaRelativa}`;
    });
  }, []);

  // Vista Principal por defecto: Panel de Administrador
  if (!config.esInvitado) {
    return <AdminPanel />;
  }

  // Vista de la Invitación (cuando un invitado abre su enlace personalizado)
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
            <ReproductorMusica autoPlay={true} audioSrc="musica.mp3" />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;