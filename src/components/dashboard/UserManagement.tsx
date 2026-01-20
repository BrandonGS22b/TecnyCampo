import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

interface User {
    id: string;
    _id?: string;
    name: string;
    email: string;
    role: string;
}

export default function UserManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'auxiliar' });
    const [msg, setMsg] = useState({ text: '', type: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.success) {
                setUsers(data.users);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newUser)
            });
            const data = await response.json();
            if (data.user) { // user or success check
                setUsers([...users, data.user]);
                setNewUser({ name: '', email: '', password: '', role: 'auxiliar' });
                setMsg({ text: 'Usuario creado exitosamente', type: 'success' });
            } else {
                setMsg({ text: data.message || 'Error al crear usuario', type: 'error' });
            }
        } catch (error) {
            setMsg({ text: 'Error de conexión', type: 'error' });
        }
        setTimeout(() => setMsg({ text: '', type: '' }), 3000);
    };

    return (
        <div className="space-y-6">
            {/* Create User Form */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Crear Nuevo Usuario</h3>
                {msg.text && (
                    <div className={`p-3 rounded mb-4 ${msg.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {msg.text}
                    </div>
                )}
                <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Nombre Completo"
                        className="p-2 border rounded"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Correo Electrónico"
                        className="p-2 border rounded"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="p-2 border rounded"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        required
                        minLength={6}
                    />
                    <select
                        className="p-2 border rounded"
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    >
                        <option value="auxiliar">Auxiliar</option>
                        <option value="admin">Administrador</option>
                        <option value="client">Cliente</option>
                    </select>
                    <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition md:col-span-2 font-bold">
                        Crear Usuario
                    </button>
                </form>
            </div>

            {/* Users List */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b">
                    <h3 className="text-xl font-bold text-gray-800">Usuarios del Sistema</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="p-4">Nombre</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Rol</th>
                                <th className="p-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={4} className="p-4 text-center">Cargando...</td></tr>
                            ) : users.map((u) => (
                                <tr key={u.id || u._id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 font-medium">{u.name}</td>
                                    <td className="p-4 text-gray-500">{u.email}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase
                                            ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                                u.role === 'auxiliar' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="p-4 flex space-x-2">
                                        <button className="text-blue-500 hover:text-blue-700">
                                            <PencilIcon className="w-5 h-5" />
                                        </button>
                                        <button className="text-red-500 hover:text-red-700">
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
