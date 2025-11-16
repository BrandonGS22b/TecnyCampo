// src/components/Hero.jsx

import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'; // Importamos el ícono de Heroicons

export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center h-[500px] flex flex-col justify-center items-center text-white p-4"
      // Usando la URL de fondo proporcionada
      style={{ backgroundImage: 'url(https://cdn.pixabay.com/photo/2016/12/07/15/47/drone-1883671_1280.jpg)' }}
    >
      {/* Overlay oscuro para mejorar la legibilidad del texto */}
      <div className="absolute inset-0 bg-green-900/60 transition duration-500 hover:bg-green-900/70"></div>
      
      <div className="relative text-center z-10 w-full px-4">
        {/* Títulos */}
        <h2 className="text-4xl md:text-5xl font-light tracking-wide">SERVICIO DE</h2>
        <h1 className="text-6xl md:text-7xl font-extrabold text-yellow-300 mt-2 mb-10 drop-shadow-lg animate-pulse">
          DRONES
        </h1>

        {/* --- Barra de Búsqueda (Alargada: max-w-3xl) --- */}
        <div className="flex w-full max-w-lg md:max-w-3xl mx-auto mb-6 transition-all duration-300">
          <input
            type="text"
            placeholder="Encuentra el servicio de drones que necesitas: Ortomosaico, DEM, Aforo de Pastos..."
            className="w-full p-4 md:p-5 rounded-l-lg text-lg text-gray-800 focus:outline-none focus:ring-4 focus:ring-yellow-500 shadow-2xl transition duration-300"
          />
          <button
            type="submit"
            className="p-4 md:p-5 bg-yellow-500 hover:bg-yellow-600 rounded-r-lg flex items-center justify-center transition duration-300 transform hover:scale-[1.03] shadow-2xl"
            aria-label="Buscar"
          >
            {/* Ícono de búsqueda de Heroicons */}
            <MagnifyingGlassIcon className="w-6 h-6 md:w-8 md:h-8 text-gray-800" />
          </button>
        </div>
        {/* --- Fin de la Barra de Búsqueda --- */}

        {/* --- Botones --- */}
        <div className="flex justify-center items-center mt-8 space-x-4 md:space-x-6">
          
          {/* Botón de Búsqueda Avanzada (Estilo amarillo) */}
          <button className="px-8 py-3 bg-yellow-500 text-gray-900 font-extrabold rounded-full shadow-2xl hover:bg-yellow-400 transition duration-300 transform hover:translate-y-[-2px] border-2 border-transparent hover:border-white">
            Búsqueda Avanzada
          </button>

          {/* Botón de Servicios Élite (Estilo morado con brillo animado) */}
          <button className="relative px-8 py-3 bg-purple-700 text-white font-extrabold rounded-full shadow-2xl transition duration-300 transform hover:scale-[1.05] overflow-hidden group border-2 border-yellow-400">
            <span className="relative z-10 flex items-center">
                Servicios Élite
            </span>
            {/* Efecto de brillo/estrella más sutil y animado */}
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition duration-500"></span>
            <span className="absolute top-[-5px] right-[-5px] text-yellow-300 transform rotate-12 text-2xl animate-pulse">✨</span>
          </button>

        </div>
        {/* --- Fin de Botones --- */}
      </div>
    </section>
  );
}