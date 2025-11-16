import React, { useState } from 'react';
import * as HeroIcons from '@heroicons/react/24/solid';

// Extracción dinámica de íconos para modularidad
const { 
    Bars3Icon, XMarkIcon, UserCircleIcon, PlusCircleIcon, BellIcon, QuestionMarkCircleIcon, 
    HomeIcon, BuildingOffice2Icon 
} = HeroIcons;

// =======================================================
// DATOS (Reflejando la nueva especialización de Tecnycampo)
// =======================================================
const menuItems = [
    // === NOMBRES CORREGIDOS PARA COINCIDIR CON HEROICONS ===
    // Uso de MapPinIcon para Topografía
    { name: "Topografía Aérea", href: "/servicios/topografia", iconName: "MapPinIcon" }, 
    // Uso de HeartIcon o AcademicCapIcon para Veterinaria
    { name: "Veterinaria & Zootecnia", href: "/servicios/veterinaria", iconName: "HeartIcon" }, 
    // Uso de BuildingStorefrontIcon para Inmobiliaria
    { name: "Inmobiliaria Animal", href: "/servicios/inmobiliaria", iconName: "BuildingStorefrontIcon" }, 
    
    // Agregamos categorías secundarias relevantes (ejemplos)
    // Uso de GlobeAltIcon o SunIcon para Gestión Agrícola
    { name: "Gestión Agrícola", href: "/gestion/agricola", iconName: "SunIcon" }, 
    // Uso de WaterDropIcon o SparklesIcon para Recursos Hídricos
    { name: "Recursos Hídricos", href: "/analisis/agua", iconName: "WaterDropIcon" }, 
    // Uso de WrenchScrewdriverIcon o CubeTransparentIcon para Seguimiento Minero
    { name: "Seguimiento Minero", href: "/analisis/minero", iconName: "WrenchScrewdriverIcon" }, 
];

const primaryLinks = [
    { name: "Inicio", href: "#home", icon: HomeIcon },
    { name: "Servicios", href: "#services", icon: PlusCircleIcon },
    { name: "Unidades", href: "#units", icon: BuildingOffice2Icon },
    { name: "Contacto", href: "#contact", icon: BellIcon },
];

/**
 * Mapeo para cargar dinámicamente cualquier ícono de Heroicons Solid
 */
const DynamicIcon = ({ iconName, className }) => {
    // Busca el componente dentro de la importación * as HeroIcons
    // ¡IMPORTANTE! El nombre del icono debe ser exactamente igual al nombre del componente de Heroicons
    const IconComponent = HeroIcons[iconName] || HeroIcons['QuestionMarkCircleIcon']; // Fallback seguro
    return <IconComponent className={className} aria-hidden="true" />;
};

