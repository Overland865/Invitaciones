import { useState, useEffect } from 'react';

export default function Contador() {
  const [tiempo, setTiempo] = useState({
    dias: '00', horas: '00', minutos: '00', segundos: '00'
  });

  useEffect(() => {
    // ⚠️ Cambia esta fecha por la fecha real de los XV años
    const fechaEvento = new Date("Oct 3, 2026 21:00:00").getTime();

    const intervalo = setInterval(() => {
      const ahora = new Date().getTime();
      const distancia = fechaEvento - ahora;

      if (distancia < 0) {
        clearInterval(intervalo);
        return;
      }

      const d = Math.floor(distancia / (1000 * 60 * 60 * 24));
      const h = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distancia % (1000 * 60)) / 1000);

      // Formatear a 2 dígitos
      setTiempo({
        dias: String(d).padStart(2, '0'),
        horas: String(h).padStart(2, '0'),
        minutos: String(m).padStart(2, '0'),
        segundos: String(s).padStart(2, '0')
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="flex gap-3 mt-2">
      <Caja valor={tiempo.dias} etiqueta="Días" />
      <Caja valor={tiempo.horas} etiqueta="Hrs" />
      <Caja valor={tiempo.minutos} etiqueta="Min" />
      <Caja valor={tiempo.segundos} etiqueta="Seg" />
    </div>
  );
}

// Sub-componente para las cajitas blancas de los números
function Caja({ valor, etiqueta }) {
  return (
    <div className="bg-white p-3 rounded-xl shadow-md min-w-[65px] flex flex-col items-center">
      <span className="text-2xl font-semibold text-lila-principal">{valor}</span>
      <span className="text-[0.65rem] text-slate-500 uppercase tracking-wider mt-1">{etiqueta}</span>
    </div>
  );
}