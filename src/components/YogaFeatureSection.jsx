import { Sparkles } from 'lucide-react';

const YogaFeatureSection = ({
    id, // <-- Nueva Prop para el ancla
    imageSrc,
    imageAlt,
    title,
    description,
    secondaryTitle,
    secondaryDescription,
    isReversed = false,
    bgColor = "bg-transparent",
    className = "" // Permitimos recibir clases extra
}) => {
    // Aseguramos que la ruta sea relativa eliminando el slash inicial si existe
    const cleanImageSrc = imageSrc?.startsWith('/') ? imageSrc.substring(1) : imageSrc;

    return (
        <section
            id={id} className={`${bgColor} py-8 lg:py-12 px-6 scroll-mt-24 transition-all duration-500 ${className}`}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                {/* Contenedor de Imagen: Fiel al diseño de bordes suaves */}
                <div className={`w-full aspect-[3/4] md:aspect-[4/5] lg:aspect-square relative rounded-[2.5rem] overflow-hidden shadow-lg 
            ${isReversed ? 'lg:order-last' : 'lg:order-first'}`}>
                    <img
                        src={cleanImageSrc}
                        alt={imageAlt}
                        className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                </div>

                {/* Lado del Texto: Ajuste de espaciado entre bloques */}
                <div className="flex flex-col space-y-8">

                    <div className="space-y-5">
                        {/* 2. MEJORA: Título con barra de acento refinada */}
                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 flex items-center gap-4">
                            <span className="w-12 h-1 bg-wood rounded-full shrink-0"></span>
                            {title}
                        </h3>
                        <p className="text-lg lg:text-xl text-gray-600 leading-relaxed font-light">
                            {description}
                        </p>
                    </div>

                    {/* 3. MEJORA: Tarjeta secundaria con padding optimizado */}
                    {secondaryTitle && (
                        <div className="bg-gradient-to-br from-gray-50 to-white p-6 lg:p-8 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
                            {/* Decoración sutil de fondo */}
                            <div className="absolute -right-4 -top-4 w-20 h-20 bg-wood/5 rounded-full blur-2xl group-hover:bg-wood/10 transition-colors"></div>

                            <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2 relative z-10">
                                <Sparkles className="text-wood" size={20} />
                                {secondaryTitle}
                            </h4>

                            <p className="text-gray-600 text-base lg:text-lg leading-relaxed relative z-10 font-light">
                                {secondaryDescription}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>

    );
};

export default YogaFeatureSection;