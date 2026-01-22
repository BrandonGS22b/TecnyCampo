// src/constants/filters.ts

export const PROPERTY_TYPES = [
    { value: 'lote', label: 'Lote', icon: '🏞️' },
    { value: 'parcela', label: 'Parcela', icon: '🌾' },
    { value: 'finca', label: 'Finca', icon: '🏡' }
];

export const SOIL_TYPES = [
    { value: 'arenoso', label: 'Arenoso' },
    { value: 'arcilloso', label: 'Arcilloso' },
    { value: 'franco', label: 'Franco' },
    { value: 'extra_negro', label: 'Extra Negro' },
    { value: 'humífero', label: 'Humífero' },
    { value: 'calcáreo', label: 'Calcáreo' },
    { value: 'limoso', label: 'Limoso' }
];

export const WATER_SOURCES = [
    { value: 'río', label: 'Río', icon: '🏞️' },
    { value: 'quebrada', label: 'Quebrada', icon: '💧' },
    { value: 'jagüey', label: 'Jagüey', icon: '💦' },
    { value: 'acueducto', label: 'Acueducto', icon: '🚰' },
    { value: 'pozo', label: 'Pozo', icon: '⚙️' },
    { value: 'bomba', label: 'Bomba', icon: '⚡' },
    { value: 'nacimiento', label: 'Nacimiento', icon: '💧' },
    { value: 'reservorio', label: 'Reservorio', icon: '🌊' }
];

export const PASTURE_TYPES = [
    { value: 'brachiaria', label: 'Brachiaria' },
    { value: 'estrella', label: 'Estrella' },
    { value: 'guinea', label: 'Guinea' },
    { value: 'kikuyo', label: 'Kikuyo' },
    { value: 'pasto_corte', label: 'Pasto de Corte' },
    { value: 'decumbens', label: 'Decumbens' },
    { value: 'natural', label: 'Natural' }
];

export const TOPOGRAPHY_TYPES = [
    { value: 'plana', label: 'Plana', icon: '━' },
    { value: 'ondulado_suave', label: 'Ondulado Suave', icon: '〰️' },
    { value: 'ondulado', label: 'Ondulado', icon: '〰️' },
    { value: 'quebrado', label: 'Quebrado', icon: '⛰️' },
    { value: 'montañoso', label: 'Montañoso', icon: '🏔️' },
    { value: 'escarpado', label: 'Escarpado', icon: '⛰️' }
];

// Property use types - conditional based on property type
export const PROPERTY_USE_TYPES = {
    // Available for all property types
    common: [
        { value: 'agrícola', label: 'Agrícola', icon: '🌾' },
        { value: 'ganadero', label: 'Ganadero', icon: '🐄' },
        { value: 'silvopastoril', label: 'Silvopastoril', icon: '🌳' },
        { value: 'forestal', label: 'Forestal', icon: '🌲' },
        { value: 'minera', label: 'Minera', icon: '⛏️' },
        { value: 'mixto', label: 'Mixto', icon: '🔄' }
    ],
    // Only for Parcelas and Fincas (NOT for Lotes)
    parcelaFinca: [
        { value: 'avícola', label: 'Avícola', icon: '🐔' },
        { value: 'porcícola', label: 'Porcícola', icon: '🐷' }
    ]
};

// Get use types based on property type
export const getUseTypesByPropertyType = (propertyType: string) => {
    if (propertyType === 'lote') {
        return PROPERTY_USE_TYPES.common;
    }
    // For parcela and finca, return all use types
    return [...PROPERTY_USE_TYPES.common, ...PROPERTY_USE_TYPES.parcelaFinca];
};

export default {
    PROPERTY_TYPES,
    SOIL_TYPES,
    WATER_SOURCES,
    PASTURE_TYPES,
    TOPOGRAPHY_TYPES,
    PROPERTY_USE_TYPES,
    getUseTypesByPropertyType
};