/**
 * Navbar profesional con navegación central, acciones de utilidad y menú lateral avanzado.
 */
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Clase CSS común para los íconos de acción
    const actionIconClass = "w-6 h-6 text-yellow-400 transition duration-300 group-hover:text-white";

    return (
        // Base de navegación: Color oscuro, padding y sombra profunda
        <nav className="bg-[#1f2d2c] text-white py-3 shadow-2xl relative z-50 border-b-4 border-yellow-500/80">
            <div className="container mx-auto flex justify-between items-center px-4 md:px-8">

                {/* Lado Izquierdo: Menú Hamburguesa y Logo */}
                <div className="flex items-center space-x-6">

                    {/* Botón de Menú Hamburguesa */}
                    <button
                        className="p-2 hover:bg-green-700 rounded-full transition duration-300 transform hover:scale-105 ring-2 ring-transparent hover:ring-yellow-400 focus:outline-none focus:ring-yellow-400"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-expanded={isMenuOpen} // A11y: Indica si el menú está abierto
                        aria-controls="sidebar-menu"
                    >
                        {isMenuOpen ? (
                            <XMarkIcon className="w-6 h-6 text-yellow-400" />
                        ) : (
                            <Bars3Icon className="w-6 h-6 text-yellow-400" />
                        )}
                    </button>

                    {/* Logo con efecto de brillo */}
                    <h1 className="text-3xl font-black flex items-center cursor-pointer group leading-none">
                        <a href="#home" className="flex items-center">
                            <span className="text-yellow-500 transition duration-300 group-hover:text-yellow-300 tracking-wider">TECNY</span>
                            <span className="text-2xl font-light ml-1 text-green-300 transition duration-300 group-hover:text-white">CAMPO</span>
                        </a>
                    </h1>
                </div>

                {/* Centro: Navegación Principal (Visible en Desktop) */}
                <div className="hidden lg:flex items-center space-x-8 font-semibold text-base">
                    {primaryLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="relative text-gray-200 hover:text-yellow-400 transition duration-300 group py-2" // Agregado padding vertical
                        >
                            {link.name}
                            {/* Línea de hover animada */}
                            <span className="absolute h-0.5 bg-yellow-500 bottom-0 left-0 transition-all duration-300 scale-x-0 group-hover:scale-x-100"></span>
                        </a>
                    ))}
                </div>

                {/* Lado Derecho: Íconos de Acción y Perfil */}
                <div className="flex items-center space-x-3 md:space-x-5 text-sm font-semibold">

                    {/* Ícono de Notificaciones */}
                    <a href="#" aria-label="Notificaciones" className="p-2 group rounded-full transition duration-300 hover:bg-green-700 hidden sm:block">
                        <BellIcon className={actionIconClass} />
                    </a>

                    {/* Ícono de Ayuda/Soporte */}
                    <a href="#" aria-label="Ayuda y Soporte" className="p-2 group rounded-full transition duration-300 hover:bg-green-700 hidden sm:block">
                        <QuestionMarkCircleIcon className={actionIconClass} />
                    </a>

                    {/* Botón de Publicar Destacado (Inmobiliaria) */}
                    <a 
                        href="/publicar" 
                        className="flex items-center bg-green-600 py-2 px-4 rounded-full text-white hover:bg-green-700 transition duration-300 group shadow-md font-bold transform hover:scale-105"
                    >
                        <PlusCircleIcon className="w-5 h-5 mr-1 text-yellow-300 group-hover:text-white transition" />
                        <span className="hidden lg:inline">Publicar Activo</span>
                    </a>

                    {/* Botón de Ingresar/Perfil destacado */}
                    <a
                        href="/login"
                        className="flex items-center bg-yellow-500 py-2 px-4 rounded-full text-gray-900 hover:bg-yellow-400 transition duration-300 shadow-xl font-bold transform hover:scale-105"
                        aria-label="Iniciar Sesión o Ver Perfil"
                    >
                        <UserCircleIcon className="w-6 h-6 mr-1" />
                        Ingresar
                    </a>
                </div>
            </div>

            {/* --- Menú Desplegable Lateral Animado (Sidebar) --- */}
            <div
                id="sidebar-menu"
                className={`fixed top-[70px] left-0 h-full w-72 bg-[#1f2d2c] shadow-2xl p-6 transition-transform duration-500 ease-in-out z-40
                           ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`}
                role="menu" // A11y: Define como un menú
            >
                <h2 className="text-2xl font-extrabold mb-6 border-b border-yellow-600 pb-3 text-yellow-400">
                    <Bars3Icon className="w-6 h-6 inline mr-2 align-text-bottom" />
                    Menú Principal
                </h2>

                {/* Links Principales (para Mobile/Tablet) */}
                <ul className="space-y-3 mb-8 lg:hidden border-b border-gray-700 pb-5">
                    {primaryLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <li key={link.name}>
                                <a href={link.href} className="flex items-center py-2 px-3 rounded-xl hover:bg-green-700 transition duration-300 font-semibold text-white" onClick={() => setIsMenuOpen(false)}>
                                    <Icon className="w-6 h-6 mr-3 text-green-300" aria-hidden="true" />
                                    {link.name}
                                </a>
                            </li>
                        );
                    })}
                </ul>

                <h3 className="text-xl font-bold mt-4 mb-4 text-yellow-400 border-b border-gray-700 pb-2">Nuestras Soluciones Clave</h3>

                {/* Servicios Principales (Menú Lateral) */}
                <div className="space-y-2 text-base">
                    {menuItems.map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            className="flex items-center p-3 rounded-lg hover:bg-green-800 transition duration-200 cursor-pointer group border border-transparent hover:border-yellow-500/50"
                            role="menuitem"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <DynamicIcon iconName={item.iconName} className="w-6 h-6 mr-4 text-green-300 group-hover:text-yellow-400 transition duration-300" />
                            <span className="text-white font-medium group-hover:text-gray-100">{item.name}</span>
                        </a>
                    ))}
                </div>
            </div>

            {/* Overlay Oscuro para el Fondo (al abrir el menú) */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/70 z-30 transition-opacity duration-500"
                    onClick={() => setIsMenuOpen(false)}
                    aria-hidden="true"
                ></div>
            )}
        </nav>
    );
}