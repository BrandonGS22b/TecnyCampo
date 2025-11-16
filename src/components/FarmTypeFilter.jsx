// src/components/FarmTypeFilter.jsx

import React, { useState } from 'react';
// Importamos la colección Font Awesome (Fa)
import {
    // Iconos para los 3 servicios principales
    FaRulerCombined, // Topografía con Drones
    FaStethoscope,  // Veterinaria / Zootecnia
    FaTags,         // Inmobiliaria / Compra y Venta de Animales
} from 'react-icons/fa';

// Mapeo de nombres a los componentes de iconos importados
const iconMap = {
    Topografia: FaRulerCombined,
    Veterinaria: FaStethoscope,
    Inmobiliaria: FaTags,
};

// Datos de las TRES opciones de servicio, basado en el diagrama
const farmOptions = [
    { id: 'topografia', label: 'Topografía con Drones', iconName: 'Topografia' },
    { id: 'veterinaria', label: 'Veterinaria / Zootecnia', iconName: 'Veterinaria' },
    { id: 'inmobiliaria_animal', label: 'Inmobiliaria Animal', iconName: 'Inmobiliaria' },
];

/**
 * Componente de Filtro de Servicios Clave con diseño moderno (Verde/Amarillo).
 */
export default function FarmTypeFilter() {
    // Establecemos 'topografia' como filtro inicial
    const [selectedId, setSelectedId] = useState('topografia');

    const handleSelect = (id) => {
        setSelectedId(id);
        console.log(`Servicio Clave seleccionado: ${id}`);
    };

    // --- Sub-Componente de la Opción de Icono ---
    const FarmOptionItem = ({ option }) => {
        const isSelected = option.id === selectedId;
        const IconComponent = iconMap[option.iconName];

        // Clases para el ítem completo (Estado Activo vs. Normal)
        const itemClasses = isSelected
            ? 'bg-green-600 text-white shadow-xl scale-[1.05] border-yellow-500' // Activo: Verde, texto blanco, borde amarillo
            : 'bg-white text-gray-700 hover:bg-gray-100 hover:scale-[1.02] border-gray-200'; // Normal: Blanco/Gris, borde gris

        // Clases para el icono (Color del Icono)
        const iconClasses = isSelected
            ? 'text-yellow-300' // Activo: Amarillo claro
            : 'text-green-600'; // Normal: Verde oscuro

        return (
            <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                // Diseño más ancho y centrado para solo 3 opciones
                className={`flex flex-col items-center justify-center flex-1 p-4 md:p-6 mx-2
                            transition-all duration-300 border-b-4 rounded-t-lg
                            ${itemClasses}`}
            >
                {/* Icono de Font Awesome */}
                <div className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center ${iconClasses}`}>
                    {IconComponent && <IconComponent className="w-full h-full" aria-hidden="true" />}
                </div>

                {/* Etiqueta */}
                <div className="text-sm md:text-base font-bold mt-2 whitespace-normal text-center leading-snug">
                    {option.label}
                </div>
            </button>
        );
    };
    // ---------------------------------------------

    return (
        <div className="w-full bg-white shadow-2xl">
            <div className="max-w-7xl mx-auto p-4 md:p-6">

                {/* TÍTULO ENFOCADO */}
                <h2 className="text-xl md:text-2xl font-extrabold text-gray-800 mb-6 border-b-2 border-green-600 pb-2 text-center md:text-left">
                    <i className="fas fa-cubes text-yellow-600 mr-2"></i>
                    Nuestros Servicios Principales <span className="text-green-600">(Tecnycampo)</span>
                </h2>

                {/* Contenedor de las opciones/iconos - Usando justify-center y flex-1 para distribuir */}
                <div className="flex justify-center items-end space-x-2 md:space-x-4">
                    {farmOptions.map((option) => (
                        <FarmOptionItem key={option.id} option={option} />
                    ))}
                </div>
            </div>
        </div>
    );
}