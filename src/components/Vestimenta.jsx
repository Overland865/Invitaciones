import { motion } from 'framer-motion';

// Coordenadas de estrellas fijas para el fondo de destellos
const destellosVestimenta = [
  { top: '10%', left: '12%', size: 'text-lg', delay: 0 },
  { top: '16%', right: '14%', size: 'text-sm', delay: 1.5 },
  { top: '48%', left: '8%', size: 'text-base', delay: 0.8 },
  { top: '68%', right: '10%', size: 'text-lg', delay: 2.2 },
  { bottom: '15%', left: '14%', size: 'text-sm', delay: 1.1 },
  { bottom: '8%', right: '16%', size: 'text-base', delay: 2.8 },
];

export default function Vestimenta() {
  const BASE = import.meta.env.BASE_URL;

  return (
    <section className="h-screen w-screen flex flex-col justify-between items-center snap-start px-6 pt-10 pb-12 bg-[#f7ebe8] text-center relative overflow-hidden select-none">
      
      {/* IMAGEN DE FONDO (Marco rococó y rosas en las esquinas) */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${BASE}fondos/fondo-general.jpeg')`,
        }}
      />
      
      {/* FONDO ANIMADO: Halo Dorado Suave & Destellos ✦ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Resplandor central suave */}
        <motion.div
          className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[radial-gradient(circle,rgba(197,160,89,0.25)_0%,transparent_70%)] pointer-events-none"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.35, 0.75, 0.35],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {destellosVestimenta.map((d, i) => (
          <motion.span
            key={i}
            className={`absolute text-dorado-principal ${d.size}`}
            style={{
              top: d.top,
              bottom: d.bottom,
              left: d.left,
              right: d.right,
            }}
            animate={{
              opacity: [0.2, 0.95, 0.2],
              scale: [0.75, 1.3, 0.75],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 3.5 + (i % 2),
              delay: d.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ✦
          </motion.span>
        ))}
      </div>

      {/* 1. ILUSTRACIONES EN ESTILO CROQUIS DE LÍNEAS PURAS (SIN RELLENO DE COLOR) */}
      <motion.div 
        className="w-full max-w-sm sm:max-w-lg md:max-w-xl flex-1 flex items-center justify-center gap-6 sm:gap-12 md:gap-16 z-10 my-auto"
        initial={{ opacity: 0, scale: 0.88 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.9 }}
      >
        {/* Vestido de Gala: Dibujo de Líneas Puras (Line Art) */}
        <div className="w-36 h-56 sm:w-48 sm:h-72 md:w-56 md:h-80 text-[#8f475a] flex items-center justify-center drop-shadow-sm transition-transform duration-300 hover:scale-105">
          <svg viewBox="0 0 140 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Tirantes y escote cruzado */}
            <path d="M42 28 C54 18 86 18 98 28" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M42 28 C34 32 26 40 28 50 C30 58 38 62 46 66" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M98 28 C106 32 114 40 112 50 C110 58 102 62 94 66" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            
            {/* Pliegues del bustier */}
            <path d="M42 34 C58 46 82 46 98 34" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M48 42 C58 50 82 50 92 42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M46 66 C56 60 84 60 94 66" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />

            {/* Torso / Corsé */}
            <path d="M46 66 L50 95" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M94 66 L90 95" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M60 66 L62 95" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M80 66 L78 95" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />

            {/* Cinturón y detalle floral en líneas */}
            <path d="M48 95 C62 93 78 93 92 95" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M48 101 C62 99 78 99 92 101" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="70" cy="98" r="4.5" stroke="currentColor" strokeWidth="2" />
            <circle cx="70" cy="98" r="2" stroke="currentColor" strokeWidth="1.5" />

            {/* Contorno de la Falda con volumen */}
            <path d="M48 101 C36 132 16 168 20 188 C40 196 100 196 120 188 C124 168 104 132 92 101" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Pliegues de caída y movimiento de la falda */}
            <path d="M42 118 C34 145 32 174 36 190" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M58 101 C52 135 50 168 54 192" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M70 102 C70 135 70 168 70 193" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M82 101 C88 135 90 168 86 192" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M98 118 C106 145 108 174 104 190" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            
            {/* Ondulaciones sutiles en el dobladillo inferior */}
            <path d="M20 188 C28 191 36 190 44 191 C52 192 62 193 70 193 C78 193 88 192 96 191 C104 190 112 191 120 188" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Divisor vertical sutil entre prendas */}
        <div className="h-32 sm:h-44 w-px bg-dorado-principal/50 my-auto" />

        {/* Traje Formal / Saco: Dibujo de Líneas Puras (Line Art) */}
        <div className="w-36 h-56 sm:w-48 sm:h-72 md:w-56 md:h-80 text-[#8f475a] flex items-center justify-center drop-shadow-sm transition-transform duration-300 hover:scale-105">
          <svg viewBox="0 0 140 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Cuello de camisa */}
            <path d="M56 26 L70 38 L84 26" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M60 26 L54 18 H86 L80 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

            {/* Corbata con nudo y caída */}
            <path d="M66 38 H74 L73 70 L70 78 L67 70 Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
            <line x1="70" y1="38" x2="70" y2="70" stroke="currentColor" strokeWidth="1.6" />

            {/* Solapas clásicas en pico */}
            <path d="M44 26 L60 92 L42 96 L26 48 C32 36 38 30 44 26 Z" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" />
            <path d="M96 26 L80 92 L98 96 L114 48 C108 36 102 30 96 26 Z" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" />
            
            {/* Muescas de las solapas */}
            <path d="M34 38 L42 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M106 38 L98 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

            {/* Cuerpo del saco entallado */}
            <path d="M42 96 L32 188 C50 193 90 193 108 188 L98 96" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Línea central y botones */}
            <line x1="70" y1="92" x2="70" y2="188" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="70" cy="112" r="3" stroke="currentColor" strokeWidth="2" />
            <circle cx="70" cy="136" r="3" stroke="currentColor" strokeWidth="2" />
            <circle cx="70" cy="160" r="3" stroke="currentColor" strokeWidth="2" />

            {/* Bolsillo superior con pañuelo */}
            <path d="M86 104 H102 V115 H86 Z" stroke="currentColor" strokeWidth="2" />
            <path d="M91 104 L94 94 L97 104" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M96 104 L99 96 L101 104" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />

            {/* Bolsillos inferiores */}
            <path d="M38 152 H54 V162 H38 Z" stroke="currentColor" strokeWidth="1.8" />
            <path d="M86 152 H102 V162 H86 Z" stroke="currentColor" strokeWidth="1.8" />

            {/* Mangas estilizadas */}
            <path d="M26 48 L16 150 C22 156 30 156 36 150 L42 96" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M114 48 L124 150 C118 156 110 156 104 150 L98 96" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
            
            {/* Botones de las mangas */}
            <circle cx="23" cy="144" r="1.5" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="26" cy="141" r="1.5" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="117" cy="144" r="1.5" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="114" cy="141" r="1.5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </motion.div>

      {/* 2. TÍTULO: Código de Vestimenta */}
      <motion.div
        className="w-full max-w-sm z-10 mb-4"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-rosa-principal tracking-wide font-bold mb-3 drop-shadow-xs">
          Código de Vestimenta
        </h2>
      </motion.div>

      {/* 3. FORMATO CLÁSICO: Distintivo FORMAL enmarcado con líneas doradas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="border-y border-dorado-claro/90 py-3.5 px-14 sm:px-20 z-10 mb-2"
      >
        <p className="text-2xl sm:text-3xl text-texto-principal font-light tracking-[0.45em] uppercase drop-shadow-xs">
          Formal
        </p>
      </motion.div>

    </section>
  );
}