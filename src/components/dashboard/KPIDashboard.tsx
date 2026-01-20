import React from 'react';
import {
    ChartBarIcon,
    HomeIcon,
    UsersIcon,
    CurrencyDollarIcon
} from '@heroicons/react/24/solid';

const StatCard = ({ title, value, icon, color }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center">
        <div className={`p-4 rounded-full ${color} text-white mr-4`}>
            {icon}
        </div>
        <div>
            <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
    </div>
);

export default function KPIDashboard() {
    // Mock data - In a real app, fetch from API
    const stats = [
        {
            title: 'Propiedades Activas',
            value: '12',
            icon: <HomeIcon className="w-6 h-6" />,
            color: 'bg-blue-500'
        },
        {
            title: 'Visitas Totales',
            value: '1,234',
            icon: <UsersIcon className="w-6 h-6" />,
            color: 'bg-green-500'
        },
        {
            title: 'Interesados (Leads)',
            value: '45',
            icon: <ChartBarIcon className="w-6 h-6" />,
            color: 'bg-purple-500'
        },
        {
            title: 'Ventas del Mes',
            value: '$0',
            icon: <CurrencyDollarIcon className="w-6 h-6" />,
            color: 'bg-yellow-500'
        }
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
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
