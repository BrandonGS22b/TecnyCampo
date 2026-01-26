import React, { useState, useEffect } from 'react';
import {
    ChartBarIcon,
    HomeIcon,
    UsersIcon,
    CurrencyDollarIcon,
    ArrowTrendingUpIcon,
    EyeIcon
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

const BarChart = ({ data, title }: { data: { label: string; value: number; color: string }[]; title: string }) => {
    const maxValue = Math.max(...data.map(d => d.value));

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <ChartBarIcon className="w-5 h-5 text-blue-600" />
                {title}
            </h3>
            <div className="space-y-3">
                {data.map((item, idx) => (
                    <div key={idx}>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">{item.label}</span>
                            <span className="text-sm font-bold text-gray-900">{item.value}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                                className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`}
                                style={{ width: `${(item.value / maxValue) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const TrendChart = ({ data, title }: { data: number[]; title: string }) => {
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue || 1;

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <ArrowTrendingUpIcon className="w-5 h-5 text-green-600" />
                {title}
            </h3>
            <div className="h-48 flex items-end justify-between gap-2">
                {data.map((value, idx) => {
                    const height = ((value - minValue) / range) * 100;
                    return (
                        <div key={idx} className="flex-1 flex flex-col items-center">
                            <div className="relative w-full">
                                <div
                                    className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-700 hover:from-green-600 hover:to-green-500 cursor-pointer"
                                    style={{ height: `${height}%`, minHeight: '20px' }}
                                    title={`Día ${idx + 1}: ${value} visitas`}
                                ></div>
                            </div>
                            <span className="text-xs text-gray-500 mt-2">Día {idx + 1}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const DonutChart = ({ percentage, title, color }: { percentage: number; title: string; color: string }) => {
    const circumference = 2 * Math.PI * 40;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
            <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
            <div className="relative w-32 h-32">
                <svg className="transform -rotate-90 w-32 h-32">
                    <circle
                        cx="64"
                        cy="64"
                        r="40"
                        stroke="#e5e7eb"
                        strokeWidth="12"
                        fill="transparent"
                    />
                    <circle
                        cx="64"
                        cy="64"
                        r="40"
                        stroke={color}
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">{percentage}%</span>
                </div>
            </div>
        </div>
    );
};

export default function KPIDashboard() {
    const { token } = useAuth();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('https://tecnycampo-backend.onrender.com/api/kpis/dashboard', {
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
            icon: <EyeIcon className="w-6 h-6" />,
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

    // Sample data for charts - replace with real data from backend
    const propertyTypeData = [
        { label: 'Lotes', value: stats?.activeProperties ? Math.floor(stats.activeProperties * 0.4) : 3, color: 'bg-blue-500' },
        { label: 'Parcelas', value: stats?.activeProperties ? Math.floor(stats.activeProperties * 0.35) : 2, color: 'bg-green-500' },
        { label: 'Fincas', value: stats?.activeProperties ? Math.floor(stats.activeProperties * 0.25) : 1, color: 'bg-yellow-500' }
    ];

    const weeklyVisits = stats?.totalViews
        ? [12, 19, 15, 25, 22, 30, 28].map(v => Math.floor((stats.totalViews / 150) * v))
        : [12, 19, 15, 25, 22, 30, 28];

    const occupancyRate = stats?.activeProperties && stats?.totalProperties
        ? Math.floor((stats.activeProperties / stats.totalProperties) * 100)
        : 75;

    if (loading) return <div className="text-center py-20 font-bold text-gray-500 animate-pulse">Cargando estadísticas...</div>;

    return (
        <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BarChart
                    data={propertyTypeData}
                    title="Propiedades por Tipo"
                />
                <TrendChart
                    data={weeklyVisits}
                    title="Visitas de la Última Semana"
                />
            </div>

            {/* Additional Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <DonutChart
                    percentage={occupancyRate}
                    title="Propiedades Activas vs Total"
                    color="#10b981"
                />
                <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-center items-center lg:col-span-2">
                    <div className="text-gray-700 space-y-3 w-full">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Resumen del Sistema</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-sm text-blue-600 font-medium">Promedio de visitas/día</p>
                                <p className="text-2xl font-bold text-blue-900">
                                    {stats?.totalViews ? Math.floor(stats.totalViews / 30) : '4'}
                                </p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <p className="text-sm text-green-600 font-medium">Tasa de ocupación</p>
                                <p className="text-2xl font-bold text-green-900">{occupancyRate}%</p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <p className="text-sm text-purple-600 font-medium">Usuarios activos</p>
                                <p className="text-2xl font-bold text-purple-900">{stats?.totalUsers ?? '2'}</p>
                            </div>
                            <div className="bg-yellow-50 p-4 rounded-lg">
                                <p className="text-sm text-yellow-600 font-medium">Propiedades destacadas</p>
                                <p className="text-2xl font-bold text-yellow-900">
                                    {stats?.totalProperties ? Math.floor(stats.totalProperties * 0.3) : '2'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
