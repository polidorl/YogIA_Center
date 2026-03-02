'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import BookingCard from './BookingCard';
import AuthModal from './AuthModal';
import CalendarGrid from './CalendarGrid';
import { supabase } from '../lib/supabaseClient';
import ConceptModal from './ConceptModal';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar as CalendarIcon, LogOut, ChevronDown, Github, Linkedin, MessageCircle, Instagram, MapPin, Sparkles, LayoutDashboard } from 'lucide-react';
import YogaFeatureSection from './YogaFeatureSection';

// Mock data until backend is connected
const MOCK_CLASSES = [
    {
        id: 1,
        nombre: 'Vinyasa Flow',
        descripcion: 'Es una danza coordinada donde sincronizas el movimiento corporal al inhalar y exhalar.',
        resumen: 'Conecta respiración con cambios de posturas ágiles.',
        duracion: 60,
        //precio: 15,//
        nivel: 'Intermedio',
        //imagen: 'https://images.unsplash.com/photo-1695795749640-4f31c388b476?q=80&w=687&auto=format&fit=crop',//
        imagen: 'yoga_vinyasa_yo.png',
        instructor: { nombre: 'Lisbeth' }
    },
    {
        id: 2,
        nombre: 'Yin Yoga Relax',
        descripcion: 'Es una práctica lenta y pasiva, derivada del Hatha Yoga, enfocada en sostener posturas en el suelo de 2 a 5 minutos (o más) para estirar los tejidos conectivos profundos (fascia, ligamentos, tendones) en lugar de los músculos. Busca relajar el sistema nervioso, aumentar la flexibilidad articular y calmar la mente.',
        resumen: 'Estiramientos profundos y relajación total para el estrés.',
        duracion: 75,
        //precio: 18,//
        nivel: 'Todos',
        imagen: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=1026&auto=format&fit=crop',
        instructor: { nombre: 'Francisco' }
    },
    {
        id: 3,
        nombre: 'Power Core',
        descripcion: 'Es una práctica dinámica y exigente que se centra en el fortalecimiento del core (centro del cuerpo), que incluye los músculos abdominales, lumbares, pélvicos y de la cadera. Combina elementos del yoga tradicional con ejercicios de fuerza y resistencia, buscando mejorar la estabilidad, la postura y la potencia física.',
        resumen: 'Fuerza abdominal y resistencia física intensa.',
        duracion: 60,
        //precio: 20,//
        nivel: 'Avanzado',
        imagen: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&q=80',
        instructor: { nombre: 'Franlex' }
    },
    {
        id: 4,
        nombre: 'Ashtanga',
        descripcion: 'Es una secuencia dinámica y fluida de posturas (asanas) que se realiza en un orden específico y sincronizado con la respiración (vinyasa). Se caracteriza por su intensidad física, el calor interno que genera y la disciplina que requiere, ya que sigue una serie progresiva de posturas que desafían la fuerza, la flexibilidad y la concentración.',
        resumen: 'Fuerza abdominal y resistencia física intensa.',
        duracion: 60,
        //precio: 20,//
        nivel: 'Avanzado',
        imagen: 'https://images.unsplash.com/photo-1717821681365-36b0da044a75?q=80&w=1074&auto=format&fit=crop',
        instructor: { nombre: 'Lexfer' }
    },
    {
        id: 5,
        nombre: 'Bikram',
        descripcion: 'Es una práctica de yoga que se realiza en una sala calentada a aproximadamente 40°C (105°F) con un alto nivel de humedad. Consiste en una secuencia fija de 26 posturas y dos ejercicios de respiración que se practican en un orden específico y se mantienen durante un tiempo determinado. El calor intenso ayuda a aumentar la flexibilidad, desintoxicar el cuerpo a través del sudor y desafiar la resistencia mental y física.',
        resumen: 'Modalidad de hot yoga,para desintoxicar el cuerpo..',
        duracion: 60,
        //precio: 20,//
        nivel: 'Avanzado',
        imagen: 'https://images.unsplash.com/photo-1599447292325-2cffaa79bcbb?q=80&w=1106&auto=format&fit=crop',
        instructor: { nombre: 'Lisbeth' }
    },
    {
        id: 6,
        nombre: 'Power Yoga',
        descripcion: 'Es una práctica dinámica y vigorosa que combina la fluidez del Vinyasa Yoga con elementos de fitness y entrenamiento de fuerza. Se caracteriza por secuencias de posturas que se mantienen por menos tiempo que en otros estilos, permitiendo un mayor enfoque en la tonificación muscular, la resistencia cardiovascular y la quema de calorías. A menudo incluye saltos, movimientos rápidos y transiciones fluidas entre posturas, lo que lo convierte en un entrenamiento desafiante y energizante.',
        resumen: 'Derivada del Ashtanga-vinyasa, que se caracteriza por un ritmo rápido y dinámico.',
        duracion: 60,
        //precio: 20,//
        nivel: 'Avanzado',
        imagen: 'https://images.unsplash.com/photo-1767611121720-25180d5b5a1e?q=80&w=1170&auto=format&fit=crop',
        instructor: { nombre: 'Lucía' }
    },
    {
        id: 7,
        nombre: 'Hatha Yoga',
        descripcion: 'Es una práctica de yoga que se centra en la alineación precisa del cuerpo, la respiración consciente (pranayama) y la meditación. A diferencia de estilos más dinámicos como el Vinyasa o el Ashtanga, el Hatha Yoga se caracteriza por mantener cada postura durante varias respiraciones, permitiendo un mayor enfoque en la estabilidad, la flexibilidad y la conexión mente-cuerpo. Es ideal para principiantes, ya que permite aprender las posturas básicas de forma segura y consciente.',
        resumen: 'Equilibra la energía del cuerpo y la mente.',
        duracion: 60,
        //precio: 20,//
        nivel: 'Avanzado',
        imagen: 'https://images.unsplash.com/photo-1667890786022-83bca6c4f4c2?q=80&w=687&auto=format&fit=crop',
        instructor: { nombre: 'Raquel' }
    },
    {
        id: 8,
        nombre: 'Iyengar Yoga',
        descripcion: 'Es una práctica de yoga que se caracteriza por su enfoque en la alineación precisa del cuerpo y el uso de accesorios (props) como bloques, cinturones, mantas y sillas para ayudar a los practicantes a lograr la postura correcta de manera segura y efectiva. Fundado por B.K.S. Iyengar, este estilo pone énfasis en la precisión anatómica, la estabilidad y la duración prolongada de las posturas, permitiendo una comprensión profunda de cada asana y sus beneficios terapéuticos.',
        resumen: 'Enfoque en la alineación precisa del cuerpo y el uso de accesorios como bloques, cinturones, mantas y sillas para ayudar a los practicantes a lograr la postura correcta de manera segura y efectiva.',
        duracion: 60,
        //precio: 20,//
        nivel: 'medio',
        imagen: 'https://plus.unsplash.com/premium_photo-1664442990583-43a42393fd87?q=80&w=687&auto=format&fit=crop',
        instructor: { nombre: 'Elisabeth' }
    },
    {
        id: 9,
        nombre: 'Restaurativo',
        descripcion: 'Es una práctica de yoga suave y meditativa que se centra en la relajación profunda del cuerpo y la mente. Utiliza accesorios como mantas, almohadones y bloques para apoyar el cuerpo en posturas cómodas y sostenidas durante períodos prolongados (generalmente de 5 a 20 minutos). El objetivo es liberar la tensión muscular, calmar el sistema nervioso y promover la sanación integral, permitiendo que el cuerpo se recupere del estrés físico y emocional.',
        resumen: 'Relajación profunda del cuerpo y la mente.',
        duracion: 60,
        //precio: 20,//
        nivel: 'principiante',
        imagen: 'https://images.unsplash.com/photo-1767611115202-78fc7374286e?q=80&w=1740&auto=format&fit=crop',
        instructor: { nombre: 'Evelia' }
    },
    {
        id: 10,
        nombre: 'Yoga Nidra',
        descripcion: 'Es una práctica de yoga meditativa que se realiza en posición acostada (Savasana) y se conoce como el "sueño yóguico". Durante la sesión, el practicante se guía a través de una relajación profunda y sistemática, rotando la conciencia por diferentes partes del cuerpo mientras permanece despierto pero en un estado de relajación profunda. El objetivo es liberar la tensión física, mental y emocional, permitiendo que el cuerpo se recupere y se regenere.',
        resumen: 'Relajación profunda del cuerpo y la mente.',
        duracion: 60,
        //precio: 20,//
        nivel: 'principiante',
        //precio: 20,//
        nivel: 'principiante',
        imagePosition: '50% 75%',
        imagen: 'yoga-nidra.jpg',
        instructor: { nombre: 'Lisbeth' }
    },
    {
        id: 11,
        nombre: 'Yoga Kundalini',
        descripcion: 'Es una práctica de yoga que se centra en el despertar de la energía Kundalini, que se cree que reside en la base de la columna vertebral. Combina posturas físicas (asanas), técnicas de respiración (pranayama), canto de mantras, meditación y movimientos repetitivos (kriyas) para estimular el flujo de energía a lo largo de los chakras o centros energéticos del cuerpo. El objetivo es lograr la conciencia espiritual, la sanación integral y la unión con lo divino.',
        resumen: 'Disciplina física, mental y espiritual que busca despertar la energía vital.',
        duracion: 60,
        //precio: 20,//
        nivel: 'Avanzado',
        imagen: 'https://images.unsplash.com/photo-1606487704494-4e2fa9969cb5?q=80&w=735&auto=format&fit=crop',
        instructor: { nombre: 'Lauren' }
    },
    {
        id: 12,
        nombre: 'Yoga',
        descripcion: 'Mira a tu alrededor: la naturaleza no tiene prisa y, sin embargo, todo llega a su tiempo. Tu práctica de yoga es igual. No se trata de lograr la postura perfecta hoy, sino de estar presente en el proceso. En esta imagen celebramos la armonía entre el cuerpo y el entorno. La disciplina diaria es lo que nos permite sentarnos en la roca más firme de nuestra propia paz mental.',
        resumen: 'Una postura abierta, el entorno natural y la sonrisa son elementos perfectos.',
        duracion: 60,
        //precio: 20,//
        //nivel: 'Todos los niveles',
        imagen: 'yoga-nature.jpg',
        instructor: { nombre: 'Lisbeth' }
    }
];



