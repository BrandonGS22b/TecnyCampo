import React, { useState } from 'react';
import { useAuth } from '../../auth/auth.context';
import { useNavigate } from 'react-router-dom';
import { PencilIcon, TrashIcon, EyeIcon, ArchiveBoxIcon, MapPinIcon, PlayIcon } from '@heroicons/react/24/outline';
import { MapPinIcon as MapPinIconSolid } from '@heroicons/react/24/solid';


interface PropertyCardProps {
    property: any;
    onUpdate?: () => void;
    onEdit?: (property: any) => void;
}

export default function PropertyCard({ property, onUpdate, onEdit }: PropertyCardProps) {
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const images = property.media?.images || [];
    const mainImage = images.length > 0 ? images[0] : '/placeholder-property.jpg';


    const has360 = property.media?.images360?.length > 0;


    const hasVideo = property.media?.videos?.length > 0;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(price);
    };

    const handleDelete = async () => {
        if (!window.confirm('¿Estás seguro de eliminar esta propiedad?')) return;

        setLoading(true);
        try {
            const response = await fetch(`https://tecnycampo-backend.onrender.com/api/terrains/${property._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                if (onUpdate) onUpdate();
            } else {
                alert('Error al eliminar la propiedad');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
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

    const handleArchive = async () => {
        const newStatus = property.status === 'archived' ? 'published' : 'archived';
        if (!window.confirm(`¿Estás seguro de ${newStatus === 'archived' ? 'desactivar' : 'activar'} esta propiedad?`)) return;

        setLoading(true);
        try {
            const response = await fetch(`https://tecnycampo-backend.onrender.com/api/terrains/${property._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (response.ok) {
                if (onUpdate) onUpdate();
            } else {
                alert('Error al cambiar el estado');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group relative ${property.status === 'archived' ? 'opacity-75 grayscale-[0.5]' : ''}`}>
                {/* Image */}
                <div className="relative h-40 md:h-64 overflow-hidden">
                    <img
                        src={mainImage}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>

                    {/* Property Type Badge */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <div className={`${getPropertyTypeColor(property.propertyType)} text-white px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-bold shadow-lg text-center`}>
                            {getPropertyTypeLabel(property.propertyType)}
                        </div>
                        {property.status === 'archived' && (
                            <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-black uppercase shadow-lg text-center animate-pulse">
                                INACTIVA
                            </div>
                        )}
                    </div>

                    {/* Admin Actions */}
                    {(user?.role === 'admin' || user?.role === 'auxiliar') && (
                        <div className="absolute top-4 right-4 flex gap-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (onEdit) {
                                        onEdit(property);
                                    }
                                }}
                                className="bg-white/90 hover:bg-white p-2 rounded-full text-blue-600 shadow-lg transition transform hover:scale-110"
                                title="Editar"
                            >
                                <PencilIcon className="w-5 h-5" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleArchive(); }}
                                disabled={loading}
                                className="bg-white/90 hover:bg-white p-2 rounded-full text-orange-600 shadow-lg transition transform hover:scale-110"
                                title={property.status === 'archived' ? "Activar" : "Desactivar"}
                            >
                                <ArchiveBoxIcon className="w-5 h-5" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleDelete(); }}
                                disabled={loading}
                                className="bg-white/90 hover:bg-white p-2 rounded-full text-red-600 shadow-lg transition transform hover:scale-110"
                                title="Eliminar"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {/* 360° / Video Badge */}
                    {!((user?.role === 'admin' || user?.role === 'auxiliar')) && (
                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                            {has360 && (
                                <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center shadow-lg">
                                    <span className="mr-1">360°</span>
                                    <EyeIcon className="w-4 h-4" />
                                </div>
                            )}
                            {hasVideo && (
                                <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center shadow-lg">
                                    <span className="mr-1">VIDEO</span>
                                    <PlayIcon className="w-4 h-4" />
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-3 md:p-6">
                    {/* Location */}
                    <div className="flex items-center text-xs md:text-sm text-gray-600 mb-1 md:mb-2">
                        <MapPinIconSolid className="w-4 h-4 mr-1 text-green-600" />
                        {property.location.municipality}, {property.location.department}
                    </div>

                    {/* Title */}
                    <h3 className="text-sm md:text-xl font-bold text-gray-900 mb-1 md:mb-2 line-clamp-2 group-hover:text-green-600 transition min-h-[2.5rem] md:min-h-[3.5rem]">
                        {property.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10 hidden md:block">
                        {property.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-4">
                        {property.soil?.types?.slice(0, 1).map((s: string) => (
                            <div key={s} className="flex items-center bg-green-50 text-green-700 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-semibold">
                                <span className="mr-1">🌱</span> {s}
                            </div>
                        ))}
                        {property.water?.sources?.slice(0, 1).map((w: string) => (
                            <div key={w} className="flex items-center bg-blue-50 text-blue-700 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-semibold">
                                <span className="mr-1">💧</span> {w}
                            </div>
                        ))}
                    </div>

                    {/* Price and Area */}
                    <div className="border-t pt-4 flex justify-between items-end">
                        <div>
                            <div className="text-lg md:text-2xl font-black text-green-600">
                                {formatPrice(property.price)}
                            </div>
                            {property.pricePerHectare && (
                                <div className="text-xs text-gray-500 font-medium font-serif">
                                    {formatPrice(property.pricePerHectare)}/ha
                                </div>
                            )}
                        </div>
                        <div className="text-right">
                            <div className="text-sm md:text-lg font-bold text-gray-900">
                                {property.area} ha
                            </div>
                            <div className="text-xs text-gray-500 font-medium">
                                Área total
                            </div>
                        </div>
                    </div>

                    {/* View Button */}
                    <button
                        onClick={() => navigate(`/propiedades/${property._id}`)}
                        className="mt-2 md:mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 md:py-3 text-sm md:text-base rounded-lg transition transform hover:scale-[1.02] active:scale-95 shadow-md flex justify-center items-center gap-2"
                    >
                        Ver Detalles
                        <EyeIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </>
    );
}

