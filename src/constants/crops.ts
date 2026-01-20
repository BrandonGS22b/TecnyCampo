// src/constants/crops.ts

// Comprehensive list of crops for Colombia
export const CROPS = {
    cereales: [
        { value: 'maíz', label: 'Maíz' },
        { value: 'arroz', label: 'Arroz' },
        { value: 'trigo', label: 'Trigo' },
        { value: 'cebada', label: 'Cebada' },
        { value: 'sorgo', label: 'Sorgo' }
    ],
    leguminosas: [
        { value: 'frijol', label: 'Frijol' },
        { value: 'arveja', label: 'Arveja' },
        { value: 'lenteja', label: 'Lenteja' },
        { value: 'garbanzo', label: 'Garbanzo' }
    ],
    tuberculos: [
        { value: 'papa', label: 'Papa' },
        { value: 'yuca', label: 'Yuca' },
        { value: 'ñame', label: 'Ñame' },
        { value: 'batata', label: 'Batata' }
    ],
    frutales: [
        { value: 'café', label: 'Café' },
        { value: 'cacao', label: 'Cacao' },
        { value: 'plátano', label: 'Plátano' },
        { value: 'banano', label: 'Banano' },
        { value: 'aguacate', label: 'Aguacate' },
        { value: 'mango', label: 'Mango' },
        { value: 'cítricos', label: 'Cítricos' },
        { value: 'papaya', label: 'Papaya' },
        { value: 'piña', label: 'Piña' },
        { value: 'maracuyá', label: 'Maracuyá' },
        { value: 'lulo', label: 'Lulo' },
        { value: 'mora', label: 'Mora' },
        { value: 'tomate_de_árbol', label: 'Tomate de Árbol' },
        { value: 'guayaba', label: 'Guayaba' },
        { value: 'curuba', label: 'Curuba' }
    ],
    hortalizas: [
        { value: 'tomate', label: 'Tomate' },
        { value: 'cebolla', label: 'Cebolla' },
        { value: 'zanahoria', label: 'Zanahoria' },
        { value: 'lechuga', label: 'Lechuga' },
        { value: 'repollo', label: 'Repollo' },
        { value: 'pimentón', label: 'Pimentón' },
        { value: 'cilantro', label: 'Cilantro' }
    ],
    oleaginosas: [
        { value: 'palma_africana', label: 'Palma Africana' },
        { value: 'soya', label: 'Soya' },
        { value: 'girasol', label: 'Girasol' },
        { value: 'ajonjolí', label: 'Ajonjolí' }
    ],
    cana: [
        { value: 'caña_de_azúcar', label: 'Caña de Azúcar' },
        { value: 'caña_panelera', label: 'Caña Panelera' }
    ]
};

// Flat list of all crops
export const ALL_CROPS = [
    ...CROPS.cereales,
    ...CROPS.leguminosas,
    ...CROPS.tuberculos,
    ...CROPS.frutales,
    ...CROPS.hortalizas,
    ...CROPS.oleaginosas,
    ...CROPS.cana
];

export default CROPS;
