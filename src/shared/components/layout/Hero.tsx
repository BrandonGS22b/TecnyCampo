import { MagnifyingGlassIcon, ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <section
            className="relative bg-cover bg-center min-h-[600px] flex flex-col justify-center items-center text-white p-4 pt-24 overflow-hidden"
            style={{ backgroundImage: 'url(/fondo-agro.jpg)' }}
        >
            {/* Animated Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/85 to-green-900/80 animate-gradient-shift"></div>

            {/* Floating Shapes Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="relative text-center z-10 w-full px-4 max-w-7xl mx-auto">
                {/* Title with Modern Typography */}
                <div className="mb-8 animate-fade-in-up">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-4">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-2xl">
                            LP NEGOCIOS E INVERSIONES
                        </h1>
                        <div className="hidden md:block w-1 h-16 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full shadow-glow"></div>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black gradient-text-secondary drop-shadow-2xl animate-pulse-glow">
                            SAS
                        </h2>
                    </div>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-gray-200 font-medium max-w-3xl mx-auto mb-2 drop-shadow-lg">
                        Encuentra tu propiedad ideal en Colombia
                    </p>
                    <div className="flex items-center justify-center gap-2 text-yellow-400">
                        <SparklesIcon className="w-5 h-5 animate-pulse" />
                        <span className="text-sm font-semibold">Lotes • Parcelas • Fincas</span>
                        <SparklesIcon className="w-5 h-5 animate-pulse" />
                    </div>
                </div>

                {/* Search Bar with Modern Design */}
                <div className="flex w-full max-w-xl lg:max-w-4xl mx-auto mb-8 animate-scale-in" style={{ animationDelay: '0.2s' }}>
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Busca propiedades: Lotes, Parcelas, Fincas en Santander..."
                            className="w-full p-5 md:p-6 rounded-l-2xl text-lg text-gray-800 
                         focus:outline-none focus:ring-4 focus:ring-green-500/50 
                         shadow-2xl transition-all duration-300 placeholder:text-gray-500
                         glass border border-white/20"
                        />
                    </div>
                    <button
                        type="submit"
                        className="p-5 md:p-6 bg-gradient-to-r from-green-500 to-green-600 
                       hover:from-green-600 hover:to-green-700 rounded-r-2xl 
                       flex items-center justify-center transition-all duration-300 
                       transform hover:scale-105 active:scale-95 shadow-2xl 
                       hover:shadow-green-500/50 group"
                        aria-label="Buscar"
                    >
                        <MagnifyingGlassIcon className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                    </button>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <Link
                        to="/propiedades"
                        className="group px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 
                       hover:from-yellow-600 hover:to-yellow-700 text-gray-900 font-extrabold 
                       rounded-full shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 
                       transform hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                        <span>Ver Propiedades</span>
                        <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <a
                        href="#servicios"
                        className="px-8 py-4 glass border-2 border-white/30 hover:border-white/50 
                       text-white font-bold rounded-full shadow-xl hover:shadow-2xl 
                       transition-all duration-300 transform hover:scale-105 active:scale-95
                       backdrop-blur-md"
                    >
                        Nuestros Servicios
                    </a>
                </div>

                {/* Stats or Features */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                    <div className="glass p-6 rounded-2xl border border-white/20 backdrop-blur-md transform hover:scale-105 transition-all duration-300">
                        <div className="text-4xl font-black gradient-text-secondary mb-2">500+</div>
                        <div className="text-sm text-gray-200 font-medium">Propiedades Disponibles</div>
                    </div>
                    <div className="glass p-6 rounded-2xl border border-white/20 backdrop-blur-md transform hover:scale-105 transition-all duration-300">
                        <div className="text-4xl font-black gradient-text mb-2">1000+</div>
                        <div className="text-sm text-gray-200 font-medium">Clientes Satisfechos</div>
                    </div>
                    <div className="glass p-6 rounded-2xl border border-white/20 backdrop-blur-md transform hover:scale-105 transition-all duration-300">
                        <div className="text-4xl font-black text-yellow-400 mb-2">24/7</div>
                        <div className="text-sm text-gray-200 font-medium">Atención al Cliente</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
