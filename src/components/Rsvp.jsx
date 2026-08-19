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
        
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-dorado-principal/10 blur-3xl pointer-events-none" />

        {/* 1. SECCIÓN SUPERIOR: Emblema */}
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

        {/* 3. SECCIÓN INFERIOR: Botones */}
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

      {/* VISTA MODAL */}
      <AnimatePresence>
        {opcion !== null && (
          <motion.div
            key="formulario-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-texto-principal/40 backdrop-blur-md overflow-y-auto p-4 flex items-center justify-center"
            style={{ overscrollBehavior: 'contain' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              className="w-full max-w-sm bg-white/95 backdrop-blur-xl p-6 sm:p-7 rounded-[2rem] shadow-2xl border border-dorado-claro/80 flex flex-col relative overflow-hidden my-auto"
            >
              {/* Resplandor decorativo dorado de fondo */}
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-dorado-principal/15 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-rosa-principal/15 rounded-full blur-2xl pointer-events-none" />

              {/* Botón Volver */}
              <button 
                type="button" 
                onClick={() => setOpcion(null)}
                className="text-xs text-rosa-principal hover:text-rosa-oscuro font-medium flex items-center gap-1.5 mb-3 transition-colors w-fit group"
              >
                <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
                <span>Volver a opciones</span>
              </button>

              {/* Título del Modal */}
              <div className="text-center mb-4">
                <span className="text-dorado-principal text-xs tracking-widest uppercase font-semibold">
                  {opcion === 'si' ? '✦ Confirmación ✦' : '✦ Notificación ✦'}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-rosa-principal font-bold mt-0.5">
                  {opcion === 'si' ? '¡Será un Placer Verte!' : 'Te Extrañaremos'}
                </h2>
              </div>

              <form onSubmit={enviarWhatsApp} className="flex flex-col relative z-10">
                {/* Tarjeta de Invitado Estilo VIP */}
                <div className="mb-4 bg-gradient-to-b from-rosa-fondo/90 to-white/90 p-4 rounded-2xl border border-dorado-claro/70 text-center shadow-sm">
                  <p className="text-[10px] text-dorado-oscuro uppercase tracking-widest font-semibold mb-0.5">
                    Invitación Exclusiva Para
                  </p>
                  <p className="font-serif font-bold text-texto-principal text-lg leading-snug">
                    {invitado.nombre}
                  </p>
                </div>

                {opcion === 'si' && (
                  <div className="mb-5 flex flex-col gap-2">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-xs text-texto-suave font-medium">Pases asignados:</span>
                      <span className="text-xs font-bold text-dorado-oscuro bg-dorado-fondo px-2.5 py-0.5 rounded-full border border-dorado-claro/80">
                        {invitado.pases} {invitado.pases === 1 ? 'Lugar' : 'Lugares'}
                      </span>
                    </div>

                    {/* Selector Interactivo con Botones +/- */}
                    <div className="bg-rosa-fondo p-3.5 rounded-2xl border border-dorado-claro flex items-center justify-between shadow-inner">
                      <button
                        type="button"
                        onClick={() => setPasesSeleccionados(prev => Math.max(1, (parseInt(prev) || 1) - 1))}
                        disabled={parseInt(pasesSeleccionados) <= 1}
                        className="w-10 h-10 rounded-xl bg-white border border-dorado-claro text-dorado-principal hover:bg-rosa-principal hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-dorado-principal font-bold text-xl flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
                      >
                        -
                      </button>

                      <div className="text-center">
                        <span className="font-serif text-3xl sm:text-4xl font-bold text-dorado-principal block leading-none">
                          {pasesSeleccionados || 1}
                        </span>
                        <span className="text-[10px] text-texto-suave uppercase tracking-wider font-semibold mt-0.5 block">
                          {parseInt(pasesSeleccionados) === 1 ? 'persona asistirá' : 'personas asistirán'}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setPasesSeleccionados(prev => Math.min(invitado.pases, (parseInt(prev) || 1) + 1))}
                        disabled={parseInt(pasesSeleccionados) >= invitado.pases}
                        className="w-10 h-10 rounded-xl bg-white border border-dorado-claro text-dorado-principal hover:bg-rosa-principal hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-dorado-principal font-bold text-xl flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-[11px] text-texto-suave text-center italic mt-0.5">
                      Indica con los botones cuántos lugares confirmas.
                    </p>
                  </div>
                )}

                {opcion === 'no' && (
                  <div className="bg-rosa-fondo p-4 rounded-2xl border border-dorado-claro text-center mb-5">
                    <p className="text-texto-suave text-xs sm:text-sm leading-relaxed">
                      Lamentamos mucho que no puedas acompañarnos, pero agradecemos de corazón que nos avises con anticipación. 💕
                    </p>
                  </div>
                )}

                {/* Botón Principal con los Colores de la Invitación (Palo de Rosa + Dorado) */}
                <button 
                  type="submit" 
                  disabled={cargando}
                  className="w-full bg-rosa-principal hover:bg-rosa-oscuro text-white font-semibold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2.5 transition-all duration-300 shadow-lg shadow-rosa-principal/25 hover:shadow-xl active:scale-98 text-base border border-dorado-claro/70 disabled:opacity-70 cursor-pointer"
                >
                  {cargando ? (
                    <span className="flex items-center gap-2 text-white">Procesando...</span>
                  ) : (
                    <>
                      <Send size={18} className="text-dorado-claro shrink-0" />
                      <span className="tracking-wide">{opcion === 'si' ? 'Confirmar por WhatsApp' : 'Avisar por WhatsApp'}</span>
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