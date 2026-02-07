import { useState, useEffect } from 'react';
import PropertyTypeSelector from '../components/PropertyTypeSelector';
import PropertyFilters from '../components/PropertyFilters';
import PropertyList from '../components/PropertyList';
import { LucideListFilter, LucideRocket, LucideSearch, LucideX } from 'lucide-react';

export default function PropiedadesPage() {
    // Initialize state from localStorage if available
    const [selectedPropertyType, setSelectedPropertyType] = useState<string>(() => {
        return localStorage.getItem('selectedPropertyType') || 'finca';
    });

    const [filters, setFilters] = useState<any>(() => {
        const savedFilters = localStorage.getItem('propertyFilters');
        return savedFilters ? JSON.parse(savedFilters) : {};
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState(() => {
        return localStorage.getItem('propertySortBy') || 'recientes';
    });

    // Persist changes to localStorage
    useEffect(() => {
        localStorage.setItem('selectedPropertyType', selectedPropertyType);
    }, [selectedPropertyType]);

    useEffect(() => {
        localStorage.setItem('propertyFilters', JSON.stringify(filters));
    }, [filters]);

    useEffect(() => {
        localStorage.setItem('propertySortBy', sortBy);
    }, [sortBy]);

    const handleFilterChange = (newFilters: any) => {
        setFilters(newFilters);
        setShowFilters(false);
    };

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            {/* Innovative Hero Banner */}
            <div className="relative bg-[#1a3a3a] py-12 px-4 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#facc15] opacity-10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-500 opacity-10 rounded-full -ml-10 -mb-10 blur-3xl"></div>

                <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
                    <div className="text-center mb-8">
                        <h2 className="text-white text-sm font-bold uppercase tracking-[0.3em] mb-2 opacity-80">TecnyCampo Premium</h2>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
                            Encuentra tu Finca <span className="text-[#facc15]">Perfecta</span>
                        </h1>
                        <p className="text-blue-100/60 max-w-xl mx-auto text-sm md:text-base">
                            Explora las mejores oportunidades rurales con filtrado inteligente y búsqueda por ID.
                        </p>
                    </div>

                    {/* Innovative Search/Filter Bar */}
                    <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-2xl flex flex-col md:flex-row gap-2">
                        <div className="flex-1 relative group">
                            <LucideSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#facc15] transition-colors" size={20} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar por Nombre o ID de propiedad..."
                                className="w-full bg-white/5 text-white pl-12 pr-4 py-4 rounded-xl outline-none focus:bg-white/10 transition-all border border-transparent focus:border-white/20 placeholder:text-gray-400"
                            />
                            {searchTerm && (
                                <button onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                                    <LucideX size={18} />
                                </button>
                            )}
                        </div>

                        <button
                            onClick={() => setShowFilters(true)}
                            className="bg-[#facc15] text-[#1a3a3a] px-8 py-4 rounded-xl flex items-center justify-center gap-3 font-black hover:bg-[#ffe066] transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg group"
                        >
                            <span>Filtros Avanzados</span>
                            <LucideListFilter size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Stats/Badges Toolbar */}
            <div className="bg-white border-b sticky top-[70px] z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-violet-100 text-violet-700 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border border-violet-200 cursor-pointer hover:bg-violet-200 transition-colors">
                            <LucideRocket size={14} />
                            <span>Fincas de Oportunidad</span>
                        </div>
                        <div className="text-xs text-gray-500 font-medium hidden md:block">
                            Mostrando {selectedPropertyType}s en Santander
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Ordenar:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-gray-50 border-none rounded-lg px-4 py-1.5 text-sm font-bold text-[#1a3a3a] focus:ring-2 focus:ring-[#facc15] outline-none cursor-pointer"
                        >
                            <option value="recientes">Más recientes</option>
                            <option value="precio-asc">Precio: Menor a Mayor</option>
                            <option value="precio-desc">Precio: Mayor a Menor</option>
                            <option value="area-asc">Área: Menor a Mayor</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Filter Drawer - Innovative Slide-over */}
            {showFilters && (
                <div className="fixed inset-0 z-[60] flex justify-end">
                    <div className="absolute inset-0 bg-[#0f172a]/60 backdrop-blur-sm transition-opacity" onClick={() => setShowFilters(false)}></div>
                    <div className="relative w-full max-w-md bg-[#1a3a3a] h-full shadow-2xl flex flex-col border-l-4 border-[#facc15] overflow-y-auto">
                        <PropertyFilters
                            propertyType={selectedPropertyType}
                            initialFilters={filters}
                            onFilterChange={handleFilterChange}
                            onClose={() => setShowFilters(false)}
                        />
                    </div>
                </div>
            )}

            {/* Content Area */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Property Type Selector - Minimalist & Sleek */}
                <div className="mb-10">
                    <PropertyTypeSelector
                        selectedType={selectedPropertyType}
                        onSelectType={setSelectedPropertyType}
                    />
                </div>

                {/* Main Listings */}
                <PropertyList
                    propertyType={selectedPropertyType}
                    filters={filters}
                    searchTerm={searchTerm}
                    sortBy={sortBy}
                />
            </div>
        </div>
    );
}

