import React, { useState } from 'react';
import {
    FaRulerCombined,
    FaStethoscope,
    FaTags,
} from 'react-icons/fa';

// ------------------------ TYPES ------------------------

const iconMap = {
    Topografia: FaRulerCombined,
    Veterinaria: FaStethoscope,
    Inmobiliaria: FaTags,
} as const;

type IconName = keyof typeof iconMap;

type ServiceId = "topografia" | "veterinaria" | "inmobiliaria_animal";

interface FarmOption {
    id: ServiceId;
    label: string;
    iconName: IconName;
}

interface FarmTypeFilterProps {
    onSelectService: (serviceId: ServiceId) => void;
}

// ------------------------ DATA -------------------------

const farmOptions: FarmOption[] = [
    { id: "topografia", label: "Topografía con Drones", iconName: "Topografia" },
    { id: "veterinaria", label: "Veterinaria / Zootecnia", iconName: "Veterinaria" },
    { id: "inmobiliaria_animal", label: "Inmobiliaria Animal", iconName: "Inmobiliaria" },
];

// ---------------------- COMPONENT -----------------------

export default function FarmTypeFilter({ onSelectService }: FarmTypeFilterProps) {

    const [selectedId, setSelectedId] = useState<ServiceId>("topografia");

    const handleSelect = (id: ServiceId) => {
        setSelectedId(id);
        onSelectService(id);
    };

    const FarmOptionItem: React.FC<{ option: FarmOption }> = ({ option }) => {
        const IconComponent = iconMap[option.iconName];
        const isSelected = option.id === selectedId;

        return (
            <button
                onClick={() => handleSelect(option.id)}
                className={`flex flex-col items-center flex-1 p-4
                    transition-all duration-300 border-b-4 rounded-t-lg mx-2
                    ${isSelected
                        ? "bg-green-600 text-white shadow-xl scale-105 border-yellow-500"
                        : "bg-white text-gray-700 hover:bg-gray-100 hover:scale-105 border-gray-200"
                    }`}
            >
                <div className={`w-12 h-12 flex items-center justify-center
                    ${isSelected ? "text-yellow-300" : "text-green-600"}`}>
                    <IconComponent className="w-full h-full" />
                </div>

                <div className="text-sm md:text-base font-bold mt-2 text-center">
                    {option.label}
                </div>
            </button>
        );
    };

    return (
        <div className="w-full bg-white shadow-2xl">
            <div className="max-w-7xl mx-auto p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-extrabold text-gray-800 mb-6 border-b-2 border-green-600 pb-2 text-center md:text-left">
                    <span className="text-yellow-600 mr-2">◼︎</span>
                    Nuestros Servicios Principales <span className="text-green-600">(Tecnycampo)</span>
                </h2>

                <div className="flex justify-center items-end space-x-4">
                    {farmOptions.map(option => (
                        <FarmOptionItem key={option.id} option={option} />
                    ))}
                </div>
            </div>
        </div>
    );
}
