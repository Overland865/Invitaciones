import { useState, useEffect } from 'react';
import { Copy, Check, Users, UserCheck, UserX, Clock, Search, RefreshCw, Sparkles, PlusCircle } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function AdminPanel() {
  const [nombre, setNombre] = useState('');
  const [pases, setPases] = useState(2);
  const [lista, setLista] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [copiadoId, setCopiadoId] = useState(null);
  const [enlaceRecienGenerado, setEnlaceRecienGenerado] = useState('');

  const baseUrl = window.location.origin;

  // Cargar lista de invitados desde Supabase
  const cargarInvitados = async () => {
    try {
      const { data, error } = await supabase
        .from('rsvps')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;
      setLista(data || []);
    } catch (error) {
      console.error('Error cargando invitados:', error);
    }
  };

  useEffect(() => {
    cargarInvitados();
  }, []);

  // Construir link personalizado
  const generarLink = (nom, pas) => {
    return `${baseUrl}/?invitado=${encodeURIComponent(nom.trim())}&pases=${pas}`;
  };

  // Crear, guardar en base de datos y copiar enlace automáticamente
  const handleCrearYCopiar = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    setCargando(true);
    const link = generarLink(nombre, pases);

    try {
      // 1. Guardar en Supabase como 'pendiente'
      const { error } = await supabase
        .from('rsvps')
        .insert([
          {
            nombre_familia: nombre.trim(),
            pases_asignados: parseInt(pases),
            pases_confirmados: 0,
            estado: 'pendiente'
          }
        ]);

      if (error) console.error('Error al guardar en Supabase:', error);

      // 2. Copiar enlace al portapapeles
      await navigator.clipboard.writeText(link);
      setEnlaceRecienGenerado(link);

      // Limpiar campos del formulario
      setNombre('');
      setPases(2);
      cargarInvitados();

      setTimeout(() => {
        setEnlaceRecienGenerado('');
      }, 4000);

    } catch (error) {
      console.error('Error general:', error);
    } finally {
      setCargando(false);
    }
  };

  // Copiar link de un registro ya existente en la tabla
  const copiarLinkDirecto = async (item) => {
    const link = generarLink(item.nombre_familia, item.pases_asignados);
    await navigator.clipboard.writeText(link);
    setCopiadoId(item.id);
    setTimeout(() => setCopiadoId(null), 2000);
  };

  // Cálculos de métricas en tiempo real
  const totalAsignados = lista.reduce((acc, curr) => acc + (curr.pases_asignados || 0), 0);
  const totalConfirmados = lista
    .filter(i => i.estado === 'confirmado')
    .reduce((acc, curr) => acc + (curr.pases_confirmados || 0), 0);
  const totalRechazados = lista.filter(i => i.estado === 'rechazado').length;
  const totalPendientes = lista.filter(i => i.estado === 'pendiente').length;

  const listaFiltrada = lista.filter(i => 
    i.nombre_familia && i.nombre_familia.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-rosa-fondo text-texto-principal p-4 sm:p-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">

        {/* Encabezado */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-md border border-dorado-claro">
          <div className="flex items-center gap-3">
            <Sparkles className="text-dorado-principal" size={28} />
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl text-rosa-principal font-bold">
                Panel de Despacho de Invitaciones
              </h1>
              <p className="text-xs sm:text-sm text-texto-suave">
                Genera los enlaces personalizados y gestiona el control de pases.
              </p>
            </div>
          </div>
          <button 
            onClick={cargarInvitados}
            className="mt-3 sm:mt-0 flex items-center gap-2 text-xs font-medium bg-rosa-fondo hover:bg-rosa-principal hover:text-white text-rosa-principal border border-dorado-claro px-4 py-2 rounded-xl transition-colors"
          >
            <RefreshCw size={14} /> Actualizar
          </button>
        </header>

        {/* Tarjetas de Métricas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="bg-white/90 p-4 rounded-2xl border border-dorado-claro/60 shadow-sm flex items-center gap-3.5">
            <div className="p-3 bg-rosa-fondo rounded-xl text-rosa-principal">
              <Users size={22} />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-texto-suave">Pases Asignados</p>
              <p className="text-2xl font-serif font-bold text-texto-principal">{totalAsignados}</p>
            </div>
          </div>

          <div className="bg-white/90 p-4 rounded-2xl border border-emerald-200 shadow-sm flex items-center gap-3.5">
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
              <UserCheck size={22} />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-emerald-700">Lugares Confirmados</p>
              <p className="text-2xl font-serif font-bold text-emerald-600">{totalConfirmados}</p>
            </div>
          </div>

          <div className="bg-white/90 p-4 rounded-2xl border border-amber-200 shadow-sm flex items-center gap-3.5">
            <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
              <Clock size={22} />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-amber-700">Pendientes</p>
              <p className="text-2xl font-serif font-bold text-amber-600">{totalPendientes}</p>
            </div>
          </div>

          <div className="bg-white/90 p-4 rounded-2xl border border-rose-200 shadow-sm flex items-center gap-3.5">
            <div className="p-3 bg-rose-50 rounded-xl text-rose-500">
              <UserX size={22} />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-rose-700">No Asistirán</p>
              <p className="text-2xl font-serif font-bold text-rose-500">{totalRechazados}</p>
            </div>
          </div>
        </div>

        {/* Formulario de Generación */}
        <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-dorado-claro">
          <h2 className="font-serif text-xl text-rosa-principal font-semibold mb-4">
            Generar Nuevo Enlace
          </h2>

          <form onSubmit={handleCrearYCopiar} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-wider font-semibold text-texto-suave mb-1.5">
                Nombre de la Familia / Invitado
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Familia Zapata Méndez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full py-3 px-4 rounded-xl border border-dorado-claro focus:outline-none focus:ring-2 focus:ring-rosa-principal bg-rosa-fondo/30 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-texto-suave mb-1.5">
                Pases Asignados
              </label>
              <input
                type="number"
                min="1"
                max="20"
                required
                value={pases}
                onChange={(e) => setPases(e.target.value)}
                className="w-full py-3 px-4 rounded-xl border border-dorado-claro focus:outline-none focus:ring-2 focus:ring-rosa-principal bg-rosa-fondo/30 text-sm"
              />
            </div>

            <div className="sm:col-span-3 mt-2">
              <button
                type="submit"
                disabled={cargando}
                className="w-full bg-rosa-principal hover:bg-rosa-oscuro text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 disabled:opacity-60 text-sm md:text-base border border-dorado-claro/60"
              >
                <PlusCircle size={18} />
                <span>{cargando ? 'Guardando...' : 'Guardar y Copiar Enlace'}</span>
              </button>
            </div>
          </form>

          {/* Notificación visual temporal cuando se copia */}
          {enlaceRecienGenerado && (
            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs sm:text-sm">
              <Check size={18} className="text-emerald-600 shrink-0" />
              <span><strong>¡Enlace copiado al portapapeles!</strong> Ya puedes pegarlo y enviarlo al invitado.</span>
            </div>
          )}
        </div>

        {/* Tabla de Control de Invitaciones */}
        <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-dorado-claro">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <h2 className="font-serif text-xl text-rosa-principal font-semibold">
              Historial de Invitaciones ({listaFiltrada.length})
            </h2>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Buscar familia..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-dorado-claro text-xs focus:outline-none focus:ring-2 focus:ring-rosa-principal"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-dorado-claro/80 text-texto-suave text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-3">Invitado / Familia</th>
                  <th className="py-3 px-3 text-center">Pases Asignados</th>
                  <th className="py-3 px-3 text-center">Confirmados</th>
                  <th className="py-3 px-3 text-center">Estado</th>
                  <th className="py-3 px-3 text-right">Copiar Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dorado-claro/30">
                {listaFiltrada.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-6 text-center text-gray-400">
                      No hay registros de invitaciones aún.
                    </td>
                  </tr>
                ) : (
                  listaFiltrada.map((item) => (
                    <tr key={item.id} className="hover:bg-rosa-fondo/20 transition-colors">
                      <td className="py-3 px-3">
                        <p className="font-semibold text-texto-principal">{item.nombre_familia}</p>
                      </td>
                      <td className="py-3 px-3 text-center font-semibold text-rosa-principal">
                        {item.pases_asignados}
                      </td>
                      <td className="py-3 px-3 text-center font-bold">
                        {item.estado === 'confirmado' ? (
                          <span className="text-emerald-600">{item.pases_confirmados}</span>
                        ) : item.estado === 'rechazado' ? (
                          <span className="text-rose-400">0</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                          item.estado === 'confirmado' 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : item.estado === 'rechazado'
                            ? 'bg-rose-100 text-rose-600'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {item.estado}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          title="Copiar enlace"
                          onClick={() => copiarLinkDirecto(item)}
                          className="p-2 rounded-lg bg-rosa-fondo hover:bg-rosa-principal hover:text-white text-rosa-principal transition-colors inline-flex items-center gap-1.5"
                        >
                          {copiadoId === item.id ? (
                            <>
                              <Check size={15} className="text-emerald-600" />
                              <span className="text-[11px] text-emerald-600 font-medium">Copiado</span>
                            </>
                          ) : (
                            <>
                              <Copy size={15} />
                              <span className="text-[11px]">Copiar</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}