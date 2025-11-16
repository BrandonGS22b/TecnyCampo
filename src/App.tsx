import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services"; // Topografía
import Veterinaria from "./components/Veterinaria";
import Inmobiliaria from "./components/Inmobiliaria";
import Footer from "./components/Footer";
import FarmTypeFilter from "./components/FarmTypeFilter";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

// Botón flotante WhatsApp
function FloatingWhatsAppButton() {
  const whatsappNumber = "573176677911";
  const whatsappMessage = "Hola, necesito asesoría sobre TecnyCampo.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

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
  type ServiceId = "topografia" | "veterinaria" | "inmobiliaria_animal";

  // Estado global para el servicio elegido
  const [selectedService, setSelectedService] = useState<ServiceId>("topografia");

  // Función que decide qué componente mostrar
  const renderService = () => {
    switch (selectedService) {
      case "topografia":
        return <Services />;
      case "veterinaria":
        return <Veterinaria />;
      case "inmobiliaria_animal":
        return <Inmobiliaria />;
      default:
        return <Services />;
    }
  };

  return (
    <div className="overflow-x-hidden relative font-sans">
      <Navbar />
      <div className="h-[70px]"></div>
      <Hero />
      <FarmTypeFilter onSelectService={setSelectedService} />
       {renderService()} 
      <Footer />

      <FloatingWhatsAppButton />
    </div>
  );
}
