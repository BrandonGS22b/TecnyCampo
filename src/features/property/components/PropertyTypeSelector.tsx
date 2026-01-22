// src/components/PropertyTypeSelector.tsx

import React from 'react';
import { PROPERTY_TYPES } from '../../../shared/constants/filters';

interface PropertyTypeSelectorProps {
    selectedType: string;
    onSelectType: (type: string) => void;
}

export default function PropertyTypeSelector({ selectedType, onSelectType }: PropertyTypeSelectorProps) {
    return (
        <div className="w-full bg-white shadow-2xl">
            <div className="max-w-7xl mx-auto p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-extrabold text-gray-800 mb-6 border-b-2 border-green-600 pb-2 text-center md:text-left">
                    <span className="text-yellow-600 mr-2">◼︎</span>
                    Tipo de Propiedad
                </h2>

                <div className="flex justify-center items-end space-x-4">
                    {PROPERTY_TYPES.map((type) => {
                        const isSelected = type.value === selectedType;

                        return (
                            <button
                                key={type.value}
                                onClick={() => onSelectType(type.value)}
                                className={`flex flex-col items-center flex-1 p-4 max-w-xs
                  transition-all duration-300 border-b-4 rounded-t-lg
                  ${isSelected
                                        ? 'bg-green-600 text-white shadow-xl scale-105 border-yellow-500'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 hover:scale-105 border-gray-200'
                                    }`}
                            >
                                <div className={`text-4xl mb-2 ${isSelected ? 'text-yellow-300' : 'text-green-600'}`}>
                                    {type.icon}
                                </div>

                                <div className="text-sm md:text-base font-bold text-center">
                                    {type.label}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

