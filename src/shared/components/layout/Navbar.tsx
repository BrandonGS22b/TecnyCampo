import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as HeroIcons from '@heroicons/react/24/solid';
import { useAuth } from '../../../features/auth/auth.context';

const {
    Bars3Icon,
    XMarkIcon,
    UserCircleIcon,
    PlusCircleIcon,
    HomeIcon,
    BuildingOffice2Icon,
    ArrowRightOnRectangleIcon,
    Squares2X2Icon
} = HeroIcons;

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check initial position
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMenuOpen(false);
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-[1200] transition-all duration-300 ${scrolled
                ? 'glass-dark shadow-2xl py-2 md:py-3'
                : 'bg-gradient-to-r from-gray-900 to-gray-800 py-3 md:py-4 shadow-xl'
                } text-white border-b-2 md:border-b-4 border-yellow-500`}
        >
            <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <button
                        className="p-2 rounded-full hover:bg-white/10 transition lg:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <XMarkIcon className="w-6 h-6 text-yellow-400" />
                        ) : (
                            <Bars3Icon className="w-6 h-6 text-yellow-400" />
                        )}
                    </button>

                    <Link to="/" className="flex items-center space-x-2 md:space-x-3 group">
                        <div className="text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300 animate-float">
                            🏡
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight">
                                LP NEGOCIOS
                            </div>
                            <div className="text-[10px] md:text-xs text-yellow-500 font-semibold tracking-wider">
                                E INVERSIONES SAS
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-8">
                    <Link
                        to="/"
                        className="text-white hover:text-yellow-500 font-semibold transition-all duration-300 flex items-center group"
                    >
                        <HomeIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                        Inicio
                    </Link>
                    <Link
                        to="/propiedades"
                        className="text-white hover:text-yellow-500 font-semibold transition-all duration-300 flex items-center group"
                    >
                        <BuildingOffice2Icon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                        Propiedades
                    </Link>
                    <a
                        href="#servicios"
                        className="text-white hover:text-yellow-500 font-semibold transition-all duration-300"
                    >
                        Servicios
                    </a>
                    <a
                        href="https://wa.me/573176677911"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 
                       text-gray-900 font-bold rounded-full transition-all duration-300 transform hover:scale-105 
                       shadow-lg hover:shadow-yellow-500/50"
                    >
                        Contacto
                    </a>

                    {isAuthenticated ? (
                        <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-700">
                            <Link
                                to="/dashboard"
                                className="text-white hover:text-yellow-500 font-semibold transition-all duration-300 flex items-center group"
                            >
                                <Squares2X2Icon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-red-400 hover:text-red-300 font-semibold transition-all duration-300 flex items-center group"
                            >
                                <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                Salir
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="ml-4 text-gray-300 hover:text-white font-medium transition-all duration-300 flex items-center group"
                        >
                            <UserCircleIcon className="w-6 h-6 mr-1 group-hover:scale-110 transition-transform" />
                            Ingresar
                        </Link>
                    )}
                </div>

                {/* Mobile Actions */}
                <div className="flex lg:hidden items-center space-x-2">
                    {isAuthenticated && (
                        <Link
                            to="/dashboard"
                            className="p-2 bg-gray-700/50 backdrop-blur rounded-full hover:bg-gray-600/50 transition"
                        >
                            <Squares2X2Icon className="w-5 h-5 text-yellow-500" />
                        </Link>
                    )}
                    <Link
                        to="/propiedades"
                        className="p-2 bg-green-600 rounded-full hover:bg-green-700 transition transform hover:scale-110"
                    >
                        <BuildingOffice2Icon className="w-5 h-5" />
                    </Link>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div
                className={`fixed top-[70px] left-0 h-[calc(100vh-70px)] w-64 glass-dark backdrop-blur-xl p-6 overflow-y-auto 
                    transition-transform duration-500 ${isMenuOpen ? 'translate-x-0 animate-slide-in-left' : '-translate-x-full'
                    } z-[1100] lg:hidden border-r border-white/10 flex flex-col`}
            >
                <div className="flex-1">
                    <h3 className="text-xl font-bold mb-6 text-yellow-400 border-b border-white/20 pb-2">
                        Menú
                    </h3>
                    <div className="space-y-2">
                        {isAuthenticated && (
                            <div className="mb-4 pb-4 border-b border-white/20">
                                <div className="text-gray-300 text-sm mb-2 px-1">Hola, {user?.name}</div>

                                {/* Dashboard Specific Links (Only visible if on dashboard) */}
                                {window.location.pathname === '/dashboard' && (
                                    <div className="bg-yellow-500/10 rounded-xl p-2 mb-3 space-y-1">
                                        <div className="text-[10px] uppercase tracking-wider text-yellow-500 font-bold px-2 mb-1">
                                            Admin Panel
                                        </div>
                                        <Link
                                            to="/dashboard?tab=overview"
                                            className="flex items-center p-2.5 rounded-lg hover:bg-yellow-500/20 transition"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <Squares2X2Icon className="w-5 h-5 mr-3 text-yellow-500" />
                                            <span className="text-white text-sm font-medium">Resumen</span>
                                        </Link>
                                        {user?.role === 'admin' && (
                                            <Link
                                                to="/dashboard?tab=users"
                                                className="flex items-center p-2.5 rounded-lg hover:bg-yellow-500/20 transition"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <HeroIcons.UsersIcon className="w-5 h-5 mr-3 text-yellow-500" />
                                                <span className="text-white text-sm font-medium">Usuarios</span>
                                            </Link>
                                        )}
                                        <Link
                                            to="/dashboard?tab=properties"
                                            className="flex items-center p-2.5 rounded-lg hover:bg-yellow-500/20 transition"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <BuildingOffice2Icon className="w-5 h-5 mr-3 text-yellow-500" />
                                            <span className="text-white text-sm font-medium">Propiedades</span>
                                        </Link>
                                    </div>
                                )}

                                <Link
                                    to="/dashboard"
                                    className="flex items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition mb-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Squares2X2Icon className="w-5 h-5 mr-3 text-yellow-500" />
                                    <span className="text-white font-medium">Dashboard Principal</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center w-full p-3 rounded-lg hover:bg-white/5 transition text-red-400"
                                >
                                    <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
                                    <span className="font-medium">Cerrar Sesión</span>
                                </button>
                            </div>
                        )}

                        <Link
                            to="/"
                            className="flex items-center p-3 rounded-lg hover:bg-white/10 transition"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <HomeIcon className="w-5 h-5 mr-3 text-yellow-400" />
                            <span className="text-white font-medium">Inicio</span>
                        </Link>
                        <Link
                            to="/propiedades"
                            className="flex items-center p-3 rounded-lg hover:bg-white/10 transition"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <BuildingOffice2Icon className="w-5 h-5 mr-3 text-green-400" />
                            <span className="text-white font-medium">Propiedades</span>
                        </Link>
                        <a
                            href="#servicios"
                            className="flex items-center p-3 rounded-lg hover:bg-white/10 transition"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <PlusCircleIcon className="w-5 h-5 mr-3 text-blue-400" />
                            <span className="text-white font-medium">Servicios</span>
                        </a>
                        <a
                            href="https://wa.me/573176677911"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-3 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 
                       hover:from-yellow-600 hover:to-yellow-700 transition mt-4 transform hover:scale-105"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span className="text-gray-900 font-bold">Contactar</span>
                        </a>

                        {!isAuthenticated && (
                            <Link
                                to="/login"
                                className="flex items-center p-3 rounded-lg border border-white/20 hover:bg-white/10 transition mt-4"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <UserCircleIcon className="w-5 h-5 mr-3 text-gray-400" />
                                <span className="text-gray-300 font-medium">Iniciar Sesión</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Overlay for mobile menu */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1090] lg:hidden"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}
        </nav>
    );
}
