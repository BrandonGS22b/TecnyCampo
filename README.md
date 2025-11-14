👨‍🌾 TECNYCAMPO | Soluciones Digitales para el Agro
🚀 Descripción del Proyecto

TecnyCampo es una plataforma web desarrollada con React y Tailwind CSS, enfocada en ofrecer soluciones digitales de alta precisión para el sector agrícola y ganadero.
Incluye servicios de topografía aérea con drones, análisis de terreno (DEM, NDVI), gestión de activos y herramientas intuitivas para encontrar servicios especializados.

El sistema está diseñado con una interfaz moderna, filtros dinámicos y navegación optimizada para mejorar la experiencia del usuario.

⚙️ Tecnologías Utilizadas

Framework: React + Vite

Estilos: Tailwind CSS

Iconografía:

Heroicons (@heroicons/react) — navegación y botones

Font Awesome vía React Icons (react-icons/fa) — filtros y footer

Animaciones: transiciones nativas de Tailwind

📂 Estructura del Código
public/
├── aforoDigital.jpg
├── BROMATOLOGÍA.jpg
├── POTREROS.jpg
├── TOPOGRAFIA.jpg
└── vite.svg

src/
├── assets/
│   └── (imágenes o recursos adicionales)
│
├── components/
│   ├── FarmTypeFilter.jsx   # Filtro de tipos de finca/activo
│   ├── Footer.jsx           # Footer moderno con columnas e iconos
│   ├── Hero.jsx             # Sección principal con barra de búsqueda
│   ├── Navbar.jsx           # Navbar animada con menú móvil
│   ├── Services.jsx         # Contenedor general de servicios
│   └── ServiceCard.jsx      # Tarjeta para cada servicio (si la agregas)
│
├── App.jsx                  # Componente raíz
├── index.css                # Estilos globales de Tailwind
├── main.jsx                 # Punto de entrada de la app

💻 Instalación y Ejecución

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

1. Clonar el Repositorio
git clone https://github.com/tuusuario/TecnyCampo.git
cd TecnyCampo

2. Instalar Dependencias

Incluye React, Tailwind, Heroicons y React Icons.

npm install

3. Ejecutar el Servidor de Desarrollo
npm run dev


El proyecto estará disponible en:

👉 http://localhost:5173

🛠️ Scripts Disponibles

npm run dev — Ejecuta el servidor de desarrollo

npm run build — Genera la build de producción

npm run preview — Previsualiza la build

⭐ Autor

Desarrollado por Brandon García
Proyecto orientado al fortalecimiento tecnológico del sector agropecuario.
