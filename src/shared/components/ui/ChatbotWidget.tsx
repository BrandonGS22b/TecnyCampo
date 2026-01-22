import { useEffect, useState } from 'react';
import { ChatBubbleLeftRightIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface ChatbotWidgetProps {
    webhookUrl?: string;
    title?: string;
    subtitle?: string;
    primaryColor?: string;
    backgroundColor?: string;
}

export default function ChatbotWidget({
    webhookUrl = 'https://unwisely-unlumpy-cammie.ngrok-free.dev/webhook/bf34cc2f-f4d9-4ad7-934b-098ef285cac9',
    title = 'Asistente IA - LP Negocios',
    subtitle = 'Bienvenido, ¿en qué podemos ayudarte?',
    primaryColor = '#16a34a',
    backgroundColor = '#ffffff',
}: ChatbotWidgetProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load n8n Chat Widget Script
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@n8n/chat-widget@0.2.1/dist/chat-widget.bundle.es.js';
        script.type = 'module';
        script.async = true;

        script.onload = () => {
            setIsLoaded(true);
            // @ts-ignore - n8n ChatWidget is loaded dynamically
            if (window.ChatWidget) {
                // @ts-ignore
                new window.ChatWidget({
                    webhookUrl,
                    title,
                    subtitle,
                    primaryColor,
                    backgroundColor,
                });
            }
        };

        document.body.appendChild(script);

        return () => {
            // Cleanup script on unmount
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, [webhookUrl, title, subtitle, primaryColor, backgroundColor]);

    return (
        <div className="chatbot-widget-container">
            {/* Custom Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-32 right-8 z-[1400] p-4 bg-gradient-to-br from-purple-600 to-purple-700 
                   rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 
                   transform hover:scale-110 active:scale-95 group animate-pulse-glow"
                aria-label="Abrir chatbot"
                title="Chatea con nuestro asistente IA"
            >
                {isOpen ? (
                    <XMarkIcon className="w-7 h-7 text-white transition-transform duration-300 group-hover:rotate-90" />
                ) : (
                    <ChatBubbleLeftRightIcon className="w-7 h-7 text-white transition-transform duration-300 group-hover:scale-110" />
                )}

                {/* Pulse Ring Effect */}
                <span className="absolute inset-0 rounded-full bg-purple-600 opacity-75 animate-ping"></span>
            </button>

            {/* Badge Indicator */}
            {!isOpen && (
                <div className="fixed bottom-[140px] right-[72px] z-[1400] bg-red-500 text-white text-xs font-bold 
                        rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
                    IA
                </div>
            )}
        </div>
    );
}
