
import { motion } from 'framer-motion';
import { Calendar, Clock, DollarSign, User } from 'lucide-react';

export default function BookingCard({ clase, onBook }) {
    // clase object: { id, nombre, descripcion, duracion, precio, instructor: { nombre, foto_url } }

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
            <div className="relative h-48 bg-gray-200">
                <img
                    src={clase.imagen || "https://images.unsplash.com/photo-1544367563-121542f85d2f?auto=format&fit=crop&q=80"}
                    alt={clase.nombre}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: clase.imagePosition || 'center' }}
                />
                {clase.nivel && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-wood shadow-sm">
                        {clase.nivel}
                    </div>
                )}
            </div>

            <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{clase.nombre}</h3>
                    {/* <span className="flex items-center text-green-600 font-bold bg-green-50 px-2 py-1 rounded-lg">
                        <DollarSign size={16} />
                        {clase.precio}
                    </span> */}
                </div>

                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{clase.resumen || clase.descripcion}</p>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-1">
                        <Clock size={16} className="text-brand-lavender" />
                        <span>{clase.duracion} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <User size={16} className="text-brand-lavender" />
                        <span>{clase.instructor?.nombre || 'Instructor'}</span>
                    </div>
                </div>

                <button
                    onMouseEnter={() => onBook(clase)}
                    onMouseLeave={() => onBook(null)}
                    className="w-full bg-wood hover:bg-[#6D451F] text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-default"
                >
                    <Calendar size={18} />
                    Descripcion de la clase
                </button>
            </div>
        </motion.div>
    );
}
