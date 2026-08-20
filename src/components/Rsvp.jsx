import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, X, ArrowLeft } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function Rsvp({ invitado = { nombre: 'Invitado Especial', pases: 2 } }) {
  const [opcion, setOpcion] = useState(null);
  const [pasesSeleccionados, setPasesSeleccionados] = useState(invitado.pases || 1);
  const [cargando, setCargando] = useState(false);
  const [respuestaPrevia, setRespuestaPrevia] = useState(null);

  // Mantener sincronizado el selector con los pases del invitado
  useEffect(() => {
    if (invitado && invitado.pases) {
      setPasesSeleccionados(invitado.pases);
    }
  }, [invitado]);

  // Verificar si el invitado ya respondió anteriormente (en Supabase y en localStorage)
  useEffect(() => {
    let montado = true;

    const consultarRespuestaExistente = async () => {
      if (!invitado?.nombre) return;

      const nomLimpio = invitado.nombre.trim();
      const localKey = `rsvp_contestada_${nomLimpio.toLowerCase()}`;

      // 1. Revisar caché local inmediata
      try {
        const local = localStorage.getItem(localKey);
        if (local) {
          const parsed = JSON.parse(local);
          if (parsed && (parsed.estado === 'confirmado' || parsed.estado === 'rechazado')) {
            if (montado) setRespuestaPrevia(parsed);
          }
        }
      } catch (e) {
        console.error(e);
      }

      // 2. Revisar base de datos Supabase
      try {
        const { data, error } = await supabase
          .from('rsvps')
          .select('estado, pases_confirmados, pases_asignados')
          .eq('nombre_familia', nomLimpio)
          .limit(1);

        if (!error && data && data.length > 0) {
          const reg = data[0];
          if (reg.estado === 'confirmado' || reg.estado === 'rechazado') {
            if (montado) {
              setRespuestaPrevia(reg);
              localStorage.setItem(localKey, JSON.stringify(reg));
            }
          }
        }
      } catch (err) {
        console.error('Error al consultar estado de confirmación:', err);
      }
    };

    consultarRespuestaExistente();

    return () => {
      montado = false;
    };
  }, [invitado?.nombre]);

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
      const nomLimpio = invitado.nombre.trim();

      // 1. ACTUALIZAR O INSERTAR EN SUPABASE
      const { data: existente } = await supabase
        .from('rsvps')
        .select('id')
        .eq('nombre_familia', nomLimpio)
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
              nombre_familia: nomLimpio,
              pases_asignados: invitado.pases,
              pases_confirmados: cantidadFinal,
              estado: estadoNuevo
            }
          ]);
      }

      // 2. Guardar estado local para que no pueda volver a responder
      const infoRegistrada = {
        estado: estadoNuevo,
        pases_confirmados: cantidadFinal,
        pases_asignados: invitado.pases
      };
      setRespuestaPrevia(infoRegistrada);
      try {
        localStorage.setItem(`rsvp_contestada_${nomLimpio.toLowerCase()}`, JSON.stringify(infoRegistrada));
      } catch (err) {
        console.error(err);
      }

      // 3. ARMAR EL TEXTO PARA WHATSAPP
      let textoWa = '';
      if (opcion === 'si') {
        textoWa = `Buen día, Confirmo mi asistencia a los XV años.\n\n- Nombre: *${nomLimpio}*\n- Pases a utilizar: *${cantidadFinal} de ${invitado.pases} asignados*`;
      } else {
        textoWa = `Buen día, Soy *${nomLimpio}*. Lamentablemente no podré asistir a los XV años, pero les agradezco mucho la invitación y les deseo lo mejor.`;
      }

      // 4. ENVIAR A WHATSAPP
      const urlWa = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoWa)}`;
      window.open(urlWa, '_blank');

      setOpcion(null);

    } catch (error) {
      console.error("Error guardando en Supabase:", error);
      alert("Hubo un error de red, pero te enviaremos a WhatsApp para avisar.");

      const nomLimpio = invitado.nombre.trim();
      const cantidadFinal = opcion === 'si' ? parseInt(pasesSeleccionados) : 0;
      const textoWa = opcion === 'si'
        ? `¡Hola! Soy ${nomLimpio}. Intenté confirmar por la web pero falló. Confirmamos ${cantidadFinal} de ${invitado.pases} lugares.`
        : `¡Hola! Soy ${nomLimpio}. Intenté avisar por la web que no podré asistir. ¡Un abrazo!`;
      window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoWa)}`, '_blank');
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      {/* VISTA PRINCIPAL */}
      <section className="h-screen w-screen flex flex-col justify-between items-center snap-start px-6 py-10 sm:py-12 bg-rosa-fondo relative overflow-hidden select-none">

        {/* FONDO ANIMADO: Halo Dorado Sutil y Micro-Destellos */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
          {/* Halo central suave pulsante (acelerado por GPU) */}
          <motion.div
            className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[radial-gradient(circle,rgba(197,160,89,0.25)_0%,transparent_70%)] pointer-events-none"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.35, 0.75, 0.35],
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
          <h2 className="font-serif text-rosa-principal text-4xl md:text-5xl mb-2.5 leading-tight font-semibold tracking-wide text-center">
            {respuestaPrevia ? 'Tu Asistencia' : 'Confirma tu Asistencia'}
          </h2>
          <p className="text-xs sm:text-sm text-texto-suave leading-relaxed font-light">
            {respuestaPrevia
              ? 'Agradecemos de corazón tu respuesta previa para este gran día.'
              : 'Será un honor y una gran alegría compartir este momento tan especial contigo.'}
          </p>
        </motion.div>

        {/* 3. SECCIÓN INFERIOR: Botones o Estado Confirmado */}
        <motion.div
          className="flex-1 flex flex-col justify-center items-center w-full max-w-xs sm:max-w-sm gap-3.5 z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {respuestaPrevia ? (
            <div className="w-full bg-white/95 backdrop-blur-md p-5 rounded-3xl border border-dorado-claro shadow-xl text-center flex flex-col items-center gap-2">
              {respuestaPrevia.estado === 'confirmado' ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-dorado-fondo border border-dorado-claro flex items-center justify-center text-dorado-principal shadow-sm">
                    <Check size={26} strokeWidth={2.5} />
                  </div>
                  <span className="text-[10px] text-dorado-oscuro font-semibold uppercase tracking-widest">
                    ✦ Asistencia Registrada ✦
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-rosa-principal font-bold leading-tight">
                    ¡Gracias por Confirmar!
                  </h3>
                  <div className="bg-rosa-fondo/70 py-2 px-4 rounded-xl border border-dorado-claro/50 w-full mt-1">
                    <p className="text-xs text-texto-suave">
                      Lugares confirmados: <strong className="text-texto-principal text-sm">{respuestaPrevia.pases_confirmados} {respuestaPrevia.pases_confirmados === 1 ? 'pase' : 'pases'}</strong>
                    </p>
                  </div>
                  <p className="text-xs text-texto-suave font-light mt-1 italic">
                    ¡Te esperamos con mucha ilusión para celebrar juntos! 💕
                  </p>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-rosa-fondo border border-rosa-claro/80 flex items-center justify-center text-rosa-principal shadow-sm">
                    <X size={26} strokeWidth={2.5} />
                  </div>
                  <span className="text-[10px] text-rosa-oscuro font-semibold uppercase tracking-widest">
                    ✦ Respuesta Registrada ✦
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-rosa-principal font-bold leading-tight">
                    Respuesta Recibida
                  </h3>
                  <p className="text-xs text-texto-suave font-light leading-relaxed px-1">
                    Registraste que no podrás asistir. Agradecemos mucho tu aviso y tus buenos deseos. 💕
                  </p>
                </>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => setOpcion('si')}
                className="w-full bg-rosa-principal hover:bg-rosa-oscuro text-white font-medium py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-rosa-principal/25 hover:shadow-xl active:scale-98 text-base border border-dorado-claro/60 cursor-pointer"
              >
                <Check size={20} className="text-dorado-claro shrink-0" />
                <span className="font-medium tracking-wide">¡Sí, ahí estaré!</span>
              </button>

              <button
                onClick={() => setOpcion('no')}
                className="w-full bg-white/90 hover:bg-white text-texto-principal border-2 border-dorado-claro/90 font-medium py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-sm active:scale-98 text-base cursor-pointer"
              >
                <X size={20} className="text-red-400 shrink-0" />
                <span className="font-medium tracking-wide">No podré asistir</span>
              </button>
            </>
          )}
        </motion.div>

      </section>

      {/* VISTA MODAL ELEGANTE */}
      <AnimatePresence>
        {opcion !== null && (
          <motion.div
            key="formulario-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-md overflow-y-auto p-4 flex items-center justify-center"
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
                className="text-xs text-rosa-principal hover:text-rosa-oscuro font-medium flex items-center gap-1.5 mb-3 transition-colors w-fit group cursor-pointer"
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