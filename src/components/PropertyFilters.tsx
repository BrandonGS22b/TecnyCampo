// src/components/PropertyFilters.tsx

import React, { useState } from 'react';
import { getUseTypesByPropertyType, SOIL_TYPES, WATER_SOURCES, PASTURE_TYPES, TOPOGRAPHY_TYPES } from '../constants/filters';
import { ALL_CROPS } from '../constants/crops';
import SANTANDER_MUNICIPALITIES from '../constants/municipalities';

interface PropertyFiltersProps {
    propertyType: string;
    onFilterChange: (filters: any) => void;
}

export default function PropertyFilters({ propertyType, onFilterChange }: PropertyFiltersProps) {
    const [filters, setFilters] = useState({
        municipality: '',
        priceMin: '',
        priceMax: '',
        areaMin: '',
        areaMax: '',
        soilTypes: [] as string[],
        waterSources: [] as string[],
        pastureTypes: [] as string[],
        crops: [] as string[],
        topographyTypes: [] as string[],
        useTypes: [] as string[],
        hasElectricity: false
    });

    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleChange = (field: string, value: any) => {
        const newFilters = { ...filters, [field]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleMultiSelect = (field: string, value: string) => {
        const currentValues = filters[field as keyof typeof filters] as string[];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];
        handleChange(field, newValues);
    };

    const useTypes = getUseTypesByPropertyType(propertyType);

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-green-600 mr-2">🔍</span>
                Filtros de Búsqueda
            </h3>

            {/* Basic Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Municipality */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Municipio
                    </label>
                    <select
                        value={filters.municipality}
                        onChange={(e) => handleChange('municipality', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                        <option value="">Todos los municipios</option>
                        {SANTANDER_MUNICIPALITIES.map(mun => (
                            <option key={mun} value={mun}>{mun}</option>
                        ))}
                    </select>
                </div>

                {/* Price Range */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Precio Mínimo
                    </label>
                    <input
                        type="number"
                        value={filters.priceMin}
                        onChange={(e) => handleChange('priceMin', e.target.value)}
                        placeholder="$ 0"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Precio Máximo
                    </label>
                    <input
                        type="number"
                        value={filters.priceMax}
                        onChange={(e) => handleChange('priceMax', e.target.value)}
                        placeholder="$ Sin límite"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                </div>

                {/* Area Range */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Área (hectáreas)
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            value={filters.areaMin}
                            onChange={(e) => handleChange('areaMin', e.target.value)}
                            placeholder="Min"
                            className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <input
                            type="number"
                            value={filters.areaMax}
                            onChange={(e) => handleChange('areaMax', e.target.value)}
                            placeholder="Max"
                            className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Advanced Filters Toggle */}
            <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-green-600 font-semibold mb-4 hover:text-green-700 transition"
            >
                {showAdvanced ? '▼ Ocultar filtros avanzados' : '▶ Mostrar filtros avanzados'}
            </button>

            {showAdvanced && (
                <div className="space-y-6 border-t pt-6">
                    {/* Property Use Types - Conditional */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Tipo de Uso {propertyType === 'lote' && <span className="text-xs text-gray-500">(Avícola y Porcícola no disponibles para Lotes)</span>}
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {useTypes.map(type => (
                                <button
                                    key={type.value}
                                    onClick={() => handleMultiSelect('useTypes', type.value)}
                                    className={`p-3 rounded-lg border-2 transition ${filters.useTypes.includes(type.value)
                                            ? 'bg-green-600 text-white border-green-600'
                                            : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                                        }`}
                                >
                                    <span className="mr-2">{type.icon}</span>
                                    {type.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Soil Types */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Tipo de Suelo
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {SOIL_TYPES.map(soil => (
                                <button
                                    key={soil.value}
                                    onClick={() => handleMultiSelect('soilTypes', soil.value)}
                                    className={`p-3 rounded-lg border-2 transition ${filters.soilTypes.includes(soil.value)
                                            ? 'bg-green-600 text-white border-green-600'
                                            : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                                        }`}
                                >
                                    {soil.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Water Sources */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Fuentes de Agua
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {WATER_SOURCES.map(water => (
                                <button
                                    key={water.value}
                                    onClick={() => handleMultiSelect('waterSources', water.value)}
                                    className={`p-3 rounded-lg border-2 transition ${filters.waterSources.includes(water.value)
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                                        }`}
                                >
                                    <span className="mr-2">{water.icon}</span>
                                    {water.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Pasture Types */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Tipos de Pasto
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {PASTURE_TYPES.map(pasture => (
                                <button
                                    key={pasture.value}
                                    onClick={() => handleMultiSelect('pastureTypes', pasture.value)}
                                    className={`p-3 rounded-lg border-2 transition ${filters.pastureTypes.includes(pasture.value)
                                            ? 'bg-green-600 text-white border-green-600'
                                            : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                                        }`}
                                >
                                    {pasture.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Topography */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Topografía
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {TOPOGRAPHY_TYPES.map(topo => (
                                <button
                                    key={topo.value}
                                    onClick={() => handleMultiSelect('topographyTypes', topo.value)}
                                    className={`p-3 rounded-lg border-2 transition ${filters.topographyTypes.includes(topo.value)
                                            ? 'bg-green-600 text-white border-green-600'
                                            : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                                        }`}
                                >
                                    <span className="mr-2">{topo.icon}</span>
                                    {topo.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Crops - Dropdown */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Cultivos Aptos
                        </label>
                        <select
                            multiple
                            value={filters.crops}
                            onChange={(e) => {
                                const selected = Array.from(e.target.selectedOptions, option => option.value);
                                handleChange('crops', selected);
                            }}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-32"
                        >
                            {ALL_CROPS.map(crop => (
                                <option key={crop.value} value={crop.value}>{crop.label}</option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Mantén Ctrl/Cmd para seleccionar múltiples</p>
                    </div>

                    {/* Electricity */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="electricity"
                            checked={filters.hasElectricity}
                            onChange={(e) => handleChange('hasElectricity', e.target.checked)}
                            className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <label htmlFor="electricity" className="ml-3 text-sm font-semibold text-gray-700">
                            Con Electricidad
                        </label>
                    </div>
                </div>
            )}

            {/* Filter Count Badge */}
            <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                    {Object.values(filters).filter(v => Array.isArray(v) ? v.length > 0 : v !== '' && v !== false).length} filtros activos
                </div>
                <button
                    onClick={() => {
                        const resetFilters = {
                            municipality: '',
                            priceMin: '',
                            priceMax: '',
                            areaMin: '',
                            areaMax: '',
                            soilTypes: [],
                            waterSources: [],
                            pastureTypes: [],
                            crops: [],
                            topographyTypes: [],
                            useTypes: [],
                            hasElectricity: false
                        };
                        setFilters(resetFilters);
                        onFilterChange(resetFilters);
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                    Limpiar Filtros
                </button>
            </div>
        </div>
    );
}
