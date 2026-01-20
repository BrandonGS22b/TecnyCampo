import React from 'react';
import { MagnifyingGlassIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center h-[550px] flex flex-col justify-center items-center text-white p-4 pt-24"
      style={{ backgroundImage: 'url(./fondo-agro.jpg)' }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-[#1f2d2c]/75 transition duration-500 hover:bg-[#1f2d2c]/80"></div>

      <div className="relative text-center z-10 w-full px-4">
        {/* Título Principal - Split Design */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
            LP NEGOCIOS E INVERSIONES SAS
          </h1>
          <div className="hidden md:block w-1 h-16 bg-yellow-500"></div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-yellow-500 drop-shadow-xl">
            TERRENO
          </h2>
        </div>

        {/* --- Barra de Búsqueda --- */}
        <div className="flex w-full max-w-xl lg:max-w-4xl mx-auto transition-all duration-300">
          <input
            type="text"
            placeholder="Busca propiedades: Lotes, Parcelas, Fincas en Santander..."
            className="w-full p-4 md:p-5 rounded-l-xl text-lg text-gray-800 focus:outline-none focus:ring-4 focus:ring-green-500 shadow-2xl transition duration-300 placeholder:text-gray-500"
          />
          <button
            type="submit"
            className="p-4 md:p-5 bg-green-500 hover:bg-green-600 rounded-r-xl flex items-center justify-center transition duration-300 transform hover:scale-[1.03] shadow-2xl"
            aria-label="Buscar"
          >
            <MagnifyingGlassIcon style={{ width: 32, height: 32, color: 'white' }} />
          </button>
        </div>
        {/* --- Fin Barra de Búsqueda --- */}

        {/* --- Botones de CTA --- */}
        <div className="flex justify-center items-center mt-8 space-x-4 md:space-x-6">
          <a
            href="#properties"
            className="group px-8 py-3 bg-yellow-500 text-gray-900 font-extrabold rounded-full shadow-2xl hover:bg-yellow-400 transition duration-300 transform hover:scale-[1.05]"
          >
            <span className="flex items-center">
              Ver Propiedades
              <ArrowRightIcon style={{ width: 20, height: 20, marginLeft: 8 }} />
            </span>
          </a>
        </div>
        {/* --- Fin Botones --- */}
      </div>
    </section>
  );
}

