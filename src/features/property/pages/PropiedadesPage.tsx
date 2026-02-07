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
            {/* Innovative Hero Banner - Cleaned up */}
            <div className="relative bg-[#1a3a3a] py-16 px-4 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#facc15] opacity-10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-500 opacity-10 rounded-full -ml-10 -mb-10 blur-3xl"></div>

                <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
                    <div className="text-center">
                        <h2 className="text-[#facc15] text-sm font-bold uppercase tracking-[0.4em] mb-4 opacity-100">TecnyCampo Premium</h2>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
                            Encuentra la Finca <br className="hidden md:block" />
                            <span className="text-[#facc15] drop-shadow-sm">perfecta para ti</span>
                        </h1>
                        <p className="text-white/40 max-w-xl mx-auto text-sm md:text-base font-medium">
                            Toda la gestión inmobiliaria rural en un solo lugar.
                        </p>
                    </div>
                </div>
            </div>

            {/* Consolidated Dynamic Toolbar - Sticky */}
            <div className="bg-[#facc15] sticky top-[70px] z-30 shadow-2xl border-b border-[#eab308]">
                <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col lg:flex-row items-center gap-4">
                    {/* Left: Branding/Context */}
                    <div className="hidden lg:flex items-center gap-3 pr-6 border-r border-[#1a3a3a]/10">
                        <div className="w-1.5 h-8 bg-[#1a3a3a] rounded-full"></div>
                        <span className="font-black text-[#1a3a3a] text-lg uppercase tracking-tight">Filtrar</span>
                    </div>

                    {/* Center: Innovative Integrated search & Filter */}
                    <div className="flex-1 w-full flex items-center gap-2">
                        <div className="flex-1 relative group">
                            <LucideSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a3a3a]/40 group-focus-within:text-[#1a3a3a] transition-colors" size={20} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar por Nombre o ID..."
                                className="w-full bg-[#1a3a3a]/5 hover:bg-[#1a3a3a]/10 text-[#1a3a3a] pl-12 pr-4 py-3.5 rounded-2xl outline-none transition-all placeholder:text-[#1a3a3a]/40 font-bold border border-transparent focus:border-[#1a3a3a]/20"
                            />
                            {searchTerm && (
                                <button onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1a3a3a]/40 hover:text-[#1a3a3a]">
                                    <LucideX size={18} />
                                </button>
                            )}
                        </div>

                        <button
                            onClick={() => setShowFilters(true)}
                            className="bg-[#1a3a3a] text-[#facc15] px-6 py-3.5 rounded-2xl flex items-center gap-2 font-black shadow-lg hover:scale-[1.02] active:scale-95 transition-all text-sm whitespace-nowrap"
                        >
                            <LucideListFilter size={18} />
                            <span className="hidden sm:inline">FILTROS</span>
                        </button>
                    </div>

                    {/* Right: Sorting */}
                    <div className="w-full lg:w-auto flex items-center justify-between lg:justify-end gap-3 lg:pl-6 lg:border-l border-[#1a3a3a]/10">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-[#1a3a3a]/50 uppercase tracking-widest">Ordenar</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-transparent border-none text-sm font-black text-[#1a3a3a] focus:ring-0 outline-none cursor-pointer"
                            >
                                <option value="recientes">Más recientes</option>
                                <option value="precio-asc">Precio: Menor</option>
                                <option value="precio-desc">Precio: Mayor</option>
                                <option value="area-asc">Área: Menor</option>
                            </select>
                        </div>
                        <div className="bg-[#1a3a3a] text-[#facc15] px-3 py-1.5 rounded-full text-[10px] font-black flex items-center gap-1 shadow-sm">
                            <LucideRocket size={12} />
                            <span>PREMIUM</span>
                        </div>
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