const MOCK_BOOKINGS = [
    // Example booking: Today + 1 day at 10:00
    {
        id: '1',
        fecha_inicio: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(10, 0, 0, 0),
        fecha_fin: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(11, 0, 0, 0),
        clase: MOCK_CLASSES[0]
    }
];

export default function MainApp() {
    const [view, setView] = useState('client'); // 'client' or 'admin'
    const [bookings, setBookings] = useState(MOCK_BOOKINGS);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [yogaMenuOpen, setYogaMenuOpen] = useState(false);
    const [showConceptModal, setShowConceptModal] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [dbStatus, setDbStatus] = useState('checking');
    const audioRef = useRef(null);
    const videoRef = useRef(null);
    const [isMusicEnabled, setIsMusicEnabled] = useState(true);

    useEffect(() => {
        // Helper to fetch role
        const getUserRole = async (uid) => {
            const { data } = await supabase
                .from('perfiles')
                .select('rol')
                .eq('id', uid)
                .single();
            setUserRole(data?.rol);
        };

        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            if (session?.user) getUserRole(session.user.id);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                getUserRole(session.user.id);
            } else {
                setUserRole(null);
            }
        });

        // Check DB connection
        const checkConnection = async () => {
            try {
                // Simple query to check if we can connect
                const { error } = await supabase.from('perfiles').select('count', { count: 'exact', head: true });
                if (error) throw error;
                setDbStatus('connected');
            } catch (err) {
                console.error('Error connecting to Supabase:', err);
                setDbStatus('error');
            }
        };

        checkConnection();

        return () => subscription.unsubscribe();
    }, []);

    // Set initial audio volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.4;
        }
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setView('client'); // Redirect to client view on logout
    };

    const handleBook = async (clase) => {
        if (clase) {
            setSelectedClass(clase);
            setShowConceptModal(true);
        } else {
            setShowConceptModal(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-white text-gray-800 font-sans">
            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
            <ConceptModal isOpen={showConceptModal} onClose={() => setShowConceptModal(false)} clase={selectedClass} />

            {/* Navbar */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold tracking-tight text-wood cursor-pointer" onClick={() => {
                        setView('client');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}>
                        YogIA<span className="text-brand-lavender text-3xl">.</span>
                    </h1>
                </div>

                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-gray-600 md:hidden">
                    {sidebarOpen ? <X /> : <Menu />}
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <button
                        onClick={() => {
                            setView('client');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-sm font-medium text-gray-500 hover:text-wood transition-colors"
                    >
                        Inicio
                    </button>
                    <div className="relative" onMouseLeave={() => setYogaMenuOpen(false)}>
                        <button
                            onMouseEnter={() => setYogaMenuOpen(true)}
                            onClick={() => {
                                setView('client');
                                setTimeout(() => {
                                    document.getElementById('yoga')?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                            }}
                            className={`flex items-center gap-1 text-sm font-medium transition-colors ${view === 'client' ? 'text-wood' : 'text-gray-500 hover:text-wood'}`}
                        >
                            Yoga
                            <ChevronDown size={14} className={`transition-transform ${yogaMenuOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {yogaMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2 z-50"
                                >
                                    {['Vinyasa', 'Ashtanga', 'Power Yoga', 'Hatha', 'Yin Yoga', 'Restaurativo', 'Yoga Nidra', 'Yoga Kundalini'].map((item) => (
                                        <button
                                            key={item}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-brand-mint/20 hover:text-wood transition-colors"
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <button
                        onClick={() => document.getElementById('calendario')?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-sm font-medium text-gray-500 hover:text-wood transition-colors"
                    >
                        Calendario
                    </button>
                    <button
                        onClick={() => document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-sm font-medium text-gray-500 hover:text-wood transition-colors"
                    >
                        Blog
                    </button>
                    {/* <button className="text-sm font-medium text-gray-500 hover:text-wood transition-colors">
                        Accesorios
                    </button> */}
                    <button
                        onClick={() => document.getElementById('sobre-mi')?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-sm font-medium text-gray-500 hover:text-wood transition-colors"
                    >
                        Sobre mi
                    </button>
                    <button
                        onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-sm font-medium text-gray-500 hover:text-wood transition-colors"
                    >
                        Contacto
                    </button>
                    {user && userRole === 'admin' && (
                        <button
                            onClick={() => setView('admin')}
                            className={`text-sm font-medium transition-colors ${view === 'admin' ? 'text-wood' : 'text-gray-500 hover:text-wood'}`}
                        >
                            Admin
                        </button>
                    )}

                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-gray-600">Hola, {user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
                            >
                                <LogOut size={16} />
                                Salir
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowAuthModal(true)}
                            className="bg-wood text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#4a7a4d] transition-colors shadow-lg shadow-wood/20"
                        >
                            Login
                        </button>
                    )}
                </div>

            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-40 bg-white md:hidden pt-28 px-6 flex flex-col gap-6 overflow-y-auto"
                    >
                        <button
                            onClick={() => {
                                setSidebarOpen(false);
                                setView('client');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="text-xl font-medium text-gray-800 hover:text-wood text-left border-b border-gray-100 pb-4"
                        >
                            Inicio
                        </button>
                        <button
                            onClick={() => {
                                setSidebarOpen(false);
                                setView('client');
                                setTimeout(() => {
                                    document.getElementById('yoga')?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                            }}
                            className="text-xl font-medium text-gray-800 hover:text-wood text-left border-b border-gray-100 pb-4"
                        >
                            Yoga
                        </button>
                        <button
                            onClick={() => {
                                setSidebarOpen(false);
                                document.getElementById('calendario')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="text-xl font-medium text-gray-800 hover:text-wood text-left border-b border-gray-100 pb-4"
                        >
                            Calendario
                        </button>
                        <button
                            onClick={() => {
                                setSidebarOpen(false);
                                document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="text-xl font-medium text-gray-800 hover:text-wood text-left border-b border-gray-100 pb-4"
                        >
                            Blog
                        </button>
                        <button
                            onClick={() => {
                                setSidebarOpen(false);
                                document.getElementById('sobre-mi')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="text-xl font-medium text-gray-800 hover:text-wood text-left border-b border-gray-100 pb-4"
                        >
                            Sobre mi
                        </button>
                        <button
                            onClick={() => {
                                setSidebarOpen(false);
                                document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="text-xl font-medium text-gray-800 hover:text-wood text-left border-b border-gray-100 pb-4"
                        >
                            Contacto
                        </button>

                        {user ? (
                            <div className="mt-auto mb-8 space-y-4">
                                <div className="flex items-center gap-3 text-gray-600 mb-4">
                                    <div className="w-10 h-10 bg-brand-mint/20 rounded-full flex items-center justify-center text-wood font-bold">
                                        {user.email?.[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{user.user_metadata?.full_name || 'Usuario'}</p>
                                        <p className="text-sm">{user.email}</p>
                                    </div>
                                </div>
                                {user && userRole === 'admin' && (
                                    <button
                                        onClick={() => {
                                            setSidebarOpen(false);
                                            setView('admin');
                                        }}
                                        className={`w-full py-3 rounded-xl text-center font-medium transition-colors ${view === 'admin' ? 'bg-wood text-white' : 'bg-gray-100 text-gray-600'}`}
                                    >
                                        Panel Admin
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setSidebarOpen(false);
                                    }}
                                    className="w-full py-3 rounded-xl text-center font-medium text-red-500 bg-red-50 hover:bg-red-100"
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => {
                                    setSidebarOpen(false);
                                    setShowAuthModal(true);
                                }}
                                className="mt-auto mb-8 w-full bg-wood text-white py-4 rounded-xl text-lg font-bold shadow-lg shadow-wood/20 hover:bg-[#4a7a4d] transition-colors"
                            >
                                Iniciar Sesión
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="pt-28 px-4 md:px-8 pb-20 max-w-7xl mx-auto">
                {view === 'client' ? (
                    <div className="space-y-16">
                        <section className="text-center space-y-8 mb-10 px-4">
                            <span className="inline-block py-1.5 px-4 rounded-full bg-brand-lavender/30 text-purple-800 text-sm font-light tracking-wide mb-2">
                                ! 🚀 Proyecto Ilustrativo: Una aplicación que combina el potencial de la IA con ajustes técnicos personalizados. !
                            </span>
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 uppercase tracking-tight leading-[1.1] mb-6">
                                Pequeños pasos,<br className="hidden md:block" /> grandes cambios.
                            </h2>

                            {/* Cambio clave: max-w-4xl y balanceo de texto */}
                            <p className="text-lg md:text-xl text-gray-600 font-light max-w-4xl mx-auto leading-relaxed tracking-wide text-pretty">
                                Integra el movimiento consciente en tu día a día. Escucha a tu cuerpo,
                                respeta tu ritmo y conecta con tu esencia para seguir tu propio camino.
                            </p>
                        </section>

                        <section className="relative w-full h-[500px] md:h-[600px] rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl bg-gray-900">
                            <Image
                                src="hero-landscape.png"
                                alt="Portada YogIA"
                                fill
                                className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
                                priority
                            />
                        </section>

                        <section className="relative">
                            <div id="yoga" className="absolute -top-32 left-0" />
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-bold text-gray-800">Tipos de Yoga</h3>
                                <button className="text-wood font-medium text-sm hover:underline">Ver todas</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {MOCK_CLASSES.map(clase => (
                                    <BookingCard key={clase.id} clase={clase} onBook={handleBook} />
                                ))}
                            </div>
                        </section>

                        <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                            <div id="calendario" className="absolute -top-32 left-0" />
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-mint/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <h3 className="text-2xl font-bold mb-8 relative z-10">Tu Agenda Semanal</h3>
                            <div className="h-[600px] relative z-10">
                                <CalendarGrid bookings={bookings} onDateSelect={(d) => console.log(d)} />
                            </div>
                        </section>

                        <section className="space-y-20 relative">
                            <div id="blog" className="absolute -top-32 left-0" />

                            {/* Article 1: Split View - Video & Intro */}
                            <article className="pb-8 pt-0 md:pb-12 md:pt-0">
                                <section className="text-center space-y-4 mb-8 max-w-4xl mx-auto px-4">
                                    <span className="inline-block py-1.5 px-4 rounded-full bg-brand-wood/10 text-wood text-sm font-bold tracking-wider uppercase">
                                        Tips para Devs
                                    </span>
                                    <h2 className="text-2xl md:text-3xl font-bold text-green-700 font-heading leading-tight">
                                        Bienestar en la Era Digital
                                    </h2>
                                    <p className="text-gray-600 text-lg leading-relaxed relative z-10 font-light">
                                        Optimiza tu sistema operativo más importante: <span className="text-wood font-medium">Tú mismo.</span>
                                    </p>
                                </section>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                                    {/* Video Column */}
                                    <div className="relative group rounded-3xl overflow-hidden shadow-2xl shadow-gray-200 border-[6px] border-white transform transition-transform hover:scale-[1.01] duration-500 bg-white">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none z-10" />
                                        <video
                                            ref={videoRef}
                                            className="w-full aspect-video object-cover"
                                            controls
                                            muted
                                            onPlay={() => isMusicEnabled && audioRef.current?.play()}
                                            onPause={() => audioRef.current?.pause()}
                                        >
                                            <source src="yoga_Video.mp4" type="video/mp4" />
                                        </video>
                                        <audio ref={audioRef} loop src="yoga_music.mp3" />
                                        <button
                                            onClick={() => {
                                                const newMusicState = !isMusicEnabled;
                                                setIsMusicEnabled(newMusicState);

                                                if (newMusicState && !videoRef.current?.paused) {
                                                    audioRef.current?.play();
                                                } else {
                                                    audioRef.current?.pause();
                                                }
                                            }}
                                            className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full text-wood hover:bg-white transition-colors z-20 shadow-sm"
                                            title={isMusicEnabled ? "Silenciar Música" : "Activar Música"}
                                        >
                                            {isMusicEnabled ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
                                            )}
                                        </button>
                                    </div>

                                    {/* Text Content Column */}
                                    <div className="space-y-8 lg:pt-2">
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                                                <div className="w-8 h-1 bg-wood rounded-full"></div>
                                                ¿Qué es el Yoga realmente?
                                            </h3>
                                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                                En el desarrollo web, buscamos que una interfaz sea <span className="font-semibold text-wood">Responsive</span>. El Yoga busca lo mismo: entrenar tu mente para ser resiliente y adaptable ante los desafíos del día a día.
                                            </p>
                                            <p className="text-gray-600 text-lg leading-relaxed">
                                                No se trata solo de flexibilidad física, sino de <strong>Unión y Adaptabilidad</strong> mental.
                                            </p>
                                        </div>

                                        <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                                            <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2 relative z-10">
                                                <Sparkles className="text-wood" size={24} />
                                                Beneficios del "System Update"
                                            </h4>

                                            <p className="text-gray-600 leading-relaxed relative z-10">
                                                Practicar regularmente equivale a una <strong>Limpieza de Caché</strong> profunda: elimina el ruido mental, reduce la latencia en tu toma de decisiones y optimiza tu energía creativa para que codifiques mejor.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Reducción del Estrés */}
                                <YogaFeatureSection
                                    imageSrc="yoga_reduccion_estres.png"
                                    imageAlt="Reducción del Estrés"
                                    title="Reducción del Estrés"
                                    description="A través de la respiración consciente Pranayama), calmamos el sistema nervioso, reduciendo la ansiedad que genera el ritmo de vida actual."
                                    secondaryTitle="Salud Física y Flexibilidad"
                                    secondaryDescription="Ayuda a corregir la postura (especialmente si pasamos muchas horas frente al computador), fortalece los músculos y mejora la capacidad pulmonar."
                                    className="!py-8 lg:!py-12"
                                />

                                {/* Claridad Mental */}
                                <YogaFeatureSection
                                    imageSrc="yoga_Claridad_Mental.png"
                                    imageAlt="Claridad Mental y Enfoque"
                                    title="Claridad Mental y Enfoque"
                                    description="Al silenciar el ruido externo durante la práctica, mejoramos nuestra capacidad de concentración, lo que se traduce en una mayor productividad y creatividad en nuestros proyectos."
                                    secondaryTitle="Equilibrio Integral"
                                    secondaryDescription="Nos ayuda a conectar con nuestras señales internas, permitiéndonos gestionar mejor nuestras emociones y mejorar la calidad del sueño."
                                    isReversed
                                    className="!py-8 lg:!py-12"
                                />

                                <article className="space-y-8">
                                    <div className="max-w-3xl mx-auto text-center">
                                        <span className="text-brand-wood font-bold tracking-wider uppercase text-sm">Tips para Devs</span>
                                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4 font-heading">
                                            5 Tips de Yoga para Techies: Optimiza tu "Hardware" Humano
                                        </h2>
                                        <p className="text-gray-600 text-lg font-sans">
                                            Si pasas horas frente a una pantalla, sabes que el cuerpo termina pasando factura. En YogIA Center aplicamos la filosofía de la IA para optimizar procesos, ¿por qué no optimizar el nuestro?
                                        </p>
                                    </div>
                                </article>

                                {/* Tip 1 */}
                                <YogaFeatureSection
                                    imageSrc="blog_tip_neck.jpg"
                                    imageAlt="El Reset de Cuello"
                                    title="Tip 1"
                                    description="Realiza círculos suaves con el cuello y estiramientos laterales. Libera tensión cervical y mejora el flujo sanguíneo al cerebro para mantenerte enfocado."
                                    secondaryTitle="El Reset de Cuello"
                                    secondaryDescription=""
                                    className="!py-8 lg:!py-12"
                                />

                                {/* Tip 2 */}
                                <YogaFeatureSection
                                    imageSrc="blog_tip_wrist.jpg"
                                    imageAlt="Estiramiento de Muñecas"
                                    title="Tip 2"
                                    description="Estira brazos y dedos para prevenir el túnel carpiano tras largas sesiones de typing. Previene tensión, lesiones y relaja los tendones."
                                    secondaryTitle="Estiramiento de Muñecas"
                                    secondaryDescription=""
                                    isReversed
                                    bgColor="bg-transparent"
                                    id="tip2"
                                    className="!py-8 lg:!py-12"
                                />

                                {/* Tip 3 */}
                                <YogaFeatureSection
                                    imageSrc="blog_tip_cobra.jpg"
                                    imageAlt="La Postura de la Cobra"
                                    title="Tip 3"
                                    description="Abre el pecho y mejora la capacidad respiratoria, contrarrestando la postura de techie encorvada. Mejora la capacidad respiratoria y corrige la postura."
                                    secondaryTitle="La Postura de la Cobra"
                                    secondaryDescription=""
                                    bgColor="bg-transparent"
                                    id="tip3"
                                    className="!py-8 lg:!py-12"
                                />

                                {/* Tip 4 */}
                                <YogaFeatureSection
                                    imageSrc="blog_tip_eyes.jpg"
                                    imageAlt="Regla 20-20-20"
                                    title="Tip 4"
                                    description="Cada 20 minutos, mira a 20 pies de distancia por 20 segundos. Relaja los músculos oculares y previene dolores de cabeza por fatiga visual."
                                    secondaryTitle="Regla 20-20-20"
                                    secondaryDescription=""
                                    isReversed
                                    bgColor="bg-transparent"
                                    id="tip4"
                                    className="!py-8 lg:!py-12"
                                />

                                {/* Tip 5 */}
                                <YogaFeatureSection
                                    imageSrc="blog_tip_breath.jpg"
                                    imageAlt="Respiración Consciente"
                                    title="Tip 5"
                                    description="Inhala, retén, exhala y retén en 4 tiempos. Calma el sistema nervioso y devuelve la claridad mental en momentos de estrés o debugging intenso."
                                    secondaryTitle="Respiración Consciente"
                                    secondaryDescription=""
                                    isReversed
                                    bgColor="bg-transparent"
                                    id="tip5"
                                    className="!py-8 lg:!py-12"
                                />
                            </article>
                        </section>

                        {/* About Me Section */}
                        <section className="mb-20 px-6 pt-6 pb-12 bg-gray-50 rounded-3xl relative">
                            <div id="sobre-mi" className="absolute -top-32 left-0" />
                            <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
                                {/* Text Column (60%) */}
                                <div className="md:w-3/5 space-y-6">

                                    <h3 className="text-xl md:text-2xl font-light italic text-wood">
                                        "Código que fluye, soluciones que conectan."
                                    </h3>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        Combinar la disciplina de la ingeniería petrolera con la fluidez del Yoga me permite ver el desarrollo web desde una perspectiva distinta. Mi nombre es Lisbeth y me especializo en crear interfaces que se adaptan con la misma naturalidad con la que transitamos entre asanas.
                                        <br /><br />
                                        Mi misión es transformar desafíos complejos en Páginas Web intuitivas y funcionales. Utilizo mi capacidad analítica para asegurar que cada píxel de tu sitio tenga un propósito claro: conectar con tu audiencia y potenciar el crecimiento de tu marca.
                                    </p>
                                </div>
                                {/* Image Column (40%) */}
                                <div className="md:w-2/5">
                                    <div className="relative rounded-[2rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-all duration-300">
                                        <img
                                            src="about-me.jpg"
                                            alt="Lisbeth E. Polidor"
                                            className="w-full h-auto object-cover"
                                        />
                                        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[2rem]"></div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Contact Section */}
                        <section id="contacto" className="relative w-full rounded-3xl overflow-hidden mb-16 shadow-xl bg-gray-900 group">
                            <div className="relative h-[500px]">
                                <img
                                    src="contact-hero.png"
                                    alt="Lisbeth Yoga Posa"
                                    className="w-full h-full object-cover object-center"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-sm p-8 text-center text-white">
                                    <h3 className="text-3xl font-bold mb-2 text-wood-light">Lisbeth E Polidor</h3>
                                    <div className="w-16 h-1 bg-brand-mint mx-auto mb-4 rounded-full"></div>
                                    <p className="text-xl font-medium mb-1">Frontend Dev y Yoguista.</p>
                                    <p className="text-sm text-gray-300">Comencé a crear sitios web en: 2022</p>

                                    <div className="flex items-center justify-center gap-8 mt-5">
                                        <a href="https://www.linkedin.com/in/lisbeth-emperatriz-polidor-solano?trk=public_profile_browsemap" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-brand-mint transition-colors transform hover:scale-110">
                                            <Linkedin size={28} />
                                        </a>
                                        <a href="https://github.com/polidorl" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-brand-mint transition-colors transform hover:scale-110">
                                            <Github size={28} />
                                        </a>
                                        <a href="https://instagram.com/polidor.lisbeth4" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-brand-mint transition-colors transform hover:scale-110">
                                            <Instagram size={28} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="mb-20">
                            <div className="text-center mb-12">
                                <h3 className="text-4xl font-bold text-gray-800 mb-2">Contacto</h3>
                                <p className="text-xl text-wood font-medium">¡Web de exhibición realizada con IA y <strong>ajuste técnico personalizado</strong> para cada necesidad!</p>
                                <p className="mt-4 text-gray-600">
                                    Si deseas más información, revisa en: <a href="https://github.com/polidorl/" target="_blank" rel="noopener noreferrer" className="text-brand-mint hover:underline font-medium">https://github.com/polidorl/</a>
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                {/* Map Column */}
                                <div className="h-[400px] w-full rounded-3xl overflow-hidden shadow-lg border border-gray-100 relative bg-gray-100">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.376887532323!2d-66.86007782414757!3d10.432822989189155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2a57868018e693%3A0x7d8383c07223b2c9!2sParque%20Vinicio%20Adames!5e0!3m2!1ses-419!2sve!4v1707238295988!5m2!1ses-419!2sve"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Ubicación Yoga Center"
                                    ></iframe>
                                </div>

                                {/* Form Column */}
                                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                                    <form className="space-y-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                                            <input
                                                type="text"
                                                id="name"
                                                placeholder="Tu nombre"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wood focus:ring-2 focus:ring-wood/20 outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                placeholder="Tu correo"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wood focus:ring-2 focus:ring-wood/20 outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Comentarios</label>
                                            <textarea
                                                id="message"
                                                rows={4}
                                                placeholder="Tus comentarios"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wood focus:ring-2 focus:ring-wood/20 outline-none transition-all resize-none"
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-[#1a4031] text-white font-medium py-3 rounded-xl hover:bg-[#2c5e4a] transition-colors shadow-lg shadow-green-900/20"
                                        >
                                            Enviar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </section>
                    </div>
                ) : (
                    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-gray-800">
                                <div className="p-2 bg-wood text-white rounded-lg">
                                    <LayoutDashboard size={24} />
                                </div>
                                Panel de Administración
                            </h2>
                            <div className="text-sm text-gray-400 flex flex-col items-end gap-1">
                                <div>Bienvenido, {user?.user_metadata?.full_name || user?.email}</div>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${dbStatus === 'connected' ? 'bg-green-500' :
                                        dbStatus === 'error' ? 'bg-red-500' : 'bg-yellow-500 animate-pulse'
                                        }`}></div>
                                    <span className={`text-xs ${dbStatus === 'connected' ? 'text-green-600' :
                                        dbStatus === 'error' ? 'text-red-500' : 'text-yellow-600'
                                        }`}>
                                        {dbStatus === 'connected' ? 'Base de Datos: Conectada' :
                                            dbStatus === 'error' ? 'Error de Conexión' : 'Conectando...'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            <div className="p-6 bg-brand-mint/30 rounded-2xl border border-brand-mint hover:scale-105 transition-transform cursor-default">
                                <div className="text-gray-600 text-sm font-medium mb-1">Clases Hoy</div>
                                <div className="text-4xl font-extrabold text-wood">4</div>
                            </div>
                            <div className="p-6 bg-brand-lavender/30 rounded-2xl border border-brand-lavender hover:scale-105 transition-transform cursor-default">
                                <div className="text-gray-600 text-sm font-medium mb-1">Alumnos Activos</div>
                                <div className="text-4xl font-extrabold text-wood">128</div>
                            </div>
                            <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100 hover:scale-105 transition-transform cursor-default">
                                <div className="text-gray-600 text-sm font-medium mb-1">Ingresos Mes</div>
                                <div className="text-4xl font-extrabold text-wood">$2.4k</div>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mb-6 text-gray-800">Calendario Global</h3>
                        <div className="h-[600px] border border-gray-100 rounded-2xl overflow-hidden">
                            <CalendarGrid bookings={bookings} onDateSelect={() => { }} />
                        </div>
                    </div>
                )
                }
            </main >

            {/* Footer */}
            < footer className="bg-gray-900 text-white py-12 px-6" >
                <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
                    <div className="flex items-center gap-8">
                        <a href="https://www.linkedin.com/in/lisbeth-emperatriz-polidor-solano?trk=public_profile_browsemap" target="_blank" rel="noopener noreferrer" className="hover:text-brand-mint transition-colors transform hover:scale-110">
                            <Linkedin size={28} />
                        </a>
                        <a href="https://github.com/polidorl" target="_blank" rel="noopener noreferrer" className="hover:text-brand-mint transition-colors transform hover:scale-110">
                            <Github size={28} />
                        </a>
                        <a href="https://instagram.com/polidor.lisbeth4" target="_blank" rel="noopener noreferrer" className="hover:text-brand-mint transition-colors transform hover:scale-110">
                            <Instagram size={28} />
                        </a>
                        <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-mint transition-colors transform hover:scale-110">
                            <MessageCircle size={28} />
                        </a>
                    </div>
                    <div className="text-center text-gray-400 text-sm">
                        <p>© 2026.Donde la Inteligencia Artificial (IA) y el criterio humano se unen para crear soluciones Web a la medida. <span className="text-white font-medium">Lisbeth E Polidor.</span></p>
                    </div>
                </div>
            </footer >
        </div >
    )
}
