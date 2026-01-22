import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Navbar from './shared/components/layout/Navbar';
import Hero from './shared/components/layout/Hero';
import Footer from './shared/components/layout/Footer';

// UI Components
import FloatingContactButtons from './shared/components/ui/FloatingContactButtons';
import ChatbotWidget from './shared/components/ui/ChatbotWidget';

// Pages
import HomePage from './pages/HomePage';
import PropiedadesPage from './features/property/pages/PropiedadesPage';
import PropertyDetailPage from './features/property/pages/PropertyDetailPage';
import LoginPage from './features/auth/pages/LoginPage';
import DashboardPage from './features/dashboard/pages/DashboardPage';

// Auth
import ProtectedRoute from './features/auth/components/ProtectedRoute';
import { AuthProvider } from './features/auth/auth.context';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="overflow-x-hidden relative font-sans bg-gray-50 min-h-screen flex flex-col">
          <Navbar />
          <div className="h-[70px]"></div>

          <main className="flex-1">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <HomePage />
                  </>
                }
              />
              <Route path="/propiedades" element={<PropiedadesPage />} />
              <Route path="/propiedades/:id" element={<PropertyDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          <Footer />

          {/* Floating Contact & Chatbot */}
          <FloatingContactButtons />
          <ChatbotWidget />
        </div>
      </Router>
    </AuthProvider>
  );
}
