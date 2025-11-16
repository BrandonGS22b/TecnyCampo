// src/components/Veterinaria.tsx

import React from 'react';
import {  HeartIcon, MapPinIcon } from '@heroicons/react/24/solid';

// Definición de la estructura de un Beneficio
interface Benefit {
    title: string;
    description: string;
    Icon: React.ElementType;
}

const veterinaryBenefits: Benefit[] = [
    {
        title: "Diagnóstico Rápido",
        description: "Uso de tecnología aérea para la detección temprana de animales enfermos o estresados en grandes extensiones.",
        Icon: HeartIcon,
    },
    {
        title: "Optimización de Pastoreo",
        description: "Análisis de biomasa y calidad del forraje para establecer cargas animales precisas y rotaciones efectivas.",
        Icon: HeartIcon,
    },
    {
        title: "Monitoreo de Infraestructura",
        description: "Inspección automatizada de cercas, puntos de agua y corrales para garantizar el bienestar animal.",
        Icon: MapPinIcon,
    },
];


export default function Veterinaria() {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Encabezado */}
                <div className="text-center mb-16">
                    <p className="text-lg font-semibold text-green-600 uppercase tracking-wider">
                        Servicios Zootécnicos de Precisión
                    </p>
                    <h2 className="mt-2 text-4xl md:text-5xl font-extrabold text-gray-900">
                        Veterinaria y <span className="text-yellow-600">Gestión Animal</span>
                    </h2>
                    <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
                        Aplicamos la tecnología de drones y el análisis de datos para mejorar la salud, el bienestar y la productividad de tu hato.
                    </p>
                </div>
                
                {/* Beneficios Clave */}
                <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
                    {veterinaryBenefits.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 bg-green-50 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border-b-4 border-yellow-500">
                            <item.Icon className="w-12 h-12 text-green-700 mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                    ))}
                </div>

                {/* Llamada a la Acción Principal */}
                <div className="text-center mt-16 pt-12 border-t-2 border-gray-100">
                    <a
                        href="/contacto"
                        className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-extrabold rounded-full shadow-2xl text-gray-900 bg-yellow-500 hover:bg-yellow-600 transition duration-300 transform hover:scale-105"
                    >
                        <HeartIcon className="w-6 h-6 mr-3" />
                        Asegura la Salud de tu Ganado
                    </a>
                </div>

            </div>
        </section>
    )
}