'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2, Heart, Zap, Globe, Github, Linkedin, Instagram } from 'lucide-react';
import Image from 'next/image';

export default function SalesLanding({ onEnterApp }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-gray-900 overflow-x-hidden font-sans">
            {/* Header / Navbar */}
            <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-xl z-[100] border-b border-gray-100/50 flex items-center justify-between px-6 py-5 md:px-12">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold tracking-tight text-wood flex items-center">
                        YogIA<span className="text-brand-lavender text-3xl">.</span>
                    </h1>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onEnterApp}
                    className="bg-wood text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#4a7a4d] transition-all shadow-lg shadow-wood/20"
                >
                    Entrar a la Plataforma
                </motion.button>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="relative z-10"
                    >
                        <motion.span
                            variants={itemVariants}
                            className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-brand-lavender/40 text-purple-800 text-sm font-light tracking-wide mb-6"
                        >
                            <Sparkles size={14} /> La evolución del bienestar digital
                        </motion.span>
                        <motion.h2
                            variants={itemVariants}
                            className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.05] tracking-tight mb-8"
                        >
                            Tu equilibrio, <br />
                            <span className="text-wood">potenciado por IA.</span>
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className="text-xl text-gray-600 font-light max-w-xl leading-relaxed mb-10"
                        >
                            YogIA Center combina la sabiduría milenaria del yoga con la tecnología del futuro para ofrecerte una experiencia de bienestar totalmente personalizada y fluida.
                        </motion.p>
                        <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                            <button
                                onClick={onEnterApp}
                                className="bg-wood text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-[#4a7a4d] transition-all flex items-center gap-3 shadow-xl shadow-wood/30 group"
                            >
                                Empezar Ahora <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-50 transition-all">
                                Ver Planes
                            </button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="relative w-full aspect-square md:aspect-[4/3] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)]">
                            <Image
                                src="hero-landscape.png"
                                alt="Yoga and Technology"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-wood/20 to-transparent pointer-events-none" />
                        </div>

                        {/* Floating elements for visual depth */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-10 -right-10 w-32 h-32 bg-brand-mint/40 rounded-full blur-3xl"
                        />
                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-lavender/30 rounded-full blur-3xl font-bold"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Features / Benefits Section */}
            <section className="py-24 bg-white px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">¿Por qué elegir YogIA?</h2>
                        <div className="w-20 h-1.5 bg-wood mx-auto rounded-full mb-6" />
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">Optimiza tu "hardware" humano con nuestra tecnología de bienestar integral.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Conexión Inteligente', desc: 'Sincroniza tu ritmo cardíaco y niveles de energía con rutinas adaptadas por IA.', icon: <Zap className="text-wood" />, color: 'bg-brand-mint/20' },
                            { title: 'Ritmo Personalizado', desc: 'No más rutinas genéricas. Cada asana está diseñada para tu nivel de progreso actual.', icon: <Heart className="text-pink-500" />, color: 'bg-pink-50' },
                            { title: 'Comunidad Global', desc: 'Accede a clases con los mejores instructores del mundo desde cualquier lugar.', icon: <Globe className="text-blue-500" />, color: 'bg-blue-50' }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -10 }}
                                className={`p-10 rounded-[2.5rem] ${feature.color} border border-white shadow-sm hover:shadow-2xl transition-all group`}
                            >
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed font-light">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing / Tiers Section */}
            <section className="py-24 px-6 md:px-12 bg-brand-mint/10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Nuestros Planes</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">Inversiones pensadas para tu crecimiento personal.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                        {/* Basic Plan */}
                        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl relative overflow-hidden flex flex-col">
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold mb-2">Essential</h3>
                                <p className="text-gray-500">Para quienes inician su camino.</p>
                            </div>
                            <div className="text-5xl font-bold mb-8">$19<span className="text-lg text-gray-400">/mes</span></div>
                            <ul className="space-y-4 mb-10 flex-grow">
                                {['Acceso a 10 clases mensuales', 'IA Básica de Seguimiento', 'Comunidad en línea', 'Soporte vía email'].map((text, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-600">
                                        <CheckCircle2 size={18} className="text-wood" /> {text}
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-4 rounded-2xl border-2 border-wood text-wood font-bold hover:bg-brand-mint/20 transition-all">Seleccionar Essential</button>
                        </div>

                        {/* Premium Plan */}
                        <div className="bg-gray-900 text-white p-10 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden flex flex-col transform md:scale-105 border-4 border-wood/50">
                            <div className="absolute top-5 right-5 bg-wood text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Recomendado</div>
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold mb-2">Infinite Zen</h3>
                                <p className="text-gray-300">Experiencia completa e ilimitada.</p>
                            </div>
                            <div className="text-5xl font-bold mb-8">$49<span className="text-lg text-gray-500">/mes</span></div>
                            <ul className="space-y-4 mb-10 flex-grow">
                                {['Clases ilimitadas 24/7', 'IA Predictiva Personalizada', 'Sesiones 1-on-1 con Instructores', 'Acceso a Retiros Exclusivos'].map((text, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300">
                                        <CheckCircle2 size={18} className="text-wood" /> {text}
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={onEnterApp}
                                className="w-full py-4 rounded-2xl bg-wood text-white font-bold hover:bg-[#4a7a4d] transition-all shadow-lg shadow-wood/40"
                            >
                                Seleccionar Infinite Zen
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Footer */}
            <footer className="bg-white pt-24 pb-12 px-6 md:px-12 border-t border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20">
                        <div className="text-center md:text-left">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 italic text-gray-800">Ready to start?</h2>
                            <p className="text-xl text-gray-500 max-w-lg mb-8">Únete a miles de personas que ya están transformando su vida con YogIA Center.</p>
                            <button
                                onClick={onEnterApp}
                                className="bg-wood text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-[#4a7a4d] transition-all shadow-2xl shadow-wood/40"
                            >
                                Acceder Gratis a la Plataforma
                            </button>
                        </div>
                        <div className="flex items-center gap-10">
                            <a href="https://www.linkedin.com/in/lisbeth-emperatriz-polidor-solano?trk=public_profile_browsemap" target="_blank" rel="noopener noreferrer" className="p-4 bg-gray-50 rounded-full text-gray-600 hover:text-wood hover:bg-brand-mint/20 transition-all"><Linkedin size={28} /></a>
                            <a href="https://github.com/polidorl" target="_blank" rel="noopener noreferrer" className="p-4 bg-gray-50 rounded-full text-gray-600 hover:text-wood hover:bg-brand-mint/20 transition-all"><Github size={28} /></a>
                            <a href="https://instagram.com/polidor.lisbeth4" target="_blank" rel="noopener noreferrer" className="p-4 bg-gray-50 rounded-full text-gray-600 hover:text-wood hover:bg-brand-mint/20 transition-all"><Instagram size={28} /></a>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 text-gray-400 text-sm">
                        <p>© 2026 YogIA Center. Todos los derechos reservados.</p>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-wood transition-colors">Términos</a>
                            <a href="#" className="hover:text-wood transition-colors">Privacidad</a>
                            <a href="#" className="hover:text-wood transition-colors">Soporte</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
