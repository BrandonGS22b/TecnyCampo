import {
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaWhatsapp
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { BuildingOffice2Icon, HomeIcon, SparklesIcon } from '@heroicons/react/24/solid';

export default function Footer() {
    return (
        <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-16 pb-6 mt-20 shadow-2xl overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-white/10 pb-10 mb-8">

                    {/* Brand Section */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="flex items-center space-x-3 group">
                            <div className="text-5xl group-hover:scale-110 transition-transform duration-300">🏡</div>
                            <div>
                                <h1 className="text-3xl font-extrabold">
                                    <span className="gradient-text-secondary">LP NEGOCIOS</span>
                                </h1>
                                <p className="text-sm text-yellow-500 font-semibold tracking-wider">E INVERSIONES SAS</p>
                            </div>
                        </div>

                        <p className="text-gray-300 text-sm leading-relaxed max-w-md">
                            Liderando el mercado inmobiliario rural en Colombia. Conectamos compradores y vendedores
                            con tecnología de punta y servicio personalizado.
                        </p>

                        {/* Social Media Links */}
                        <div className="flex space-x-4 pt-2">
                            <a
                                href="#"
                                target="_blank"
                                className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-yellow-500 
                           hover:text-yellow-400 transition-all duration-300 transform hover:scale-110 
                           hover:shadow-lg hover:shadow-yellow-500/50"
                                aria-label="Facebook"
                            >
                                <FaFacebook className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-yellow-500 
                           hover:text-yellow-400 transition-all duration-300 transform hover:scale-110
                           hover:shadow-lg hover:shadow-yellow-500/50"
                                aria-label="Instagram"
                            >
                                <FaInstagram className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-yellow-500 
                           hover:text-yellow-400 transition-all duration-300 transform hover:scale-110
                           hover:shadow-lg hover:shadow-yellow-500/50"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin className="w-5 h-5" />
                            </a>
                            <a
                                href="https://wa.me/573176677911"
                                target="_blank"
                                className="p-3 rounded-full bg-green-600 hover:bg-green-700 text-white 
                           transition-all duration-300 transform hover:scale-110
                           hover:shadow-lg hover:shadow-green-500/50"
                                aria-label="WhatsApp"
                            >
                                <FaWhatsapp className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-yellow-400 mb-4 flex items-center gap-2">
                            <SparklesIcon className="w-5 h-5" />
                            Enlaces Rápidos
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/" className="flex items-center gap-2 hover:text-green-400 transition-all duration-300 group">
                                    <HomeIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link to="/propiedades" className="flex items-center gap-2 hover:text-green-400 transition-all duration-300 group">
                                    <BuildingOffice2Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    Propiedades
                                </Link>
                            </li>
                            <li>
                                <a href="#servicios" className="hover:text-green-400 transition-all duration-300 block hover:translate-x-1">
                                    Servicios
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-green-400 transition-all duration-300 block hover:translate-x-1">
                                    Acerca de Nosotros
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-green-400 transition-all duration-300 block hover:translate-x-1">
                                    Contáctanos
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-yellow-400 mb-4">Contacto</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start group">
                                <FaMapMarkerAlt className="w-4 h-4 mr-3 mt-1 text-green-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                <p className="group-hover:text-green-400 transition-colors">
                                    Carrera 8 No. 61 – 175, Bucaramanga - Colombia
                                </p>
                            </li>
                            <li className="flex items-center group">
                                <FaPhone className="w-4 h-4 mr-3 text-green-400 group-hover:scale-110 transition-transform" />
                                <a href="tel:+573176677911" className="hover:text-green-400 transition-colors cursor-pointer">
                                    (+57) 317 667 7911
                                </a>
                            </li>
                            <li className="flex items-center group">
                                <FaEnvelope className="w-4 h-4 mr-3 text-green-400 group-hover:scale-110 transition-transform" />
                                <a href="mailto:yeidson.lopez@gmail.com" className="hover:text-green-400 transition-colors cursor-pointer">
                                    yeidson.lopez@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="mb-8 p-6 glass rounded-2xl border border-white/10 backdrop-blur-md">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">Suscríbete a nuestro boletín</h3>
                            <p className="text-sm text-gray-300">Recibe las mejores ofertas directamente en tu correo</p>
                        </div>
                        <div className="flex w-full md:w-auto gap-2">
                            <input
                                type="email"
                                placeholder="tu@email.com"
                                className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white 
                           placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 
                           transition-all flex-1 md:w-64"
                            />
                            <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 
                                 hover:from-green-600 hover:to-green-700 rounded-lg font-bold 
                                 transition-all duration-300 transform hover:scale-105 
                                 shadow-lg hover:shadow-green-500/50">
                                Suscribir
                            </button>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center pt-4">
                    <p className="text-xs text-gray-400">
                        © 2025 LP Negocios e Inversiones SAS. Todos los derechos reservados.
                        <span className="text-red-500 mx-1">❤️</span>
                        Desarrollado en Colombia
                    </p>
                </div>
            </div>
        </footer>
    );
}
