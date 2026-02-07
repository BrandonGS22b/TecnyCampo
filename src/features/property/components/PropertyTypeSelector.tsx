import { LucideHome, LucideLayers, LucideMap } from 'lucide-react';

interface PropertyTypeSelectorProps {
    selectedType: string;
    onSelectType: (type: string) => void;
}

export default function PropertyTypeSelector({ selectedType, onSelectType }: PropertyTypeSelectorProps) {
    const types = [
        { value: 'lote', label: 'Lote', icon: <LucideMap size={24} /> },
        { value: 'parcela', label: 'Parcela', icon: <LucideLayers size={24} /> },
        { value: 'finca', label: 'Finca', icon: <LucideHome size={24} /> },
    ];

    return (
        <div className="w-full bg-white py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-xl md:text-2xl font-extrabold text-[#1a3a3a] mb-8 flex items-center gap-3">
                    <span className="w-3 h-3 bg-[#facc15] inline-block"></span>
                    Tipo de Propiedad
                </h2>
                <div className="w-full h-[1px] bg-gray-200 mb-10 relative">
                    <div className="absolute left-0 top-0 h-[2px] bg-green-500 w-1/4"></div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {types.map((type) => {
                        const isSelected = type.value === selectedType;

                        return (
                            <button
                                key={type.value}
                                onClick={() => onSelectType(type.value)}
                                className={`flex flex-col items-center justify-center py-6 px-4 rounded-xl transition-all duration-300 group relative
                                    ${isSelected
                                        ? 'bg-[#10b981] text-white shadow-xl scale-105 z-10'
                                        : 'bg-white text-gray-500 hover:bg-gray-50 border border-transparent group-hover:border-gray-200'
                                    }`}
                            >
                                <div className={`mb-3 p-3 rounded-lg transition-colors ${isSelected ? 'bg-white/20' : 'bg-gray-100'}`}>
                                    {type.icon}
                                </div>
                                <span className={`font-bold text-sm md:text-base ${isSelected ? 'text-white' : 'text-[#1a3a3a]'}`}>
                                    {type.label}
                                </span>

                                {isSelected && (
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#facc15] rounded-full"></div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

