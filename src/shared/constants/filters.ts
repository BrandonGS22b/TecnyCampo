// src/constants/filters.ts

export const PROPERTY_TYPES = [
    { value: 'lote', label: 'Lote', icon: '🏞️' },
    { value: 'parcela', label: 'Parcela', icon: '🌾' },
    { value: 'finca', label: 'Finca', icon: '🏡' }
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
    PROPERTY_USE_TYPES,
    getUseTypesByPropertyType
};
