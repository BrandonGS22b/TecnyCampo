import React, { useState, useEffect } from 'react';
import {
    ChartBarIcon,
    HomeIcon,
    UsersIcon,
    CurrencyDollarIcon
} from '@heroicons/react/24/solid';
import { useAuth } from '../../auth/auth.context';

const StatCard = ({ title, value, icon, color }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center transition-transform hover:scale-105">
        <div className={`p-4 rounded-full ${color} text-white mr-4 shadow-inner`}>
            {icon}
        </div>
        <div>
            <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
            <p className="text-3xl font-black text-gray-900">{value}</p>
        </div>
    </div>
);

export default function KPIDashboard() {
    const { token } = useAuth();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/kpis/dashboard', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setStats(data);
                }
            } catch (error) {
                console.error("Error fetching stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [token]);

    const statCards = [
        {
            title: 'Propiedades Activas',
            value: stats?.activeProperties ?? '0',
            icon: <HomeIcon className="w-6 h-6" />,
            color: 'bg-gradient-to-br from-blue-500 to-blue-600'
        },
        {
            title: 'Visitas Totales',
            value: stats?.totalViews?.toLocaleString() ?? '0',
            icon: <UsersIcon className="w-6 h-6" />,
            color: 'bg-gradient-to-br from-green-500 to-green-600'
        },
        {
            title: 'Usuarios en Sistema',
            value: stats?.totalUsers ?? '0',
            icon: <UsersIcon className="w-6 h-6" />,
            color: 'bg-gradient-to-br from-purple-500 to-purple-600'
        },
        {
            title: 'Propiedades Totales',
            value: stats?.totalProperties ?? '0',
            icon: <CurrencyDollarIcon className="w-6 h-6" />,
            color: 'bg-gradient-to-br from-yellow-500 to-yellow-600'
        }
    ];

    if (loading) return <div className="text-center py-20 font-bold text-gray-500 animate-pulse">Cargando estadísticas...</div>;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Placeholder for charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-lg h-96 flex flex-col justify-center items-center text-gray-400">
                    <ChartBarIcon className="w-16 h-16 mb-4" />
                    <p>Gráfico de Visitas (Próximamente)</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg h-96 flex flex-col justify-center items-center text-gray-400">
                    <CurrencyDollarIcon className="w-16 h-16 mb-4" />
                    <p>Gráfico de Ventas (Próximamente)</p>
                </div>
            </div>
        </div>
    );
}

