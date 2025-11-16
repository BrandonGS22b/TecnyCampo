// src/components/Services.jsx

import React from 'react';

// Mapeo de módulos a iconos de Font Awesome relevantes para servicios de topografía y ganadería
const iconMap = {
  ortomosaico: 'fa-map-marked-alt', // Mapa para topografía
  division_potreros: 'fa-fence', // Cerca o división
  aforo_digital: 'fa-chart-area', // Gráfico de área para medición
  bromatologia_digital: 'fa-flask', // Matraz para análisis de suelos
};

// 1. Definición de la Tarjeta de Servicio MEJORADA
const ServiceCard = ({ title, description, img, orientation = 'left', module }) => {
  const isImageLeft = orientation === 'left';
  const flexOrder = isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse';
  const textAlign = isImageLeft ? 'md:text-left' : 'md:text-right';
  const iconClass = iconMap[module] || 'fa-tools';
  const buttonAlignment = isImageLeft ? 'self-start' : 'self-end';

  return (
    <div
      className={`flex flex-col ${flexOrder}
                 items-stretch bg-white rounded-3xl shadow-2xl border-2 border-gray-200
                 transition-all duration-700
                 transform hover:scale-[1.01] hover:shadow-green-500/50 hover:-translate-y-1
                 overflow-hidden group relative`} // Añadimos 'group' para efectos de hover anidados
    >
      {/* CINTA DE ACENTO EN EL BORDE SUPERIOR */}
      <div className="absolute top-0 inset-x-0 h-2 bg-yellow-500"></div>

      {/* Contenido de Texto */}
      <div className={`p-8 md:p-12 md:w-1/2 flex flex-col justify-center space-y-5 ${textAlign} z-10`}>
        {/* ICONO CON CÍRCULO */}
        <div className={`text-4xl ${isImageLeft ? 'self-start' : 'self-end'} mb-3`}>
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-700">
            <i className={`fas ${iconClass}`}></i>
          </div>
        </div>

        {/* Título más Impactante */}
        <h3 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
          {title}
        </h3>
        
        {/* Descripción con Mayor Contraste */}
        <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-yellow-500 pl-4">
          {description}
        </p>

        {/* Botón de Acción con efecto 3D */}
        <button 
          className={`mt-4 px-10 py-3 bg-yellow-500 text-gray-900 font-extrabold rounded-lg 
                     shadow-xl hover:bg-yellow-600 hover:shadow-yellow-600/70 
                     transition duration-300 transform hover:-translate-y-0.5
                     w-auto max-w-xs ${buttonAlignment}`}
        >
          <i className="fas fa-arrow-alt-circle-right mr-2"></i>
          Explorar Solución
        </button>
      </div>

      {/* Imagen */}
      <div className="md:w-1/2 w-full h-80 md:h-auto relative overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08] saturate-150 group-hover:saturate-100" // Efecto de saturación en hover
        />
        {/* Overlay con Gradiente Más Llamativo */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent"></div>
      </div>
    </div>
  );
};
// Fin de la definición de ServiceCard

// 2. Datos de Servicios (Se mantiene igual)
const services = [
  {
    title: "ORTOMOSAICO Y DEM (MODELADO DE TERRENO)",
    description: "Generación de mapas ortorrectificados de alta precisión y Modelos Digitales de Elevación (DEM) para la planificación de infraestructura, drenajes y proyectos de ingeniería agrícola.",
    img: "../../public/TOPOGRAFIA.jpg",
    module: "ortomosaico",
  },
  {
    title: "DIVISIÓN INTELIGENTE DE POTREROS",
    description: "Uso de datos topográficos (DEM) y análisis de pendiente para optimizar la ubicación de cercas, puntos de agua y caminos, mejorando la rotación y eficiencia del pastoreo.",
    img: "../../public/POTREROS.jpg",
    module: "division_potreros",
  },
  {
    title: "AFORO Y MEDICIÓN DIGITAL DE FORRAJE",
    description: "Cálculo preciso de la disponibilidad de biomasa y forraje por hectárea mediante índices de vegetación (NDVI), crucial para la toma de decisiones de carga animal.",
    img: "../../public/aforoDigital.jpg",
    module: "aforo_digital",
  },
  {
    title: "BROMATOLOGÍA DE SUELOS (DATOS NDVI)",
    description: "Análisis de la salud y calidad del suelo y pasturas usando datos multiespectrales, permitiendo la fertilización de precisión y la optimización de los nutrientes.",
    img: "../../public/BROMATOLOGÍA.jpg",
    module: "bromatologia_digital",
  },
];

// 3. Componente Principal MEJORADO
export default function Services() {
  return (
    // CAMBIO CLAVE: Fondo más texturizado y más espacio horizontal en XL
    <section 
      className="py-24 px-4 md:px-20 bg-gray-100 
                 relative overflow-hidden 
                 before:content-[''] before:absolute before:inset-0 
                 before:bg-repeat before:opacity-5 
                 before:bg-[url('data:image/svg+xml;base64,...')] xl:px-40" // Simulamos un patrón sutil (ej: puntos)
    >
      <div className="max-w-7xl xl:max-w-full mx-auto relative z-10"> {/* max-w-full en XL */}
        
        {/* Encabezado de la Sección */}
        <div className="text-center mb-20">
          <p className="text-md font-bold uppercase text-yellow-600 tracking-widest mb-3">
            Agricultura de Precisión Aérea
          </p>
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-none">
            Datos que Transforman <span className="text-green-600">tu Ganadería</span>
          </h2>
        </div>
        
        <div className="space-y-16 lg:space-y-24"> {/* Aumentado el espacio entre tarjetas */}
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              {...service} 
              orientation={index % 2 === 0 ? 'left' : 'right'} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}