// src/components/PropertyCard.tsx

import React from 'react';

interface PropertyCardProps {
    property: {
        _id: string;
        title: string;
        description: string;
        price: number;
        pricePerHectare?: number;
        area: number;
        propertyType: string;
        location: {
            municipality: string;
            department: string;
        };
        media: {
            images: string[];
            images360: string[];
        };
        soil: {
            types: string[];
        };
        water: {
            sources: string[];
        };
    };
}

export default function PropertyCard({ property }: PropertyCardProps) {
    const mainImage = property.media.images[0] || '/placeholder-property.jpg';
    const has360 = property.media.images360.length > 0;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(price);
    };

    const getPropertyTypeLabel = (type: string) => {
        const labels: { [key: string]: string } = {
            lote: 'Lote',
            parcela: 'Parcela',
            finca: 'Finca'
        };
        return labels[type] || type;
    };

    const getPropertyTypeColor = (type: string) => {
        const colors: { [key: string]: string } = {
            lote: 'bg-blue-500',
            parcela: 'bg-green-500',
            finca: 'bg-yellow-500'
        };
        return colors[type] || 'bg-gray-500';
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={mainImage}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Property Type Badge */}
                <div className={`absolute top-4 left-4 ${getPropertyTypeColor(property.propertyType)} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                    {getPropertyTypeLabel(property.propertyType)}
                </div>

                {/* 360° Badge */}
                {has360 && (
                    <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                        <span className="mr-1">360°</span>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Location */}
                <div className="flex items-center text-sm text-gray-600 mb-2">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {property.location.municipality}, {property.location.department}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition">
                    {property.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {property.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        <span className="mr-1">🌱</span>
                        {property.soil.types.slice(0, 2).join(', ')}
                    </div>
                    <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                        <span className="mr-1">💧</span>
                        {property.water.sources.slice(0, 2).join(', ')}
                    </div>
                </div>

                {/* Price and Area */}
                <div className="border-t pt-4 flex justify-between items-end">
                    <div>
                        <div className="text-2xl font-black text-green-600">
                            {formatPrice(property.price)}
                        </div>
                        {property.pricePerHectare && (
                            <div className="text-xs text-gray-500">
                                {formatPrice(property.pricePerHectare)}/ha
                            </div>
                        )}
                    </div>
                    <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                            {property.area} ha
                        </div>
                        <div className="text-xs text-gray-500">
                            Área total
                        </div>
                    </div>
                </div>

                {/* View Button */}
                <button className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 rounded-lg transition transform hover:scale-105">
                    Ver Detalles
                </button>
            </div>
        </div>
    );
}
