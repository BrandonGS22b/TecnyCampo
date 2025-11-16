import React, { useState } from "react";
import * as HeroIcons from "@heroicons/react/24/solid";

// Tipado de iconos dinámicos
type HeroIconName = keyof typeof HeroIcons;

interface DynamicIconProps {
  iconName: HeroIconName;
  className?: string;
}

interface MenuItem {
  name: string;
  href: string;
  iconName: HeroIconName;
}

// Extraemos los íconos usados
const {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  PlusCircleIcon,
  BellIcon,
  QuestionMarkCircleIcon,
  HomeIcon,
  BuildingOffice2Icon,
} = HeroIcons;

// Íconos del menú lateral
const menuItems: MenuItem[] = [
  { name: "Topografía Aérea", href: "/servicios/topografia", iconName: "MapPinIcon" },
  { name: "Veterinaria & Zootecnia", href: "/servicios/veterinaria", iconName: "HeartIcon" },
  { name: "Inmobiliaria Animal", href: "/servicios/inmobiliaria", iconName: "BuildingOfficeIcon" },
  { name: "Gestión Agrícola", href: "/gestion/agricola", iconName: "SunIcon" },
  { name: "Recursos Hídricos", href: "/analisis/agua", iconName: "BeakerIcon" },
  { name: "Seguimiento Minero", href: "/analisis/minero", iconName: "WrenchScrewdriverIcon" },
];

// Componente para íconos dinámicos
const DynamicIcon: React.FC<DynamicIconProps> = ({ iconName, className }) => {
  const IconComponent = HeroIcons[iconName] ?? HeroIcons["QuestionMarkCircleIcon"];
  return <IconComponent className={className} aria-hidden="true" />;
};

// Tipado links principales
interface PrimaryLink {
  name: string;
  href: string;
  icon: React.ElementType;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const actionIconClass =
    "w-6 h-6 text-yellow-400 transition duration-300 group-hover:text-white";

  const primaryLinks: PrimaryLink[] = [
    { name: "Inicio", href: "#home", icon: HomeIcon },
    { name: "Servicios", href: "#services", icon: PlusCircleIcon },
    { name: "Unidades", href: "#units", icon: BuildingOffice2Icon },
    { name: "Contacto", href: "#contact", icon: BellIcon },
  ];

  return (
    <nav className="bg-[#1f2d2c] text-white py-2 sm:py-3 shadow-2xl fixed top-0 left-0 w-full z-50 border-b-4 border-yellow-500/80">
  <div className="container mx-auto flex flex-wrap items-center justify-between px-1 sm:px-2 md:px-6">

    {/* Logo + Hamburguesa */}
    <div className="flex items-center space-x-1 sm:space-x-2">
      <button
        className="p-1 sm:p-2 rounded-full hover:bg-green-700 transition lg:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
        ) : (
          <Bars3Icon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
        )}
      </button>
      <h1 className="text-lg sm:text-xl md:text-2xl font-black flex items-center">
        <a href="#home" className="flex items-center">
          <span className="text-yellow-500">TECNY</span>
          <span className="text-sm sm:text-lg md:text-2xl font-light ml-1 text-green-300">CAMPO</span>
        </a>
      </h1>
    </div>

    {/* Right icons */}
    <div className="flex flex-wrap items-center space-x-1 sm:space-x-2 md:space-x-4 mt-1 sm:mt-0">
      <a className="p-1 sm:p-2 group hidden sm:block">
        <BellIcon className="w-5 h-5 text-yellow-400 transition duration-300 group-hover:text-white" />
      </a>
      <a className="p-1 sm:p-2 group hidden sm:block">
        <QuestionMarkCircleIcon className="w-5 h-5 text-yellow-400 transition duration-300 group-hover:text-white" />
      </a>
      <a href="/publicar" className="flex items-center bg-green-600 py-1 px-2 rounded-full text-xs sm:text-sm">
        <PlusCircleIcon className="w-4 h-4 mr-1" />
        <span className="hidden sm:inline">Publicar Activo</span>
      </a>
      <a href="/login" className="flex items-center bg-yellow-500 py-1 px-2 rounded-full text-xs sm:text-sm">
        <UserCircleIcon className="w-4 h-4 mr-1" />
        <span className="hidden sm:inline">Ingresar</span>
      </a>
    </div>
  </div>

  {/* Sidebar */}
  <div
    className={`fixed top-[70px] left-0 h-full w-56 sm:w-64 md:w-72 bg-[#1f2d2c] p-4 sm:p-6 overflow-y-auto transition-transform duration-500 ${
      isMenuOpen ? "translate-x-0" : "-translate-x-full"
    } z-40`}
  >
    <h3 className="text-lg sm:text-xl font-bold mt-4 mb-4 text-yellow-400 border-b pb-2">
      Nuestras Soluciones Clave
    </h3>
    <div className="space-y-2 text-xs sm:text-sm">
      {menuItems.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className="flex items-center p-2 sm:p-3 rounded-lg hover:bg-green-800 transition"
          onClick={() => setIsMenuOpen(false)}
        >
          <DynamicIcon
            iconName={item.iconName}
            className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-green-300 group-hover:text-yellow-400"
          />
          <span className="text-white font-medium truncate">{item.name}</span>
        </a>
      ))}
    </div>
  </div>
</nav>
  );
}
