import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HomePage from "./pages/HomePage";
import PropiedadesPage from "./pages/PropiedadesPage";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

// Botón flotante WhatsApp
function FloatingWhatsAppButton() {
  // ... (same as before)
  const whatsappNumber = "573176677911";
  const whatsappMessage = "Hola, estoy interesado en los servicios de LP Negocios e Inversiones SAS.";
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
                 transform hover:scale-110 cursor-pointer animate-bounce"
      aria-label="Contactar por WhatsApp"
    >
      <FontAwesomeIcon icon={faWhatsapp} className="text-white text-3xl" />
    </a>
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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
          </Routes>

          <Footer />
          <FloatingWhatsAppButton />
        </div>
      </Router>
    </AuthProvider>
  );
}
