import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Contador() {
  const [tiempo, setTiempo] = useState({
    dias: '00', horas: '00', minutos: '00', segundos: '00'
  });

  useEffect(() => {
    // Fecha del evento: 03 de Octubre de 2026, 18:00 hrs
    const fechaEvento = new Date("Oct 3, 2026 18:00:00").getTime();

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
    <div className="flex items-center justify-center gap-2 sm:gap-3.5">
      <Caja valor={tiempo.dias} etiqueta="Días" />
      <span className="text-dorado-principal text-lg sm:text-xl font-serif -mt-4 opacity-70">✦</span>
      <Caja valor={tiempo.horas} etiqueta="Horas" />
      <span className="text-dorado-principal text-lg sm:text-xl font-serif -mt-4 opacity-70">✦</span>
      <Caja valor={tiempo.minutos} etiqueta="Min" />
      <span className="text-dorado-principal text-lg sm:text-xl font-serif -mt-4 opacity-70">✦</span>
      <Caja valor={tiempo.segundos} etiqueta="Seg" esSegundo />
    </div>
  );
}

function Caja({ valor, etiqueta, esSegundo = false }) {
  return (
    <div className="relative bg-white/90 backdrop-blur-md px-3 py-3.5 sm:px-4 sm:py-4 rounded-2xl shadow-lg border border-dorado-claro/80 min-w-[66px] sm:min-w-[74px] flex flex-col items-center justify-center transition-all duration-300">
      {/* Resplandor superior sutil */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-dorado-claro to-transparent rounded-t-2xl opacity-60" />
      
      <span className={`text-2xl sm:text-3xl font-serif font-bold text-rosa-principal leading-none ${esSegundo ? 'tabular-nums' : ''}`}>
        {valor}
      </span>
      <span className="text-[10px] sm:text-[11px] text-texto-suave uppercase tracking-widest font-medium mt-1.5">
        {etiqueta}
      </span>
    </div>
  );
}