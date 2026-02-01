// src/constants/filters.ts

// Core property types - these are fundamental to the application structure
export const PROPERTY_TYPES = [
    { value: 'lote', label: 'Lote', icon: '🏞️' },
    { value: 'parcela', label: 'Parcela', icon: '🌾' },
    { value: 'finca', label: 'Finca', icon: '🏡' }
];

// Property use types - conditional based on property type
export const PROPERTY_USE_TYPES: {
    common: Array<{ value: string; label: string; icon: string }>;
    parcelaFinca: Array<{ value: string; label: string; icon: string }>;
} = {
    common: [],
    parcelaFinca: []
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
