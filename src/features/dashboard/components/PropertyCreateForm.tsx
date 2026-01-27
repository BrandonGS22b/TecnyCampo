
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/auth.context';
import { PROPERTY_TYPES } from '../../../shared/constants/filters';
import { uploadMedia } from '../../../shared/services/upload.service';
import { DEPARTMENTS, getMunicipalities } from '../../../shared/constants/colombia';

import {
    PhotoIcon,
    MapPinIcon,
    ClipboardDocumentCheckIcon,
    GlobeAmericasIcon
} from '@heroicons/react/24/outline';

export default function PropertyCreateForm({ editMode = false, initialData = null, onSuccess }: any) {
    const { token } = useAuth();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({ text: '', type: '' });

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        area: '',
        propertyType: 'finca',
        location: {
            department: '',
            municipality: '',
            vereda: '',
            distanceToTown: '',
            roadAccess: '',
            closestPavedRoad: ''
        },
        useTypes: [] as string[],
        soil: { types: [] as string[] },
        water: { sources: [] as string[] },
        pasture: { types: [] as string[] },
        crops: [] as string[],
        topography: { types: [] as string[], elevation: { min: '', max: '' } },
        media: {
            images: [] as string[],
            videos: [] as string[],
            images360: [] as string[]
        },
        legal: {
            documentation: 'completa',
            permits: [] as string[],
            restrictions: [] as string[]
        },
        installations: {
            electricity: false,
            buildings: [] as string[],
            fences: [] as string[],
            infrastructure: [] as string[]
        },
        productivity: {
            currentUse: '',
            production: '',
            potential: '',
            animalCapacity: ''
        },
        forestPercentage: '',
        reservePercentage: '',
        rastrojoBajoPercentage: '',
        rastrojoAltoPercentage: '',
        status: 'published',

        // Temp states for adding new options
        newOption: {
            pastureTypes: '',
            waterSources: '',
            topographyTypes: '',
            soilTypes: '',
            useTypes: '',
            crops: ''
        }
    });

    // Dynamic Options State
    const [dynamicOptions, setDynamicOptions] = useState({
        pastureTypes: [] as string[],
        waterSources: [] as string[],
        topographyTypes: [] as string[],
        soilTypes: [] as string[],
        useTypes: [] as string[],
        crops: [] as string[]
    });

    // Load initial options
    useEffect(() => {
        const loadAllOptions = async () => {
            const endpoints = ['pastureTypes', 'waterSources', 'topographyTypes', 'soilTypes', 'useTypes', 'crops'];
            const newOptions: any = {};

            for (const ep of endpoints) {
                try {
                    const res = await fetch(`https://tecnycampo-backend.onrender.com/api/configuration/${ep}`);
                    if (res.ok) {
                        newOptions[ep] = await res.json();
                    }
                } catch (e) {
                    console.error(`Error loading ${ep}`, e);
                }
            }
            setDynamicOptions(prev => ({ ...prev, ...newOptions }));
        };
        loadAllOptions();
    }, []);

    const handleManageOption = async (listName: string, action: 'add' | 'delete' | 'update', payload: any) => {
        try {
            const url = `https://tecnycampo-backend.onrender.com/api/configuration/${listName}`;
            let method = 'POST';
            let body = {};

            if (action === 'add') {
                method = 'POST';
                body = { option: payload };
            } else if (action === 'delete') {
                method = 'DELETE'; // DELETE usually requires body or query? Our backend expects body.
                // Standard fetch DELETE with body might be tricky in some browsers/proxies, but let's try.
                // If backend uses body for DELETE, we need to send headers.
            } else if (action === 'update') {
                method = 'PUT';
                body = { oldOption: payload.old, newOption: payload.new };
            }

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}` // If backend requires auth for settings
                },
                body: JSON.stringify(action === 'delete' ? { option: payload } : body)
            });

            if (res.ok) {
                const updatedList = await res.json();
                // @ts-ignore
                setDynamicOptions(prev => ({ ...prev, [listName]: updatedList }));

                // Clear temp input
                if (action === 'add') {
                    // @ts-ignore
                    setFormData(prev => ({ ...prev, newOption: { ...prev.newOption, [listName]: '' } }));
                }
            } else {
                alert('Error al gestionar la opción');
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (editMode && initialData) {
            setFormData({
                ...initialData,
                price: initialData.price.toString(),
                area: initialData.area.toString(),
                status: initialData.status || 'published',
                // Initialize nested objects if they are missing in initialData to avoid crashes
                location: initialData.location || {},
                productivity: initialData.productivity || {},
                installations: initialData.installations || {},
                topography: initialData.topography || { elevation: {} },
                media: initialData.media || { images: [], videos: [], images360: [] },
                newOption: {
                    pastureTypes: '',
                    waterSources: '',
                    topographyTypes: '',
                    soilTypes: '',
                    useTypes: '',
                    crops: ''
                }
            });
        }
    }, [editMode, initialData]);

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNestedChange = (parent: string, field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [parent]: {
                // @ts-ignore
                ...prev[parent],
                [field]: value
            }
        }));
    };

    const handleArrayToggle = (parent: string, field: string, value: string) => {
        setFormData(prev => {
            // @ts-ignore
            const currentArray = prev[parent][field] as string[];
            const newArray = currentArray.includes(value)
                ? currentArray.filter(v => v !== value)
                : [...currentArray, value];

            return {
                ...prev,
                [parent]: {
                    // @ts-ignore
                    ...prev[parent],
                    [field]: newArray
                }
            };
        });
    };

    // Subcomponents for steps
    const renderStep1_General = () => (
        <div className="space-y-4 animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <ClipboardDocumentCheckIcon className="w-6 h-6 mr-2 text-green-600" />
                Información Básica
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Título de la Propiedad</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Tipo de Propiedad</label>
                    <select
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        value={formData.propertyType}
                        onChange={(e) => handleChange('propertyType', e.target.value)}
                    >
                        {PROPERTY_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Precio (COP)</label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        value={formData.price}
                        onChange={(e) => handleChange('price', e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Área (Hectáreas)</label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        value={formData.area}
                        onChange={(e) => handleChange('area', e.target.value)}
                    />
                </div>


                <div>
                    <label className="block text-sm font-semibold text-gray-700">
                        Tipos de Uso (Dinámico)
                    </label>
                    <div className="border rounded-lg p-3 max-h-48 overflow-y-auto bg-gray-50">
                        {/* List */}
                        {dynamicOptions.useTypes.map((use: string) => (
                            <div key={use} className="flex items-center justify-between gap-2 p-1 hover:bg-gray-100 rounded group">
                                <label className="flex items-center gap-2 cursor-pointer flex-1">
                                    <input
                                        type="checkbox"
                                        checked={formData.useTypes.includes(use)}
                                        onChange={() => {
                                            const current = formData.useTypes;
                                            const newTypes = current.includes(use)
                                                ? current.filter((t: string) => t !== use)
                                                : [...current, use];
                                            setFormData(prev => ({ ...prev, useTypes: newTypes }));
                                        }}
                                        className="rounded text-green-600 focus:ring-green-500"
                                    />
                                    <span className="text-sm">{use}</span>
                                </label>
                                <div className="hidden group-hover:flex gap-1">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newName = prompt('Editar nombre:', use);
                                            if (newName && newName !== use) handleManageOption('useTypes', 'update', { old: use, new: newName });
                                        }}
                                        className="text-blue-500 hover:text-blue-700 p-1"
                                    >✎</button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (confirm('¿Eliminar?')) handleManageOption('useTypes', 'delete', use);
                                        }}
                                        className="text-red-500 hover:text-red-700 p-1"
                                    >×</button>
                                </div>
                            </div>
                        ))}
                        {/* Add New */}
                        <div className="flex gap-2 mt-2 pt-2 border-t">
                            {/* @ts-ignore */}
                            <input
                                type="text"
                                placeholder="Nuevo uso..."
                                className="flex-1 p-1 text-sm border rounded"
                                value={formData.newOption.useTypes}
                                onChange={(e) => setFormData(p => ({ ...p, newOption: { ...p.newOption, useTypes: e.target.value } }))}
                            />
                            <button
                                type="button"
                                onClick={() => handleManageOption('useTypes', 'add', formData.newOption.useTypes)}
                                className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                            >Agregar</button>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700">
                        Estado de documentación <span className="text-red-500">*</span>
                    </label>
                    <select
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        value={formData.legal.documentation}
                        onChange={(e) => handleNestedChange('legal', 'documentation', e.target.value)}
                    >
                        <option value="completa">Completa</option>
                        <option value="parcial">Parcial</option>
                        <option value="sin_documentos">Sin Documentos</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700">
                        Estado de la Publicación
                    </label>
                    <select
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        value={formData.status}
                        onChange={(e) => handleChange('status', e.target.value)}
                    >
                        <option value="draft">Borrador</option>
                        <option value="published">Publicada</option>
                        <option value="archived">Archivada (Inactiva)</option>
                    </select>
                </div>



                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700">Descripción Detallada</label>
                    <textarea
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 h-32"
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );

    const renderStep2_Location = () => (
        <div className="space-y-4 animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <MapPinIcon className="w-6 h-6 mr-2 text-blue-600" />
                Ubicación
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Departamento</label>
                    <select
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        value={formData.location.department}
                        onChange={(e) => {
                            handleNestedChange('location', 'department', e.target.value);
                            handleNestedChange('location', 'municipality', ''); // Reset municipality
                        }}
                    >
                        <option value="">Selecciona un departamento</option>
                        {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Municipio</label>
                    <select
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        value={formData.location.municipality}
                        onChange={(e) => handleNestedChange('location', 'municipality', e.target.value)}
                        disabled={!formData.location.department}
                    >
                        <option value="">Selecciona un municipio</option>
                        {getMunicipalities(formData.location.department).map(m => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Vereda</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        value={formData.location.vereda}
                        onChange={(e) => handleNestedChange('location', 'vereda', e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Distancia al pueblo (km)</label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        value={formData.location.distanceToTown}
                        onChange={(e) => handleNestedChange('location', 'distanceToTown', e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Vía Pavimentada más cercana</label>
                    <input
                        type="text"
                        placeholder="Ej: Mamonal a Gambote"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        value={formData.location.closestPavedRoad}
                        onChange={(e) => handleNestedChange('location', 'closestPavedRoad', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );

    const renderStep3_Details = () => (
        <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <GlobeAmericasIcon className="w-6 h-6 mr-2 text-purple-600" />
                Características del Terreno
            </h3>

            {/* Dynamic Managers Helper */}
            {['pastureTypes', 'waterSources', 'topographyTypes', 'soilTypes', 'crops'].map((listKey) => {
                let label = '';
                let formFieldParent = '';
                let formFieldKey = '';
                if (listKey === 'pastureTypes') {
                    label = 'Tipos de Pasto';
                    formFieldParent = 'pasture';
                    formFieldKey = 'types';
                }
                if (listKey === 'waterSources') {
                    label = 'Fuentes de Agua';
                    formFieldParent = 'water';
                    formFieldKey = 'sources';
                }
                if (listKey === 'topographyTypes') {
                    label = 'Topografía';
                    formFieldParent = 'topography';
                    formFieldKey = 'types';
                }
                if (listKey === 'soilTypes') {
                    label = 'Tipos de Suelo';
                    formFieldParent = 'soil';
                    formFieldKey = 'types';
                }
                if (listKey === 'crops') {
                    label = 'Cultivos Aptos';
                    formFieldParent = null as any; // Special case, root level array
                    formFieldKey = 'crops';
                }

                // Helper to get current selected array
                const currentSelected = listKey === 'crops'
                    ? formData.crops
                    // @ts-ignore
                    : formData[formFieldParent][formFieldKey];

                const toggleOption = (optValue: string) => {
                    if (listKey === 'crops') {
                        setFormData(prev => ({
                            ...prev,
                            crops: prev.crops.includes(optValue)
                                ? prev.crops.filter(c => c !== optValue)
                                : [...prev.crops, optValue]
                        }));
                    } else {
                        handleArrayToggle(formFieldParent, formFieldKey, optValue);
                    }
                };
                // Get dynamic list directly
                // @ts-ignore
                const dynamicList = dynamicOptions[listKey] || [];
                const allOptions = dynamicList;

                return (
                    <div key={listKey} className="border p-4 rounded-lg bg-green-50 mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>

                        {/* Selected Chips */}
                        <div className="flex flex-wrap gap-2 mb-3">
                            {currentSelected.map((opt: string) => (
                                <div key={opt} className="relative group">
                                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-600 text-white flex items-center gap-2 shadow-sm">
                                        {opt}
                                        <button
                                            type="button"
                                            onClick={() => toggleOption(opt)}
                                            className="hover:text-red-200 transition-colors bg-green-700 rounded-full w-4 h-4 flex items-center justify-center font-bold"
                                        >
                                            ×
                                        </button>
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Suggestions / Options to Add */}
                        <div className="mb-3">
                            <p className="text-xs text-gray-500 mb-2 font-semibold">Opciones disponibles (Click para agregar):</p>
                            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                                {allOptions.filter((opt: string) => !currentSelected.includes(opt)).map((opt: string) => {
                                    return (
                                        <div key={opt} className="relative group inline-block">
                                            <button
                                                type="button"
                                                onClick={() => toggleOption(opt)}
                                                className="px-3 py-1 rounded-full text-xs border border-green-300 bg-white text-green-700 hover:bg-green-100 transition-all shadow-sm flex items-center gap-1"
                                            >
                                                <span>+ {opt}</span>
                                            </button>

                                            <div className="absolute -top-2 -right-4 hidden group-hover:flex gap-0.5 bg-white shadow-md rounded-lg p-0.5 z-10 border border-gray-100">
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const n = prompt('Editar nombre:', opt);
                                                        if (n && n !== opt) handleManageOption(listKey, 'update', { old: opt, new: n });
                                                    }}
                                                    className="text-blue-500 hover:text-blue-700 p-1 hover:bg-blue-50 rounded"
                                                    title="Editar"
                                                >
                                                    ✎
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (confirm(`¿Eliminar "${opt}" de la lista global?`)) handleManageOption(listKey, 'delete', opt);
                                                    }}
                                                    className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded"
                                                    title="Eliminar"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Add Custom */}
                        <div className="flex gap-2 border-t pt-3 mt-2 border-green-200">
                            {/* @ts-ignore */}
                            <input
                                type="text"
                                placeholder={`Otro ${label} (Escribir y agregar)...`}
                                className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                                value={(formData.newOption as any)[listKey]}

                                onChange={(e) => setFormData(p => ({ ...p, newOption: { ...p.newOption, [listKey]: e.target.value } }))}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleManageOption(listKey, 'add', (formData.newOption as any)[listKey]);
                                    }
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => handleManageOption(listKey, 'add', (formData.newOption as any)[listKey])}
                                className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-900 shadow-md transition-transform active:scale-95"
                            >
                                Agregar Personalizado
                            </button>
                        </div>
                    </div>
                );
            })}

            {/* Additional Percentages, Capacity & Elevation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Altura Min (msnm)</label>
                    <input type="number" className="w-full p-2 border rounded"
                        value={formData.topography?.elevation?.min || ''}
                        onChange={(e) => handleNestedChange('topography', 'elevation', { ...formData.topography.elevation, min: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Altura Max (msnm)</label>
                    <input type="number" className="w-full p-2 border rounded"
                        value={formData.topography?.elevation?.max || ''}
                        onChange={(e) => handleNestedChange('topography', 'elevation', { ...formData.topography.elevation, max: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700">% Bosques</label>
                    <input type="number" className="w-full p-2 border rounded" value={formData.forestPercentage} onChange={(e) => handleChange('forestPercentage', e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700">% Reserva</label>
                    <input type="number" className="w-full p-2 border rounded" value={formData.reservePercentage} onChange={(e) => handleChange('reservePercentage', e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700">% Rastrojo Bajo</label>
                    <input type="number" className="w-full p-2 border rounded" value={formData.rastrojoBajoPercentage} onChange={(e) => handleChange('rastrojoBajoPercentage', e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700">% Rastrojo Alto</label>
                    <input type="number" className="w-full p-2 border rounded" value={formData.rastrojoAltoPercentage} onChange={(e) => handleChange('rastrojoAltoPercentage', e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Carga Animal (Unidades)</label>
                    <input type="number" className="w-full p-2 border rounded" value={formData.productivity.animalCapacity} onChange={(e) => handleNestedChange('productivity', 'animalCapacity', e.target.value)} />
                </div>
            </div>

            {/* Installations */}
            <div className="mt-6 border-t pt-4">
                <h4 className="text-lg font-bold text-gray-800 mb-3">Instalaciones y Estructuras</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Edificaciones (Separar por comas)</label>
                        <input
                            type="text"
                            placeholder="Ej: Casa principal, Casa encargado, Bodega"
                            className="w-full p-2 border rounded"
                            value={formData.installations?.buildings?.join(', ') || ''}
                            onChange={(e) => handleNestedChange('installations', 'buildings', e.target.value.split(',').map(s => s.trim()))}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Cercas (Separar por comas)</label>
                        <input
                            type="text"
                            placeholder="Ej: Eléctrica, Púas, Viva"
                            className="w-full p-2 border rounded"
                            value={formData.installations?.fences?.join(', ') || ''}
                            onChange={(e) => handleNestedChange('installations', 'fences', e.target.value.split(',').map(s => s.trim()))}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Otras Infraestructuras</label>
                        <input
                            type="text"
                            placeholder="Ej: Corral, Ordeño mecánico, Báscula"
                            className="w-full p-2 border rounded"
                            value={formData.installations?.infrastructure?.join(', ') || ''}
                            onChange={(e) => handleNestedChange('installations', 'infrastructure', e.target.value.split(',').map(s => s.trim()))}
                        />
                    </div>
                    <div className="flex items-center mt-6">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="w-5 h-5 text-green-600 rounded"
                                checked={formData.installations?.electricity || false}
                                onChange={(e) => handleNestedChange('installations', 'electricity', e.target.checked)}
                            />
                            <span className="ml-2 text-gray-700 font-semibold">¿Tiene Electricidad?</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep4_Media = () => (
        <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <PhotoIcon className="w-6 h-6 mr-2 text-indigo-600" />
                Multimedia
            </h3>

            {/* Images Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📷 Imágenes de la propiedad
                </label>
                <input
                    type="file"
                    multiple
                    accept="image/png,image/jpg,image/jpeg,image/webp,image/gif"
                    className="w-full p-2 border rounded-lg text-sm"
                    onChange={async (e) => {
                        if (!e.target.files || !token) return;
                        setLoading(true);
                        setMsg({ text: `Subiendo ${e.target.files.length} imágenes...`, type: '' });
                        try {
                            const uploadedUrls: string[] = [];
                            for (const file of Array.from(e.target.files)) {
                                const res = await uploadMedia(file, token);
                                uploadedUrls.push(res.url);
                            }
                            setFormData(prev => ({
                                ...prev,
                                media: {
                                    ...prev.media,
                                    images: [...prev.media.images, ...uploadedUrls],
                                },
                            }));
                            setMsg({ text: `✅ ${uploadedUrls.length} imágenes subidas exitosamente`, type: 'success' });
                        } catch (error) {
                            setMsg({ text: 'Error subiendo imágenes: ' + error, type: 'error' });
                        } finally {
                            setLoading(false);
                        }
                    }}
                />
                <div className="grid grid-cols-3 gap-3 mt-3">
                    {formData.media.images.map((img, i) => (
                        <div key={i} className="relative">
                            <img src={img} className="w-full h-24 object-cover rounded-lg" alt={`Imagen ${i + 1}`} />
                            <button
                                type="button"
                                onClick={() => {
                                    setFormData(prev => ({
                                        ...prev,
                                        media: {
                                            ...prev.media,
                                            images: prev.media.images.filter((_, idx) => idx !== i)
                                        }
                                    }));
                                }}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">{formData.media.images.length} imagen(es) cargada(s)</p>
            </div>

            {/* Videos Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🎥 Videos de la propiedad
                </label>
                <input
                    type="file"
                    multiple
                    accept="video/mp4,video/mkv,video/avi,video/mov,video/webm"
                    className="w-full p-2 border rounded-lg text-sm"
                    onChange={async (e) => {
                        if (!e.target.files || !token) return;
                        setLoading(true);
                        setMsg({ text: `Subiendo ${e.target.files.length} videos...`, type: '' });
                        try {
                            const uploadedUrls: string[] = [];
                            for (const file of Array.from(e.target.files)) {
                                const res = await uploadMedia(file, token);
                                uploadedUrls.push(res.url);
                            }
                            setFormData(prev => ({
                                ...prev,
                                media: {
                                    ...prev.media,
                                    videos: [...prev.media.videos, ...uploadedUrls],
                                },
                            }));
                            setMsg({ text: `✅ ${uploadedUrls.length} videos subidos exitosamente`, type: 'success' });
                        } catch (error) {
                            setMsg({ text: 'Error subiendo videos: ' + error, type: 'error' });
                        } finally {
                            setLoading(false);
                        }
                    }}
                />
                <div className="space-y-2 mt-3">
                    {formData.media.videos.map((vid, i) => (
                        <div key={i} className="flex items-center justify-between bg-white p-2 rounded border">
                            <span className="text-sm truncate flex-1">🎥 Video {i + 1}</span>
                            <button
                                type="button"
                                onClick={() => {
                                    setFormData(prev => ({
                                        ...prev,
                                        media: {
                                            ...prev.media,
                                            videos: prev.media.videos.filter((_, idx) => idx !== i)
                                        }
                                    }));
                                }}
                                className="bg-red-500 text-white rounded px-2 py-1 text-xs hover:bg-red-600"
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">{formData.media.videos.length} video(s) cargado(s)</p>
            </div>

            {/* 360 Images Upload */}
            <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 bg-purple-50">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📷 Imágenes 360° (Panorámicas)
                </label>
                <p className="text-xs text-gray-600 mb-3">
                    🌐 Sube fotos panorámicas para vista interactiva - Los usuarios podrán hacer zoom y mover la vista
                </p>
                <input
                    type="file"
                    multiple
                    accept="image/png,image/jpg,image/jpeg"
                    className="w-full p-2 border rounded-lg text-sm"
                    onChange={async (e) => {
                        if (!e.target.files || !token) return;
                        setLoading(true);
                        setMsg({ text: `Subiendo ${e.target.files.length} imágenes 360°...`, type: '' });
                        try {
                            const uploadedUrls: string[] = [];
                            for (const file of Array.from(e.target.files)) {
                                const res = await uploadMedia(file, token);
                                uploadedUrls.push(res.url);
                            }
                            setFormData(prev => ({
                                ...prev,
                                media: {
                                    ...prev.media,
                                    images360: [...prev.media.images360, ...uploadedUrls],
                                },
                            }));
                            setMsg({ text: `✅ ${uploadedUrls.length} imágenes 360° subidas exitosamente`, type: 'success' });
                        } catch (error) {
                            setMsg({ text: 'Error subiendo imágenes 360°: ' + error, type: 'error' });
                        } finally {
                            setLoading(false);
                        }
                    }}
                />
                <div className="grid grid-cols-3 gap-3 mt-3">
                    {formData.media.images360.map((img, i) => (
                        <div key={i} className="relative">
                            <img src={img} className="w-full h-24 object-cover rounded-lg border-2 border-purple-400" alt={`360° ${i + 1}`} />
                            <div className="absolute top-1 left-1 bg-purple-600 text-white text-xs px-2 py-1 rounded">360°</div>
                            <button
                                type="button"
                                onClick={() => {
                                    setFormData(prev => ({
                                        ...prev,
                                        media: {
                                            ...prev.media,
                                            images360: prev.media.images360.filter((_, idx) => idx !== i)
                                        }
                                    }));
                                }}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">{formData.media.images360.length} imagen(es) 360° cargada(s)</p>
            </div>
        </div>
    );

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const url = editMode
                ? `https://tecnycampo-backend.onrender.com/api/terrains/${initialData._id}`
                : 'https://tecnycampo-backend.onrender.com/api/terrains';

            const method = editMode ? 'PUT' : 'POST';

            // Normalize data: convert numeric fields to numbers
            const preparedData = {
                ...formData,
                price: parseFloat(formData.price) || 0,
                area: parseFloat(formData.area) || 0,
                forestPercentage: formData.forestPercentage ? parseFloat(formData.forestPercentage) : undefined,
                reservePercentage: formData.reservePercentage ? parseFloat(formData.reservePercentage) : undefined,
                location: {
                    ...formData.location,
                    distanceToTown: formData.location.distanceToTown ? parseFloat(formData.location.distanceToTown) : 0,
                    closestPavedRoad: formData.location.closestPavedRoad
                },
                rastrojoBajoPercentage: formData.rastrojoBajoPercentage ? parseFloat(formData.rastrojoBajoPercentage) : undefined,
                rastrojoAltoPercentage: formData.rastrojoAltoPercentage ? parseFloat(formData.rastrojoAltoPercentage) : undefined,
                productivity: {
                    ...formData.productivity,
                    animalCapacity: formData.productivity.animalCapacity ? parseFloat(formData.productivity.animalCapacity) : undefined
                }
            };

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(preparedData)
            });
            const data = await response.json();
            if (response.ok) {
                setMsg({
                    text: editMode ? '✅ Propiedad actualizada exitosamente!' : '✅ Propiedad publicada exitosamente!',
                    type: 'success'
                });
                if (onSuccess) {
                    // Give a small delay for the user to see success message
                    setTimeout(() => onSuccess(), 1500);
                }
            } else {
                setMsg({ text: '⚠️ ' + (data.message || 'Error al procesar'), type: 'error' });
            }
        } catch (error) {
            console.error('Submit error:', error);
            setMsg({ text: '❌ Error de conexión', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl mx-auto my-8">
            {/* Progress Bar */}
            <div className="bg-gray-100 h-2 w-full">
                <div
                    className="bg-green-500 h-full transition-all duration-500 ease-in-out"
                    style={{ width: `${(step / 4) * 100}%` }}
                ></div>
            </div>

            <div className="p-8">
                {msg.text && (
                    <div className={`p-4 rounded-lg mb-6 text-center font-bold ${msg.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {msg.text}
                    </div>
                )}

                {/* Steps Content */}
                {step === 1 && renderStep1_General()}
                {step === 2 && renderStep2_Location()}
                {step === 3 && renderStep3_Details()}
                {step === 4 && renderStep4_Media()}

                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-between">
                    <button
                        onClick={() => setStep(prev => Math.max(1, prev - 1))}
                        className={`px-6 py-2 rounded-lg font-semibold text-gray-600 hover:bg-gray-100 transition ${step === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={step === 1}
                    >
                        Atrás
                    </button>

                    {step < 4 ? (
                        <button
                            onClick={() => setStep(prev => Math.min(4, prev + 1))}
                            className="px-6 py-2 rounded-lg font-bold text-white bg-green-600 hover:bg-green-700 transition shadow-lg hover:shadow-green-500/50"
                        >
                            Siguiente
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="px-8 py-2 rounded-lg font-bold text-white bg-yellow-500 hover:bg-yellow-600 transition shadow-lg hover:shadow-yellow-500/50 flex items-center"
                        >
                            {loading ? 'Procesando...' : editMode ? 'Actualizar Propiedad' : 'Publicar Propiedad'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
