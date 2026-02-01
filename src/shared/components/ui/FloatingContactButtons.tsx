import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function FloatingContactButtons() {
    const whatsappNumber = '573176677911';
    const whatsappMessage = 'Hola, estoy interesado en los servicios de LP Negocios e Inversiones SAS.';
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div className="fixed bottom-6 right-20 sm:right-24 z-[1900] pointer-events-none">
            {/* WhatsApp Button */}
            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto group relative flex items-center justify-center p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full 
                   shadow-2xl hover:shadow-green-500/50 transition-all duration-300 
                   transform hover:scale-110 active:scale-95 animate-bounce hover:animate-none"
                aria-label="Contactar por WhatsApp"
                title="Chatea con nosotros por WhatsApp"
            >
                <FontAwesomeIcon icon={faWhatsapp} className="text-white text-3xl transition-transform group-hover:scale-110" />

                {/* Tooltip */}
                <span className="absolute right-full mr-4 bg-white/10 backdrop-blur-md text-white text-xs py-1.5 px-3 rounded-lg border border-white/20 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                    ¡Escríbenos ahora! 🟢
                </span>

                {/* Pulse Ring Effect */}
                <span className="absolute inset-0 rounded-full bg-green-500 opacity-75 animate-ping group-hover:hidden"></span>
            </a>
        </div>
    );
}

