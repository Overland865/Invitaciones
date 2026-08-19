import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, X, ArrowLeft } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function Rsvp() {
  // 'null' = vista inicial | 'si' = formulario de asistencia | 'no' = formulario de ausencia
  const [opcion, setOpcion] = useState(null); 
  const [nombre, setNombre] = useState('');
  const [pases, setPases] = useState('');
  const [cargando, setCargando] = useState(false);

  // Bloquea el scroll general de la página mientras se llena el formulario para no salir de esta vista
  useEffect(() => {
    if (opcion !== null) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [opcion]);

  // El número se integra directo para preparar el enlace
  const numeroWhatsApp = "529993188334"; 

  const enviarWhatsApp = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      // 1. GUARDAR EN SUPABASE
      const { error } = await supabase
        .from('rsvps')
        .insert([
          { 
            nombre_familia: nombre, 
            pases_confirmados: opcion === 'si' ? parseInt(pases) : 0, 
            asistira: opcion === 'si' 
          }
        ]);
        
      if (error) throw error;

      // 2. ARMAR EL TEXTO DEPENDIENDO DE LA OPCIÓN
      let textoWa = '';
      if (opcion === 'si') {
        textoWa = `Buen día, Confirmo mi asistencia a los XV años.\n\n- Nombre: *${nombre}*\n- Pases a utilizar: *${pases}*`;
      } else {
        textoWa = `Buen día, Soy *${nombre}*. Lamentablemente no podré asistir a los XV años, pero les agradezco mucho la invitación y les deseo lo mejor.`;
      }

      // 3. ENVIAR A WHATSAPP
      const urlWa = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoWa)}`;
      window.open(urlWa, '_blank');

      // Limpiar el formulario y regresar a la vista inicial
      setNombre('');
      setPases('');
      setOpcion(null);

    } catch (error) {
      console.error("Error guardando en Supabase:", error);
      alert("Hubo un error de red, pero te enviaremos a WhatsApp para avisar.");
      
      const textoWa = opcion === 'si' 
        ? `¡Hola! Soy ${nombre}. Intenté confirmar por la web pero falló. Necesito ${pases} pases.`
        : `¡Hola! Soy ${nombre}. Intenté avisar por la web que no podré asistir. ¡Un abrazo!`;
      window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoWa)}`, '_blank');
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      {/* VISTA ESTÁNDAR (Selección inicial completa y majestuosa) */}
      <section className="h-screen w-screen flex flex-col justify-between items-center snap-start px-6 py-10 sm:py-12 bg-rosa-fondo relative overflow-hidden select-none">
        
        {/* Aura luminosa de fondo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-dorado-principal/10 blur-3xl pointer-events-none" />

        {/* 1. SECCIÓN SUPERIOR: Emblema MIS 15 AÑOS Protagónico */}
        <motion.div 
          className="flex-1 flex flex-col justify-center items-center text-center z-10"
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-serif text-xl sm:text-2xl text-rosa-principal tracking-[0.35em] uppercase font-light pl-1.5">
            Mis
          </span>
          <div className="font-serif text-7xl sm:text-8xl md:text-9xl font-bold text-dorado-principal drop-shadow-brillo leading-none my-1.5 animate-[bounce_5s_infinite]">
            15
          </div>
          <span className="font-serif text-xl sm:text-2xl text-rosa-principal tracking-[0.35em] uppercase font-light pl-1.5">
            Años
          </span>

          {/* Ornamento divisor dorado */}
          <div className="flex items-center gap-3 mt-3 opacity-75">
            <span className="w-10 h-px bg-dorado-principal/40" />
            <span className="text-dorado-principal text-xs">✦</span>
            <span className="w-10 h-px bg-dorado-principal/40" />
          </div>
        </motion.div>

        {/* 2. SECCIÓN MEDIA: Título y Mensaje Cálido */}
        <motion.div
          className="flex-1 flex flex-col justify-center items-center text-center max-w-xs sm:max-w-sm z-10 px-2"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="font-serif text-rosa-principal text-3xl sm:text-4xl md:text-5xl mb-2.5 leading-tight">
            Confirma tu Asistencia
          </h2>
          <p className="text-xs sm:text-sm text-texto-suave leading-relaxed font-light">
            Será un honor y una gran alegría compartir este momento tan especial contigo.
          </p>
        </motion.div>

        {/* 3. SECCIÓN INFERIOR: Botones Directos Sin Marco de Tarjeta */}
        <motion.div 
          className="flex-1 flex flex-col justify-center items-center w-full max-w-xs sm:max-w-sm gap-3.5 z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button 
            onClick={() => setOpcion('si')}
            className="w-full bg-rosa-principal hover:bg-rosa-oscuro text-white font-medium py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-rosa-principal/25 hover:shadow-xl active:scale-98 text-base border border-dorado-claro/60"
          >
            <Check size={20} className="text-dorado-claro shrink-0" />
            <span className="font-medium tracking-wide">¡Sí, ahí estaré!</span>
          </button>
          
          <button 
            onClick={() => setOpcion('no')}
            className="w-full bg-white/90 hover:bg-white text-texto-principal border-2 border-dorado-claro/90 font-medium py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-sm active:scale-98 text-base"
          >
            <X size={20} className="text-red-400 shrink-0" />
            <span className="font-medium tracking-wide">No podré asistir</span>
          </button>
        </motion.div>

      </section>

      {/* VISTA BLOQUEADA DEL FORMULARIO: No permite salirse hacia arriba ni hacia abajo */}
      <AnimatePresence>
        {opcion !== null && (
          <motion.div
            key="formulario-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-rosa-fondo/98 backdrop-blur-md overflow-y-auto px-4 py-8 flex flex-col items-center justify-start sm:justify-center"
            style={{ overscrollBehavior: 'contain' }}
          >
            <motion.h2
              className="font-serif text-rosa-principal text-center text-2xl md:text-3xl mb-4 mt-2 sm:mt-0"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {opcion === 'si' ? '¡Confirmar Asistencia!' : 'Avisar Ausencia'}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-rosa-fondo p-5 rounded-3xl shadow-xl border border-dorado-claro/80 flex flex-col mb-16"
            >
              <form onSubmit={enviarWhatsApp} className="flex flex-col">
                <button 
                  type="button" 
                  onClick={() => setOpcion(null)}
                  className="text-xs text-rosa-principal font-medium flex items-center gap-1 mb-3 hover:underline w-fit"
                >
                  <ArrowLeft size={14} /> Volver a opciones
                </button>

                <div className="mb-3">
                  <input 
                    type="text" 
                    required
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu Nombre o Familia" 
                    className="w-full py-3 px-3.5 rounded-xl border border-dorado-claro focus:outline-none focus:ring-2 focus:ring-rosa-principal bg-white text-texto-principal placeholder:text-gray-400 text-sm md:text-base"
                  />
                </div>

                {opcion === 'si' && (
                  <div className="mb-4">
                    <input 
                      type="number" 
                      required
                      min="1"
                      value={pases}
                      onChange={(e) => setPases(e.target.value)}
                      placeholder="Número de pases a utilizar" 
                      className="w-full py-3 px-3.5 rounded-xl border border-dorado-claro focus:outline-none focus:ring-2 focus:ring-rosa-principal bg-white text-texto-principal placeholder:text-gray-400 text-sm md:text-base"
                    />
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={cargando}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md disabled:opacity-70 mt-1 active:scale-98 text-sm md:text-base"
                >
                  {cargando ? 'Procesando...' : (
                    <>
                      <Send size={18} />
                      {opcion === 'si' ? 'Confirmar Asistencia' : 'Avisar por WhatsApp'}
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}