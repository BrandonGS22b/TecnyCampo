// src/components/PropertyList.tsx

import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import { LucideSearch, LucideChevronLeft, LucideChevronRight } from 'lucide-react';

interface PropertyListProps {
    propertyType: string;
    filters: any;
    searchTerm?: string;
    sortBy?: string;
    onEdit?: (property: any) => void;
}

export default function PropertyList({ propertyType, filters, searchTerm, sortBy, onEdit }: PropertyListProps) {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        setPage(1); // Reset to first page on search/filter change
    }, [propertyType, filters, searchTerm, sortBy]);

    useEffect(() => {
        fetchProperties();
    }, [propertyType, filters, searchTerm, sortBy, page]);

    const fetchProperties = async () => {
        setLoading(true);
        try {
            // Build query string
            const params: any = {
                propertyType,
                page: page.toString(),
                limit: '12',
                sort: sortBy || 'recientes',
                ...filters
            };

            if (searchTerm) {
                params.search = searchTerm;
            }

            // Convert arrays to comma-separated strings for backend parsing
            ['soilTypes', 'waterSources', 'pastureTypes', 'crops', 'topographyTypes', 'useTypes'].forEach(key => {
                if (filters[key]?.length) {
                    params[key] = filters[key].join(',');
                }
            });

            const queryParams = new URLSearchParams(params);

            const response = await fetch(`https://tecnycampo-backend.onrender.com/api/terrains?${queryParams}`);
            const data = await response.json();

            setProperties(data.terrains || []);
            setTotalPages(data.totalPages || 1);
            setTotalResults(data.total || 0);
        } catch (error) {
            console.error('Error fetching properties:', error);
            setProperties([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center py-32 space-y-4">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-gray-100 border-t-[#facc15] rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-[#1a3a3a] rounded-full animate-pulse"></div>
                    </div>
                </div>
                <p className="text-sm font-bold text-gray-400 animate-pulse">Cargando propiedades...</p>
            </div>
        );
    }

    if (properties.length === 0) {
        return (
            <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <LucideSearch size={40} className="text-gray-300" />
                </div>
                <h3 className="text-2xl font-black text-[#1a3a3a] mb-2">
                    Sin resultados
                </h3>
                <p className="text-gray-500 max-w-xs mx-auto text-sm">
                    No encontramos propiedades que coincidan con tu búsqueda. Prueba ajustando los filtros.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-6 text-sm font-bold text-green-600 hover:text-green-700 underline"
                >
                    Limpiar todo
                </button>
            </div>
        );
    }

    return (
        <div>
            {/* Results Count & Badges */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h3 className="text-2xl font-black text-[#1a3a3a] flex items-center gap-3">
                        {totalResults} <span className="text-gray-400 text-lg font-bold">Resultados encontrados</span>
                    </h3>
                    {searchTerm && (
                        <p className="text-sm text-gray-500 mt-1">
                            Buscando: <span className="font-bold text-[#1a3a3a]">"{searchTerm}"</span>
                        </p>
                    )}
                </div>
            </div>

            {/* Property Grid - Improved spacing and responsive columns */}
            <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-8 mb-12">
                {properties.map((property: any) => (
                    <PropertyCard
                        key={property._id}
                        property={property}
                        onUpdate={fetchProperties}
                        onEdit={onEdit}
                    />
                ))}
            </div>

            {/* Pagination - Sleek Design */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 pt-8 border-t border-gray-100">
                    <button
                        onClick={() => {
                            setPage(p => Math.max(1, p - 1));
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={page === 1}
                        className="p-3 bg-white border border-gray-200 rounded-xl hover:border-[#facc15] hover:text-[#facc15] disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-400 transition-all shadow-sm"
                    >
                        <LucideChevronLeft size={20} />
                    </button>

                    <div className="flex space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                            .map((pageNum, idx, arr) => (
                                <React.Fragment key={pageNum}>
                                    {idx > 0 && arr[idx - 1] !== pageNum - 1 && <span className="px-2 text-gray-400 font-bold">...</span>}
                                    <button
                                        onClick={() => {
                                            setPage(pageNum);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className={`w-12 h-12 rounded-xl text-sm font-black transition-all shadow-sm
                                            ${page === pageNum
                                                ? 'bg-[#1a3a3a] text-[#facc15] scale-110 z-10'
                                                : 'bg-white border border-gray-200 text-gray-500 hover:border-[#facc15] hover:text-[#facc15]'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                </React.Fragment>
                            ))}
                    </div>

                    <button
                        onClick={() => {
                            setPage(p => Math.min(totalPages, p + 1));
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={page === totalPages}
                        className="p-3 bg-white border border-gray-200 rounded-xl hover:border-[#facc15] hover:text-[#facc15] disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-400 transition-all shadow-sm"
                    >
                        <LucideChevronRight size={20} />
                    </button>
                </div>
            )}
        </div>
    );
}

