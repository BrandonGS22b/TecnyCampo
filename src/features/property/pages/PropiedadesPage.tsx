// src/pages/PropiedadesPage.tsx

import React, { useState } from 'react';
import PropertyTypeSelector from '../components/PropertyTypeSelector';
import PropertyFilters from '../components/PropertyFilters';
import PropertyList from '../components/PropertyList';

export default function PropiedadesPage() {
    const [selectedPropertyType, setSelectedPropertyType] = useState<string>('finca');
    const [filters, setFilters] = useState<any>({});

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-800 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-5xl font-black text-white mb-4 text-center">
                        Propiedades Rurales en Santander
                    </h1>
                    <p className="text-xl text-green-100 text-center max-w-3xl mx-auto">
                        Encuentra la propiedad ideal para tu proyecto agropecuario o inversión rural
                    </p>
                </div>
            </div>

            {/* Property Type Selector */}
            <div className="bg-white shadow-md">
                <PropertyTypeSelector
                    selectedType={selectedPropertyType}
                    onSelectType={setSelectedPropertyType}
                />
            </div>

            {/* Filters and Listings */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <PropertyFilters
                    propertyType={selectedPropertyType}
                    onFilterChange={setFilters}
                />

                <PropertyList
                    propertyType={selectedPropertyType}
                    filters={filters}
                />
            </div>
        </div>
    );
}

