import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Footer from "./components/Footer";
import FarmTypeFilter from "./components/FarmTypeFilter";
//import React, { useState } from 'react';
import { 
  // Iconos de Control
  Bars3Icon, XMarkIcon, UserCircleIcon, PlusCircleIcon,
  // Iconos de Utilidad
  BellIcon, QuestionMarkCircleIcon, HomeIcon,
  // Icono de WhatsApp / Chat
  ChatBubbleOvalLeftIcon, 
  // Iconos para Menu Lateral (Tipos de Activo IT - Usados en Navbar)
  BuildingOffice2Icon, WrenchScrewdriverIcon, CurrencyDollarIcon, SwatchIcon, 
  SunIcon, IdentificationIcon, BoltIcon, CubeIcon, MapPinIcon,
} from '@heroicons/react/24/solid';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

function FloatingWhatsAppButton() {
  const whatsappNumber = "573001234567"; 
  const whatsappMessage = "Hola, necesito asesoría sobre TecnyCampo.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 p-4 bg-green-500 rounded-full 
                 shadow-xl hover:bg-green-600 transition duration-300 
                 transform hover:scale-105 cursor-pointer"
      aria-label="Contactar por WhatsApp"
    >
      <FontAwesomeIcon icon={faWhatsapp} className="text-white text-3xl" />
    </a>
  );
}



export default function App() {
 
  return (
    <div className="overflow-x-hidden relative font-sans">
      <Navbar />
      <Hero />
      <FarmTypeFilter />
      <Services />
      <Footer />
      
      {/* Botón de WhatsApp que se mantiene fijo */}
      <FloatingWhatsAppButton />
    </div>
  );
}
