// src/constants/crops.ts

// These will be populated dynamically from the database/admin form
type CropItem = { value: string; label: string };

export const CROPS: {
    cereales: CropItem[];
    leguminosas: CropItem[];
    tuberculos: CropItem[];
    frutales: CropItem[];
    hortalizas: CropItem[];
    oleaginosas: CropItem[];
    cana: CropItem[];
} = {
    cereales: [],
    leguminosas: [],
    tuberculos: [],
    frutales: [],
    hortalizas: [],
    oleaginosas: [],
    cana: []
};

// Flat list of all crops
export const ALL_CROPS: CropItem[] = [
    ...CROPS.cereales,
    ...CROPS.leguminosas,
    ...CROPS.tuberculos,
    ...CROPS.frutales,
    ...CROPS.hortalizas,
    ...CROPS.oleaginosas,
    ...CROPS.cana
];

export default CROPS;
