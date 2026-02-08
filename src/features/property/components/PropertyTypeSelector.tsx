import { LucideHome, LucideLayers, LucideMap, LucideSparkles } from 'lucide-react';

interface PropertyTypeSelectorProps {
    selectedType: string;
    onSelectType: (type: string) => void;
}

export default function PropertyTypeSelector({ selectedType, onSelectType }: PropertyTypeSelectorProps) {
    const types = [
        { value: 'lote', label: 'Lotes Rurales', icon: <LucideMap size={28} />, desc: 'Espacios por desarrollar' },
        { value: 'parcela', label: 'Parcelaciones', icon: <LucideLayers size={28} />, desc: 'Terrenos divididos' },
        { value: 'finca', label: 'Fincas Raíz', icon: <LucideHome size={28} />, desc: 'Propiedades productivas' },
    ];

    return (
        <div className="w-full mb-12">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-8 bg-[#facc15] rounded-full"></div>
                    <div>
                        <h2 className="text-2xl font-black text-[#1a3a3a] leading-tight">Expertos en Tierra</h2>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Selecciona tu categoría</p>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full border border-green-100 italic text-sm font-bold">
                    <LucideSparkles size={16} />
                    Mejores opciones en Santander
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 md:gap-6">
                {types.map((type) => {
                    const isSelected = type.value === selectedType;

                    return (
                        <button
                            key={type.value}
                            onClick={() => onSelectType(type.value)}
                            className={`flex flex-col items-start p-4 md:p-8 rounded-[24px] md:rounded-[32px] transition-all duration-500 group relative overflow-hidden backdrop-blur-sm
                                ${isSelected
                                    ? 'bg-[#1a3a3a] text-white shadow-2xl shadow-[#1a3a3a]/30 scale-[1.02] z-10'
                                    : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100 hover:border-[#facc15]/30'
                                }`}
                        >
                            {/* Decorative element for active state */}
                            {isSelected && (
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#facc15]/10 rounded-full -mr-16 -mt-16 animate-pulse"></div>
                            )}

                            <div className={`mb-6 p-4 rounded-2xl transition-all duration-300 ${isSelected
                                ? 'bg-[#facc15] text-[#1a3a3a] rotate-12'
                                : 'bg-gray-100 text-gray-400 group-hover:rotate-12 group-hover:bg-[#facc15]/20 group-hover:text-[#facc15]'
                                }`}>
                                {type.icon}
                            </div>

                            <h3 className={`font-black text-xs md:text-xl mb-1 md:mb-2 ${isSelected ? 'text-[#facc15]' : 'text-[#1a3a3a]'}`}>
                                {type.label}
                            </h3>
                            <p className="text-[8px] md:text-xs font-bold opacity-60 uppercase tracking-tighter line-clamp-1">
                                {type.desc}
                            </p>

                            {isSelected && (
                                <div className="mt-6 flex items-center justify-center w-8 h-8 bg-white/10 rounded-full self-end">
                                    <div className="w-2 h-2 bg-[#facc15] rounded-full animate-ping"></div>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

