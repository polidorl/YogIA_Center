
import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, addMonths, subMonths, isSameMonth, isSameDay, isToday, isAfter, isBefore } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon, List as ListIcon } from 'lucide-react';

// Monthly Yoga Plan extracted from docs
const MONTHLY_ACTIVITIES = [
    { day: 1, title: 'Raíces Estables', type: 'Hatha Yoga', description: 'Fundamentos de posturas de pie y equilibrio.', image: '/yoga_power.png' },
    { day: 2, title: 'Piernas Fuertes', type: 'Enfoque en piernas', description: 'Posturas de pie (Guerreros I y II) para estabilidad.', image: '/yoga_power.png' },
    { day: 3, title: 'Respiración Vital', type: 'Pranayama', description: 'Introducción a la respiración Ujjayi y respiración completa.', image: '/yoga_meditation.png' },
    { day: 4, title: 'Columna Feliz', type: 'Movilidad', description: 'Gato-Vaca y torsiones suaves para aliviar dolor de espalda.', image: '/yoga_stretch.png' },
    { day: 5, title: 'Calma Interior', type: 'Yin Yoga', description: 'Posturas de suelo sostenidas para soltar estrés.', image: '/yoga_meditation.png' },
    { day: 6, title: 'Centro de Poder', type: null, description: 'Fortalecimiento abdominal consciente (Navasana y variantes).', image: '/yoga_power.png' },
    { day: 7, title: 'Silencio Interior', type: 'Trataka', description: 'Meditación mirando la llama de una vela para la vista y la mente.', image: '/yoga_meditation.png' },
    { day: 8, title: 'Fluir como el Agua', type: 'Vinyasa Flow', description: 'Secuencia dinámica uniendo respiración y movimiento.', image: '/yoga_flow.jpg' },
    { day: 9, title: 'Abre tu Corazón', type: 'Backbends', description: 'Apertura de pecho y hombros (Cobra, Esfinge, Puente).', image: '/yoga_stretch.png' },
    { day: 10, title: 'Adiós Tensión', type: 'Cuello y Hombros', description: 'Estiramientos específicos para quienes trabajan en computadora.', image: '/yoga_abreCorazon.jpg' },
    { day: 11, title: 'Caderas Libres', type: 'Slow Flow', description: 'Enfocado en soltar emociones guardadas en las caderas (Pigeon pose).', image: '/yoga_stretch.png' },
    { day: 12, title: 'Equilibrio y Foco', type: 'Balance', description: 'Posturas de equilibrio (Árbol, Águila) para la concentración.', image: '/yoga_power.png' },
    { day: 13, title: 'Detox Flow', type: 'Torsiones', description: 'Secuencia de giros para estimular la digestión y "exprimir" órganos.', image: '/yoga_nature.png' },
    { day: 14, title: 'Descanso Profundo', type: 'Yoga Restaurativo', description: 'Uso de cojines y mantas para descanso absoluto.', image: '/yoga_meditation.png' },
    { day: 15, title: 'Guerrero de Luz', type: 'Power Yoga', description: 'Secuencia intensa para generar calor y resistencia.', image: '/yoga_power.png' },
    { day: 16, title: 'Fuego Abdominal', type: 'Core intenso', description: 'Planchas y trabajo de centro para proteger la espalda baja.', image: '/yoga_power.png' },
    { day: 17, title: 'Desafío de Brazos', type: 'Fortalecimiento', description: 'Chaturangas y preparación para cuervo (Bakasana).', image: '/yoga_power.png' },
    { day: 18, title: 'Salta a la Acción', type: 'Cardio Yoga', description: 'Saludos al Sol B a ritmo más acelerado.', image: '/yoga_nature.png' },
    { day: 19, title: 'Estiramiento Total', type: 'Flexibilidad', description: 'Full Body Stretch para recuperar los músculos cansados.', image: '/yoga_stretch.png' },
    { day: 20, title: 'Mente Clara', type: 'Pranayama', description: 'Nadi Shodhana (respiración alterna) para equilibrar hemisferios.', image: '/yoga_meditation.png' },
    { day: 21, title: 'Yoga Nidra', type: 'Sueño Yóguico', description: 'Meditación guiada acostada para resetear el sistema nervioso.', image: '/yoga_meditation.png' },
    { day: 22, title: 'Saludo a la Luna', type: 'Chandra Namaskar', description: 'Una secuencia más circular y suave que el saludo al sol.', image: '/yoga_nature.png' },
    { day: 23, title: 'Espalda de Acero', type: 'Fortalecimiento posterior', description: 'Langosta y Arco para mejorar postura.', image: '/yoga_power.png' },
    { day: 24, title: 'Inversiones Básicas', type: 'Perspectiva', description: 'Perro boca abajo y preparación de parada de hombros (Vela).', image: '/yoga_power.png' },
    { day: 25, title: 'Amor Propio', type: 'Vinyasa suave', description: 'Movimientos fluidos y amables con uno mismo.', image: '/yoga_nature.png' },
    { day: 26, title: 'Yoga en la Pared', type: 'Terapéutico', description: 'Usar la pared como soporte para profundizar estiramientos.', image: '/yoga_stretch.png' },
    { day: 27, title: 'Sin Prisa', type: 'Slow Motion', description: 'Moverse en cámara lenta para máxima consciencia muscular.', image: '/yoga_stretch.png' },
    { day: 28, title: 'Gratitud', type: 'Meditation Flow', description: 'Moverse dedicando la práctica a algo por lo que agradeces.', image: '/yoga_meditation.png' },
    { day: 29, title: 'Silencio Interior', type: 'Trataka', description: 'Meditación mirando la llama de una vela para la vista y la mente.', image: '/yoga_meditation.png' },
    { day: 30, title: 'Mandala Flow', type: 'Creativo', description: 'Moverse 360 grados alrededor del mat (hacia todas las direcciones).', image: '/yoga_nature.png' },
    { day: 31, title: 'Integración Final', type: 'Mix', description: 'Una clase completa que une fuerza, flexibilidad y relajación.', image: '/yoga_nature.png' }
];

