import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HomePage from "./pages/HomePage";
import PropiedadesPage from "./pages/PropiedadesPage";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

// Componente para botones flotantes (WhatsApp + Chatbot n8n)
function FloatingContactButtons() {
  const whatsappNumber = "573176677911";
  const whatsappMessage = "Hola, estoy interesado en los servicios de LP Negocios e Inversiones SAS.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  useEffect(() => {
    // n8n Chatbot Integration Script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@n8n/chat-widget@0.2.1/dist/chat-widget.bundle.es.js';
    script.type = 'module';
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      if (window.ChatWidget) {
        // @ts-ignore
        new window.ChatWidget({
          webhookUrl: 'https://unwisely-unlumpy-cammie.ngrok-free.dev/webhook/bf34cc2f-f4d9-4ad7-934b-098ef285cac9',
          title: 'Asistente IA - LP Negocios',
          subtitle: 'Bienvenido, ¿en qué podemos ayudarte?',
          primaryColor: '#16a34a',
          backgroundColor: '#ffffff',
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
      {/* Botón WhatsApp */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="p-4 bg-green-500 rounded-full 
                   shadow-xl hover:bg-green-600 transition duration-300 
                   transform hover:scale-110 cursor-pointer animate-bounce"
        aria-label="Contactar por WhatsApp"
      >
        <FontAwesomeIcon icon={faWhatsapp} className="text-white text-3xl" />
      </a>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="overflow-x-hidden relative font-sans bg-gray-50">
          <Navbar />
          <div className="h-[70px]"></div>

          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <HomePage />
              </>
            } />
            <Route path="/propiedades" element={<PropiedadesPage />} />
            <Route path="/propiedades/:id" element={<PropertyDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
          </Routes>

          <Footer />
          <FloatingContactButtons />
        </div>
      </Router>
    </AuthProvider>
  );
}
