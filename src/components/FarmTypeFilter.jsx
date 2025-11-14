// src/components/FarmTypeFilter.jsx

import React, { useState } from 'react';
// Importamos los iconos de la colección Font Awesome (Fa)
import { 
  FaPaw,        // Ganadera (Huella/Animal)
  FaFeatherAlt, // Avícola (Pluma/Pájaro)
  FaPiggyBank,  // Porcícola (Cerdo)
  FaFish,       // Piscícola (Pez)
  FaSeedling,   // Agrícola (Planta/Semilla)
  FaTree,       // Reforestación (Árbol)
  FaMountain,   // Virgen (Montaña/Terreno)
  FaHammer,     // Minero (Herramientas/Industria)
  FaHome,       // Parcelas (Casa/Propiedad)
} from 'react-icons/fa'; 

// Mapeo de nombres a los componentes de iconos importados
const iconMap = {
    Ganadera: FaPaw,
    Avicola: FaFeatherAlt,
    Porcicola: FaPiggyBank,
    Piscicola: FaFish,
    Agrícola: FaSeedling,
    Reforestacion: FaTree,
    Virgen: FaMountain,
    Minero: FaHammer,
    Parcelas: FaHome,
};

// Datos de las opciones de finca con los nombres de iconos mapeados
const farmOptions = [
    { id: 'ganadera', label: 'Ganadera', iconName: 'Ganadera' },
    { id: 'avicola', label: 'Avícola', iconName: 'Avicola' },
    { id: 'porcicola', label: 'Porcícola', iconName: 'Porcicola' }, 
    { id: 'piscicola', label: 'Piscícola', iconName: 'Piscicola' },
    { id: 'agricola', label: 'Agrícola', iconName: 'Agrícola' },
    { id: 'reforestacion', label: 'Reforestación', iconName: 'Reforestacion' },
    { id: 'virgen', label: 'Virgen', iconName: 'Virgen' },
    { id: 'minero', label: 'Minero', iconName: 'Minero' },
    { id: 'parcelas', label: 'Parcelas', iconName: 'Parcelas' },
];

/**
 * Componente de Filtro de Tipos de Finca con diseño oscuro/dorado y Font Awesome.
 */
export default function FarmTypeFilter() {
    const [selectedId, setSelectedId] = useState('parcelas');

    const handleSelect = (id) => {
        setSelectedId(id);
        console.log(`Filtro de Finca seleccionado: ${id}`);
    };

    // --- Sub-Componente de la Opción de Icono ---
    const FarmOptionItem = ({ option }) => {
        const isSelected = option.id === selectedId;
        // Obtener el componente de Icono dinámicamente
        const IconComponent = iconMap[option.iconName];
        
        // Clases para el color y tamaño del icono (Dorado)
        const iconClasses = 'text-yellow-500 w-10 h-10 md:w-12 md:h-12 mb-1'; 
        // Clases para el fondo del texto seleccionado (Azul oscuro)
        const labelBgColor = isSelected ? 'bg-blue-800/90' : 'bg-transparent'; 

        return (
            <button 
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={`flex flex-col items-center justify-start min-w-[65px] p-2 
                            transition-transform duration-200 hover:scale-105`}
            >
                {/* Renderizado del Icono de Font Awesome */}
                <div className={iconClasses + ' flex items-center justify-center'}>
                    {IconComponent && <IconComponent className="w-full h-full" aria-hidden="true" />}
                </div>

                {/* Etiqueta */}
                <div className={`text-xs font-semibold px-2 py-0.5 mt-1 rounded 
                                 text-white ${labelBgColor}`}>
                    {option.label}
                </div>
            </button>
        );
    };
    // ---------------------------------------------

    return (
        <div className="w-full">
            {/* Fondo verde oscuro y título */}
            <div className="bg-gray-700 p-4 md:pt-6 md:pb-3 shadow-2xl">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                        Tipo de Finca
                    </h2>
                    
                    {/* Contenedor de las opciones/iconos */}
                    <div className="flex justify-between items-start space-x-2 overflow-x-auto py-2">
                        {farmOptions.map((option) => (
                            <FarmOptionItem key={option.id} option={option} />
                        ))}
                    </div>
                </div>
            </div>
            {/* Franja amarilla inferior */}
            <div className="bg-yellow-500 h-2 md:h-3 w-full"></div>
        </div>
    );
}