export default function CalendarGrid({ onDateSelect, bookings = [] }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [viewMode, setViewMode] = useState('calendar'); // 'calendar' | 'list'
    const [expandedDay, setExpandedDay] = useState(null); // Track expanded day in list view

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const goToToday = () => setCurrentMonth(new Date());

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth); // Fixed: Use currentMonth, not monthStart
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const calendarDays = eachDayOfInterval({
        start: startDate,
        end: endDate,
    });

    const weekDays = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];

    // Centralized Event Logic
    const getEventsForDay = (day) => {
        const dayEvents = [];

        // Check if day belongs to current view month to assign the static plan
        // using native getDate() (1-31)
        const dayNumber = day.getDate();
        const activity = MONTHLY_ACTIVITIES.find(a => a.day === dayNumber);

        if (activity) {
            dayEvents.push({
                id: `plan-${dayNumber}`,
                title: activity.title,
                type: 'plan',
                description: activity.description,
                image: activity.image,
                bold: isToday(day)
            });
        }

        // Prop bookings
        const propBookings = bookings.filter(b => isSameDay(new Date(b.fecha_inicio), day)).map(b => ({
            id: b.id,
            title: b.clase?.nombre || 'Clase',
            type: 'booking',
            description: b.clase?.descripcion || 'Sin descripción',
            bold: false
        }));

        return [...dayEvents, ...propBookings];
    };

    // Navigation handler
    const handleEventClick = (e, day) => {
        e.stopPropagation(); // Prevent triggering the cell's onDateSelect
        const dayStr = day.toString();
        setCurrentMonth(day); // Ensure we are in the right month
        setViewMode('list');
        setExpandedDay(dayStr);
    };

    // Auto-scroll to expanded day when switching to list view
    useEffect(() => {
        if (viewMode === 'list' && expandedDay) {
            // Small delay to ensure rendering
            setTimeout(() => {
                const element = document.getElementById(`day-${expandedDay}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        }
    }, [viewMode, expandedDay]);

    const toggleDayExpand = (dayStr) => {
        setExpandedDay(expandedDay === dayStr ? null : dayStr);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-300 overflow-hidden flex flex-col h-full font-sans">
            {/* Extended Header */}
            <div className="relative p-4 flex items-center justify-between border-b border-gray-300 bg-gray-50/50">

                {/* Left: View Toggle */}
                <div className="flex bg-gray-200/50 p-1 rounded-xl relative z-10">
                    <button
                        onClick={() => setViewMode('list')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${viewMode === 'list'
                            ? 'bg-white text-wood shadow-sm'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                            }`}
                    >
                        <ListIcon size={16} />
                        Lista
                    </button>
                    <button
                        onClick={() => setViewMode('calendar')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${viewMode === 'calendar'
                            ? 'bg-white text-wood shadow-sm'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                            }`}
                    >
                        <CalendarIcon size={16} />
                        Calendario
                    </button>
                </div>

                {/* Center: Month Controls */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 z-0">
                    <button onClick={prevMonth} className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-200 text-gray-600">
                        <ChevronLeft size={20} />
                    </button>
                    <h3 className="font-semibold text-gray-800 capitalize text-lg w-32 text-center">
                        {format(currentMonth, 'MMMM yyyy', { locale: es })}
                    </h3>
                    <button onClick={nextMonth} className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-200 text-gray-600">
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* Right: Today Button */}
                <div className="relative z-10">
                    <button
                        onClick={goToToday}
                        className="text-sm font-medium text-wood hover:bg-wood/10 px-3 py-1.5 rounded-lg transition-colors"
                    >
                        Hoy
                    </button>
                </div>
            </div>

            {/* View Content */}
            {viewMode === 'calendar' ? (
                <>
                    {/* Week Days Header */}
                    <div className="grid grid-cols-7 border-b border-gray-300 bg-white">
                        {weekDays.map((day) => (
                            <div key={day} className="p-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="flex-1 overflow-y-auto bg-gray-100/50">
                        <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200">
                            {calendarDays.map((day) => {
                                const events = getEventsForDay(day);
                                const isCurrentMonth = isSameMonth(day, monthStart);

                                return (
                                    <div
                                        key={day.toString()}
                                        className={`aspect-square bg-white p-2 flex flex-col gap-2 relative transition-colors ${!isCurrentMonth ? 'bg-gray-50/50 text-gray-300' : 'text-gray-800'
                                            }`}
                                        onClick={() => onDateSelect && onDateSelect(day)}
                                    >
                                        {/* Day Number */}
                                        <div className="flex justify-start">
                                            <span
                                                className={`text-sm font-medium w-8 h-8 flex items-center justify-center rounded-full ${isToday(day)
                                                    ? 'bg-gradient-to-r from-yellow-500 to-green-500 text-white shadow-md'
                                                    : 'text-gray-400'
                                                    }`}
                                            >
                                                {format(day, 'd')}
                                            </span>
                                        </div>

                                        {/* Events */}
                                        <div className="flex flex-col gap-1.5 overflow-hidden">
                                            {events.map((event) => (
                                                <div
                                                    key={event.id}
                                                    onClick={(e) => handleEventClick(e, day)}
                                                    className={`bg-white border text-center border-gray-200 rounded-2xl shadow-sm px-2 py-1 text-[10px] hover:shadow-md transition-shadow cursor-pointer hover:bg-gray-50 hover:border-wood/30 ${event.bold ? 'font-bold text-gray-800' : 'font-medium text-gray-600'
                                                        }`}
                                                >
                                                    <div className="truncate">{event.title}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            ) : (
                /* List View */
                <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6">
                    <div className="max-w-3xl mx-auto space-y-4">
                        {calendarDays
                            .filter(day => isSameMonth(day, monthStart)) // Only show current month in list
                            .map((day) => {
                                const events = getEventsForDay(day);
                                if (events.length === 0) return null; // Skip days without events

                                const dayStr = day.toString();
                                const isExpanded = expandedDay === dayStr;

                                return (
                                    <div key={dayStr} id={`day-${dayStr}`} className="space-y-4 scroll-mt-4">
                                        {events.map(event => (
                                            <div
                                                key={event.id}
                                                onClick={() => toggleDayExpand(dayStr)}
                                                className={`flex bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition-all cursor-pointer group h-auto min-h-[8rem] ${isExpanded ? 'border-wood ring-1 ring-wood/20' : 'border-gray-200'
                                                    }`}
                                            >
                                                {/* 1. Date Indicator (Left) */}
                                                <div className="flex flex-col w-24 min-w-[6rem] border-r border-gray-100">
                                                    {/* Top: Month */}
                                                    <div className="bg-gradient-to-br from-yellow-500 to-green-600 text-white font-bold text-xs py-1.5 text-center uppercase tracking-wider">
                                                        {format(day, 'MMM', { locale: es })}
                                                    </div>
                                                    {/* Bottom: Day Number & Name */}
                                                    <div className="flex-1 flex flex-col items-center justify-center bg-white group-hover:bg-gray-50/50 transition-colors">
                                                        <span className="text-3xl font-bold text-gray-800 leading-none">
                                                            {format(day, 'd')}
                                                        </span>
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase mt-1">
                                                            {format(day, 'EEE', { locale: es })}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* 2. Main Content (Center) */}
                                                <div className="flex-1 p-4 flex flex-col gap-3 min-w-0">
                                                    <div className="flex items-center gap-4">
                                                        {/* Image */}
                                                        <div className="w-24 h-24 rounded-xl overflow-hidden shadow-sm shrink-0">
                                                            <img
                                                                src={event.image || '/yoga_nature.png'}
                                                                alt={event.title}
                                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                            />
                                                        </div>

                                                        {/* Text Info */}
                                                        <div className="flex flex-col justify-center gap-1 min-w-0">
                                                            <h3 className="text-lg font-bold text-gray-800 font-sans truncate pr-4">
                                                                {event.title}
                                                            </h3>
                                                            <p className={`text-sm text-gray-500 leading-relaxed ${!isExpanded && 'line-clamp-2'}`}>
                                                                {event.description}
                                                            </p>
                                                            {isExpanded && event.type && (
                                                                <span className="inline-block mt-2 text-xs font-semibold text-wood bg-wood/10 px-2 py-0.5 rounded-full w-fit">
                                                                    {event.type}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Subscribe Action (Only visible when expanded) */}
                                                    {isExpanded && (
                                                        <div className="mt-2 pt-3 border-t border-gray-100 flex justify-end animate-in fade-in cursor-default" onClick={e => e.stopPropagation()}>
                                                            <button className="bg-wood text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-wood/90 transition-colors shadow-sm hover:shadow active:scale-95 transform">
                                                                Suscribirse a esta clase
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* 3. Action (Right) */}
                                                <div className="w-12 flex items-center justify-center border-l border-gray-100 bg-gray-50/30 text-gray-400 group-hover:text-wood group-hover:bg-wood/5 transition-colors">
                                                    <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-90' : 'group-hover:translate-x-1'}`}>
                                                        <ChevronRight size={20} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}

                        {/* Empty State */}
                        {calendarDays.filter(day => isSameMonth(day, monthStart) && getEventsForDay(day).length > 0).length === 0 && (
                            <div className="text-center py-20 text-gray-400">
                                No hay actividades programadas para este mes.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
