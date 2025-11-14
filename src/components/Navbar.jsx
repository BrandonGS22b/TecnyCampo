// src/components/Navbar.jsx

import React, { useState } from 'react';
import { 
  Bars3Icon, 
  XMarkIcon, 
  MagnifyingGlassIcon, 
  UserCircleIcon, 
  PlusCircleIcon 
} from '@heroicons/react/24/solid';

// Datos para el menú lateral usando iconos más consistentes
const menuItems = [
  // Usaremos iconos relacionados con topografía y actividades de finca
  { name: "Ganadera", icon: "MapIcon" },
  { name: "Avícola", icon: "CloudIcon" },
  { name: "Porcícola", icon: "UsersIcon" }, 
  { name: "Piscícola", icon: "Square3Stack3DIcon" },
  { name: "Agrícola", icon: "GlobeAltIcon" },
  { name: "Reforestación", icon: "TreeIcon" },
  { name: "Virgen", icon: "MountainIcon" }, // Nota: Este puede fallar si tu Heroicons es viejo. Lo reemplazo con GlobeAltIcon si fuera necesario.
  { name: "Minera", icon: "CubeTransparentIcon" },
  { name: "Parcelas", icon: "HomeModernIcon" },
];

// Mapeo de nombres a los componentes de iconos (necesario si Heroicons no los encuentra)
// Para simplificar, usaremos los iconos importados directamente en el renderizado.

/**
 * Navbar con menú lateral animado y transiciones mejoradas.
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mapeo de iconos para los items del menú lateral (usando el mismo set de FarmTypeFilter)
  const MenuIconMap = {
    MapIcon: UserCircleIcon, 
    CloudIcon: Bars3Icon,
    UsersIcon: UserCircleIcon,
    Square3Stack3DIcon: Bars3Icon,
    GlobeAltIcon: UserCircleIcon,
    TreeIcon: Bars3Icon,
    MountainIcon: Bars3Icon,
    CubeTransparentIcon: UserCircleIcon,
    HomeModernIcon: Bars3Icon,
  };


  return (
    // Z-index alto para asegurar que la barra de navegación esté por encima de todo
    <nav className="bg-[#2E403F] text-white py-3 shadow-2xl relative z-50">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        
        {/* Lado Izquierdo: Menú Hamburguesa y Logo */}
        <div className="flex items-center space-x-4">
          
          {/* Botón de Menú Hamburguesa con animación de transición a X */}
          <button 
            className="p-2 hover:bg-green-600 rounded-full transition duration-300 transform hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir Menú"
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6 text-yellow-400" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-yellow-400" />
            )}
          </button>
          
          {/* Logo animado */}
          <h1 className="text-2xl font-extrabold flex items-baseline cursor-pointer group">
            <span className="text-yellow-400 transition duration-300 group-hover:text-yellow-300">TECNY</span>
            <span className="text-xl font-light ml-0.5 text-green-300 transition duration-300 group-hover:text-white">CAMPO</span>
          </h1>
        </div>

        {/* Centro: Barra de Búsqueda (Estilo AGRO GO Fincas) */}
        <div className="hidden lg:flex flex-grow max-w-2xl mx-10">
          <input
            type="text"
            placeholder="Buscar proyectos, equipos, o servicios..."
            className="w-full p-2.5 rounded-l-lg text-gray-800 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition duration-300"
          />
          <button
            type="submit"
            className="p-2.5 bg-yellow-500 hover:bg-yellow-600 rounded-r-lg flex items-center justify-center transition duration-300 transform hover:scale-105"
            aria-label="Buscar"
          >
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Lado Derecho: Íconos de Acción */}
        <div className="flex items-center space-x-4 text-sm font-semibold">
          
          {/* Botón de Publicar */}
          <a href="#" className="flex items-center p-2 rounded-lg hover:bg-green-600 transition duration-300 hidden sm:flex">
            <PlusCircleIcon className="w-5 h-5 mr-1 text-yellow-400" />
            <span className="hidden md:inline">Publicar</span>
          </a>
          
          {/* Botón de Ingresar/Perfil */}
          <a 
            href="#" 
            className="flex items-center bg-green-700 py-2 px-3 rounded-full hover:bg-green-600 transition duration-300 shadow-md"
          >
            <UserCircleIcon className="w-6 h-6 mr-1" />
            Ingresar
          </a>
        </div>
      </div>
      
      {/* --- Menú Desplegable Lateral Animado --- */}
      <div 
        className={`fixed top-[60px] left-0 h-full w-64 bg-[#263737] shadow-2xl p-6 transition-transform duration-500 ease-in-out z-40 
                   ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <h2 className="text-xl font-bold mb-5 border-b border-gray-600 pb-2 text-yellow-400">Menú de Navegación</h2>
        
        {/* Links Principales */}
        <ul className="space-y-3 mb-6">
          <li><a href="#" className="block py-1 px-2 rounded hover:bg-green-700 transition duration-300 font-semibold text-white">HOME</a></li>
          <li><a href="#" className="block py-1 px-2 rounded hover:bg-green-700 transition duration-300 font-semibold text-white">ACERCA DE NOSOTROS</a></li>
          <li><a href="#" className="block py-1 px-2 rounded hover:bg-green-700 transition duration-300 font-semibold text-white">UNIDADES DE NEGOCIO</a></li>
          <li><a href="#" className="block py-1 px-2 rounded hover:bg-green-700 transition duration-300 font-semibold text-white">CONTÁCTANOS</a></li>
        </ul>

        <h3 className="text-lg font-bold mt-6 mb-3 border-b border-gray-600 pb-1 text-yellow-400">Tipo de Activo IT</h3>
        
        {/* Tipos de Activos IT (Grid de Iconos y Nombres) */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          {menuItems.map((item, index) => {
            const IconComponent = MenuIconMap[item.icon];
            return (
              <div 
                key={index} 
                className="flex items-center p-2 rounded hover:bg-green-800/80 transition duration-200 cursor-pointer border border-transparent hover:border-yellow-400"
              >
                {IconComponent && <IconComponent className="w-5 h-5 mr-2 text-green-300" />}
                <span className="text-white">{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Overlay Oscuro para el Fondo */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 transition-opacity duration-500" 
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
}