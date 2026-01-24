// src/pages/PropertyDetailPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    MapPinIcon,
    ArrowsPointingOutIcon,
    HomeIcon,
    CalendarIcon,
    CurrencyDollarIcon,
    ExclamationCircleIcon,
    ArrowLeftIcon,
    PhotoIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function PropertyDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await fetch(`https://tecnycampo-backend.onrender.com/api/terrains/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProperty(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando detalles...</div>;
    if (!property) return <div className="min-h-screen flex items-center justify-center">Propiedad no encontrada</div>;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Navigation Header */}
            <div className="bg-white border-b sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-gray-600 hover:text-green-600 font-medium transition"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-2" />
                        Volver
                    </button>
                    <div className="flex gap-4">
                        <span className="text-sm font-medium text-gray-400">ID: {property._id}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${property.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {property.status}
                        </span>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Media & Description */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Gallery */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-6">
                            <div className="relative h-[400px] mb-4 bg-gray-100 rounded-xl overflow-hidden">
                                {property.media?.images?.length > 0 ? (
                                    <img
                                        src={property.media.images[activeImage]}
                                        alt={property.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                        <PhotoIcon className="w-20 h-20" />
                                        <span>Sin imágenes disponibles</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {property.media?.images?.map((img: string, i: number) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImage(i)}
                                        className={`flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden border-2 transition ${activeImage === i ? 'border-green-500' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                    >
                                        <img src={img} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Detalles de la Propiedad</h2>
                            <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                                {property.description}
                            </p>
                        </div>

                        {/* Technical Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Terrain Quality */}
                            <DetailSection title="Calidad del Terreno" icon="🌱">
                                <DetailItem label="Suelo" value={property.soil?.types?.join(', ') || 'N/A'} />
                                <DetailItem label="Topografía" value={property.topography?.types?.join(', ') || 'N/A'} />
                                <DetailItem label="Pastos" value={property.pasture?.types?.join(', ') || 'N/A'} />
                                <DetailItem label="Cultivos" value={property.crops?.join(', ') || 'Ninguno'} />
                            </DetailSection>

                            {/* Resources */}
                            <DetailSection title="Recursos Hídricos y Energía" icon="💧">
                                <DetailItem label="Fuentes de Agua" value={property.water?.sources?.join(', ') || 'No especificado'} />
                                <DetailItem label="Electricidad" value={property.installations?.electricity ? 'Disponible' : 'No disponible'} />
                                <DetailItem label="Acueducto" value={property.installations?.waterConnection ? 'Conectado' : 'No conectado'} />
                            </DetailSection>

                            {/* Locations & Access */}
                            <DetailSection title="Ubicación y Acceso" icon="📍">
                                <DetailItem label="Vereda" value={property.location?.vereda || 'No especificado'} />
                                <DetailItem label="Distancia al Pueblo" value={`${property.location?.distanceToTown} km` || 'N/A'} />
                                <DetailItem label="Vías de Acceso" value={property.location?.roadAccess || 'Caminos rurales'} />
                            </DetailSection>

                            {/* Legal Status */}
                            <DetailSection title="Estado Legal" icon="📜">
                                <DetailItem label="Documentación" value={property.legal?.documentation || 'En trámite'} />
                                <DetailItem label="Tipo de Suelo" value={property.useTypes?.join(', ') || 'Agrícola'} />
                            </DetailSection>
                        </div>
                    </div>

                    {/* Right Column: Key Info & Contact */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Summary Card */}
                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                                <div className="bg-green-600 p-6 text-white text-center">
                                    <h1 className="text-3xl font-black mb-1">{formatPrice(property.price)}</h1>
                                    <p className="text-sm opacity-90">Precio Negociable</p>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="flex items-center justify-between py-3 border-b border-gray-50">
                                        <div className="flex items-center text-gray-600">
                                            <ArrowsPointingOutIcon className="w-5 h-5 mr-3 text-green-500" />
                                            <span>Área Total</span>
                                        </div>
                                        <span className="font-bold text-gray-900">{property.area} ha</span>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-gray-50">
                                        <div className="flex items-center text-gray-600">
                                            <HomeIcon className="w-5 h-5 mr-3 text-green-500" />
                                            <span>Tipo</span>
                                        </div>
                                        <span className="font-bold text-gray-900 capitalize">{property.propertyType}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-3">
                                        <div className="flex items-center text-gray-600">
                                            <MapPinIcon className="w-5 h-5 mr-3 text-green-500" />
                                            <span>Municipio</span>
                                        </div>
                                        <span className="font-bold text-gray-900">{property.location?.municipality}</span>
                                    </div>

                                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-xl shadow-lg transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                                        Contactar por WhatsApp
                                    </button>
                                </div>
                            </div>

                            {/* Additional Badges */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex flex-wrap gap-3">
                                {property.featured && <Badge color="yellow" text="Destacado" />}
                                <Badge color="blue" text={`Vistas: ${property.views}`} />
                                <Badge color="green" text={`Desde: ${new Date(property.createdAt).toLocaleDateString()}`} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function DetailSection({ title, icon, children }: any) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-50">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-xl mr-2">{icon}</span>
                {title}
            </h3>
            <div className="space-y-3">
                {children}
            </div>
        </div>
    );
}

function DetailItem({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex justify-between items-start gap-4">
            <span className="text-sm text-gray-500 font-medium">{label}</span>
            <span className="text-sm text-gray-900 font-bold text-right">{value}</span>
        </div>
    );
}

function Badge({ color, text }: { color: string, text: string }) {
    const colors: any = {
        green: 'bg-green-100 text-green-700 border-green-200',
        yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        blue: 'bg-blue-100 text-blue-700 border-blue-200',
    };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${colors[color] || colors.green}`}>
            {text}
        </span>
    );
}

