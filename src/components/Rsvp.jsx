import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, X, ArrowLeft } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function Rsvp() {
  // 'null' = vista inicial | 'si' = formulario de asistencia | 'no' = formulario de ausencia
  const [opcion, setOpcion] = useState(null); 
  const [nombre, setNombre] = useState('');
  const [pases, setPases] = useState('');
  const [cargando, setCargando] = useState(false);

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
    <section className="h-screen w-screen flex flex-col justify-center items-center snap-start p-5 bg-white relative">
      
      <motion.div 
        className="flex justify-center items-center h-32 mb-6"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="font-serif text-[6rem] font-semibold text-lila-principal drop-shadow-brillo animate-[bounce_4s_infinite]">
          15
        </div>
      </motion.div>

      <motion.h2
        className="text-3xl md:text-4xl font-serif text-lila-principal mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Confirma tu Asistencia
      </motion.h2>

      <div className="w-full max-w-sm bg-lila-fondo p-6 rounded-3xl shadow-lg border border-lila-claro/50 min-h-[250px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          
          {/* VISTA 1: BOTONES DE SELECCIÓN */}
          {opcion === null && (
            <motion.div 
              key="seleccion"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-4"
            >
              <button 
                onClick={() => setOpcion('si')}
                className="w-full bg-lila-principal hover:bg-lila-texto text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <Check size={20} />
                ¡Sí, ahí estaré!
              </button>
              
              <button 
                onClick={() => setOpcion('no')}
                className="w-full bg-white hover:bg-gray-50 text-lila-texto border-2 border-lila-claro font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <X size={20} className="text-red-400" />
                No podré asistir
              </button>
            </motion.div>
          )}

          {/* VISTA 2: FORMULARIO */}
          {opcion !== null && (
            <motion.form 
              key="formulario"
              onSubmit={enviarWhatsApp}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col"
            >
              <button 
                type="button" 
                onClick={() => setOpcion(null)}
                className="text-sm text-lila-principal flex items-center gap-1 mb-4 hover:underline w-fit"
              >
                <ArrowLeft size={16} /> Volver
              </button>

              <div className="mb-4">
                <input 
                  type="text" 
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu Nombre o Familia" 
                  className="w-full p-4 rounded-xl border border-lila-claro focus:outline-none focus:ring-2 focus:ring-lila-principal bg-white text-lila-texto"
                />
              </div>

             {opcion === 'si' && (
                <div className="mb-6">
                  <input 
                    type="number" 
                    required
                    min="1"
                    value={pases}
                    onChange={(e) => setPases(e.target.value)}
                    placeholder="Número de pases a utilizar" 
                    className="w-full p-4 rounded-xl border border-lila-claro focus:outline-none focus:ring-2 focus:ring-lila-principal bg-white text-lila-texto"
                  />
                </div>
              )}

              <button 
                type="submit" 
                disabled={cargando}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md disabled:opacity-70 mt-2"
              >
                {cargando ? 'Procesando...' : (
                  <>
                    <Send size={20} />
                    {opcion === 'si' ? 'Confirmar Asistencia' : 'Avisar por WhatsApp'}
                  </>
                )}
              </button>
            </motion.form>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}