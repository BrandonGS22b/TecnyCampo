import { useState, useEffect } from 'react';
import PropertyTypeSelector from '../components/PropertyTypeSelector';
import PropertyFilters from '../components/PropertyFilters';
import PropertyList from '../components/PropertyList';
import { LucideListFilter, LucideRocket } from 'lucide-react';

export default function PropiedadesPage() {
    // Initialize state from localStorage if available
    const [selectedPropertyType, setSelectedPropertyType] = useState<string>(() => {
        return localStorage.getItem('selectedPropertyType') || 'finca';
    });

    const [filters, setFilters] = useState<any>(() => {
        const savedFilters = localStorage.getItem('propertyFilters');
        return savedFilters ? JSON.parse(savedFilters) : {};
    });

    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState('destacados');

    // Persist changes to localStorage
    useEffect(() => {
        localStorage.setItem('selectedPropertyType', selectedPropertyType);
    }, [selectedPropertyType]);

    useEffect(() => {
        localStorage.setItem('propertyFilters', JSON.stringify(filters));
    }, [filters]);

    const handleFilterChange = (newFilters: any) => {
        setFilters(newFilters);
        setShowFilters(false); // Auto-close as requested
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Banner - Yellow Section */}
            <div className="bg-[#facc15] py-4 shadow-sm border-b-4 border-[#1a3a3a]">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-[#1a3a3a] text-lg font-medium">Encuentra la Finca</span>
                        <span className="text-[#1a3a3a] text-xl font-black">perfecta para ti</span>
                    </div>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="bg-[#1a3a3a] text-white px-6 py-2 rounded-full flex items-center gap-2 font-bold hover:bg-[#2a4a4a] transition-all transform hover:scale-105"
                    >
                        <span>Filtrar</span>
                        <LucideListFilter size={20} className="text-[#facc15]" />
                    </button>

                    <div className="bg-[#8b5cf6] text-white px-5 py-2 rounded-lg font-bold flex items-center gap-2 relative overflow-visible group cursor-pointer animate-pulse">
                        <span>Fincas de Oportunidad</span>
                        <LucideRocket size={20} />
                        <div className="absolute -right-3 -top-3 w-10 h-10 bg-[#8b5cf6] rotate-45 -z-10 group-hover:scale-110 transition-transform"></div>
                    </div>
                </div>
            </div>

            {/* Sort Section - Dark Green */}
            <div className="bg-[#065f46] py-3 shadow-md">
                <div className="max-w-7xl mx-auto px-4 flex justify-end items-center gap-3">
                    <span className="text-white font-bold">Ordenar:</span>
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-white border-2 border-[#facc15] rounded-lg px-4 py-1 pr-10 appearance-none font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#facc15]"
                        >
                            <option value="destacados">Ordenar por: Destacados</option>
                            <option value="precio-asc">Precio: Menor a Mayor</option>
                            <option value="precio-desc">Precio: Mayor a Menor</option>
                            <option value="recientes">Más recientes</option>
                        </select>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#facc15] p-1 rounded-sm pointer-events-none">
                            <svg className="w-4 h-4 text-[#1a3a3a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Overlay/Panel */}
            {showFilters && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="min-h-screen px-4 text-center">
                        <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
                        <div className="inline-block w-full max-w-4xl p-0 my-8 overflow-hidden text-left align-middle transition-all transform bg-transparent shadow-2xl rounded-2xl">
                            <PropertyFilters
                                propertyType={selectedPropertyType}
                                initialFilters={filters}
                                onFilterChange={handleFilterChange}
                                onClose={() => setShowFilters(false)}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Filter Chips (Selected Filters) */}
            <div className="max-w-7xl mx-auto px-4 pt-6">
                <div className="flex flex-wrap gap-2">
                    {/* Placeholder for chips - will be handled within PropertyFilters for consistency or here */}
                </div>
            </div>

            {/* Property Selector */}
            <div className="bg-white border-b">
                <PropertyTypeSelector
                    selectedType={selectedPropertyType}
                    onSelectType={setSelectedPropertyType}
                />
            </div>

            {/* Main Listings */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <PropertyList
                    propertyType={selectedPropertyType}
                    filters={filters}
                />
            </div>
        </div>
    );
}

