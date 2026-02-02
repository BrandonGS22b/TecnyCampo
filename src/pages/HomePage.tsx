// src/pages/HomePage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Newsletter from '../shared/components/Newsletter';

export default function HomePage() {
    const navigate = useNavigate();

    const services = [
        {
            id: 'topografia',
            title: 'Topografía con Drones',
            icon: '🚁',
            description: 'Levantamientos topográficos de precisión con tecnología de drones. Ortomosaicos, modelos digitales de elevación (DEM) y análisis de terreno para proyectos agrícolas e inmobiliarios.',
            features: [
                'Ortomosaicos de alta resolución',
                'Modelos digitales de elevación (DEM)',
                'Análisis de pendientes y curvas de nivel',
                'Cálculo de volúmenes y áreas',
                'Mapas de vegetación (NDVI)'
            ],
            color: 'from-blue-600 to-blue-800',
            image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800'
        },
        {
            id: 'propiedades',
            title: 'Inmobiliaria Rural',
            icon: '🏡',
            description: 'Plataforma especializada en compra y venta de propiedades rurales en Colombia. Lotes, parcelas y fincas con información detallada y verificada.',
            features: [
                'Propiedades verificadas en Colombia',
                'Filtros avanzados por tipo de suelo',
                'Información de fuentes de agua',
                'Análisis de cultivos aptos',
                'Datos topográficos incluidos'
            ],
            color: 'from-green-600 to-green-800',
            image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
            action: () => navigate('/propiedades')
        },
        {
            id: 'veterinaria',
            title: 'Veterinaria & Zootecnia',
            icon: '🐄',
            description: 'Servicios veterinarios especializados y asesoría zootécnica para optimizar la producción ganadera. Salud animal y manejo de hatos.',
            features: [
                'Atención veterinaria especializada',
                'Planes sanitarios personalizados',
                'Asesoría en nutrición animal',
                'Manejo reproductivo',
                'Registro y control de ganado'
            ],
            color: 'from-yellow-600 to-yellow-800',
            image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-black text-gray-900 mb-4">
                        Nuestros Servicios
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Soluciones integrales para el sector agropecuario e inmobiliario rural en Colombia
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                            onClick={service.action}
                        >
                            {/* Image with Gradient Overlay */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-80`}></div>

                                {/* Icon */}
                                <div className="absolute top-6 left-6">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-4xl shadow-lg">
                                        {service.icon}
                                    </div>
                                </div>

                                {/* Title */}
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className="text-3xl font-black text-white mb-2">
                                        {service.title}
                                    </h3>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Features */}
                                <ul className="space-y-3 mb-6">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm text-gray-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <button
                                    className={`w-full py-3 px-6 bg-gradient-to-r ${service.color} text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                                    onClick={service.action}
                                >
                                    {service.id === 'propiedades' ? 'Ver Propiedades' : 'Más Información'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="bg-gradient-to-r from-green-600 to-green-800 py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-black text-white mb-4">
                            ¿Por Qué Elegirnos?
                        </h2>
                        <p className="text-xl text-green-100">
                            Experiencia y tecnología al servicio del campo
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { icon: '🎯', title: 'Precisión', desc: 'Datos exactos con tecnología de punta' },
                            { icon: '⚡', title: 'Rapidez', desc: 'Resultados en tiempo récord' },
                            { icon: '🤝', title: 'Confianza', desc: 'Respaldo profesional garantizado' },
                            { icon: '💡', title: 'Innovación', desc: 'Soluciones tecnológicas avanzadas' }
                        ].map((item, idx) => (
                            <div key={idx} className="text-center">
                                <div className="text-6xl mb-4">{item.icon}</div>
                                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-green-100">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Newsletter Section
            <div className="bg-gray-900 pt-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <Newsletter />
                </div>
            </div>
 */}
            {/* CTA Section */}
            <div className="bg-gray-900 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-black text-white mb-6">
                        ¿Listo para comenzar?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Contáctanos hoy y descubre cómo podemos ayudarte
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://wa.me/573176677911"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition transform hover:scale-105 inline-flex items-center justify-center"
                        >
                            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                            Contactar por WhatsApp
                        </a>
                        <button
                            onClick={() => navigate('/propiedades')}
                            className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-lg transition transform hover:scale-105"
                        >
                            Explorar Propiedades
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
