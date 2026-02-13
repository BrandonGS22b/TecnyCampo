import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../auth/auth.context';
import {
    Squares2X2Icon,
    UsersIcon,
    BuildingOffice2Icon,
    ArrowRightOnRectangleIcon
} from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import UserManagement from '../components/UserManagement';
import KPIDashboard from '../components/KPIDashboard';
import AdminPropertyManagement from '../components/AdminPropertyManagement';

export default function DashboardPage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get('tab') || 'overview';

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const setActiveTab = (tab: string) => {
        setSearchParams({ tab });
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <KPIDashboard />;
            case 'users':
                return <UserManagement />;
            case 'properties':
                return <AdminPropertyManagement />;
            default:
                return <KPIDashboard />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-800">
                    <h1 className="text-2xl font-bold text-yellow-500">Panel Admin</h1>
                    <p className="text-sm text-gray-400 mt-1">Hola, {user?.name}</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'overview'
                            ? 'bg-yellow-500 text-gray-900 font-bold'
                            : 'text-gray-300 hover:bg-gray-800'
                            }`}
                    >
                        <Squares2X2Icon className="w-5 h-5 mr-3" />
                        Resumen
                    </button>

                    {user?.role === 'admin' && (
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'users'
                                ? 'bg-yellow-500 text-gray-900 font-bold'
                                : 'text-gray-300 hover:bg-gray-800'
                                }`}
                        >
                            <UsersIcon className="w-5 h-5 mr-3" />
                            Usuarios
                        </button>
                    )}

                    <button
                        onClick={() => setActiveTab('properties')}
                        className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'properties'
                            ? 'bg-yellow-500 text-gray-900 font-bold'
                            : 'text-gray-300 hover:bg-gray-800'
                            }`}
                    >
                        <BuildingOffice2Icon className="w-5 h-5 mr-3" />
                        Propiedades
                    </button>
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center p-3 rounded-lg text-red-400 hover:bg-gray-800 transition-colors"
                    >
                        <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar (simplified) */}
            {/* ... Mobile sidebar logic could go here, or rely on main navbar ... */}

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8 capitalize">
                        {activeTab === 'overview' ? 'Resumen General' : activeTab}
                    </h1>
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}

