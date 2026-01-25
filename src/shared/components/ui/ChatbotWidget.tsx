import { useState, useRef, useEffect } from 'react';
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';

interface Message {
  from: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  // Generamos un ID de sesión único para que n8n/MongoDB guarden la memoria correctamente
  const [sessionId] = useState(`session-${Math.random().toString(36).substr(2, 9)}`);
  
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: '¡Hola! 👋 Soy tu asistente IA de TecnyCampo. ¿En qué puedo ayudarte hoy?', timestamp: new Date() },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;
    const userMessage: Message = { from: 'user', text: userText, timestamp: new Date() };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // URL de tu n8n local (asegúrate que n8n esté corriendo)
      const response = await fetch(
      'https://n8n-latest-vnb9.onrender.com:5678/webhook/chat',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatInput: userText,
          sessionId
        }),
      }
    );


      if (!response.ok) throw new Error('Error en la respuesta del servidor');

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { 
          from: 'bot', 
          // El nodo AI Agent de n8n devuelve la respuesta en 'output'
          text: data.output || data.text || 'He recibido tu mensaje, pero no tengo una respuesta clara.', 
          timestamp: new Date() 
        },
      ]);
    } catch (error) {
      console.error("Error conectando con n8n:", error);
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: 'Lo siento, tengo problemas para conectarme. ¿Está n8n activo? 😢', timestamp: new Date() },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[2000] flex flex-col items-end pointer-events-none">
      {/* VENTANA DE CHAT */}
      <div
        className={`pointer-events-auto transition-all duration-500 ease-in-out transform origin-bottom-right mb-4
          ${open ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-10'}
          w-[calc(100vw-3rem)] sm:w-[380px] h-[500px] sm:h-[600px] max-h-[80vh]
          bg-[#1a1c1e] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden`}
      >
        {/* CABECERA */}
        <div className="p-4 bg-gradient-to-r from-purple-700 to-indigo-800 flex justify-between items-center">
          <div className="flex items-center gap-3 text-white">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
              <ChatBubbleLeftRightIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Asistente TecnyCampo</h3>
              <p className="text-[10px] opacity-70 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> En línea
              </p>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* MENSAJES */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#121416]">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
                msg.from === 'user' 
                ? 'bg-purple-600 text-white rounded-tr-none' 
                : 'bg-white/10 text-gray-200 border border-white/5 rounded-tl-none'
              }`}>
                {msg.text}
                <div className="text-[9px] opacity-40 mt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1">
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div className="p-4 bg-[#1a1c1e] border-t border-white/5">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Escribe tu duda técnica..."
              className="flex-1 bg-white/5 border border-white/10 rounded-full py-2 px-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
              className="p-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-full disabled:opacity-50 transition-all"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* BOTÓN FLOTANTE */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="pointer-events-auto p-4 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center relative"
        >
          <ChatBubbleLeftRightIcon className="w-8 h-8 text-white" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] text-white font-bold px-1.5 py-0.5 rounded-full border-2 border-[#121416]">
            IA
          </span>
        </button>
      )}
    </div>
  );
}