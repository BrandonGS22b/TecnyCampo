👨‍🌾 TECNYCAMPO | Soluciones Digitales para el Agro
🚀 Descripción del Proyecto

TecnyCampo es una plataforma web desarrollada con React + Tailwind CSS, enfocada en ofrecer soluciones digitales avanzadas para el sector agrícola y ganadero.

Incluye:

Servicios de topografía aérea con drones

Análisis avanzado de terreno (DEM, NDVI)

Gestión de activos agropecuarios

Filtros inteligentes

Interfaz moderna y completamente responsive

El sistema está diseñado para ofrecer una experiencia rápida, clara y visualmente llamativa.

⚙️ Tecnologías Utilizadas

React + Vite

Tailwind CSS

Heroicons — Navegación, botones y búsqueda

React Icons (Font Awesome) — Filtros, footer y elementos visuales

Animaciones: Transiciones nativas de Tailwind
📂 Estructura destacada del proyecto
app/
 ├── Helpers/
 │    ├── ContarLetrasHelper.php  # Lógica para análisis de texto (Frecuencia de letras)
 │    └── ValidationHelper.php    # Validaciones personalizadas (ej: correo válido)
 ├── Http/
 │    ├── Controllers/
 │    │    ├── Auth/             # Controladores de Autenticación
 │    │    └── ContribuyenteController.php
 │    └── Requests/
 │         └── Auth/             # Requests de Autenticación (ej: ProfileUpdateRequest.php)
 ├── Providers/
 │    └── AppServiceProvider.php  # Binding de interfaces a implementaciones (Repositorios)
 ├── Repositories/
 │    ├── Interfaces/
 │    │    └── ContribuyenteRepositoryInterface.php
 │    └── ContribuyenteRepository.php # Implementación del patrón Repositorio
 ├── Service/                     # Capa de Servicio para lógica de negocio compleja
 └── Models/                      # Modelos de Eloquent (ej: Contribuyente.php)
resources/
 ├── views/
 │    ├── contribuyentes/
 │    │    ├── index.blade.php    # (Listado principal DataTables)
 │    │    └── ... otros blade de gestión
 │    └── ... otras vistas (layouts, auth)
 ├── css/                         # Estilos Tailwind (app.css, dashboard.css)
 └── js/                          # Lógica DataTables + AJAX (app.js, bootstrap.js)

💻 Instalación y Ejecución
1️⃣ Clonar el repositorio
git clone https://github.com/tuusuario/TecnyCampo.git
cd TecnyCampo

2️⃣ Instalar dependencias
npm install

3️⃣ Ejecutar el servidor de desarrollo
npm run dev


Luego abre:

👉 http://localhost:5173

🛠️ Scripts Disponibles

npm run dev — Ejecuta el servidor de desarrollo

npm run build — Genera la build de producción

npm run preview — Previsualiza la build

⭐ Autor

Desarrollado por Brandon García
Proyecto orientado al fortalecimiento tecnológico del sector agropecuario.
