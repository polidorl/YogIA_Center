
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

export default function ConceptModal({ isOpen, onClose, clase }) {
    if (!isOpen || !clase) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
                >
                    <div className="relative h-32 bg-wood/10 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20"></div>
                        <Sparkles className="text-wood/20 absolute -top-4 -left-4 w-32 h-32 rotate-12" />
                        <Sparkles className="text-wood/20 absolute -bottom-4 -right-4 w-24 h-24 -rotate-12" />

                        <h2 className="text-3xl font-bold text-wood relative z-10 px-8 text-center">
                            {clase.nombre}
                        </h2>

                        {/* Botón de cerrar eliminado para interacción hover */}
                    </div>

                    <div className="p-8 text-center">
                        <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-mint/20 text-wood mb-4">
                            <Sparkles size={24} />
                        </div>

                        <p className="text-gray-600 text-lg leading-relaxed italic">
                            "{clase.descripcion}"
                        </p>

                        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center gap-4 text-sm text-gray-500">
                            {clase.nivel && (
                                <span className="px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
                                    Nivel: {clase.nivel}
                                </span>
                            )}
                            {clase.duracion && (
                                <span className="px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
                                    {clase.duracion} min
                                </span>
                            )}
                        </div>

                        {/* Botón Entendido eliminado */}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
