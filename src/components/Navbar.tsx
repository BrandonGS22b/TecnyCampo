import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as HeroIcons from "@heroicons/react/24/solid";
import { useAuth } from "../context/AuthContext";

const {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  PlusCircleIcon,
  BellIcon,
  QuestionMarkCircleIcon,
  HomeIcon,
  BuildingOffice2Icon,
  ArrowRightOnRectangleIcon,
  Squares2X2Icon
} = HeroIcons;

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 shadow-2xl fixed top-0 left-0 w-full z-50 border-b-4 border-yellow-500">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <button
            className="p-2 rounded-full hover:bg-gray-700 transition lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6 text-yellow-400" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-yellow-400" />
            )}
          </button>

          <Link to="/" className="flex items-center space-x-3 group">
            <div className="text-4xl group-hover:scale-110 transition-transform">🏡</div>
            <div>
              <div className="text-2xl font-black text-white tracking-tight">
                LP NEGOCIOS
              </div>
              <div className="text-xs text-yellow-500 font-semibold tracking-wider">
                E INVERSIONES SAS
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link
            to="/"
            className="text-white hover:text-yellow-500 font-semibold transition-colors duration-300 flex items-center"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Inicio
          </Link>
          <Link
            to="/propiedades"
            className="text-white hover:text-yellow-500 font-semibold transition-colors duration-300 flex items-center"
          >
            <BuildingOffice2Icon className="w-5 h-5 mr-2" />
            Propiedades
          </Link>
          <a
            href="#servicios"
            className="text-white hover:text-yellow-500 font-semibold transition-colors duration-300"
          >
            Servicios
          </a>
          <a
            href="https://wa.me/573176677911"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Contacto
          </a>

          {isAuthenticated ? (
            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-700">
              <Link
                to="/dashboard"
                className="text-white hover:text-yellow-500 font-semibold transition-colors duration-300 flex items-center"
              >
                <Squares2X2Icon className="w-5 h-5 mr-2" />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 font-semibold transition-colors duration-300 flex items-center"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                Salir
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="ml-4 text-gray-300 hover:text-white font-medium transition-colors duration-300 flex items-center"
            >
              <UserCircleIcon className="w-6 h-6 mr-1" />
              Ingresar
            </Link>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex lg:hidden items-center space-x-2">
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition"
            >
              <Squares2X2Icon className="w-5 h-5 text-yellow-500" />
            </Link>
          )}
          <Link
            to="/propiedades"
            className="p-2 bg-green-600 rounded-full hover:bg-green-700 transition"
          >
            <BuildingOffice2Icon className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-[70px] left-0 h-full w-64 bg-gray-900 p-6 overflow-y-auto transition-transform duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } z-40 lg:hidden`}
      >
        <h3 className="text-xl font-bold mb-6 text-yellow-400 border-b pb-2">
          Menú
        </h3>
        <div className="space-y-2">
          {isAuthenticated && (
            <div className="mb-4 pb-4 border-b border-gray-700">
              <div className="text-gray-400 text-sm mb-2">Hola, {user?.name}</div>
              <Link
                to="/dashboard"
                className="flex items-center p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition mb-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Squares2X2Icon className="w-5 h-5 mr-3 text-yellow-500" />
                <span className="text-white font-medium">Dashboard</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full p-3 rounded-lg hover:bg-gray-800 transition text-red-400"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
                <span className="font-medium">Cerrar Sesión</span>
              </button>
            </div>
          )}

          <Link
            to="/"
            className="flex items-center p-3 rounded-lg hover:bg-gray-800 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            <HomeIcon className="w-5 h-5 mr-3 text-yellow-400" />
            <span className="text-white font-medium">Inicio</span>
          </Link>
          <Link
            to="/propiedades"
            className="flex items-center p-3 rounded-lg hover:bg-gray-800 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            <BuildingOffice2Icon className="w-5 h-5 mr-3 text-green-400" />
            <span className="text-white font-medium">Propiedades</span>
          </Link>
          <a
            href="#servicios"
            className="flex items-center p-3 rounded-lg hover:bg-gray-800 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            <PlusCircleIcon className="w-5 h-5 mr-3 text-blue-400" />
            <span className="text-white font-medium">Servicios</span>
          </a>
          <a
            href="https://wa.me/573176677911"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition mt-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="text-gray-900 font-bold">Contactar</span>
          </a>

          {!isAuthenticated && (
            <Link
              to="/login"
              className="flex items-center p-3 rounded-lg border border-gray-700 hover:bg-gray-800 transition mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <UserCircleIcon className="w-5 h-5 mr-3 text-gray-400" />
              <span className="text-gray-300 font-medium">Iniciar Sesión</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
