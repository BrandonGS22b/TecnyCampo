// src/components/Services.jsx (Contiene toda la lógica)

import React from 'react';

// 1. Definición de la Tarjeta de Servicio (Anidada dentro de Services o como una función separada)
const ServiceCard = ({ title, description, img, orientation = 'left' }) => {
  // Determina el orden: si la imagen está a la izquierda, el texto va en el segundo div.
  const isImageLeft = orientation === 'left';
  const flexOrder = isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse';

  return (
    <div 
      className={`flex flex-col ${flexOrder} 
                 items-center justify-between bg-white shadow-2xl rounded-xl overflow-hidden 
                 transition-all duration-300 hover:shadow-green-500/50 hover:scale-[1.02]`}
    >
      {/* Contenido de Texto */}
      <div className={`p-8 md:w-1/2 flex flex-col justify-center ${isImageLeft ? 'md:text-left' : 'md:text-right'}`}>
        <h3 className="text-2xl font-extrabold text-gray-900 mb-3 border-b-2 border-yellow-500 pb-1">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
        <button className={`mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-full w-40 hover:bg-green-700 transition duration-300 ${isImageLeft ? 'self-start' : 'self-end'}`}>
          Ver Detalles
        </button>
      </div>

      {/* Imagen */}
      <div className="md:w-1/2 w-full h-64 md:h-80 relative">
        <img 
          src={img} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        {/* Overlay sutil para el efecto de Topografía Aérea */}
        <div className="absolute inset-0 bg-gray-900/10 hover:bg-transparent transition-all duration-300"></div>
      </div>
    </div>
  );
};
// Fin de la definición de ServiceCard

// 2. Datos de Servicios
const services = [
  {
    title: "ORTOMOSAICO Y DEM (MODELADO DE TERRENO)",
    description: "Generación de mapas ortorrectificados de alta precisión y Modelos Digitales de Elevación (DEM) para la planificación de infraestructura, drenajes y proyectos de ingeniería agrícola.",
    img: "https://cdn.pixabay.com/photo/2018/06/18/14/53/drone-3482810_1280.jpg",
    module: "ortomosaico",
  },
  {
    title: "DIVISIÓN INTELIGENTE DE POTREROS",
    description: "Uso de datos topográficos (DEM) y análisis de pendiente para optimizar la ubicación de cercas, puntos de agua y caminos, mejorando la rotación y eficiencia del pastoreo.",
    img: "https://cdn.pixabay.com/photo/2016/11/29/05/45/barn-1867160_1280.jpg",
    module: "division_potreros",
  },
  {
    title: "AFORO Y MEDICIÓN DIGITAL DE FORRAJE",
    description: "Cálculo preciso de la disponibilidad de biomasa y forraje por hectárea mediante índices de vegetación (NDVI), crucial para la toma de decisiones de carga animal.",
    img: "https://cdn.pixabay.com/photo/2017/08/21/21/53/cows-2667363_1280.jpg",
    module: "aforo_digital",
  },
  {
    title: "BROMATOLOGÍA DE SUELOS (DATOS NDVI)",
    description: "Análisis de la salud y calidad del suelo y pasturas usando datos multiespectrales, permitiendo la fertilización de precisión y la optimización de los nutrientes.",
    img: "https://cdn.pixabay.com/photo/2017/06/12/21/50/agriculture-2397444_1280.jpg",
    module: "bromatologia_digital",
  },
];

// 3. Componente Principal
export default function Services() {
  return (
    <section className="py-20 px-4 md:px-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-16">
          <span className="text-yellow-600">Servicios</span> de Topografía Aérea para Ganadería
        </h2>
        
        <div className="space-y-12">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              {...service} 
              // Alternar la orientación para un diseño en zig-zag (izquierda, derecha, izquierda...)
              orientation={index % 2 === 0 ? 'left' : 'right'} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}