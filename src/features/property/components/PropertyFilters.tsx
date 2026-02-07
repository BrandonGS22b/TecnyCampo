import { useState, useEffect } from 'react';
import { getUseTypesByPropertyType } from '../../../shared/constants/filters';
import SANTANDER_MUNICIPALITIES from '../../../shared/constants/municipalities';
import { LucidePlus, LucideX, LucideMapPin, LucideDollarSign, LucideZap, LucideSprout, LucideMountain, LucideListFilter } from 'lucide-react';

interface PropertyFiltersProps {
    propertyType: string;
    initialFilters?: any;
    onFilterChange: (filters: any) => void;
    onClose?: () => void;
}

export default function PropertyFilters({ propertyType, initialFilters, onFilterChange, onClose }: PropertyFiltersProps) {
    const [filters, setFilters] = useState(initialFilters || {
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

    // Dynamic Options State
    const [dynamicOptions, setDynamicOptions] = useState({
        pastureTypes: [] as any[],
        waterSources: [] as any[],
        topographyTypes: [] as any[],
        soilTypes: [] as any[],
        useTypes: [] as any[]
    });

    const [openCategory, setOpenCategory] = useState<string | null>('tipo');

    useEffect(() => {
        fetchAllOptions();
    }, []);

    const fetchAllOptions = async () => {
        const endpoints = ['pastureTypes', 'waterSources', 'topographyTypes', 'soilTypes', 'useTypes'];
        const newOptions: any = {};

        for (const ep of endpoints) {
            try {
                const response = await fetch(`https://tecnycampo-backend.onrender.com/api/configuration/${ep}`);
                if (response.ok) {
                    const data = await response.json();
                    newOptions[ep] = data.map((item: string) => ({ value: item, label: item, icon: '•' }));
                }
            } catch (error) {
                console.error(`Error fetching ${ep}:`, error);
            }
        }
        setDynamicOptions(prev => ({ ...prev, ...newOptions }));
    };

    const handleChange = (field: string, value: any) => {
        setFilters((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleMultiSelect = (field: string, value: string) => {
        const currentValues = filters[field as keyof typeof filters] as string[];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];
        handleChange(field, newValues);
    };

    const handleApply = () => {
        onFilterChange(filters);
    };

    const handleReset = () => {
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
    };

    const removeFilter = (field: string, value?: any) => {
        if (Array.isArray(filters[field])) {
            handleChange(field, filters[field].filter((v: any) => v !== value));
        } else {
            handleChange(field, typeof filters[field] === 'boolean' ? false : '');
        }
    };

    const useTypes = getUseTypesByPropertyType(propertyType);

    const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
        if (Array.isArray(value)) return value.length > 0;
        if (typeof value === 'boolean') return value === true;
        return value !== '';
    }).length;

    const sections = [
        { id: 'tipo', label: 'Tipo de Finca', icon: <LucideSprout size={18} /> },
        { id: 'ubicacion', label: 'Ubicación', icon: <LucideMapPin size={18} /> },
        { id: 'precio', label: 'Precio', icon: <LucideDollarSign size={18} /> },
        { id: 'caracteristicas', label: 'Características', icon: <LucideMountain size={18} /> },
    ];

    return (
        <div className="bg-[#1a3a3a] text-white p-6 rounded-2xl shadow-2xl max-w-4xl mx-auto border-4 border-[#facc15]">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <LucideListFilter className="text-[#facc15]" />
                    Filtros de Búsqueda
                </h3>
                {onClose && (
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition">
                        <LucideX size={24} />
                    </button>
                )}
            </div>

            {/* Selected Filters Section */}
            <div className="mb-6 border-b border-gray-700 pb-4">
                <h4 className="text-[#facc15] text-sm font-bold uppercase tracking-wider mb-3">Filtros seleccionados</h4>
                <div className="flex flex-wrap gap-2">
                    {activeFiltersCount === 0 && <p className="text-gray-500 text-sm italic">No hay filtros seleccionados</p>}

                    {filters.municipality && (
                        <span className="bg-transparent border border-[#facc15] text-[#facc15] px-3 py-1 rounded-md text-sm flex items-center gap-2">
                            {filters.municipality} <LucideX size={14} className="cursor-pointer" onClick={() => removeFilter('municipality')} />
                        </span>
                    )}

                    {filters.useTypes.map((t: string) => (
                        <span key={t} className="bg-transparent border border-[#facc15] text-[#facc15] px-3 py-1 rounded-md text-sm flex items-center gap-2">
                            {t} <LucideX size={14} className="cursor-pointer" onClick={() => removeFilter('useTypes', t)} />
                        </span>
                    ))}
                    {/* Add more chips as needed for other fields */}
                </div>
            </div>

            {/* Accordion Categories */}
            <div className="space-y-3 mb-8">
                <h4 className="text-[#facc15] text-sm font-bold uppercase tracking-wider mb-3">Lista de filtros</h4>

                {sections.map((section) => (
                    <div key={section.id} className="border-b border-gray-700 last:border-0 overflow-hidden">
                        <button
                            onClick={() => setOpenCategory(openCategory === section.id ? null : section.id)}
                            className="w-full flex items-center justify-between py-4 hover:bg-[#2a4a4a] transition-all px-2 rounded-t-lg group"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-[#facc15]">{section.icon}</span>
                                <span className={`font-bold text-lg ${openCategory === section.id ? 'text-[#facc15]' : 'text-white'}`}>
                                    {section.label}
                                </span>
                            </div>
                            <div className={`p-1 rounded-sm bg-[#facc15] text-[#1a3a3a] transform transition-transform ${openCategory === section.id ? 'rotate-45' : ''}`}>
                                <LucidePlus size={18} />
                            </div>
                        </button>

                        <div className={`transition-all duration-300 ease-in-out ${openCategory === section.id ? 'max-h-[500px] opacity-100 py-4' : 'max-h-0 opacity-0'} overflow-hidden bg-[#162e2e] rounded-b-lg px-4`}>
                            {/* Content based on ID */}
                            {section.id === 'tipo' && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {useTypes.map(type => (
                                        <button
                                            key={type.value}
                                            onClick={() => handleMultiSelect('useTypes', type.value)}
                                            className={`p-3 rounded-lg border-2 transition ${filters.useTypes.includes(type.value)
                                                ? 'bg-[#1a3a3a] text-[#facc15] border-[#facc15]'
                                                : 'bg-transparent text-gray-300 border-gray-600 hover:border-gray-400'
                                                }`}
                                        >
                                            <div className="text-xl mb-1">{type.icon}</div>
                                            <div className="text-xs font-bold">{type.label}</div>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {section.id === 'ubicacion' && (
                                <select
                                    value={filters.municipality}
                                    onChange={(e) => handleChange('municipality', e.target.value)}
                                    className="w-full bg-[#1a3a3a] text-white p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#facc15] focus:border-transparent outline-none"
                                >
                                    <option value="">Todos los municipios</option>
                                    {SANTANDER_MUNICIPALITIES.map(mun => (
                                        <option key={mun} value={mun}>{mun}</option>
                                    ))}
                                </select>
                            )}

                            {section.id === 'precio' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">Precio Mínimo</label>
                                        <input
                                            type="number"
                                            value={filters.priceMin}
                                            onChange={(e) => handleChange('priceMin', e.target.value)}
                                            placeholder="$ 0"
                                            className="w-full bg-[#1a3a3a] p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#facc15] outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">Precio Máximo</label>
                                        <input
                                            type="number"
                                            value={filters.priceMax}
                                            onChange={(e) => handleChange('priceMax', e.target.value)}
                                            placeholder="$ Sin límite"
                                            className="w-full bg-[#1a3a3a] p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#facc15] outline-none"
                                        />
                                    </div>
                                </div>
                            )}

                            {section.id === 'caracteristicas' && (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-3 bg-[#1a3a3a] rounded-lg border border-gray-600">
                                        <input
                                            type="checkbox"
                                            id="electricity"
                                            checked={filters.hasElectricity}
                                            onChange={(e) => handleChange('hasElectricity', e.target.checked)}
                                            className="w-5 h-5 accent-[#facc15]"
                                        />
                                        <label htmlFor="electricity" className="text-sm font-bold flex items-center gap-2">
                                            <LucideZap size={16} className="text-yellow-400" />
                                            Con Electricidad
                                        </label>
                                    </div>
                                    {/* Add other characteristic filters here */}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
                <button
                    onClick={handleReset}
                    className="flex-1 py-3 bg-transparent border-2 border-gray-600 text-gray-300 rounded-xl font-bold hover:bg-gray-800 transition"
                >
                    Limpiar
                </button>
                <button
                    onClick={handleApply}
                    className="flex-1 py-3 bg-[#facc15] text-[#1a3a3a] rounded-xl font-black text-lg hover:bg-yellow-400 transition transform hover:scale-105 active:scale-95 shadow-lg"
                >
                    APLICAR FILTROS
                </button>
            </div>
        </div>
    );
}

