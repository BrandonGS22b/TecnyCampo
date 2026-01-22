// src/components/PropertyList.tsx

import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';

interface PropertyListProps {
    propertyType: string;
    filters: any;
    onEdit?: (property: any) => void;
}

export default function PropertyList({ propertyType, filters, onEdit }: PropertyListProps) {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchProperties();
    }, [propertyType, filters, page]);

    const fetchProperties = async () => {
        setLoading(true);
        try {
            // Build query string
            const queryParams = new URLSearchParams({
                propertyType,
                page: page.toString(),
                limit: '12',
                ...filters,
                // Convert arrays to comma-separated strings
                ...(filters.soilTypes?.length && { soilTypes: filters.soilTypes.join(',') }),
                ...(filters.waterSources?.length && { waterSources: filters.waterSources.join(',') }),
                ...(filters.pastureTypes?.length && { pastureTypes: filters.pastureTypes.join(',') }),
                ...(filters.crops?.length && { crops: filters.crops.join(',') }),
                ...(filters.topographyTypes?.length && { topographyTypes: filters.topographyTypes.join(',') }),
                ...(filters.useTypes?.length && { useTypes: filters.useTypes.join(',') })
            });

            const response = await fetch(`http://localhost:5000/api/terrains?${queryParams}`);
            const data = await response.json();

            setProperties(data.terrains || []);
            setTotalPages(data.totalPages || 1);
        } catch (error) {
            console.error('Error fetching properties:', error);
            setProperties([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
            </div>
        );
    }

    if (properties.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="text-6xl mb-4">🏞️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    No se encontraron propiedades
                </h3>
                <p className="text-gray-600">
                    Intenta ajustar los filtros de búsqueda
                </p>
            </div>
        );
    }

    return (
        <div>
            {/* Results Count */}
            <div className="mb-6 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">
                    {properties.length} propiedades encontradas
                </h3>

                {/* Sort Options */}
                <select className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                    <option value="newest">Más recientes</option>
                    <option value="price-low">Precio: Menor a Mayor</option>
                    <option value="price-high">Precio: Mayor a Menor</option>
                    <option value="area-low">Área: Menor a Mayor</option>
                    <option value="area-high">Área: Mayor a Menor</option>
                </select>
            </div>

            {/* Property Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {properties.map((property: any) => (
                    <PropertyCard
                        key={property._id}
                        property={property}
                        onUpdate={fetchProperties}
                        onEdit={onEdit}
                    />
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Anterior
                    </button>

                    <div className="flex space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                            <button
                                key={pageNum}
                                onClick={() => setPage(pageNum)}
                                className={`px-4 py-2 rounded-lg ${page === pageNum
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-200 hover:bg-gray-300'
                                    }`}
                            >
                                {pageNum}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
}

