// src/components/dashboard/AdminPropertyManagement.tsx

import React, { useState } from 'react';
import PropertyList from '../PropertyList';
import PropertyCreateForm from './PropertyCreateForm';
import { PlusIcon, ListBulletIcon } from '@heroicons/react/24/outline';

export default function AdminPropertyManagement() {
    const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
    const [selectedProperty, setSelectedProperty] = useState<any>(null);

    const handleEdit = (property: any) => {
        setSelectedProperty(property);
        setView('edit');
    };

    const handleCreate = () => {
        setSelectedProperty(null);
        setView('create');
    };

    const handleSuccess = () => {
        setView('list');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    {view === 'list' ? 'Gestión de Propiedades' :
                        view === 'create' ? 'Nueva Propiedad' : 'Editar Propiedad'}
                </h2>
                <button
                    onClick={() => view === 'list' ? handleCreate() : setView('list')}
                    className={`flex items-center px-4 py-2 rounded-lg font-bold transition shadow-md ${view === 'list'
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    {view === 'list' ? (
                        <>
                            <PlusIcon className="w-5 h-5 mr-2" />
                            Agregar Propiedad
                        </>
                    ) : (
                        <>
                            <ListBulletIcon className="w-5 h-5 mr-2" />
                            Volver a la Lista
                        </>
                    )}
                </button>
            </div>

            {view === 'list' && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <PropertyList
                        propertyType=""
                        filters={{ status: 'all' }}
                        onEdit={handleEdit}
                    />
                </div>
            )}

            {(view === 'create' || view === 'edit') && (
                <div className="bg-white rounded-2xl shadow-xl p-2 min-h-[600px]">
                    <PropertyCreateForm
                        editMode={view === 'edit'}
                        initialData={selectedProperty}
                        onSuccess={handleSuccess}
                    />
                </div>
            )}
        </div>
    );
}
