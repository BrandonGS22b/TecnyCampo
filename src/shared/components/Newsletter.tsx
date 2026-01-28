import { useState } from 'react';
import { FaPaperPlane, FaCheck, FaExclamationCircle } from 'react-icons/fa';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setStatus('error');
            setMessage('Por favor ingresa un correo válido');
            return;
        }

        setStatus('loading');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://tecnycampo-backend.onrender.com/api'}/newsletter/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al suscribirse');
            }

            setStatus('success');
            setMessage('¡Gracias por suscribirte!');
            setEmail('');
            setTimeout(() => {
                setStatus('idle');
                setMessage('');
            }, 3000);
        } catch (error: any) {
            setStatus('error');
            setMessage(error.message);
        }
    };

    return (
        <div className="mb-8 p-6 glass rounded-2xl border border-white/10 backdrop-blur-md relative overflow-hidden group">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -z-10 transition-all duration-700 group-hover:bg-green-500/20"></div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                <div className="text-left">
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        <FaPaperPlane className="text-green-400" />
                        Suscríbete a nuestro boletín
                    </h3>
                    <p className="text-gray-300 max-w-md">
                        Recibe las mejores ofertas de terrenos y novedades directamente en tu correo. ¡No te pierdas ninguna oportunidad!
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
                    <div className="relative w-full md:w-80">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            disabled={status === 'loading' || status === 'success'}
                            className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all backdrop-blur-sm"
                        />
                        {status === 'error' && (
                            <div className="absolute -bottom-6 left-0 text-red-400 text-xs flex items-center gap-1">
                                <FaExclamationCircle /> {message}
                            </div>
                        )}
                        {status === 'success' && (
                            <div className="absolute -bottom-6 left-0 text-green-400 text-xs flex items-center gap-1">
                                <FaCheck /> {message}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'loading' || status === 'success'}
                        className={`px-8 py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 min-w-[140px]
                            ${status === 'success'
                                ? 'bg-green-600 hover:bg-green-700 cursor-default'
                                : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 hover:shadow-green-500/25 hover:scale-[1.02] active:scale-[0.98]'
                            }
                            disabled:opacity-70 disabled:cursor-not-allowed
                        `}
                    >
                        {status === 'loading' ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : status === 'success' ? (
                            <>Suscripto <FaCheck /></>
                        ) : (
                            'Suscribir'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Newsletter;
