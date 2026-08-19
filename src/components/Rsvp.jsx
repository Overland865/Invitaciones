import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, X, ArrowLeft } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function Rsvp({ invitado = { nombre: 'Invitado Especial', pases: 2 } }) {
  const [opcion, setOpcion] = useState(null);
  const [pasesSeleccionados, setPasesSeleccionados] = useState(invitado.pases || 1);
  const [cargando, setCargando] = useState(false);

  // Mantener sincronizado el selector con los pases del invitado
  useEffect(() => {
    if (invitado && invitado.pases) {
      setPasesSeleccionados(invitado.pases);
    }
  }, [invitado]);

  // Bloquea el scroll general mientras el modal del formulario está activo
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

  const numeroWhatsApp = "529993188334";

  const enviarWhatsApp = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      const cantidadFinal = opcion === 'si' ? parseInt(pasesSeleccionados) : 0;
      const estadoNuevo = opcion === 'si' ? 'confirmado' : 'rechazado';

      // 1. ACTUALIZAR O INSERTAR EN SUPABASE
      const { data: existente } = await supabase
        .from('rsvps')
        .select('id')
        .eq('nombre_familia', invitado.nombre)
        .limit(1);

      if (existente && existente.length > 0) {
        await supabase
          .from('rsvps')
          .update({
            pases_confirmados: cantidadFinal,
            estado: estadoNuevo
          })
          .eq('id', existente[0].id);
      } else {
        await supabase
          .from('rsvps')
          .insert([
            {
              nombre_familia: invitado.nombre,
              pases_asignados: invitado.pases,
              pases_confirmados: cantidadFinal,
              estado: estadoNuevo
            }
          ]);
      }

      // 2. ARMAR EL TEXTO PARA WHATSAPP
      let textoWa = '';
      if (opcion === 'si') {
        textoWa = `Buen día, Confirmo mi asistencia a los XV años.\n\n- Nombre: *${invitado.nombre}*\n- Pases a utilizar: *${cantidadFinal} de ${invitado.pases} asignados*`;
      } else {
        textoWa = `Buen día, Soy *${invitado.nombre}*. Lamentablemente no podré asistir a los XV años, pero les agradezco mucho la invitación y les deseo lo mejor.`;
      }

      // 3. ENVIAR A WHATSAPP
      const urlWa = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoWa)}`;
      window.open(urlWa, '_blank');

      setOpcion(null);

    } catch (error) {
      console.error("Error guardando en Supabase:", error);
      alert("Hubo un error de red, pero te enviaremos a WhatsApp para avisar.");

      const cantidadFinal = opcion === 'si' ? parseInt(pasesSeleccionados) : 0;
      const textoWa = opcion === 'si'
        ? `¡Hola! Soy ${invitado.nombre}. Intenté confirmar por la web pero falló. Confirmamos ${cantidadFinal} lugares.`
        : `¡Hola! Soy ${invitado.nombre}. Intenté avisar por la web que no podré asistir. ¡Un abrazo!`;
      window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoWa)}`, '_blank');
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      {/* VISTA PRINCIPAL */}
      <section className="h-screen w-screen flex flex-col justify-between items-center snap-start px-6 py-10 sm:py-12 bg-rosa-fondo relative overflow-hidden select-none">

        {/* FONDO ANIMADO ESTILO 9: Halo Dorado Sutil y Micro-Destellos */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
          {/* Halo central suave pulsante */}
          <motion.div
            className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-dorado-principal/15 blur-3xl"
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.25, 0.5, 0.25],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Aro fino y elegante que respira suavemente */}
          <motion.div
            className="absolute w-64 sm:w-80 h-64 sm:h-80 rounded-full border border-dorado-principal/30 shadow-[0_0_15px_rgba(197,160,89,0.2)]"
            animate={{
              scale: [0.92, 1.08, 0.92],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Micro destellos dorados */}
          {[
            { top: '15%', left: '15%', delay: 0 },
            { top: '25%', right: '18%', delay: 1.5 },
            { bottom: '28%', left: '12%', delay: 0.8 },
            { bottom: '15%', right: '16%', delay: 2.2 },
          ].map((d, i) => (
            <motion.span
              key={i}
              className="absolute text-dorado-principal text-base drop-shadow-[0_0_6px_rgba(197,160,89,0.7)]"
              style={{ top: d.top, bottom: d.bottom, left: d.left, right: d.right }}
              animate={{
                opacity: [0.2, 0.85, 0.2],
                scale: [0.7, 1.25, 0.7],
              }}
              transition={{
                duration: 3.5,
                delay: d.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ✦
            </motion.span>
          ))}
        </div>

        {/* 1. SECCIÓN SUPERIOR: Emblema */}
        <motion.div
          className="flex-1 flex flex-col justify-center items-center text-center z-10"
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
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

          <div className="flex items-center gap-3 mt-3 opacity-75">
            <span className="w-10 h-px bg-dorado-principal/40" />
            <span className="text-dorado-principal text-xs">✦</span>
            <span className="w-10 h-px bg-dorado-principal/40" />
          </div>
        </motion.div>

        {/* 2. SECCIÓN MEDIA: Título */}
        <motion.div
          className="flex-1 flex flex-col justify-center items-center text-center max-w-xs sm:max-w-sm z-10 px-2"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="font-serif text-rosa-principal text-3xl sm:text-4xl md:text-5xl mb-2.5 leading-tight">
            Confirma tu Asistencia
          </h2>
          <p className="text-xs sm:text-sm text-texto-suave leading-relaxed font-light">
            Será un honor y una gran alegría compartir este momento tan especial contigo.
          </p>
        </motion.div>

        {/* 3. SECCIÓN INFERIOR: Botones */}
        <motion.div
          className="flex-1 flex flex-col justify-center items-center w-full max-w-xs sm:max-w-sm gap-3.5 z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.3 }}
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

      {/* VISTA MODAL */}
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
                  className="text-xs text-rosa-principal font-medium flex items-center gap-1 mb-4 hover:underline w-fit"
                >
                  <ArrowLeft size={14} /> Volver a opciones
                </button>

                {/* Tarjeta con el Nombre Extraído del Enlace */}
                <div className="mb-4 bg-white/80 p-3.5 rounded-xl border border-dorado-claro text-center">
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-0.5">Invitación para</p>
                  <p className="font-semibold text-texto-principal text-base">{invitado.nombre}</p>
                </div>

                {opcion === 'si' && (
                  <div className="mb-4 text-left">
                    <label className="block text-xs text-texto-suave uppercase tracking-wider mb-1.5 font-medium">
                      Pases asignados: <strong className="text-rosa-principal">{invitado.pases}</strong>
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max={invitado.pases}
                      value={pasesSeleccionados}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '') {
                          setPasesSeleccionados('');
                          return;
                        }
                        const num = parseInt(val, 10);
                        // Evita que exceda los pases asignados o sea menor a 1
                        if (num > invitado.pases) {
                          setPasesSeleccionados(invitado.pases);
                        } else if (num < 1) {
                          setPasesSeleccionados(1);
                        } else {
                          setPasesSeleccionados(num);
                        }
                      }}
                      placeholder={`¿Cuántos usarán? (Máx. ${invitado.pases})`}
                      className="w-full py-3 px-3.5 rounded-xl border border-dorado-claro focus:outline-none focus:ring-2 focus:ring-rosa-principal bg-white text-texto-principal text-sm md:text-base placeholder:text-gray-400"
                    />
                    <p className="text-[11px] text-gray-400 mt-1">
                      Escribe la cantidad de personas que asistirán (1 a {invitado.pases}).
                    </p>
                  </div>
                )}

                {opcion === 'no' && (
                  <p className="text-texto-suave mb-4 text-xs md:text-sm text-center leading-relaxed">
                    Lamentamos que <strong className="text-rosa-principal">{invitado.nombre}</strong> no pueda acompañarnos. Envía tu mensaje para avisar a la quinceañera.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={cargando}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md disabled:opacity-70 mt-1 active:scale-98 text-sm md:text-base"
                >
                  {cargando ? 'Procesando...' : (
                    <>
                      <Send size={18} />
                      {opcion === 'si' ? 'Confirmar por WhatsApp' : 'Avisar por WhatsApp'}
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