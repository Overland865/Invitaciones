import { useState } from 'react';
import { Copy, Check, Send, Sparkles } from 'lucide-react';

export default function GeneradorInvitaciones() {
  const [nombre, setNombre] = useState('');
  const [pases, setPases] = useState(2);
  const [copiado, setCopiado] = useState(false);

  // Obtener la URL base actual (ej. http://localhost:5173 o https://tudominio.com)
  const baseUrl = window.location.origin;

  // Construir el enlace dinámico codificado
  const linkGenerado = nombre.trim() 
    ? `${baseUrl}/?invitado=${encodeURIComponent(nombre.trim())}&pases=${pases}`
    : '';

  const copiarEnlace = () => {
    if (!linkGenerado) return;
    navigator.clipboard.writeText(linkGenerado);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  const enviarWhatsAppDirecto = () => {
    if (!linkGenerado) return;
    const mensaje = `¡Hola *${nombre}*! ✨\nTe invitamos cordialmente a celebrar con nosotros los XV Años.\n\nAquí tienes tu invitación digital personalizada:\n${linkGenerado}\n\n¡Esperamos contar con tu presencia!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  return (
    <div className="min-h-screen w-full bg-rosa-fondo flex flex-col items-center justify-center p-5">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-xl border border-dorado-claro">
        
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="text-dorado-principal" size={24} />
          <h1 className="font-serif text-2xl sm:text-3xl text-rosa-principal text-center font-bold">
            Generador de Invitaciones
          </h1>
        </div>
        
        <p className="text-xs sm:text-sm text-texto-suave text-center mb-6">
          Crea enlaces personalizados para cada invitado con su cupo de pases.
        </p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-texto-principal font-semibold mb-1.5">
              Nombre de la Familia o Invitado:
            </label>
            <input 
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej. Familia Zapata, Tío Roberto..."
              className="w-full py-3 px-4 rounded-xl border border-dorado-claro focus:outline-none focus:ring-2 focus:ring-rosa-principal bg-white text-texto-principal text-sm"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-texto-principal font-semibold mb-1.5">
              Pases Asignados:
            </label>
            <input 
              type="number"
              min="1"
              max="20"
              value={pases}
              onChange={(e) => setPases(e.target.value)}
              className="w-full py-3 px-4 rounded-xl border border-dorado-claro focus:outline-none focus:ring-2 focus:ring-rosa-principal bg-white text-texto-principal text-sm"
            />
          </div>

          {linkGenerado && (
            <div className="mt-3 p-3.5 bg-rosa-fondo/60 rounded-xl border border-dorado-claro/50">
              <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-1 font-semibold">Enlace generado:</p>
              <p className="text-xs text-rosa-principal break-all font-mono select-all bg-white p-2 rounded-lg border border-dorado-claro/40">
                {linkGenerado}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              onClick={copiarEnlace}
              disabled={!nombre.trim()}
              className="flex-1 bg-rosa-principal hover:bg-rosa-oscuro disabled:opacity-50 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md transition-all active:scale-98"
            >
              {copiado ? (
                <>
                  <Check size={18} className="text-dorado-claro" />
                  <span>¡Enlace Copiado!</span>
                </>
              ) : (
                <>
                  <Copy size={18} />
                  <span>Copiar Link</span>
                </>
              )}
            </button>

            <button
              onClick={enviarWhatsAppDirecto}
              disabled={!nombre.trim()}
              className="bg-[#25D366] hover:bg-[#20bd5a] disabled:opacity-50 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md transition-all active:scale-98"
            >
              <Send size={18} />
              <span>Compartir</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}