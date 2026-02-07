import { useState, useEffect } from 'react';
import { getUseTypesByPropertyType } from '../../../shared/constants/filters';
import SANTANDER_MUNICIPALITIES from '../../../shared/constants/municipalities';
import {
    LucideX, LucideMapPin, LucideDollarSign,
    LucideZap, LucideSprout, LucideMountain, LucideChevronDown,
    LucideCheck, LucideFilter, LucideDroplets, LucideMoveUp
} from 'lucide-react';

interface PropertyFiltersProps {
    propertyType: string;
    initialFilters?: any;
    onFilterChange: (filters: any) => void;
    onClose?: () => void;
}

export default function PropertyFilters({ propertyType, initialFilters, onFilterChange, onClose }: PropertyFiltersProps) {
    const [filters, setFilters] = useState(initialFilters || {});
    const [openCategory, setOpenCategory] = useState<string | null>('ubicacion');
    const [dynamicOptions, setDynamicOptions] = useState<any>(null);

    useEffect(() => {
        fetchDynamicOptions();
    }, [propertyType]);

    const fetchDynamicOptions = async () => {
        try {
            const response = await fetch(`https://tecnycampo-backend.onrender.com/api/terrains/filters/${propertyType}`);
            if (response.ok) {
                const data = await response.json();
                setDynamicOptions(data.availableFilters);
            }
        } catch (error) {
            console.error('Error fetching dynamic options:', error);
        }
    };

    const toggleFilter = (category: string, value: any) => {
        setFilters((prev: any) => {
            const current = prev[category] || [];
            if (current.includes(value)) {
                return { ...prev, [category]: current.filter((v: any) => v !== value) };
            } else {
                return { ...prev, [category]: [...current, value] };
            }
        });
    };

    const handleApply = () => {
        onFilterChange(filters);
    };

    const handleReset = () => {
        const resetFilters = {
            useTypes: [],
            soilTypes: [],
            waterSources: [],
            pastureTypes: [],
            topographyTypes: [],
            municipality: '',
            priceMin: '',
            priceMax: '',
            hasElectricity: false
        };
        setFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    const FilterSection = ({ id, title, icon: Icon, children }: any) => (
        <div className="mb-2 border-b border-white/5 pb-2">
            <button
                onClick={() => setOpenCategory(openCategory === id ? null : id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${openCategory === id ? 'bg-white/10 text-[#facc15]' : 'bg-transparent text-gray-400 hover:bg-white/5'
                    }`}
            >
                <div className="flex items-center gap-3">
                    <Icon size={20} className={openCategory === id ? 'text-[#facc15]' : 'text-gray-500'} />
                    <span className="font-bold text-sm uppercase tracking-wider">{title}</span>
                </div>
                <LucideChevronDown
                    size={20}
                    className={`transition-transform duration-300 ${openCategory === id ? 'rotate-180 text-[#facc15]' : 'text-gray-600'}`}
                />
            </button>

            {openCategory === id && (
                <div className="mt-4 px-2 pb-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    {children}
                </div>
            )}
        </div>
    );

    return (
        <div className="flex flex-col h-full bg-[#1a3a3a] text-white">
            {/* Premium Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#1a3a3a]/80 backdrop-blur-xl z-20">
                <div className="flex items-center gap-3">
                    <div className="bg-[#facc15] p-2 rounded-xl text-[#1a3a3a]">
                        <LucideFilter size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black">FILTRO INTELIGENTE</h2>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Encuentra tu {propertyType}</p>
                    </div>
                </div>
                {onClose && (
                    <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors text-gray-400 hover:text-white">
                        <LucideX size={24} />
                    </button>
                )}
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">

                {/* Active Filters Summary */}
                <div className="mb-6 p-4 bg-white/5 rounded-3xl border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-black text-gray-500 uppercase">Resumen de búsqueda</span>
                        <button onClick={handleReset} className="text-[#facc15] text-[10px] font-bold hover:underline">REINICIAR</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {filters.municipality && (
                            <div className="bg-[#facc15] text-[#1a3a3a] px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-2">
                                <LucideMapPin size={12} />
                                <span>{filters.municipality}</span>
                            </div>
                        )}
                        {filters.useTypes?.map((t: string) => (
                            <div key={t} className="bg-white/10 text-white px-3 py-1.5 rounded-full text-xs font-bold border border-white/10">
                                {t}
                            </div>
                        ))}
                        {(!filters.municipality && (!filters.useTypes || filters.useTypes.length === 0)) && (
                            <p className="text-gray-500 text-[10px] italic">Sin filtros específicos aún</p>
                        )}
                    </div>
                </div>

                <FilterSection title="Tipología & Uso" id="tipo" icon={LucideSprout}>
                    <div className="grid grid-cols-2 gap-2">
                        {getUseTypesByPropertyType(propertyType).map(use => (
                            <button
                                key={use.value}
                                onClick={() => toggleFilter('useTypes', use.value)}
                                className={`p-4 rounded-2xl text-xs font-bold transition-all text-left flex flex-col gap-2
                                    ${filters.useTypes?.includes(use.value)
                                        ? 'bg-[#facc15] text-[#1a3a3a] shadow-lg scale-[1.02]'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                            >
                                <span className="text-xl opacity-70">{use.icon}</span>
                                <span>{use.label}</span>
                                {filters.useTypes?.includes(use.value) && <LucideCheck size={14} className="self-end mt-auto" />}
                            </button>
                        ))}
                    </div>
                </FilterSection>

                <FilterSection title="Ubicación" id="ubicacion" icon={LucideMapPin}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {SANTANDER_MUNICIPALITIES.map(m => (
                            <button
                                key={m}
                                onClick={() => setFilters({ ...filters, municipality: m === filters.municipality ? undefined : m })}
                                className={`p-3 rounded-xl text-[10px] font-bold transition-all
                                    ${filters.municipality === m
                                        ? 'bg-[#facc15] text-[#1a3a3a]'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-transparent hover:border-white/10'}`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </FilterSection>

                <FilterSection title="Presupuesto" id="precio" icon={LucideDollarSign}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Mínimo</label>
                            <input
                                type="number"
                                placeholder="$ 0"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#facc15] transition-colors"
                                value={filters.priceMin || ''}
                                onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Máximo</label>
                            <input
                                type="number"
                                placeholder="$ 5.000M"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#facc15] transition-colors"
                                value={filters.priceMax || ''}
                                onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                            />
                        </div>
                    </div>
                </FilterSection>

                <FilterSection title="Tierra & Recursos" id="tierra" icon={LucideMountain}>
                    {dynamicOptions ? (
                        <div className="space-y-6">
                            <div>
                                <p className="text-gray-500 text-[10px] font-black mb-3 uppercase tracking-widest">TIPO DE SUELO</p>
                                <div className="flex flex-wrap gap-2">
                                    {dynamicOptions.soilTypes?.map((s: string) => (
                                        <button
                                            key={s}
                                            onClick={() => toggleFilter('soilTypes', s)}
                                            className={`px-4 py-2 rounded-full text-[10px] font-bold transition-all
                                                ${filters.soilTypes?.includes(s)
                                                    ? 'bg-green-600 text-white shadow-lg'
                                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'}`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="text-gray-500 text-[10px] font-black mb-3 uppercase tracking-widest flex items-center gap-2">
                                    <LucideDroplets size={12} className="text-blue-400" />
                                    FUENTES DE AGUA
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {dynamicOptions.waterSources?.map((s: string) => (
                                        <button
                                            key={s}
                                            onClick={() => toggleFilter('waterSources', s)}
                                            className={`px-4 py-2 rounded-full text-[10px] font-bold transition-all
                                                ${filters.waterSources?.includes(s)
                                                    ? 'bg-blue-600 text-white shadow-lg'
                                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'}`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="text-gray-500 text-[10px] font-black mb-3 uppercase tracking-widest flex items-center gap-2">
                                    <LucideMoveUp size={12} className="text-orange-400" />
                                    TOPOGRAFÍA
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {dynamicOptions.topographyTypes?.map((s: string) => (
                                        <button
                                            key={s}
                                            onClick={() => toggleFilter('topographyTypes', s)}
                                            className={`px-4 py-2 rounded-full text-[10px] font-bold transition-all
                                                ${filters.topographyTypes?.includes(s)
                                                    ? 'bg-orange-600 text-white shadow-lg'
                                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'}`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => setFilters({ ...filters, hasElectricity: !filters.hasElectricity })}
                                className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all
                                    ${filters.hasElectricity
                                        ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'
                                        : 'bg-white/5 text-gray-400 border border-white/5'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <LucideZap size={18} className={filters.hasElectricity ? 'text-yellow-500' : 'text-gray-500'} />
                                    <span className="font-bold text-sm">Energía Eléctrica</span>
                                </div>
                                {filters.hasElectricity && <LucideCheck size={18} />}
                            </button>
                        </div>
                    ) : (
                        <div className="py-4 text-center">
                            <div className="w-6 h-6 border-2 border-[#facc15] border-t-transparent rounded-full animate-spin mx-auto"></div>
                        </div>
                    )}
                </FilterSection>
            </div>

            {/* Sticky Actions */}
            <div className="p-6 border-t border-white/10 bg-[#1a3a3a]/90 backdrop-blur-xl">
                <button
                    onClick={handleApply}
                    className="w-full bg-[#facc15] text-[#1a3a3a] py-5 rounded-2xl font-black text-lg shadow-2xl hover:bg-[#ffe066] transition-all transform active:scale-95 flex items-center justify-center gap-3"
                >
                    <LucideFilter size={20} />
                    <span>APLICAR FILTROS</span>
                </button>
            </div>
        </div>
    );
}

