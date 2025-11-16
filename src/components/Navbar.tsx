import React, { useState } from "react";
import * as HeroIcons from "@heroicons/react/24/solid";

// Cada icono disponible en Heroicons se vuelve una opción válida
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

// Extraemos solo los íconos usados directamente
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

// Componente que carga íconos dinámicos sin errores TS
const DynamicIcon: React.FC<DynamicIconProps> = ({ iconName, className }) => {
  const IconComponent = HeroIcons[iconName] ?? HeroIcons["QuestionMarkCircleIcon"];
  return <IconComponent className={className} aria-hidden="true" />;
};

// Tipado para links principales
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
    <nav className="bg-[#1f2d2c] text-white py-3 shadow-2xl fixed top-0 left-0 w-full z-50 border-b-4 border-yellow-500/80">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
        {/* Botón hamburguesa */}
        <div className="flex items-center space-x-6">
          <button
            className="p-2 hover:bg-green-700 rounded-full transition duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6 text-yellow-400" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-yellow-400" />
            )}
          </button>

          {/* Logo */}
          <h1 className="text-3xl font-black flex items-center">
            <a href="#home" className="flex items-center">
              <span className="text-yellow-500">TECNY</span>
              <span className="text-2xl font-light ml-1 text-green-300">CAMPO</span>
            </a>
          </h1>
        </div>

        {/* Links Desktop */}
        <div className="hidden lg:flex items-center space-x-8 font-semibold text-base">
          {primaryLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-gray-200 hover:text-yellow-400 transition duration-300 group py-2"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right icons */}
        <div className="flex items-center space-x-3 md:space-x-5">
          <a className="p-2 group hidden sm:block">
            <BellIcon className={actionIconClass} />
          </a>

          <a className="p-2 group hidden sm:block">
            <QuestionMarkCircleIcon className={actionIconClass} />
          </a>

          <a
            href="/publicar"
            className="flex items-center bg-green-600 py-2 px-4 rounded-full"
          >
            <PlusCircleIcon className="w-5 h-5 mr-1 text-yellow-300" />
            <span className="hidden lg:inline">Publicar Activo</span>
          </a>

          <a
            href="/login"
            className="flex items-center bg-yellow-500 py-2 px-4 rounded-full"
          >
            <UserCircleIcon className="w-6 h-6 mr-1" />
            Ingresar
          </a>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-[70px] left-0 h-full w-72 bg-[#1f2d2c] p-6 transition-transform duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } z-40`}
      >
        <h3 className="text-xl font-bold mt-4 mb-4 text-yellow-400 border-b pb-2">
          Nuestras Soluciones Clave
        </h3>

        <div className="space-y-2 text-base">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex items-center p-3 rounded-lg hover:bg-green-800 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <DynamicIcon
                iconName={item.iconName}
                className="w-6 h-6 mr-4 text-green-300 group-hover:text-yellow-400"
              />
              <span className="text-white font-medium">{item.name}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
