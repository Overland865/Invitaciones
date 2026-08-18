import { motion } from 'framer-motion';

export default function Vestimenta() {
    return (
        <section className="h-screen w-screen flex flex-col justify-center items-center snap-start p-8 bg-white text-center">

            {/* Icono de gancho de ropa (elegante y minimalista) */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-8 text-lila-principal opacity-80"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    {/* Diseño de una percha de ropa fina */}
                    <path d="M12 2a2 2 0 0 0-2 2c0 1 1 1.5 1 2.5 0 1-1 1.5-1 2.5a2 2 0 0 0 4 0c0-1-1-1.5-1-2.5 0-1 1-1.5 1-2.5a2 2 0 0 0-2-2Z" />
                    <path d="M12 9L2.3 18.2a1 1 0 0 0 .7 1.8h18a1 1 0 0 0 .7-1.8L12 9Z" />
                </svg>
            </motion.div>

            <motion.h2
                className="text-4xl md:text-5xl font-serif text-lila-principal mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
            >
                Código de Vestimenta
            </motion.h2>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="border-y border-lila-claro/50 py-4 px-12"
            >
                <p className="text-2xl text-lila-texto font-light tracking-[0.4em] uppercase">
                    Formal
                </p>
            </motion.div>

        </section>
    );
}