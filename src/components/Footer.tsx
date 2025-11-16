// src/components/Footer.jsx

import React from 'react';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaFacebook, 
  FaInstagram, 
  FaLinkedin 
} from 'react-icons/fa';

/**
 * Componente Footer mejorado con diseño estructurado, iconos y colores de marca.
 */
export default function Footer() {
  return (
    // Usamos bg-gray-700 para consistencia con la Navbar oscura y un padding superior adecuado.
    <footer className="bg-gray-700 text-white pt-16 pb-6 mt-10 shadow-2xl">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Sección de Columnas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-600 pb-10 mb-8">
          
          {/* 1. Logo y Acerca de */}
          <div className="md:col-span-2 space-y-4">
            <h1 className="text-3xl font-extrabold flex items-baseline">
              <span className="text-yellow-400 transition duration-300 hover:text-yellow-300">TECNY</span>
              <span className="text-xl font-light ml-0.5 text-green-300">CAMPO</span>
            </h1>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              Liderando la precisión en el campo a través de la topografía aérea y soluciones digitales. Optimización de terrenos, cultivos y manejo de activos.
            </p>
            
            {/* Redes Sociales */}
            <div className="flex space-x-4 pt-2">
              <a 
                href="#" 
                target="_blank" 
                className="text-yellow-500 hover:text-yellow-400 transition duration-300 transform hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                target="_blank" 
                className="text-yellow-500 hover:text-yellow-400 transition duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                target="_blank" 
                className="text-yellow-500 hover:text-yellow-400 transition duration-300 transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          {/* 2. Enlaces Rápidos */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-yellow-400 mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-green-400 transition duration-300 block">HOME</a></li>
              <li><a href="#" className="hover:text-green-400 transition duration-300 block">Servicios</a></li>
              <li><a href="#" className="hover:text-green-400 transition duration-300 block">Proyectos</a></li>
              <li><a href="#" className="hover:text-green-400 transition duration-300 block">Acerca de Nosotros</a></li>
              <li><a href="#" className="hover:text-green-400 transition duration-300 block">Contáctanos</a></li>
            </ul>
          </div>

          {/* 3. Información de Contacto */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-yellow-400 mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <FaMapMarkerAlt className="w-4 h-4 mr-3 mt-1 text-green-400 flex-shrink-0" />
                <p>Carrera 8 No. 61 – 175, Bucaramanga - Colombia</p>
              </li>
              <li className="flex items-center">
                <FaPhone className="w-4 h-4 mr-3 text-green-400" />
                <p className="hover:text-green-400 transition duration-300 cursor-pointer">(+57) 3176677911</p>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="w-4 h-4 mr-3 text-green-400" />
                <p className="hover:text-green-400 transition duration-300 cursor-pointer">yeidson.lopez@gmail.com</p>
              </li>
            </ul>
          </div>

        </div>

        {/* Derechos de Autor (Bottom Bar) */}
        <div className="text-center pt-4">
          <p className="text-xs text-gray-400">© 2025 TecnyCampo. Todos los derechos reservados. Desarrollado con ❤️ en Colombia.</p>
        </div>
      </div>
    </footer>
  );
}