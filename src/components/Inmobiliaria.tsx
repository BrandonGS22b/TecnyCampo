// src/components/Inmobiliaria.tsx

import React from 'react';
import { CurrencyDollarIcon, HomeModernIcon, SparklesIcon } from '@heroicons/react/24/solid';

// Definición de la estructura de un Servicio
interface Service {
    title: string;
    description: string;
    Icon: React.ElementType;
}

const realEstateServices: Service[] = [
    {
        title: "Valoración de Fincas con Drones",
        description: "Obtención de imágenes aéreas y topografía de precisión para una valoración inmobiliaria más exacta de activos rurales.",
        Icon: HomeModernIcon,
    },
    {
        title: "Promoción Visual 4K",
        description: "Creación de videos y fotos de alta resolución para una promoción atractiva y profesional de fincas en venta.",
        Icon: SparklesIcon,
    },
    {
        title: "Compra y Venta de Animales Elite",
        description: "Plataforma especializada para listar y encontrar animales de alto valor genético, verificando su ubicación y estado.",
        Icon: CurrencyDollarIcon,
    },
];

export default function Inmobiliaria() {
    return (
        <section className="py-16 md:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Encabezado */}
                <div className="text-center mb-16">
                    <p className="text-lg font-semibold text-green-600 uppercase tracking-wider">
                        Mercado de Activos Agrícolas
                    </p>
                    <h2 className="mt-2 text-4xl md:text-5xl font-extrabold text-gray-900">
                        Inmobiliaria <span className="text-yellow-600">Rural y Animal</span>
                    </h2>
                    <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
                        Conectamos compradores y vendedores con herramientas de valoración y promoción digital exclusivas para el sector agropecuario.
                    </p>
                </div>
                
                {/* Grid de Servicios */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {realEstateServices.map((item, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-xl transition-shadow duration-300 hover:shadow-2xl border-l-8 border-green-600">
                            <div className="flex items-center mb-4">
                                <item.Icon className="w-10 h-10 text-yellow-500 mr-4 flex-shrink-0" />
                                <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                            </div>
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                    ))}
                </div>

                {/* Banner de Registro */}
                <div className="mt-16 bg-green-700 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
                    <h3 className="text-3xl font-extrabold text-white mb-3">
                        ¿Tienes un activo para vender?
                    </h3>
                    <p className="text-xl text-green-100 mb-6">
                        Publica tu finca o tu animal de élite de forma segura y con la mejor visibilidad.
                    </p>
                    <a
                        href="/publicar"
                        className="inline-flex items-center justify-center px-10 py-3 border border-transparent text-base font-extrabold rounded-full shadow-sm text-gray-900 bg-yellow-400 hover:bg-yellow-500 transition duration-300"
                    >
                        Publicar Ahora
                    </a>
                </div>

            </div>
        </section>
    )
}