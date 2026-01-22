import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function FloatingContactButtons() {
    const whatsappNumber = '573176677911';
    const whatsappMessage = 'Hola, estoy interesado en los servicios de LP Negocios e Inversiones SAS.';
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div className="fixed bottom-8 right-8 z-[1300] flex flex-col gap-4">
            {/* WhatsApp Button */}
            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full 
                   shadow-2xl hover:shadow-green-500/50 transition-all duration-300 
                   transform hover:scale-110 active:scale-95 animate-bounce hover:animate-none"
                aria-label="Contactar por WhatsApp"
                title="Chatea con nosotros por WhatsApp"
            >
                <FontAwesomeIcon icon={faWhatsapp} className="text-white text-3xl" />

                {/* Pulse Ring Effect */}
                <span className="absolute inset-0 rounded-full bg-green-500 opacity-75 animate-ping group-hover:animate-none"></span>
            </a>
        </div>
    );
}
