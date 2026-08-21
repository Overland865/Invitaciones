import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Componente ReproductorMusica
 * 
 * - Inicia la reproducción automáticamente cuando el invitado entra a la invitación (gesto de usuario).
 * - Muestra un botón flotante elegante con estética dorado y rosa acorde al tema.
 * - Incluye animación de ondas musicales cuando está activo.
 * - Permite pausar y reanudar en cualquier momento.
 */
export default function ReproductorMusica({ autoPlay = false, audioSrc = 'musica.mp3' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  const BASE = import.meta.env.BASE_URL;
  const fullAudioSrc = audioSrc.startsWith('http') ? audioSrc : `${BASE}${audioSrc.replace(/^\//, '')}`;

  useEffect(() => {
    // Si autoPlay es true y aún no ha intentado reproducir
    if (autoPlay && audioRef.current && !hasInteracted) {
      setHasInteracted(true);
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            // El navegador pudo haber bloqueado si no hubo suficiente interacción previa
            console.warn('Autoplay bloqueado por políticas del navegador:', err);
            setIsPlaying(false);
          });
      }
    }
  }, [autoPlay, hasInteracted]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error('Error al reproducir audio:', err));
    }
  };

  // Si se pasa un audioSrc específico, lo usamos. Si no, ofrecemos soporte automático para .mpeg y .mp3
  const isCustomSrc = audioSrc !== 'musica.mp3' && audioSrc !== 'musica.mpeg';
  const customFullSrc = isCustomSrc 
    ? (audioSrc.startsWith('http') ? audioSrc : `${BASE}${audioSrc.replace(/^\//, '')}`)
    : null;

  return (
    <>
      {/* Elemento de audio HTML5 con soporte nativo para MPEG y MP3 */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        {isCustomSrc ? (
          <source src={customFullSrc} type={customFullSrc.endsWith('.ogg') ? 'audio/ogg' : 'audio/mpeg'} />
        ) : (
          <>
            <source src={`${BASE}musica.mpeg`} type="audio/mpeg" />
            <source src={`${BASE}musica.mp3`} type="audio/mpeg" />
            <source src={`${BASE}musica.m4a`} type="audio/mp4" />
          </>
        )}
        Tu navegador no soporta el elemento de audio.
      </audio>

      {/* Botón Flotante de Control de Música */}
      <motion.div
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.button
          onClick={togglePlay}
          className={`relative group flex items-center justify-center p-3 rounded-full shadow-xl backdrop-blur-md border transition-all duration-300 ${
            isPlaying
              ? 'bg-dorado-principal/90 border-dorado-brillante text-white shadow-dorado-principal/30 ring-2 ring-dorado-claro/50'
              : 'bg-white/85 border-rosa-claro text-rosa-oscuro hover:border-dorado-principal'
          }`}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
          title={isPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          {/* Ondas pulsantes de fondo cuando suena */}
          {isPlaying && (
            <span className="absolute inset-0 rounded-full bg-dorado-brillante/30 animate-ping pointer-events-none" />
          )}

          <div className="relative flex items-center justify-center w-6 h-6">
            {isPlaying ? (
              /* Ecualizador / Barras animadas de sonido */
              <div className="flex items-end justify-center gap-[3px] h-4 w-4">
                <span className="w-[3px] bg-white rounded-full animate-[soundWave_0.8s_ease-in-out_infinite]" style={{ height: '60%' }} />
                <span className="w-[3px] bg-white rounded-full animate-[soundWave_1.1s_ease-in-out_infinite_0.2s]" style={{ height: '100%' }} />
                <span className="w-[3px] bg-white rounded-full animate-[soundWave_0.9s_ease-in-out_infinite_0.4s]" style={{ height: '40%' }} />
              </div>
            ) : (
              /* Ícono de Nota Musical con barra de pausa / silenciado */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 transition-transform group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            )}
          </div>
        </motion.button>
      </motion.div>
    </>
  );
}
