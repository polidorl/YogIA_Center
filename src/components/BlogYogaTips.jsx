import React from 'react';
import YogaFeatureSection from './YogaFeatureSection';
import { ListTree, ArrowRight } from 'lucide-react';

const BlogYogaTips = () => {
    const tips = [
        {
            id: "neck-reset",
            imageSrc: "/blog_tip_neck.jpg",
            title: "1. El 'Reset' de Cuello",
            description: "Realiza círculos suaves con el cuello y estiramientos laterales. Libera tensión cervical y mejora el flujo sanguíneo al cerebro.",
        },
        {
            id: "wrist-stretch",
            imageSrc: "/blog_tip_wrist.jpg",
            title: "2. Estiramiento de Muñecas",
            description: "Estira brazos y dedos para prevenir el túnel carpiano tras largas sesiones de typing. Relaja los tendones.",
        },
        {
            id: "cobra-pose",
            imageSrc: "/blog_tip_cobra.jpg",
            title: "3. La Postura de la Cobra",
            description: "Abre el pecho y mejora la capacidad respiratoria, contrarrestando la postura encorvada frente al monitor.",
        },
        {
            id: "eye-rule",
            imageSrc: "/blog_tip_eyes.jpg",
            title: "4. Regla 20-20-20",
            description: "Cada 20 minutos, mira a 20 pies de distancia por 20 segundos. Relaja los músculos oculares.",
        },
        {
            id: "square-breath",
            imageSrc: "/blog_tip_breath.jpg",
            title: "5. Respiración Cuadrada",
            description: "Inhala, retén, exhala y retén en 4 tiempos. Devuelve la claridad mental en momentos de debugging intenso.",
        }
    ];

    return (
        <article className="bg-white">
            {/* Header del Blog */}
            <header className="max-w-4xl mx-auto text-center pt-20 pb-12 px-6">
                <span className="text-wood font-bold tracking-widest uppercase text-sm block mb-4">Tips para Devs</span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 font-heading leading-tight">
                    5 Tips de Yoga para Techies: <br />
                    <span className="text-wood">Optimiza tu "Hardware" Humano</span>
                </h2>
            </header>

            {/* --- ÍNDICE DE CONTENIDOS (TOC) --- */}
            <nav className="max-w-2xl mx-auto mb-20 px-6">
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 text-gray-800">
                        <ListTree className="text-wood" size={24} />
                        <h3 className="text-xl font-bold font-heading">En este artículo:</h3>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tips.map((tip) => (
                            <li key={tip.id}>
                                <a 
                                    href={`#${tip.id}`} 
                                    className="flex items-center gap-2 text-gray-600 hover:text-wood transition-colors group text-lg"
                                >
                                    <ArrowRight size={16} className="text-wood/40 group-hover:translate-x-1 transition-transform" />
                                    {tip.title.split('.')[1]} {/* Solo el nombre del tip */}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* Listado de Contenido */}
            <div className="space-y-0">
                {tips.map((tip, index) => (
                    <YogaFeatureSection
                        key={tip.id}
                        id={tip.id}
                        imageSrc={tip.imageSrc}
                        title={tip.title}
                        description={tip.description}
                        isReversed={index % 2 !== 0}
                        bgColor={index % 2 !== 0 ? "bg-gray-50/50" : "bg-white"}
                    />
                ))}
            </div>
        </article>
    );
};

export default BlogYogaTips;